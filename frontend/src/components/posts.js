import "../css/posts.css";
import React, { useEffect, useState } from "react";
import DayJS from "react-dayjs";
import heart_icon from "../heart_icon.png";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(true);

  useEffect(() => {
    if (shouldUpdatePosts)
      if (props.posts.length !== 0) {
        setPosts(props.posts);
        setShouldUpdatePosts(false);
      }
  });

  const handleLike = (post) => {
    // 1. Make a shallow copy of the items
    let items = [...posts];
    let indexToMutate;

    for (let i = 0; i < posts.length; i++) {
      if (posts[i]._id === post._id) {
        indexToMutate = i;
        break;
      }
    }
    //Make a shallow copy of the item you want to mutate
    let item = { ...items[indexToMutate] };

    //Replace the property you're intested in
    item.likes = item.likes + 1;

    //Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[indexToMutate] = item;

    //Set the state to our new copy
    setPosts(items);
  };

  return (
    <div className="fetchedPosts">
      {posts.map((post) => (
        <div className="postContainer" key={post._id}>
          {(post.isLiked = false)}
          <h1 className="username">@{post.username}</h1>
          <div className="postDate">
            <DayJS format="DD. MMMM YYYY, H:mm">{post.uploadDate}</DayJS>
          </div>
          <p>{post.content}</p>
          <div onClick={() => handleLike(post)}>
            <img src={heart_icon} alt="" />
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
