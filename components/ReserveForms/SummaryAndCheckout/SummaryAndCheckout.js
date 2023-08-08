import { LazyLoadImage } from "react-lazy-load-image-component";
import SquarePaymentForm from "components/Square/Square";
import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import styles from "../../../styles/bookform.module.css";

const SummaryAndCheckout = (props) => {
  const { count, setCount, paymentStatus, setPaymentStatus, tourData } = props;

  // console.log(tourData);
  const [code, setCode] = useState("");
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
    discount,
  } = count;

  console.log("Duration:", duration);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus("LOADING");

    if (name !== "" && email !== "" && phone !== "") {
      document.getElementById("rswp-card-button").click();
      setCount({
        ...count,
        discount: null,
        discountCode: "",
      });
    }
  };

  const onHandleChange = (e) => {
    console.log(e);
    setCount({ ...count, [e.target.name]: e.target.value });
    // console.log({ [e.target.name]: e.target.value });
  };
  const onHandleChange1 = (e) => {
    console.log(e);
    setCount({ ...count, phone: e });
    console.log(count.phone);
  };

  async function applyDiscount() {
    try {
      setError(null);
      setCount({ ...count, discount: null });

      await fetch("/api/discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.discount) {
            setCount({
              ...count,
              discount: data.discount,
              discountCode: data.code,
            });
          }
          if (data.message) {
            setError(data.message);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  if (paymentStatus === "LOADING") {
    const antIcon = (
      <LoadingOutlined style={{ fontSize: 55, color: "#88bc2c" }} spin />
    );

    return (
      <div className="paymentScreen">
        <div>
          <Spin indicator={antIcon} style={{ color: "#88bc2c" }} />
          <p className="success">Loading...</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === "FAILED") {
    return (
      <div className="paymentScreen">
        <div>
          <FontAwesomeIcon
            style={{ fontSize: 55, color: "red" }}
            icon={faExclamationCircle}
          />
          <p className="error">Failed payment!</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === "COMPLETED") {
    return (
      <div className="paymentScreen">
        <div>
          <CheckCircleOutlined style={{ fontSize: 55, color: "#88bc2c" }} />
          <p className="pt-3 success">Order completed!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h5
          className="mb-4"
          style={{
            // paddingBottom: "10px",
            color: "#1b3d02",
            // textShadow: "2px 0px currentColor",
            fontWeight: 700,
            justifyContent: "center",
            display: "flex",
          }}
        >
          {(tourData?.title).includes("Pedi") ? "Book Your Pedicab Tour" : ""}
          {(tourData?.title).includes("Bike Tour") ? "Book Your Bike Tour" : ""}
        </h5>

        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <div className="checkout-form">
              <p
                className="d-flex mb-3"
                style={{
                  color: "#5ba205",
                  fontWeight: 500,
                  justifyContent: "center",
                }}
              >
                Traveler&apos;s Information
              </p>
              <div className="form-group centered-row pb-2">
                <input
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#f4f4f4",
                    border: "none",
                  }}
                  className="form-control"
                  required
                  onChange={onHandleChange}
                  value={name}
                  name="name"
                  type="text"
                  placeholder="First & Last Names"
                />
              </div>

              <div className="form-group centered-row pb-2">
                <input
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#f4f4f4",
                    border: "none",
                  }}
                  className="form-control"
                  required
                  onChange={onHandleChange}
                  value={email}
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />
              </div>

              <div className="form-group centered-row pb-2">
                <PhoneInput
                  // disabled
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#f4f4f4",
                    border: "none",
                  }}
                  international
                  countryCallingCodeEditable={true}
                  defaultCountry="US"
                  className="form-control"
                  required
                  value={phone}
                  name="phone"
                  onChange={onHandleChange1}
                  placeholder="Phone Number"
                />
              </div>
              {/* <div className="form-group centered-row pb-2">
                <input
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#f4f4f4",
                    border: "none",
                  }}
                  className="form-control"
                  required
                  onChange={onHandleChange}
                  value={phone}
                  name="phone"
                  type="tel"
                  pattern="\d*"
                  placeholder="Phone Number"
                />
              </div> */}

              <hr
                style={{
                  color: "#1b3d02",
                  backgroundColor: "#5ba205",
                  height: 2,
                  width: "100%",
                  borderRadius: "2px",
                }}
              ></hr>

              <p
                className="d-flex mb-3"
                style={{
                  color: "#5ba205",
                  fontWeight: 500,
                  justifyContent: "center",
                }}
              >
                Booking Summary
              </p>

              <div
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "1rem",
                  borderRadius: "20px",
                }}
                className="mb-3"
              >
                <div className="container">
                  <div className="row mb-4 mt-2">
                    <div
                      className="col-6"
                      style={{
                        color: "#5ba205",
                        fontWeight: 700,
                        fontSize: "15px",
                      }}
                    >
                      {duration} {duration > 1 ? "Hours" : "Hour"}{" "}
                      {tour.replaceAll("Central Park ", "")}
                    </div>
                    <div
                      className="col-6 d-flex"
                      style={{
                        justifyContent: "right",
                      }}
                    >
                      Ratings
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div
                      className="col-6"
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      Date
                    </div>
                    <div
                      className="col-6 d-flex"
                      style={{
                        justifyContent: "right",
                        fontWeight: 700,
                      }}
                    >
                      {`${new Date(count.tourDate).toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        weekday: "short",
                        hour: "2-digit",
                        hour12: false,
                        minute: "2-digit",
                      })} Hours`}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div
                      className="col-6"
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      {adults} {adults > 1 ? "Adults" : "Adult"} x $
                      {duration == 1
                        ? tourData.price_adult
                        : tourData.price_adult_2h}
                    </div>
                    <div
                      className="col-6 d-flex"
                      style={{
                        justifyContent: "right",
                        fontWeight: 700,
                      }}
                    >
                      {Number(
                        (
                          adults *
                          (duration == 1
                            ? tourData.price_adult
                            : tourData.price_adult_2h)
                        ).toFixed(2)
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div
                      className="col-6"
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      {kids} {kids > 1 ? "Children" : "Child"} x $
                      {duration == 1
                        ? tourData.price_kid
                        : tourData.price_kid_2h}
                    </div>
                    <div
                      className="col-6 d-flex"
                      style={{
                        justifyContent: "right",
                        fontWeight: 700,
                      }}
                    >
                      {Number(
                        (
                          kids *
                          (duration == 1
                            ? tourData.price_kid
                            : tourData.price_kid_2h)
                        ).toFixed(2)
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div
                      className="col-6"
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      Tax ({tourData.tax_rate || "8.875"}%)
                    </div>
                    <div
                      className="col-6 d-flex"
                      style={{
                        justifyContent: "right",
                        fontWeight: 700,
                      }}
                    >
                      {Number(tax.toFixed(2)).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </div>

                  <hr
                    style={{
                      color: "#1b3d02",
                      backgroundColor: "rgb(221 222 220)",
                      height: 2,
                      width: "100%",
                      borderRadius: "2px",
                    }}
                  ></hr>

                  <div className="row mb-3">
                    <div className="col-8">
                      <input
                        type="text"
                        id="discountCode"
                        onChange={(e) => setCode(e.target.value)}
                        className="form-control"
                        placeholder="Discount Code"
                        style={{
                          width: "100%",
                          borderRadius: "20px",
                        }}
                      />
                    </div>
                    <div className="col d-flex justify-content-end">
                      <button
                        className="btn"
                        type="button"
                        onClick={applyDiscount}
                        id="apply"
                        style={{
                          width: "100%",
                          borderRadius: "20px",
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-6"
                      style={{
                        fontWeight: 700,
                        fontSize: "large",
                      }}
                    >
                      Total
                    </div>
                    <div
                      className="col-6 d-flex"
                      style={{
                        fontWeight: 700,
                        fontSize: "large",
                        color: "#5ba205",
                        justifyContent: "right",
                      }}
                    >
                      {Number(total.toFixed(2)).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </div>

                  <div className="row">
                    <p className="success">
                      {discount &&
                        "You've received " + discount + "% discount!"}
                    </p>
                    <p className="error">{error}</p>
                  </div>
                </div>
              </div>

              <hr
                style={{
                  color: "#1b3d02",
                  backgroundColor: "#5ba205",
                  height: 1,
                  width: "100%",
                  borderRadius: "2px",
                }}
              ></hr>
              {/* <div className="form-group centered-row d-block pb-2">
                stripe/square
                <SquarePaymentForm
                  count={count}
                  setPaymentStatus={setPaymentStatus}
                  tourData={tourData}
                />
              </div> */}
            </div>
            {/* end form */}
          </div>

          <div className="col-xs-12 col-lg-6">
            <p
              className="d-flex mb-3"
              style={{
                color: "#5ba205",
                fontWeight: 500,
                justifyContent: "center",
              }}
            >
              Billing Information
            </p>

            <div className="form-group centered-row pb-2">
              <input
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#f4f4f4",
                  border: "none",
                }}
                className="form-control"
                required
                onChange={onHandleChange}
                // value={}
                name="name"
                type="text"
                placeholder="Cardholder's Name"
              />
            </div>
            <div className="form-group centered-row pb-2">
              <input
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#f4f4f4",
                  border: "none",
                }}
                className="form-control"
                required
                onChange={onHandleChange}
                // value={}
                name="billingAddress"
                type="text"
                placeholder="Billing Address"
              />
            </div>

            <div className="row mb-3">
              <div className="col-4">
                <input
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#f4f4f4",
                    border: "none",
                  }}
                  className="form-control"
                  required
                  onChange={onHandleChange}
                  // value={}
                  name="city"
                  type="text"
                  placeholder="City"
                />
              </div>
              <div className="col-4">
                <input
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#f4f4f4",
                    border: "none",
                  }}
                  className="form-control"
                  required
                  onChange={onHandleChange}
                  // value={}
                  name="state"
                  type="text"
                  placeholder="State"
                />
              </div>
              <div className="col-4">
                <input
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#f4f4f4",
                    border: "none",
                  }}
                  className="form-control"
                  required
                  onChange={onHandleChange}
                  // value={}
                  name="zip"
                  type="text"
                  placeholder="Zip"
                />
              </div>
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

          {/* <div className="col-xs-12 col-lg-6">
            <h5 style={{ color: "#4c4a4b" }}>Order summary</h5>
            <div className="row pb-3">
              <div className="col">
                <span style={{ fontSize: "12px" }}>
                  Date: {tourDate?.toString().slice(4, 21)}
                </span>
                <br></br>
                <span style={{ fontSize: "12px" }}>
                  {tour.replaceAll("-", " ")} - {duration} h
                </span>
              </div>
              <div className="col">
                <span style={{ fontSize: "12px" }}>Adults: {adults}</span>
                <br></br>
                <span style={{ fontSize: "12px" }}>Kids: {kids}</span>
                <div>
                  {baskets !== 0 && (
                    <span style={{ fontSize: "12px" }}>Baskets: {baskets}</span>
                  )}
                  <br></br>
                  {locks !== 0 && (
                    <span style={{ fontSize: "12px" }}>Locks: {locks}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col text-uppercase">subtotal</div>
              <div className="col"></div>
              <div className="col text-uppercase text-right">
                {Number(subtotal.toFixed(2)).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
              <hr></hr>
              <div className="col text-uppercase">
                tax ({tourData.tax_rate || "8.875"}%)
              </div>
              <div className="col"></div>
              <div className="col text-uppercase text-right">
                {Number(tax.toFixed(2)).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>

              <hr></hr>
              <div className="col text-uppercase pt-2">discount code</div>
              <div className="col text-uppercase text-right pb-3 d-flex">
                <input
                  type="text"
                  id="discountCode"
                  onChange={(e) => setCode(e.target.value)}
                  className="form-control"
                />
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={applyDiscount}
                  id="apply"
                >
                  Apply
                </button>
              </div>

              <hr></hr>
              <div className="col text-uppercase">
                <b>grand total</b>
              </div>

              <div className="col text-uppercase text-right">
                <b>
                  {Number(total.toFixed(2)).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </b>
              </div>
            </div>

            <p className="success">
              {discount && "You've received " + discount + "% discount!"}
            </p>
            <p className="error">{error}</p>
          </div> */}
        </div>
        <div className="checkout-section text-right pt-3">
          <LazyLoadImage
            className="mr-4"
            width="100"
            alt="masterCard"
            src="/images/visamastercard.webp"
          />

          <button type="submit" className="btn-reserve text-uppercase">
            Finish Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default SummaryAndCheckout;
