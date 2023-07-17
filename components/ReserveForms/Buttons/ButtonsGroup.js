import { useState } from "react";
import styles from "../../../styles/bookform.module.css";

const ButtonsGroup = (props) => {
  const { enabled, type, options, count, setCount } = props;

  const [selectedOption, setSelectedOption] = useState(
    options.length > 0 ? options[0] : false
  );

  const handleOptionClick = (option) => {
    if (enabled) {
      setSelectedOption(option);

      if (type == "DayButtons") {
        count.tourDate.setDate(option);
        if (new Date().getDate() > option) {
          count.tourDate.setMonth(
            new Date(new Date().getTime() + 1728000000).getMonth()
          );
        }
      } else if (type == "TimeButtons") {
        let minutes = option.includes(":")
          ? +option.split(":")[1].slice(0, 3)
          : 0;

        count.tourDate.setMinutes(minutes);

        let hours = option.includes("AM")
          ? option.includes(":")
            ? +option.split(":")[0]
            : +option.slice(0, 2)
          : option.includes(":")
          ? +option.split(":")[0] + 12
          : +option.slice(0, 2) + 12;

        count.tourDate.setHours(hours);
      }
    }
  };
  const handleDurationClick = (option) => {
    if (enabled) setCount({ ...count, duration: option });
  };
  if (type == "TimeButtons") {
    return (
      <>
        {options.map((option) => (
          <div
            key={option}
            className={
              selectedOption === option && enabled
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
              selectedOption === option[1] && enabled
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
        {options.map((option, index) => (
          <div
            key={option}
            className={
              selectedOption === option && enabled
                ? styles.duration_button_selected
                : styles.duration_button
            }
            onClick={() => {
              handleOptionClick(option);
              handleDurationClick(index + 1);
            }}
          >
            {option}
          </div>
        ))}
      </>
    );
  }
};

export default ButtonsGroup;
