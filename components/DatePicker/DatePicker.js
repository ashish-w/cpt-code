import React from "react";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const DatePicker = ({ count }) => {
  const setTourDate = (newValue) => {
    count.tourDate.setDate(newValue.$d.getDate());
    count.tourDate.setMonth(newValue.$d.getMonth());
    count.tourDate.setYear(newValue.$d.getYear());
  };

  return (
    <div
      className=""
      style={{
        background: "white",
        marginBottom: "1rem",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            height: "300px",
            width: "250px",
          }}
          onChange={(newValue) => setTourDate(newValue)}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
