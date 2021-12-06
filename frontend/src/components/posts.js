import "../css/posts.css";
import React from 'react';

function Posts(props) {

    return (
        <div className="fetchedPosts">
            {props.posts.map(post => (
                <div key={post.ownerID} id={post.ownerID} className="postContainer">
                    <div>{post.filename}</div>
                    <div>{post.uploadDate}</div>
                    <div>Likes: {post.likes}</div>
                </div>
            ))}
        </div>
    );
}

export default Posts;