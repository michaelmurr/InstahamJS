import "../css/posts.css";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import DayJS from "react-dayjs";
import heart_icon from "../icons/heart_icon.png";
import heart_icon_filled from "../icons/heart_icon_filled.png";
import useToken from "./useToken";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(true);
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldUpdatePosts)
      if (props.posts.length !== 0) {
        setPosts(props.posts);
        setShouldUpdatePosts(false);
      }
  });

  return (
    <div className="fetchedPosts">
      {posts.map((post) => (
        <div className="postContainer" key={post._id}>
          <h1 className="username">@{post.username}</h1>
          <div className="postDate">
            <DayJS format="DD. MMMM YYYY, H:mm">{post.uploadDate}</DayJS>
          </div>
          <p>{post.content}</p>
          <div
            onClick={() => {
              if(token){
                setPosts(props.handleLike(post, posts));
              }else{
                navigate("/login");
              }
            }}
          >
            {post.isLiked && <img src={heart_icon_filled} alt="" />}
            {!post.isLiked && <img src={heart_icon} alt="" />}
            {post.likes}
          </div>
        </div>
      ))}
    </div>
  );
}

Posts.defaultProps = {
  posts: [],
};
