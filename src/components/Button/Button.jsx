import React from "react"
import "./Button.css"
export const Button = ( {onChangePage, currentPage, totalHits}) => {
    return(
      <button className="Button" onClick={onChangePage} disabled={currentPage === totalHits}>Load more</button> 

    )
}