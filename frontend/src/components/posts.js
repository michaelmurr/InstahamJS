import "../css/posts.css";
import React from "react";
import DayJS from "react-dayjs";
import heart_icon from "../heart_icon.png";

export default function Posts(props) {
  return (
    <div className="fetchedPosts">
      {props.posts.map((post) => (
        <div key={post.ownerID} id={post.ownerID} className="postContainer">
          <h1 className="username">@{post.username}</h1>
          <div className="postDate">
            <DayJS format="DD. MMMM YYYY, H:mm">{post.uploadDate}</DayJS>
          </div>
          <p>{post.content}</p>
          <div>
            <img src={heart_icon} alt="" />
            {post.likes}
          </div>
        </div>
      ))}
    </div>
  );
}