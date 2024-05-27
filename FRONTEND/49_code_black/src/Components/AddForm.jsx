import React, { useState } from "react";
import axios from "axios";
import "../css/AddForm.css";

const AddForm = ({ onEntityAdded, fetchData }) => {
  const [names, setNames] = useState("");
  const [founder, setFounder] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [difficultylevel, setDifficultylevel] = useState("");
  const [onlinecompilerlink, setOnlinecompilerlink] = useState("");
  const [rating, setRating] = useState(""); 
  const [review, setReview] = useState(""); 
  const [image, setImage] = useState("");

  const handleAddEntity = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/addEntity", {
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
        console.log(response.data);
        onEntityAdded();
        fetchData(); 
      } else {
        console.error("Failed to Add an Entity");
      }
    } catch (error) {
      console.error("Error Adding Entity:", error);
    }
  };

  return (

    <div className = "Add-Form">

      <label>Language:</label>
      <input type="text" value={names} onChange={(e) => setNames(e.target.value)} />

      <label>Founder:</label>
      <input
        type="text"
        value={founder}
        onChange={(e) => setFounder(e.target.value)}
      />

      <label>Year of Establishment:</label>
      <input
        type="text"
        value={yearOfEstablishment}
        onChange={(e) => setYearOfEstablishment(e.target.value)}
      />

      <label>Difficulty-Level:</label>
      <input
        type="text"
        value={difficultylevel}
        onChange={(e) => setDifficultylevel(e.target.value)}
      />

      <label>Compiler Link:</label>
      <input
        type="text"
        value={onlinecompilerlink}
        onChange={(e) => setOnlinecompilerlink(e.target.value)}
      />

      <label>Rating:</label>
      <input
        type="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <label>Review:</label>
      <input
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <label>Image(address):</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button id="Add-Ent" onClick={handleAddEntity}>Add Entity</button>
    </div>
  );
};

export default AddForm;