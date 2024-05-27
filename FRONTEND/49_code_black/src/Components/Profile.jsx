import React, { useEffect, useState } from "react";
import AddForm from "./AddForm";
import "../css/Profile.css";
import axios from "axios";

const Profile = () => {
  const [places, setPlaces] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/getCoders")
      .then((response) => {
        setPlaces(response.data.data);
      })
      .catch((error) => console.error("Error in Fetching Data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEntityAdded = () => {
    fetchData();
  };

  return (
    <div>
      <div className = "left-pane">
        <AddForm onEntityAdded={handleEntityAdded} fetchData={fetchData}/>
      </div>
    </div>
  );
};

export default Profile;