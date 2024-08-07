import React, { useState, useRef } from "react";
import styles from "./ImageUpload.module.css";
import { IoMdClose } from "react-icons/io";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";

const LoadingImg = () => {
  return (
    <div
      role="status"
      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
    >
      <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const ImageUpload = () => {
  const { setNextStatus, playlistData, setPlaylistData } = usePlaylistContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormKey(formKey + 1);
      setUploading(true);
      setNextStatus(false);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "imageupload");
      formData.append("folder", "playlistThumbnail");

      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setPlaylistData((prevData) => ({
            ...prevData,
            cloudinaryPublicId: data.public_id,
            thumbnail: data.secure_url,
          }));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setUploading(false);
          if (!uploading && playlistData.title.length > 0) {
            setNextStatus(true);
          }
        });
    }
    e.target.value = null;
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPlaylistData((prevData) => ({
      ...prevData,
      cloudinaryPublicId: null,
      thumbnail: null,
    }));
    setFormKey(formKey + 1);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <>
      <div className={styles["card"]}>
        {uploading ? (
          <div className={styles["headTitle"]}>
            <span className={styles["selectedFileName"]}>Uploading...</span>
          </div>
        ) : (
          <div className={styles["headTitle"]}>
            {selectedFile ? (
              <>
                <span className={styles["selectedFileName"]}>
                  {selectedFile.name}
                </span>
                <button
                  className={styles["removeFileBtn"]}
                  onClick={handleRemoveFile}
                >
                  <div className={styles["removeIcon"]}>
                    <IoMdClose />
                  </div>
                </button>
              </>
            ) : playlistData.thumbnail ? (
              <>
                <span className={styles["selectedFileName"]}>
                  {/* needs to be updated, on back button click, the name changes */}
                  {playlistData.cloudinaryPublicId}
                </span>
                <button
                  className={styles["removeFileBtn"]}
                  onClick={handleRemoveFile}
                >
                  <div className={styles["removeIcon"]}>
                    <IoMdClose />
                  </div>
                </button>
              </>
            ) : (
              <span className={styles["selectedFileName"]}>
                No file selected
              </span>
            )}
          </div>
        )}
        <div className={styles["drop_box"]}>
          {uploading ? (
            <LoadingImg />
          ) : (
            <>
              {playlistData.thumbnail ? (
                <div className={styles["img_box"]}>
                  <img
                    className={styles["Uplodedimg"]}
                    src={playlistData.thumbnail}
                    alt="playlist thumbnail"
                  />
                </div>
              ) : (
                <>
                  <header>
                    <h4>Select Thumbnail</h4>
                  </header>
                  <p>Supported Image Formats: JPG, PNG, JPEG</p>
                  <button
                    className={styles["btn"]}
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.click();
                      }
                    }}
                  >
                    Choose Image
                  </button>
                </>
              )}
            </>
          )}
          <input
            type="file"
            hidden
            accept=".jpg,.jpeg,.png,.gif"
            id={styles["fileID"]}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
