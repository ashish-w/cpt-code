import { CustomInput } from "utils/utils";
import ModalForm from "../ModalForm/ModalForm";
import QuantitySelectors from "../QuantitySelectors/QuantitySelectors";
import styles from "../../../styles/bookform.module.css";
import DatePicker from "components/DatePicker/DatePicker";
import { useState, useRef } from "react";
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
  const openCalendar = () => {
    setShouldOpenCalendar(true);
  };
  const closeCalendar = () => {
    setShouldOpenCalendar(false);
  };
  const toggleCalendarStatus = () => {
    setShouldOpenCalendar(!shouldOpenCalendar);
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
      options.push([
        new Date(new Date().getTime() + 86400000 * i).toString()[0],
        new Date(new Date().getTime() + 86400000 * i).getDate(),
      ]);
    });
    return options;
  };

  const hoursRef1 = useRef(null);
  const hoursRef2 = useRef(null);

  const toggleHours = (ref1, ref2) => {
    ref1.current.style.background = "#1b3d02";
    ref2.current.style.background = "#5ba205";

    count.duration = ref1.current.innerText.includes("1") ? 1 : 2;
    updateBookPrice();
  };

  const toggleday = (id1) => {
    for (let i = 0; i < 6; ++i) {
      document.getElementById(i + "wday").style.background = "#ffffff";
      document.getElementById(i + "wday").style.color = "#000000";
    }
    document.getElementById(id1).style.background = "#1b3d02";
    document.getElementById(id1).style.color = "#ffffff";
  };

  const updateBookPrice = () => {
    let price;
    if (count.duration == 1) {
      price =
        count.adults * tourData.price_adult + count.kids * tourData.price_kid;
    } else {
      price =
        count.adults * tourData.price_adult_2h +
        count.kids * tourData.price_kid_2h;
    }
    document.getElementById("bookNowButton").innerText = `$${price} Book Now`;
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
              <p className="book-title">
                {(tourData?.title).includes("Pedi")
                  ? "Book Your Pedicab Tour"
                  : ""}
              </p>

              <div className={styles.slot_container}>
                <div
                  className={styles.slot_item}
                  ref={hoursRef1}
                  onClick={() => toggleHours(hoursRef1, hoursRef2)}
                >
                  1 Hour
                </div>
                <div
                  className={styles.slot_item_2}
                  ref={hoursRef2}
                  onClick={() => toggleHours(hoursRef2, hoursRef1)}
                >
                  2 Hours
                </div>
              </div>

              <div className={styles.date_container_section}>
                <div className={styles.date_container}>
                  <ButtonsGroup type="DayButtons" options={getDayOptions()} />
                </div>

                <span
                  className={styles.chevron_right_date}
                  onClick={toggleCalendarStatus}
                >{`>`}</span>
              </div>

              {shouldOpenCalendar ? <DatePicker /> : ""}

              <div className={styles.time_slot_container}>
                <ButtonsGroup type="TimeButtons" options={getTimeOptions()} />
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
