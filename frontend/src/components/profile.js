import React, { useEffect, useState } from "react";
import useToken from "./useToken";
import Posts from "./posts";
import DayJS from "react-dayjs";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../css/profile.css";

export default function Profile(props) {
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const { token } = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const res = await fetch(`${props.api}/api/profile`, {
        headers: {
          auth: token,
        },
      });
      const json = await res.json();
      setUserData(json);
      setPosts(json.posts);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  async function deleteUser() {
    const res = await fetch(props.api + "/api/deleteAccount", {
      method: "delete",
      headers: {
        auth: token,
      },
    });
    if (res.status === 200) return logOut();
  }

  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      {!token && navigate("/login")}
      {isLoading && token && (
        <>
          <h1>Loading....</h1>
          <h1>This might take a minute or two</h1>
        </>
      )}
      {posts && userData && (
        <div>
          <div className="profileWrapper">
            <h1 className="heading">Your Profile</h1>
            <hr />
            <h2 className="username">@{userData.username}</h2>
            <p className="joinDate">
              joined on{" "}
              <DayJS format="DD. MMMM YYYY, H:mm">{userData.date_joined}</DayJS>
            </p>
            <Link to="/login">
              <Button onClick={logOut}>Log out</Button>
            </Link>
          </div>
          <DropdownButton
            id="dropdown-basic-button"
            title=""
            className="dropdown_profile"
          >
            <Dropdown.Item
              onClick={() => {
                deleteUser();
              }}
            >
              Delete Account
            </Dropdown.Item>
          </DropdownButton>
          <hr />
          <Posts posts={posts} uid={userData._id} api={props.api} />
        </div>
      )}
    </>
  );
}
