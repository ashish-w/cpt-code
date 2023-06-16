/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "antd";
import {
  calculateTotalPrice,
  CustomInput,
  extractNumber,
  findMinNumber,
} from "utils/utils";
import RequestFormContent from "../RequestFormContent/RequestForm";
import QuantitySelectors from "../QuantitySelectors/QuantitySelectors";
import ModalForm from "./ModalForm";
import styles from "../../../styles/bookform.module.css";
import ButtonsGroup from "../Buttons/ButtonsGroup";
import DatePicker from "components/DatePicker/DatePicker";

const MobileModal = (props) => {
  const {
    setHours,
    setMinutes,
    startDate,
    setStartDate,
    count,
    setCount,
    tourData,
  } = props;

  const { duration, baskets, locks, adults, kids, discount } = count;

  const {
    price_adult,
    price_adult_2h,
    price_adult_3h,
    price_adult_all_day,
    fixedDuration,
    title,
  } = tourData;

  const [isMainModal, setMainModal] = useState(false); // First Modal
  const [isHidden, setIsHidden] = useState(false);

  const resetTourSelection = () => {
    const initialDuration = fixedDuration ? extractNumber(fixedDuration) : 1;
    setCount({
      ...count,
      adults: 1,
      kids: 1,
      baskets: 0,
      locks: 0,
      duration: initialDuration,
      discount: null,
      discountCode: "",
      tour: title,
      tourDate: setHours(setMinutes(new Date(), 30), 9),
      name: "",
      email: "",
      phone: "",
    });
  };

  const closeMainModal = () => {
    setMainModal(false);
  };

  const allPrices = [
    Number(price_adult),
    Number(price_adult_2h),
    Number(price_adult_3h),
    Number(price_adult_all_day),
  ];

  const findStartingPrice = findMinNumber(allPrices);
  const isNotFixedPrice = findStartingPrice === 0;
  const maxDuration = allPrices.filter(Boolean).length;

  useEffect(() => {
    calculateTotalPrice({ count, tourData, setCount });
  }, [adults, kids, discount, duration, baskets, locks]);

  const showReserveBtn = () => {
    setIsHidden(false);
    closeMainModal();
  };

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
    <>
      <button
        className={`btn-reserve ${isHidden ? "m-checkout" : ""}`}
        onClick={() => {
          setMainModal(true);
          setIsHidden(true);
          resetTourSelection();
        }}
      >
        {!isNotFixedPrice ? "Book Now" : "Request Now"}
      </button>
      <Modal
        title={null}
        open={isMainModal}
        onOk={() => setMainModal(false)}
        onCancel={() => {
          setMainModal(false);
          setIsHidden(false);
        }}
        footer={null}
        destroyOnClose={true}
      >
        <div className="container">
          {!isNotFixedPrice ? (
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
          ) : (
            // <form>
            //   <div className="container d-flex justify-content-center">
            //     <div className="row">
            //       <div className="col text-center">
            //         <p className="book-title">Book Now</p>
            //         <div className="form-group datepicker">
            //           <DatePicker
            //             className="form-control"
            //             selected={startDate}
            //             onChange={(date) => (
            //               setStartDate(date),
            //               setCount({ ...count, tourDate: date })
            //             )}
            //             showTimeSelect
            //             minDate={new Date()}
            //             minTime={setHours(setMinutes(new Date(), 0), 9)}
            //             maxTime={setHours(setMinutes(new Date(), 30), 17)}
            //             dateFormat="MMMM d, yyyy h:mm aa"
            //             customInput={<CustomInput />}
            //           />
            //         </div>

            //         <QuantitySelectors
            //           count={count}
            //           setCount={setCount}
            //           tourData={tourData}
            //           maxDuration={maxDuration}
            //         />

            //         <p className="text-uppercase" style={{ fontSize: 14 }}>
            //           Price from {""}
            //           <b style={{ fontSize: 24, color: "#313030" }}>
            //             ${findStartingPrice}
            //           </b>{" "}
            //           usd
            //         </p>

            //         <ModalForm
            //           count={count}
            //           setCount={setCount}
            //           tourData={tourData}
            //           startDate={startDate}
            //           showReserveBtn={showReserveBtn}
            //         />
            //       </div>
            //     </div>
            //   </div>
            // </form>
            <RequestFormContent
              setHours={setHours}
              setMinutes={setMinutes}
              startDate={startDate}
              setStartDate={setStartDate}
              count={count}
              setCount={setCount}
              showReserveBtn={showReserveBtn}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
export default MobileModal;
