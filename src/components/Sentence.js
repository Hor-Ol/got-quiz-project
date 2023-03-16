import React from "react";
import styles from "./Sentence.module.css";

const Sentence = (props) => {
  // -----> JSX <-----
  return (
    <span
      className={styles.sentence}
      key={props.id}
    >{`"${props.sentence}"`}</span>
  );
};

export default Sentence;
