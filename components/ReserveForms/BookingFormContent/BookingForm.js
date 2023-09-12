import { CustomInput } from "utils/utils";
import ModalForm from "../ModalForm/ModalForm";
import QuantitySelectors from "../QuantitySelectors/QuantitySelectors";
import styles from "../../../styles/bookform.module.css";
import DatePicker from "components/DatePicker/DatePicker";
import { useEffect, useState } from "react";
import ButtonsGroup from "../Buttons/ButtonsGroup";
import { CalendarIcon } from "@heroicons/react/24/outline";
import StayDatesRangeInput from "./StayDatesRangeInput";
import GuestsInput from "./GuestsInput";

const BookingFormContent = (props) => {
  const {
    header,
    setHours,
    setMinutes,
    startDate,
    setStartDate,
    count,
    setCount,
    tourData,
    maxDuration,
    findStartingPrice,
  } = props;

  console.log("----", count);

  // const [shouldOpenCalendar, setShouldOpenCalendar] = useState(false);
  // const [daysButtonEnabled, setDaysButtonEnable] = useState(true);

  // const toggleCalendarStatus = () => {
  //   setShouldOpenCalendar(!shouldOpenCalendar);
  //   setDaysButtonEnable(!daysButtonEnabled);
  // };

  // const getTimeOptions = () => {
  //   let options = [];

  //   [...Array(16)].map((x, i) => {
  //     let now = new Date();
  //     now.setHours(9);
  //     now.setMinutes(0);
  //     now.setMilliseconds(0);

  //     now = new Date(now.getTime() + 1800000 * i);

  //     options.push(
  //       now.getMinutes()
  //         ? now.toLocaleString("en-US", {
  //           hour: "numeric",
  //           minute: "numeric",
  //           hour12: true,
  //         })
  //         : now.toLocaleString("en-US", {
  //           hour: "numeric",
  //           hour12: true,
  //         })
  //     );
  //   });

  //   return options;
  // };

  // const getDayOptions = () => {
  //   let options = [];
  //   [...Array(6)].map((val, i) => {
  //     let date = new Date(new Date().getTime() + 86400000 * i);
  //     options.push([date.toString()[0], date.getDate()]);
  //   });
  //   return options;
  // };

  const getDurationOptions = () => {
    let options = ["1 Hour", "2 Hours"];
    return options;
  };

  return (
    <div>
      <form>
        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col text-center">
              {/* <p className="book-title">
                {(tourData?.title).includes("Pedi")
                  ? "Book Your Pedicab Tour"
                  : ""}
                {(tourData?.title).includes("Bike Tour")
                  ? "Book Your Bike Tour"
                  : ""}
              </p> */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
                className="mt-3"
              >

                <div><span style={{ fontWeight: "600", color: "black", fontSize: "1.2rem" }}>${tourData.price_adult_2h}</span><span>/person</span></div>

                <div
                  className="col-6 d-flex"
                  style={{
                    justifyContent: "right",
                    alignItems: "center",
                    paddingRight: "0px"
                  }}
                >
                  <div style={{ paddingRight: "10px" }}>  </div>
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="star"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    color="#ffbc00"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <div style={{ paddingRight: "10px" }}>
                  </div>
                  {tourData.rating}
                </div>

              </div>

              {(tourData?.title).includes("Pedi") ? (
                <div className={styles.slot_container}>
                  <ButtonsGroup
                    enabled={true}
                    type="DurationButtons"
                    options={getDurationOptions()}
                    count={count}
                    setCount={setCount}
                  />
                </div>
              ) : (
                <div className="d-flex font-weight-bold" style={{ fontSize: "0.8rem" }}>Duration: 2 Hours</div>
              )}

              <div className="mt-3 mb-3">

                <div className="d-flex p-1" style={{ borderStyle: "solid", borderColor: "#e5e7eb", borderWidth: "1px", borderRadius: "1rem 1rem 0 0" }} >
                  <StayDatesRangeInput
                    count={count}
                    setCount={setCount} />
                </div>

                <div className="d-flex p-1" style={{ borderStyle: "solid", borderColor: "#e5e7eb", borderWidth: "1px", borderRadius: "0 0 1rem 1rem", borderTop: "0" }} >
                  <GuestsInput
                    count={count}
                    setCount={setCount} />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                  className="mt-3"
                >
                  <p className="mb-2 mt-2">${tourData.price_adult_2h} x {count.adults} Adult</p>
                  <p className="mb-2 mt-2">${tourData.price_adult_2h * count.adults}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <p className="mb-2">${tourData.price_kid_2h} x {count.kids} Child</p>
                  <p className="mb-2">${tourData.price_kid_2h * count.kids}</p>
                </div>

                <div style={{ border: "1px solid #e5e7eb", borderRadius: "1px" }}></div>

                <div className="font-weight-bold"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <p className="mb-2 mt-2">Total</p>
                  <p className="mb-2 mt-2">${(tourData.price_adult_2h * count.adults) + (tourData.price_kid_2h * count.kids)}</p>
                </div>

              </div>

              {/* <div className={styles.date_container_section}>
                <div className={styles.date_container}>
                  <ButtonsGroup
                    enabled={daysButtonEnabled}
                    type="DayButtons"
                    options={getDayOptions()}
                    count={count}
                    setCount={setCount}
                  />
                </div>

                {shouldOpenCalendar ? (
                  <>
                    <span
                      className={styles.chevron_right_date}
                      onClick={toggleCalendarStatus}
                    >{`<`}</span>
                  </>
                ) : (
                  <>
                    <span
                      className={styles.chevron_right_date}
                      onClick={toggleCalendarStatus}
                    >{`>`}</span>
                  </>
                )}
              </div> */}

              {/* {shouldOpenCalendar ? <DatePicker count={count} /> : ""} */}

              {/* <div className={styles.time_slot_container}>
                <ButtonsGroup
                  enabled={true}
                  type="TimeButtons"
                  options={getTimeOptions()}
                  count={count}
                  setCount={setCount}
                />
              </div> */}

              {/* <QuantitySelectors
                count={count}
                setCount={setCount}
                tourData={tourData}
                maxDuration={maxDuration}
              /> */}

              {/* <p className="text-uppercase" style={{ fontSize: 14 }}>
                Price from {""}
                <b style={{ fontSize: 24, color: "#313030" }}>
                  ${findStartingPrice}
                </b>{" "}
                usd
              </p> */}
              <ModalForm
                count={count}
                setCount={setCount}
                tourData={tourData}
                startDate={startDate}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingFormContent;
