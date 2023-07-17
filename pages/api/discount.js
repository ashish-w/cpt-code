
export default async function handler(req, res) {

    if (req.method === 'POST') {

        await fetch('https://strapi.centralparktours.com/api/discount-codes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.STRAPI_ACCESS_TOKEN}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const code = data.data.find(codes => codes.attributes.code === req.body.code);
                // console.log(code)
                if (code) {
                    res.status(200).json({ code: req.body.code, discount: code.attributes.discount })
                } else {
                    res.status(200).json({ message: 'Code not exists!' })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(500).json(error);
            })
    }
}