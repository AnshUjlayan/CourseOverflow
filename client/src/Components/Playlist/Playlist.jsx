import React from "react";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import styles from "./Playlist.module.css";

const Playlist = ({
  playlistData,
  videoList,
  currVideoIdx,
  updateIdx,
  totalWatched,
  updateWatched,
  videoContainerHeight,
}) => {
  return (
    <div className={styles.playlist}>
      <PlaylistHeader
        title={playlistData.title}
        author={playlistData.authorName}
        duration={playlistData.duration}
        bundleSize={videoList.length}
        watchCount={totalWatched}
      />
      <div
        className={styles["playlist-items"]}
        style={{ height: `${videoContainerHeight - 88}px` }}
      >
        {videoList.map((item, index) => {
          return (
            <PlaylistCard
              updateIdx={updateIdx}
              currVideo={currVideoIdx === index}
              index={index}
              author={item.author}
              key={item.id}
              topic={item.title}
              thumbnail={item.thumbnail}
              duration={item.duration}
              desc={item.description}
              isWatched={item.isWatched}
              updateWatched={updateWatched}
              playlistItem={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
