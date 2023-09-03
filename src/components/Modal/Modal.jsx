import React, { Component } from "react"
import "./Modal.css"

export const Modal = ({modalImg, imageAlt, openModal}) => {
  return(<div className="Overlay"  onClick={() => openModal('', '')}>
  <div className="Modal" >
    <img src={modalImg} alt= {imageAlt} />
  </div>
</div>)
}