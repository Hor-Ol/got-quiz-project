import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  // -----> JSX <-----
  return <div className={`${styles.button}`}>{props.children}</div>;
};

export default Button;
