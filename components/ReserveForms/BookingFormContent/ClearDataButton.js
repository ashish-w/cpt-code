"use client"
import { XMarkIcon } from "@heroicons/react/24/outline"
import React from "react"

const ClearDataButton = ({ onClick }) => {
  return (
    <span
      onClick={() => onClick && onClick()}
    >
      <XMarkIcon className="p-1" style={{ width: "20px", backgroundColor: "#e1e1e1", borderRadius: "50%" }}  />
    </span>
  )
}

export default ClearDataButton
