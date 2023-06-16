import { CustomInput } from "utils/utils";
import ModalForm from "../ModalForm/ModalForm";
import QuantitySelectors from "../QuantitySelectors/QuantitySelectors";
import styles from "../../../styles/bookform.module.css";
import DatePicker from "components/DatePicker/DatePicker";
import { useEffect, useState } from "react";
import ButtonsGroup from "../Buttons/ButtonsGroup";

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

  const [shouldOpenCalendar, setShouldOpenCalendar] = useState(false);
  const [daysButtonEnabled, setDaysButtonEnable] = useState(true);

  const toggleCalendarStatus = () => {
    setShouldOpenCalendar(!shouldOpenCalendar);
    setDaysButtonEnable(!daysButtonEnabled);
  };

  const getTimeOptions = () => {
    let options = [];

    [...Array(16)].map((x, i) => {
      let now = new Date();
      now.setHours(9);
      now.setMinutes(0);
      now.setMilliseconds(0);

      now = new Date(now.getTime() + 1800000 * i);

      options.push(
        now.getMinutes()
          ? now.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : now.toLocaleString("en-US", {
              hour: "numeric",
              hour12: true,
            })
      );
    });

    return options;
  };

  const getDayOptions = () => {
    let options = [];
    [...Array(6)].map((val, i) => {
      let date = new Date(new Date().getTime() + 86400000 * i);
      options.push([date.toString()[0], date.getDate()]);
    });
    return options;
  };

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
              <p className="book-title">
                {(tourData?.title).includes("Pedi")
                  ? "Book Your Pedicab Tour"
                  : ""}
                {(tourData?.title).includes("Bike Tour")
                  ? "Book Your Bike Tour"
                  : ""}
              </p>

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
                "Duration: 2 Hours"
              )}

              <div className={styles.date_container_section}>
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
              </div>

              {shouldOpenCalendar ? <DatePicker count={count} /> : ""}

              <div className={styles.time_slot_container}>
                <ButtonsGroup
                  enabled={true}
                  type="TimeButtons"
                  options={getTimeOptions()}
                  count={count}
                  setCount={setCount}
                />
              </div>

              <QuantitySelectors
                count={count}
                setCount={setCount}
                tourData={tourData}
                maxDuration={maxDuration}
              />

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
