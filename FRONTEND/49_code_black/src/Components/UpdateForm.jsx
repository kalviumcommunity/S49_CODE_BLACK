import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/UpdateForm.css';

const UpdateForm = ({ entityId, onEntityUpdated, fetchData }) => {
  const [names, setNames] = useState("");
  const [founder, setFounder] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [difficultylevel, setDifficultylevel] = useState("");
  const [onlinecompilerlink, setOnlinecompilerlink] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getEntity/${entityId}`)
      .then((response) => {
        console.log("Response from entity details request:", response.data);
        const entityData = response.data.data;
        setNames(entityData.names);
        setFounder(entityData.founder);
        setYearOfEstablishment(entityData.yearOfEstablishment);
        setDifficultylevel(entityData.difficultylevel);
        setOnlinecompilerlink(entityData.onlinecompilerlink);
        setRating(entityData.rating);
        setReview(entityData.review);
        setImage(entityData.image);
      })
      .catch((error) => console.error("Error Fetching an Entity Details:", error));
  }, [entityId]);

  const handleUpdateEntity = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/updateEntity/${entityId}`, {
        names: names,
        founder: founder,
        yearOfEstablishment: yearOfEstablishment,
        difficultylevel: difficultylevel,
        onlinecompilerlink: onlinecompilerlink,
        rating: rating,
        review: review,
        image: image,
      });

      if (response.data.success) {
        setNames("");
        setFounder("");
        setYearOfEstablishment("");
        setDifficultylevel("");
        setOnlinecompilerlink("");
        setRating("");
        setReview("");
        setImage("");
        onEntityUpdated();
        fetchData();
      } else {
        console.error("Failed to Update an Entity");
      }
    } catch (error) {
      console.error("Error Updating an Entity:", error);
    }
  };

  return (
    <div className = "Update-Form">
      <h2>Update Entity</h2>
      <label>Name:</label>
      <input type="text" value={names} onChange={(e) => setNames(e.target.value)} />

      <label>Founder:</label>
      <input type="text" value={founder} onChange={(e) => setFounder(e.target.value)} />

      <label>Year of Establishment:</label>
      <input type="text" value={yearOfEstablishment} onChange={(e) => setYearOfEstablishment(e.target.value)} />

      <label>Difficulty-Level</label>
      <input type="text" value={difficultylevel} onChange={(e) => setDifficultylevel(e.target.value)} />

      <label>Compiler Link:</label>
      <input type="text" value={onlinecompilerlink} onChange={(e) => setOnlinecompilerlink(e.target.value)} />

      <label>Rating:</label>
      <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />

      <label>Review:</label>
      <input type="text" value={review} onChange={(e) => setReview(e.target.value)} />

      {/* <label>Image:</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} /> */}

      <button onClick={handleUpdateEntity}>Update Entity</button>
    </div>
  );
};

export default UpdateForm;