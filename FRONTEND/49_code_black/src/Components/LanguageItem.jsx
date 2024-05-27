import React, { useState } from "react";
import UpdateForm from "./UpdateForm";
import DeleteButton from "./DeleteButton";
import "../css/LanguageItem.css";

const LanguageItem = ({ place, fetchData }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleEditClick = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };


  return (
    <div className = "Language-Item">
      <h2>Name: {place.names}</h2>
      <p>Founder: {place.founder}</p>
      <p>Year of Establishment: {place.yearOfEstablishment}</p>
      <p>Difficulty Level: {place.difficultylevel}</p>
      <p>Compiler Link: {place.onlinecompilerlink}</p>
      <button onClick={handleEditClick}>Edit</button>

      {isPopupOpen && (
        <div className = "Popup">
          <UpdateForm
            entityId={place._id}
            onEntityUpdated={() => {
              fetchData();
              handlePopupClose();
            }}
            fetchData={fetchData}
          />
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}

      <DeleteButton entityId={place._id} onEntityDeleted={fetchData} fetchData={fetchData} />
    </div>
  );
};

export default LanguageItem;