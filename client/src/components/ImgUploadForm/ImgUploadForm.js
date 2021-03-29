import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageUploader() {
  const [imageUrl, setImageUrl] = useState("uploads/default.jpeg");

  const setFile = (e) => {
    if (e.target.files[0]) {
      const img = new FormData();
      img.append("profile", e.target.files[0]);
      axios
        .post("/api/users/uploadfiles", img, {
          header: { "content-type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
          setImageUrl(res.data.filePath);
          window.localStorage.setItem("userImg", res.data.filePath);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    const currentUserImg = localStorage.getItem("userImg");
    setImageUrl(currentUserImg);
  });

  return (
    <>
      <form encType="multipart/form-data" style={{ display: "inline" }}>
        <input
          type="image"
          src={`http://localhost:4000/${imageUrl}`}
          value=" "
          style={{ width: "80px", height: "80px", border: "2px solid" }}
        />
        <input
          type="file"
          accept="image/*"
          name="profile"
          style={{ fontSize: "10px" }}
          onChange={(e) => setFile(e)}
        />
      </form>
    </>
  );
}

export default ImageUploader;