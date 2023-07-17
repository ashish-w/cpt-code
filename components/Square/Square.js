import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

// const appId = 'sandbox-sq0idb-cerNlMbzYnVoZ8pGEBvbJQ'
// const locationId = 'LF1YW5EDE2YGS'

const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID
const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID

const SquarePaymentForm = ({ count, setPaymentStatus, tourData }) => {

    const {
        name,
        total,
    } = count;

    const parsedTotal = String(Number((total).toFixed(1)) * 100);

    return (

        <PaymentForm
            applicationId={appId}
            cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                await fetch("/api/pay", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        sourceId: token.token,
                        amount: parsedTotal,
                        count,
                        tourData
                    }),
                })
                    .then(res => {
                        if (!res.ok) {
                            console.error(res.status);
                            setPaymentStatus("FAILED");
                        } else {
                            return res.json();
                        }
                    })
                    .then(data => {
                        !!data?.payment?.status && setPaymentStatus(data?.payment?.status)
                    });
            }}

            createVerificationDetails={() => ({
                amount: parsedTotal,
                billingContact: {
                    familyName: name.split(' ')[1],
                    givenName: name.split(' ')[0],
                    // addressLines: address,
                    // countryCode: 'US',
                    // city: 'London',
                },
                currencyCode: 'USD',
                intent: 'CHARGE',
            })}

            locationId={locationId}
        >
            <CreditCard
                buttonProps={{
                    css: {
                        display: 'none'
                    },
                }}
            />
        </PaymentForm>
    );
};

export default SquarePaymentForm;