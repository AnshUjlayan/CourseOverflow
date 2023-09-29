import React from "react";
import Feed from "../Feed/Feed";
import styles from "./HomeFeed.module.css";

const HomeFeed = (props) => {
  return (
    <div className={styles.homeFeedContainer}>
      <Feed category="Popular" data={props.data} />
      <hr className={styles.hrLine} />
      <Feed category="Popular" data={props.data} />
      <hr className={`${styles.hrLine}`} />
      <Feed category="Popular" data={props.data} isDark={props.isDark} />
      <hr className={`${styles.hrLine}`} />
    </div>
  );
};

export default HomeFeed;
