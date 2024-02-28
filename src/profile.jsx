import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetch} from './api/fetch';

export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${userId}`)
      .then((response) => response.json())
      .then((userData) => setUser(userData))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{`${user.firstName} ${user.lastName}'s Profile`}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
