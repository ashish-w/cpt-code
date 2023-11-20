"use client"
import React, { useEffect, useState } from "react"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid"

const NcInputNumber = ({
  defaultValue = 0,
  min = 0,
  max,
  onChange,
  label,
  desc,
  setCount,
  count
}) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleClickDecrement = () => {
    if (min >= value) return
    setValue(state => {
      if(label == "Adults"){
        setCount({ ...count, adults: state - 1 })
      }
      else if(label == "Children"){
        setCount({ ...count, kids: state - 1 })
      }
      return state - 1
    })
    onChange && onChange(value - 1)
  }
  const handleClickIncrement = () => {
    if (max && max <= value) return
    setValue(state => {
      if(label == "Adults"){
        setCount({ ...count, adults: state + 1 })
      }
      else if(label == "Children"){
        setCount({ ...count, kids: state + 1 })
      }
      return state + 1
    })
    onChange && onChange(value + 1)
  }

  const renderLabel = () => {
    return (
      <div>
        <div className="d-flex font-weight-bold" style={{ justifyContent: "left", fontSize: "15px" }}>
          {label}
        </div>
        {desc && (
          <div className="d-flex" style={{ justifyContent: "left", fontSize: "12px" }}>
            {desc}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="row d-flex mt-3 mb-3 pr-2 pl-2"
      data-nc-id="NcInputNumber"
      style={{ justifyContent: "space-between" }}
    >
      <div className="col-7" >
        {label && renderLabel()}
      </div>

      <div
        className={`d-flex col-5`}
        style={{ alignItems: "center" }}
      >
        <div className="row">
          <div className="col-4 p-0">
            <button className="d-flex"
              style={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                background: "white",
                padding: "5px",
                alignItems: "center"
              }}
              type="button"
              onClick={handleClickDecrement}
              disabled={min >= value}
            >
              <MinusIcon />
            </button>
          </div>
          <div className="col-4 d-flex pl-3 pr-3" style={{
            alignItems: "center",
            justifyContent: "center"
          }}>{value}</div>
          <div className="col-4 p-0">
            <button className="d-flex"
              style={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                background: "white",
                padding: "5px",
                alignItems: "center"
              }}
              type="button"
              onClick={handleClickIncrement}
              disabled={max ? max <= value : false}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default NcInputNumber
