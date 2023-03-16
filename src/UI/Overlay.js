import React from "react";
import styles from "./Overlay.module.css";

const Overlay = (props) => {
  // -----> JSX <-----
  return <div className={styles.overlay}>{props.children}</div>;
};

export default Overlay;
