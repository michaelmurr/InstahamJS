import "../css/posts.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DayJS from "react-dayjs";
import heart_icon from "../icons/heart_icon.png";
import heart_icon_filled from "../icons/heart_icon_filled.png";
import useToken from "./useToken";
import { DropdownButton, Dropdown } from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(true);
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldUpdatePosts)
      if (props.posts.length !== 0) {
        setPosts(props.posts);
        setShouldUpdatePosts(false);
      }
  }, [shouldUpdatePosts, props.posts]);

  function handleLike(likedPost, param_posts) {
    let items = [...param_posts];
    for (let i = 0; i < items.length; i++) {
      if (param_posts[i]._id === likedPost._id) {
        let item = { ...items[i] };

        if (item.isLiked) {
          item.likes--;
          item.isLiked = false;

          fetch(`${props.api}/api/remove_like/${item._id}`, {
            method: "PATCH",
            headers: {
              auth: token,
            },
          });
        } else if (!item.isLiked || item.isLiked == null) {
          item.likes++;
          item.isLiked = true;

          fetch(`${props.api}/api/like/${item._id}`, {
            method: "PATCH",
            headers: {
              auth: token,
            },
          });
        }
        items[i] = item;
        return items;
      }
    }
  }

  async function deletePost(clickedPostId) {
    fetch(`${props.api}/api/del_post/${clickedPostId}`, {
      method: "DELETE",
      headers: {
        auth: token,
      },
    });

    let updatedPosts = posts.filter((value, index, arr) => {
      return value._id !== clickedPostId;
    });
    setPosts(updatedPosts);
  }

  return (
    <div className="fetchedPosts">
      {posts.map((post) => (
        <div className="postContainer" key={post._id}>
          <Link to={`/users/${post.ownerID}`}>
            <h3 className="username">@{post.username}</h3>
          </Link>
          <div className="postDate">
            <DayJS format="DD. MMMM YYYY, H:mm">{post.uploadDate}</DayJS>
          </div>
          <p>{post.content}</p>
          <div
            onClick={() => {
              if (token) {
                setPosts(handleLike(post, posts));
              } else {
                navigate("/login");
              }
            }}
          >
            {post.isLiked && <img src={heart_icon_filled} alt="" />}
            {!post.isLiked && <img src={heart_icon} alt="" />}
            {post.likes}
          </div>
          {post.ownerID === props.uid && (
            <DropdownButton id="dropdown-basic-button" title="">
              <Dropdown.Item
                onClick={() => {
                  deletePost(post._id);
                }}
              >
                Delete
              </Dropdown.Item>
            </DropdownButton>
          )}
        </div>
      ))}
      <div className="spacer"></div>
    </div>
  );
}

Posts.defaultProps = {
  posts: [],
};
