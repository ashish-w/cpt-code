import { LazyLoadImage } from 'react-lazy-load-image-component';
import SquarePaymentForm from "components/Square/Square";
import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const SummaryAndCheckout = (props) => {

    const {
        count,
        setCount,
        paymentStatus,
        setPaymentStatus,
        tourData
    } = props;

    const [code, setCode] = useState('');
    const [error, setError] = useState(null);

    const {
        name,
        email,
        phone,
        tour,
        tourDate,
        duration,
        adults,
        kids,
        baskets,
        locks,
        subtotal,
        total,
        tax,
        discount
    } = count;

    const handleSubmit = e => {
        e.preventDefault();
        setPaymentStatus('LOADING');

        if (name !== '' && email !== '' && phone !== '') {
            document.getElementById('rswp-card-button').click();
            setCount({
                ...count,
                discount: null,
                discountCode: ''
            })
        }
    }

    const onHandleChange = (e) => {
        setCount({ ...count, [e.target.name]: e.target.value });
        // console.log({ [e.target.name]: e.target.value });
    }

    async function applyDiscount() {
        try {
            setError(null);
            setCount({ ...count, discount: null });

            await fetch('/api/discount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code }),
            })
                .then(response => response.json())
                .then((data) => {
                    if (data.discount) {
                        setCount({
                            ...count,
                            discount: data.discount,
                            discountCode: data.code
                        });
                    }
                    if (data.message) {
                        setError(data.message);
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    if (paymentStatus === 'LOADING') {
        const antIcon = <LoadingOutlined style={{ fontSize: 55, color: '#88bc2c' }} spin />;

        return (
            <div className="paymentScreen">
                <div>
                    <Spin indicator={antIcon} style={{ color: '#88bc2c' }} />
                    <p className="success">Loading...</p>
                </div>
            </div>
        )
    }

    if (paymentStatus === 'FAILED') {

        return (
            <div className="paymentScreen">
                <div>
                    <FontAwesomeIcon style={{ fontSize: 55, color: 'red' }} icon={faExclamationCircle} />
                    <p className="error">Failed payment!</p>
                </div>
            </div>
        )
    }

    if (paymentStatus === "COMPLETED") {
        return <div className="paymentScreen">
            <div>
                <CheckCircleOutlined style={{ fontSize: 55, color: '#88bc2c' }} />
                <p className="pt-3 success">Order completed!</p>
            </div>
        </div>
    }

    return (<div>
        <form onSubmit={handleSubmit}>

            <h1 style={{ paddingBottom: '30px', color: '#4c4a4b', textShadow: '2px 0px currentColor' }}>Checkout</h1>
            <div className="row">
                <div className="col-xs-12 col-lg-6">

                    <div className="checkout-form">

                        <div className="form-group centered-row pb-2">
                            <input className="form-control" required
                                onChange={onHandleChange}
                                value={name}
                                name="name"
                                type="text"
                                placeholder="First & Last Names" />
                        </div>

                        <div className="form-group centered-row pb-2">
                            <input
                                className="form-control" required
                                onChange={onHandleChange}
                                value={email}
                                name="email"
                                type="email"
                                placeholder="Email Address" />
                        </div>

                        <div className="form-group centered-row pb-2">
                            <input
                                className="form-control" required
                                onChange={onHandleChange}
                                value={phone}
                                name="phone"
                                type="tel"
                                pattern="\d*"
                                placeholder="Phone Number" />
                        </div>

                        <div className="form-group centered-row d-block pb-2">
                            {/* stripe/square */}
                            <SquarePaymentForm
                                count={count}
                                setPaymentStatus={setPaymentStatus}
                                tourData={tourData}
                            />
                        </div>

                    </div>
                    {/* end form */}

                </div>

                <div className="col-xs-12 col-lg-6">
                    <h5 style={{ color: '#4c4a4b' }}>Order summary</h5>
                    <div className="row pb-3">
                        <div className="col">
                            <span style={{ fontSize: '12px' }}>
                                Date: {tourDate?.toString().slice(4, 21)}
                            </span>
                            <br></br>
                            <span style={{ fontSize: '12px' }}>
                                {tour.replaceAll('-', ' ')} - {duration} h
                            </span>
                        </div>
                        <div className="col">
                            <span style={{ fontSize: '12px' }}>
                                Adults: {adults}
                            </span>
                            <br></br>
                            <span style={{ fontSize: '12px' }}>
                                Kids: {kids}
                            </span>
                            <div>
                                {baskets !== 0 && <span style={{ fontSize: '12px' }}>
                                    Baskets: {baskets}
                                </span>}
                                <br></br>
                                {locks !== 0 && <span style={{ fontSize: '12px' }}>
                                    Locks: {locks}
                                </span>}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-uppercase">
                            subtotal
                        </div>
                        <div className="col"></div>
                        <div className="col text-uppercase text-right">
                            {Number((subtotal).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </div>
                        <hr></hr>
                        <div className="col text-uppercase">
                            tax ({tourData.tax_rate || '8.875'}%)
                        </div>
                        <div className="col"></div>
                        <div className="col text-uppercase text-right">
                            {Number((tax).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </div>

                        <hr></hr>
                        <div className="col text-uppercase pt-2">
                            discount code
                        </div>
                        <div className="col text-uppercase text-right pb-3 d-flex">
                            <input type="text"
                                id="discountCode"
                                onChange={(e) => setCode(e.target.value)}
                                className="form-control" />
                            <button
                                className="btn btn-default"
                                type="button"
                                onClick={applyDiscount}
                                id="apply">
                                Apply
                            </button>
                        </div>

                        <hr></hr>
                        <div className="col text-uppercase">
                            <b>grand total</b>
                        </div>

                        <div className="col text-uppercase text-right"><b>
                            {Number((total).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</b>
                        </div>
                    </div>

                    <p className="success">{discount && "You've received " + discount + '% discount!'}</p>
                    <p className="error">{error}</p>

                </div>
            </div>
            <div className="checkout-section text-right pt-3">
                <LazyLoadImage className="mr-4" width="100" alt="masterCard" src='/images/visamastercard.webp' />

                <button
                    type="submit"
                    className="btn-reserve text-uppercase">
                    Finish Order
                </button>
            </div>
        </form>
    </div>);
}

export default SummaryAndCheckout;