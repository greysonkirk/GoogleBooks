import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function FavBtn(props) {
  return (
    <span className="success-btn" {...props} role="button" tabIndex="0">
      ✔ add to favs
    </span>
  );
}

export default FavBtn;
