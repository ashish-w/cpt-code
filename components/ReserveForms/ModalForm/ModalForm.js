import { useEffect, useState, useRef } from "react";
import { Modal } from "antd";
import { calculateTotalPrice, extractNumber } from "utils/utils";
import SummaryAndCheckout from "../SummaryAndCheckout/SummaryAndCheckout";

export default function ModalForm(props) {
  const { startDate, count, setCount, tourData, showReserveBtn } = props;

  // console.log(count.duration);
  // console.log(tourData);

  const updateBookPrice = () => {
    let price;
    // console.log("Adults :", count.adults);
    // console.log("Kids :", count.kids);
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

  updateBookPrice();

  const { total } = count;

  const { fixedDuration, title } = tourData;

  const childRef = useRef();

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible, total]);

  return (
    <>
      <div onClick={showModal} className="book-now-btn" id="bookNowButton">
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
