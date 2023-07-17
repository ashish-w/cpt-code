import { notification } from "antd";
import { findMinNumber } from "utils/utils";
import emailjs from "emailjs-com";
import BookingFormContent from "../BookingFormContent/BookingForm";
import RequestFormContent from "../RequestFormContent/RequestForm";
import { useEffect, useState } from "react";

const Sidebar = (props) => {
  const {
    isVisible,
    startDate,
    setStartDate,
    setHours,
    setMinutes,
    setCount,
    count,
    tourData,
  } = props;

  const { price_adult, price_adult_2h, price_adult_3h, price_adult_all_day } =
    tourData;

  const allPrices = [
    Number(price_adult),
    Number(price_adult_2h),
    Number(price_adult_3h),
    Number(price_adult_all_day),
  ];

  const maxDuration = allPrices.filter(Boolean).length;
  const findStartingPrice = findMinNumber(allPrices);
  const isNotFixedPrice = findStartingPrice === 0;

  const openNotification = (placement) => {
    notification.info({
      message: "Successfully sent!",
      description: "Your message was successfully sent!",
      placement,
    });
  };
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_azblda7",
        "template_0ni70ar",
        e.target,
        "user_eW5yZ8izC59xnly9aF67d"
      )
      .then(
        (result) => {
          console.log(result.text);
          // setShow(true);
          openNotification("bottomRight");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  const [scroll, setScroll] = useState(0);

  const controlDirection = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlDirection);
    return () => {
      window.removeEventListener("scroll", controlDirection);
    };
  }, []);

  return (
    <div
      className={`sidebar custom-scrollbar ${scroll > 3200 ? "hidden" : ""}`}
      id="sidebar"
      style={{
        top: isNotFixedPrice ? 120 : 200,
      }}
    >
      <div className="container">
        {!isNotFixedPrice ? (
          <BookingFormContent
            setHours={setHours}
            setMinutes={setMinutes}
            startDate={startDate}
            setStartDate={setStartDate}
            count={count}
            setCount={setCount}
            tourData={tourData}
            maxDuration={maxDuration}
            findStartingPrice={findStartingPrice}
          />
        ) : (
          <RequestFormContent
            setHours={setHours}
            setMinutes={setMinutes}
            startDate={startDate}
            setStartDate={setStartDate}
            count={count}
            setCount={setCount}
            sendEmail={sendEmail}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
