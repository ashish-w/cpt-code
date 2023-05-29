import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// @ts-ignore
export const CheckoutForm = React.forwardRef(
  ({ formData, startDate, count, onSuccessfulCheckout }, ref) => {
    React.useImperativeHandle(ref, () => ({
      getAlert() {
        handleFormSubmit();
      },
    }));

    // @ts-ignore
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const stripe = useStripe();
    const elements = useElements();

    const handleCardDetailsChange = (ev) => {
      // @ts-ignore
      ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };

    // @ts-ignore
    const handleFormSubmit = async (ev) => {
      // ev.preventDefault();
      setProcessingTo(true);

      const cardElement = elements.getElement("card");

      try {
        // const { data: clientSecret } = await axios.post(count.tour === 'bike-tour' ? '/api/payment_intents' : '/api/pedicab_payment', {

        const { data: clientSecret } = await axios.post(`/api/${count.tour}`, {
          amount: count,
          metadata: formData,
        });

        const paymentMethodReq = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            email: count.email,
            name: count.name,
            phone: count.phone,
          },
        });

        if (paymentMethodReq.error) {
          // @ts-ignore
          setCheckoutError(paymentMethodReq.error.message);
          setProcessingTo(false);
          return;
        }

        const { error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodReq.paymentMethod.id,
        });

        if (error) {
          // @ts-ignore
          setCheckoutError(error.message);
          setProcessingTo(false);
          return;
        }

        onSuccessfulCheckout();
      } catch (err) {
        setCheckoutError(err.message);
      }
    };

    return (
      <div className="form-control">
        <CardElement onChange={handleCardDetailsChange} />
        <br></br>
        <p>{checkoutError && <div>{checkoutError}</div>}</p>
      </div>
    );
  }
);

CheckoutForm.displayName = "CheckoutForm";
