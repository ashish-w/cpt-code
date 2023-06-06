import { CustomInput } from "utils/utils";
import ModalForm from "../ModalForm/ModalForm";
import QuantitySelectors from "../QuantitySelectors/QuantitySelectors";
import styles from "../../../styles/bookform.module.css";
import DatePicker from "components/DatePicker/DatePicker";
import { useState } from "react";
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
  const openCalendar = () => {
    setShouldOpenCalendar(true);
  };
  const closeCalendar = () => {
    setShouldOpenCalendar(false);
  };
  const toggleCalendarStatus = () => {
    setShouldOpenCalendar(!shouldOpenCalendar);
  };
  return (
    <div>
      {/* <form>
        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col text-center">
              <p className="book-title">{header}</p>

              <div className="form-group datepicker">
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => (
                    setStartDate(date), setCount({ ...count, tourDate: date })
                  )}
                  showTimeSelect
                  minDate={new Date()}
                  minTime={setHours(setMinutes(new Date(), 0), 9)}
                  maxTime={setHours(setMinutes(new Date(), 30), 17)}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  customInput={<CustomInput />}
                />
              </div>

              <QuantitySelectors
                count={count}
                setCount={setCount}
                tourData={tourData}
                maxDuration={maxDuration}
              />

              <p className="text-uppercase" style={{ fontSize: 14 }}>
                Price from {""}
                <b style={{ fontSize: 24, color: "#313030" }}>
                  ${findStartingPrice}
                </b>{" "}
                usd
              </p>
              <ModalForm
                count={count}
                setCount={setCount}
                tourData={tourData}
                startDate={startDate}
              />
            </div>
          </div>
        </div>
      </form> */}

      <form>
        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col text-center">
              <p className="book-title">{tourData?.title}</p>
              <div className={styles.slot_container}>
                <div className={styles.slot_item}>1 Hour</div>
                <div className={styles.slot_item_2}>2 Hours</div>
              </div>
              <div className={styles.date_container_section}>
                <div className={styles.date_container}>
                  {[...Array(6)].map((val) => {
                    return (
                      <div className={styles.single_date}>
                        <span className="">F</span>
                        <span className="">12</span>
                      </div>
                    );
                  })}
                </div>

                <span
                  className={styles.chevron_right_date}
                  onClick={toggleCalendarStatus}
                >{`>`}</span>
              </div>
              {shouldOpenCalendar ? <DatePicker /> : ""}
              <div className={styles.time_slot_container}>
                {[...Array(10)].map(() => {
                  return <div className={styles.time_slot}>9 A.M</div>;
                })}
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
