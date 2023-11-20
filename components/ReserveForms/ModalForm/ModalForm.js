import { useEffect, useState, useRef } from "react";
import { Modal } from "antd";
import { calculateTotalPrice, extractNumber } from "utils/utils";
import SummaryAndCheckout from "../SummaryAndCheckout/SummaryAndCheckout";
import { global } from "styled-jsx/css";

export default function ModalForm(props) {
  const { startDate, count, setCount, tourData, showReserveBtn } = props;

  const { total } = count;

  const { fixedDuration, title } = tourData;

  const childRef = useRef();

  // console.log(count);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPaymentStatus("");
    if (showReserveBtn) showReserveBtn();
  };

  useEffect(() => {
    const initialDuration = fixedDuration ? extractNumber(fixedDuration) : 1;

    setCount({ ...count, tour: title, duration: initialDuration });
    calculateTotalPrice({ count, tourData, setCount });

    updateBookPrice();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible, total]);

  const bookNowButtonRef = useRef(null);

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
    // bookNowButtonRef.current.innerText = `$${price} Book Now`;
    bookNowButtonRef.current.innerText = `Book Now`;
  };

  return (
    <>
      <div
        onClick={showModal}
        ref={bookNowButtonRef}
        className="book-now-btn"
        id="bookNowButton"
      >
        $258 Book Now
      </div>
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        width={900}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <SummaryAndCheckout
          count={count}
          setCount={setCount}
          startDate={startDate}
          childRef={childRef}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          tourData={tourData}
        />
      </Modal>
    </>
  );
}
