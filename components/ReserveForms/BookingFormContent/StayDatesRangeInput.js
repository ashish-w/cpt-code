"use client"
import React, { Fragment, useState } from "react"
import { Popover, Transition } from "@headlessui/react"
import { CalendarIcon } from "@heroicons/react/24/outline"
import DatePickerCustomHeaderTwoMonth from "./DatePickerCustomHeaderTwoMonth"
import DatePickerCustomDay from "./DatePickerCustomDay"
import ClearDataButton from "./ClearDataButton"
import DatePicker from "react-datepicker"

const StayDatesRangeInput = (props) => {

  const { count, setCount } = props;

  const [startDate, setStartDate] = useState(new Date())
  // const [endDate, setEndDate] = useState(new Date())

  const onChangeDate = dates => {
    const start = dates
    setStartDate(start)
    setCount({ ...count, tourDate: start });
  }

  // const onChangeDate = dates => {
  //   const [start, end] = dates
  //   setStartDate(start)
  //   setEndDate(end)
  // }

  const renderInput = () => {
    return (
      <>
        <div className="row">
          <div className="d-flex col-3">
            <CalendarIcon style={{ width: "10rem",
            // color: "#e5e7eb"
            color: "#88bc2c"
            }} />
          </div>
          <div className="col-9">
            <div className="row">
              <div className="d-flex col-12 pl-0 font-weight-bold">
                {startDate?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit"
                }) || "Add dates"}
                {/* {endDate
                  ? " - " +
                  endDate?.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit"
                  })
                  : ""} */}
              </div>
            </div>
            <div className="row">
              <div className="d-flex pl-0 text-muted col-12" style={{ fontSize: "0.7rem" }}>
                {"Check in"}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className="p-1" style={{ backgroundColor: "white", border: "none", outline: "none" }}
          >
            <div className="row">
              <div className={`${open ? "col-10" : "col-12"}`}>
                {renderInput()}
              </div>
              {startDate && open && (
                <div className="d-flex align-items-center" >
                  <ClearDataButton onClick={() => onChangeDate(null)} />
                </div>
              )}
            </div>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="">
              <div className="">
                <DatePicker
                  selected={startDate}
                  onChange={onChangeDate}
                  startDate={startDate}
                  // endDate={endDate}
                  // selectsRange
                  monthsShown={1}
                  showPopperArrow={false}
                  inline
                  showTimeSelect
                  renderCustomHeader={p => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default StayDatesRangeInput
