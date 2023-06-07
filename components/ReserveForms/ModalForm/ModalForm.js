import { useEffect, useState, useRef } from "react";
import { Modal } from "antd";
import { calculateTotalPrice, extractNumber } from "utils/utils";
import SummaryAndCheckout from "../SummaryAndCheckout/SummaryAndCheckout";

export default function ModalForm(props) {
  const { startDate, count, setCount, tourData, showReserveBtn } = props;

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
      <div onClick={showModal} className="book-now-btn">
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
