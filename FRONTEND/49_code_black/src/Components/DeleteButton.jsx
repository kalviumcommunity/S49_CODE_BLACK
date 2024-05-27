import React from "react";
import axios from "axios";

const DeleteButton = ({ entityId, onEntityDeleted, fetchData }) => {
  const handleDeleteEntity = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/deleteEntity/${entityId}`);

      if (response.data.success) {
        onEntityDeleted();
        fetchData();
      } else {
        console.error("Failed to Delete an Entity");
      }
    } catch (error) {
      console.error("Error in Deleting an Entity:", error);
    }
  };

  return (
    <button onClick={handleDeleteEntity} className = "Delete-Button">Delete Entity</button>
  );
};

export default DeleteButton;