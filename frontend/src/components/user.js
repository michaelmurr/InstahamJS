import React, { useEffect, useState } from "react";
import DayJS from "react-dayjs";
import { useParams } from "react-router-dom";
import Posts from "./posts";

export default function User(props) {
  const { id } = useParams();
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await fetch(`${props.api}/api/users/${id}`);
    const json = await res.json();
    setUserData(json);
  };

  return (
    <>
      {userData === undefined && <h1>Loading...</h1>}
      {userData !== undefined && (
        <div>
          <div className="profileWrapper">
            <h2 className="username">@{userData.username}</h2>
            <p className="joinDate">
              joined on{" "}
              <DayJS format="DD. MMMM YYYY, H:mm">{userData.date_joined}</DayJS>
            </p>
          </div>
          <hr />
          <Posts posts={userData.posts} uid={userData._id} api={props.api} />
        </div>
      )}
    </>
  );
}
