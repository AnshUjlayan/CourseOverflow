import React from "react";
import styles from "./CourseOverflow.module.css";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const CourseOverflow = (props) => {
  return (
    <div className={styles.container}>
      {!props.isAboutPage ? (
        <FaBars onClick={props.toggleSidebar} className={styles.FaBars} />
      ) : (
        <></>
      )}
      <Link onClick={props.closeSidebar} className={styles.link} to={"/"}>
        <img
          src={process.env.PUBLIC_URL + "/slimyLogo.png"}
          alt="Course Overflow Logo"
          className={styles.logo}
        />
        <span className={styles.text}>CourseOverflow</span>
      </Link>
    </div>
  );
};

export default CourseOverflow;
