import { useState, useEffect } from "react";
import styles from "./Search.module.css";
import SearchData from "../../Data/CourseData"; // Import the SearchData array
import CardImage from "../../Components/Card/CardImage";
const Search = () => {
  const [sliceLength, setSliceLength] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Adjust the slice length based on the screen width
      if (screenWidth > 720) {
        const maxLength = 250;
        const minWidth = 540; // Define your minimum screen width here
        const maxWidth = 1920; // Define your maximum screen width here
        const normalizedWidth = Math.min(
          Math.max(screenWidth, minWidth),
          maxWidth
        );
        let adjustments = 0;

        if (screenWidth < 1250) adjustments = -50;
        else {
          const percentage =
            (normalizedWidth - minWidth) / (maxWidth - minWidth);
          const newSliceLength = Math.round(50 + percentage * (maxLength - 50));
          setSliceLength(newSliceLength + adjustments);
        }
      }
      window.addEventListener("resize", handleResize);
      handleResize(); // Call it initially to set the initial value based on the screen width
    };

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      {SearchData.map((item) => {
        const info = `-${item.author} | ${item.views} (views) | ${item.duration} (duration)`; // Define info inside the map function

        return (
          <div key={item.id} className={styles.searchContainer}>
            <div className={styles.Thumbnail}>
              <CardImage
                image={item.image}
                likes={item.likes}
                dislikes={item.dislikes}
                isLiked={item.isLiked}
                isDisliked={item.isDisliked}
                isBookmarked={item.isBookmarked}
                watchPercentage={item.watchPercentage}
              />
            </div>

            <div className={styles.contentContainer}>
              <h1 className={styles.title}>
                {item.title.length > sliceLength - 50
                  ? item.title.slice(0, sliceLength - 50) + "..."
                  : item.title}
              </h1>
              <p className={styles.author}>
                {info.length > sliceLength
                  ? `${info.slice(0, sliceLength)}...`
                  : info}
              </p>
              <p className={styles.desc}>
                {item.desc.length > sliceLength
                  ? `${item.desc.slice(0, sliceLength + 14)}...`
                  : item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Search;
