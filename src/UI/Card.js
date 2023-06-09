import React from "react";
import styles from "./Card.module.css";

const Card = (props) => {
  // -----> JSX <-----
  return <div className={styles.card}>{props.children}</div>;
};

export default Card;
