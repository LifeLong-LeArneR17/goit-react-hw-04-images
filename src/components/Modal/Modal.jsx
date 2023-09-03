import React from "react"
import "./Modal.css"

export const Modal = ({modalImg, imageAlt, closeModal}) => {
  return(<div className="Overlay"  onClick={() => closeModal('', '')}>
  <div className="Modal" >
    <img src={modalImg} alt= {imageAlt} />
  </div>
</div>)
}