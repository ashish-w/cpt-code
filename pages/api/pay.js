import { ApiError, Client, Environment } from 'square';
import { randomUUID } from 'crypto';
import { calculateTotalPrice } from "./utils";

// @ts-ignore
const parseAmount = BigInt.prototype.toJSON = function (value) {
    return value.toString()
};

// SQUARE_ACCESS_TOKEN=EAAAEN2uURpsRYYnJuN_UJFJQ_OOFuS0UVnKsB0mMFEWC8cNHZq5i53jbMWHtttD
// SQUARE_APP_ID = sandbox-sq0idb-cerNlMbzYnVoZ8pGEBvbJQ

const { paymentsApi } = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production
});

export default async function handler(req, res) {
    const { isCorrectCalculation } = calculateTotalPrice(req.body);

    if (req.method === 'POST' && isCorrectCalculation) {

        try {
            const { result } = await paymentsApi.createPayment({
                idempotencyKey: randomUUID(),
                sourceId: req.body.sourceId,
                amountMoney: {
                    currency: 'USD',
                    amount: parseAmount(req.body.amount)
                }
            })

            const {
                adults,
                kids,
                baskets,
                locks,
                duration,
                subtotal,
                total,
                tax,
                discount,
                discountCode,
                tour,
                tourDate,
                name,
                email,
                phone
            } = req.body.count;

            const data = {
                adults: `${adults}`,
                kids: `${kids}`,
                baskets: `${baskets}`,
                locks: `${locks}`,
                duration: `${duration}`,
                subtotal: `${subtotal}`,
                total: `${total}`,
                tax: `${tax}`,
                discount: `${discount}`,
                discount_code: `${discountCode}`,
                tour_date: new Date(tourDate).toLocaleString('en-US'),
                tour,
                name,
                email,
                phone
            }

            await fetch('https://strapi.centralparktours.com/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.STRAPI_ACCESS_TOKEN}`
                },
                body: JSON.stringify({ data }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })

            res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof ApiError) {
                const errors = error.result;
                const { statusCode, headers, message, name } = error;

                res.status(statusCode).json({ errors, message, name, statusCode });
            }
        }
    } else {
        res.status(500).send({ message: 'Wrong method or calculation' });
    }
}