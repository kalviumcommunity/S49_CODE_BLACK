import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import DeleteButton from "./DeleteButton";
import "../css/LanguageList.css";

const LanguageList = () => {
  const [places, setPlaces] = useState([]);
  const [selectedEntityId, setSelectedEntityId] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/getCoders")
      .then((response) => {
        setPlaces(response.data.data);
      })
      .catch((error) => console.error("Error Fetching Data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEntityUpdated = () => {
    fetchData();
    setSelectedEntityId(null);
  };

  const handleEditClick = (entityId) => {
    setSelectedEntityId(entityId);
  };

  const handleDeleteClick = (entityId) => {
    setSelectedEntityId(entityId);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className = "App-Container">
      <div className = "right-pane">
        {places.length > 0 ? (
          places.map((place, index) => (
            <div key={index} className = "Language-Item-container">
              <div className = "Content">
                <h2>Name: {place.names}</h2>
                <p>Founder: {place.founder}</p>
                <p>Year of Establishment : {place.yearOfEstablishment}</p>
                <p>Difficulty-Level: {place.difficultylevel}</p>

                <p>Compiler Link: {place.onlinecompilerlink}</p>
                <p>Rating: {place.rating}</p>
                <p id = "review">Review: {place.review}</p>

                <div className = "edit-delete-buttons">
                  <button id = "edit" onClick={() => handleEditClick(place._id)}>
                    Edit
                  </button>
                  <button onClick={() => handleMenuClick(place.menu)}>
                  Menu
                </button>
                </div>
              </div>

              <img id = "image-container" src = {place.image} alt = "" />

              {selectedEntityId === place._id && (
                <div className = "popup">
                  <UpdateForm
                    entityId={place._id}
                    onEntityUpdated={handleEntityUpdated}
                    fetchData={fetchData}
                  />
                  <DeleteButton
                    entityId={place._id}
                    onEntityDeleted={handleEntityUpdated}
                    fetchData={fetchData}
                  />
                  <button
                    className = "cancel-btn"
                    onClick={() => setSelectedEntityId(null)}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {selectedMenu.length > 0 && (
                <div className = "menu-popup">
                  <ul>
                    {selectedMenu.map((menuItem, i) => (
                      <li key={i}>{menuItem}</li>
                    ))}
                  </ul>
                  <button
                    className = "Close-menu-btn"
                    onClick={() => setSelectedMenu([])}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default LanguageList;