import { useState } from "react";
import styles from "../../../styles/bookform.module.css";

const ButtonsGroup = ({ type, options }) => {
  const [selectedOption, setSelectedOption] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  if (type == "TimeButtons") {
    return (
      <>
        {options.map((option) => (
          <div
            key={option}
            className={
              selectedOption === option
                ? styles.time_slot_selected
                : styles.time_slot
            }
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </>
    );
  } else if (type == "DayButtons") {
    return (
      <>
        {options.map((option) => (
          <div
            className={
              selectedOption === option[1]
                ? styles.single_date_selected
                : styles.single_date
            }
            key={option[1]}
            onClick={() => handleOptionClick(option[1])}
          >
            <span>{option[0]}</span>
            <span>{option[1]}</span>
          </div>
        ))}
      </>
    );
  } else if (type == "DurationButtons") {
    return (
      <>
        {options.map((option) => (
          <div
            key={option}
            className={
              selectedOption === option
                ? styles.duration_button_selected
                : styles.duration_button
            }
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </>
    );
  }
};

export default ButtonsGroup;
