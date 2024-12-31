import React from "react"
import { IconContext } from "react-icons"
import { IoMdCheckmarkCircleOutline, IoMdClose } from "react-icons/io"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setSuccessAlert } from "../redux/slices/successAlertSlice"
import "../css/success-alert.css"

const SuccessAlert = () => {
  const dispatch = useAppDispatch()
  const { text } = useAppSelector((state) => state.successAlert)

  const onClose = () => {
    dispatch(setSuccessAlert({ show: false, text: "" }))
  }

  return (
    <div className="success-alert">
      <div>
        <button className="close-success-alert" onClick={onClose}>
          <IconContext.Provider value={{ size: "18px", color: "#32992fc9" }}>
            <IoMdClose />
          </IconContext.Provider>
        </button>
        <IconContext.Provider value={{ size: "26px" }}>
          <IoMdCheckmarkCircleOutline />
        </IconContext.Provider>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default SuccessAlert
