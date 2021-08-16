import React from "react";

const PostBody = ({ body, postPicture }) => {
  return (
    <>
      <div
        style={{ textAlign: "left", marginBottom: "10px", color: "#5E5E5E" }}
        className="my-4"
      >
        {body}
      </div>
      {postPicture && (
        <div>
          <img
            src={postPicture}
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          />
        </div>
      )}
    </>
  );
};

export default PostBody;
