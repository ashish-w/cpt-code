"use client"
import React, { Fragment, useState } from "react"
import { Popover, Transition } from "@headlessui/react"
import NcInputNumber from "./NcInputNumber"
import { UserPlusIcon } from "@heroicons/react/24/outline"
import ClearDataButton from "./ClearDataButton"

const GuestsInput = (props) => {

  const { count, setCount } = props;

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1)
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(1)

  const handleChangeData = (value, type) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
    }
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value)
      newValue.guestAdults = value
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value)
      newValue.guestChildren = value
    }
  }

  const totalGuests =
    guestChildrenInputValue + guestAdultsInputValue

  return (
    <Popover>
      {({ open }) => (
        <>
          <div
            className={`flex-1 flex items-center focus:outline-none rounded-b-3xl`}
          >
            <Popover.Button
              className="p-1" style={{ backgroundColor: "white", border: "none", outline: "none" }}
            >
              <div className="row">
                <div className="d-flex col-3">
                  <UserPlusIcon style={{ width: "9rem", color: "#88bc2c" }} />

                </div>
                <div className="col-7">
                  <div className="row">
                    <div className="d-flex col-12 pl-0 font-weight-bold">
                      {totalGuests || ""} Guests
                    </div>
                  </div>
                  <div className="row">
                    <div className="d-flex pl-0 text-muted col-12" style={{ fontSize: "0.7rem" }}>
                      {totalGuests ? "Guests" : "Add guests"}
                    </div>
                  </div>
                </div>

                {!!totalGuests && open && (
                  <div className="d-flex align-items-center" >
                    <ClearDataButton
                      onClick={() => {
                        setGuestAdultsInputValue(0)
                        setGuestChildrenInputValue(0)
                      }}
                    />
                  </div>
                )}
              </div>
            </Popover.Button>
          </div>

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
              <NcInputNumber
                defaultValue={guestAdultsInputValue}
                onChange={value => handleChangeData(value, "guestAdults")}
                max={100}
                min={1}
                label="Adults"
                desc="Ages 13 or above"
                count={count}
                setCount={setCount}
              />
              <NcInputNumber
                defaultValue={guestChildrenInputValue}
                onChange={value => handleChangeData(value, "guestChildren")}
                max={100}
                label="Children"
                desc="Ages 0–12"
                count={count}
                setCount={setCount}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default GuestsInput
