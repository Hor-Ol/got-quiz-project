import React from "react";
import styles from "./Logo.module.css";

const Logo = () => {
  // -----> JSX <-----
  return (
    <img
      className={styles.logo}
      src={require("./../imgs/got-transparent-logo.png")}
      alt="game of thrones logo"
    />
  );
};

export default Logo;
