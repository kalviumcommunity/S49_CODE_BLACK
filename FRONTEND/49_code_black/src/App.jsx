// import './App.css'

// function App() {
  
//   return (
//     <>
//       <h1>Hello World</h1>
//     </>
//   )
// }

// export default App



// import React from 'react';
// import { CodersPlace, dummyCodersPlaces } from './Components/FirstPage';
// import "./App.css"

// const App = () => {
//   return (

//     <div className = "app-coder">
//       {dummyCodersPlaces.map((place, index) => (
//         <CodersPlace key={index} {...place} />
//       ))}
//     </div>
//   );
// };

// export default App;




import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import AddForm from "./Components/AddForm";

const App = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getCoders");
      setPlaces(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEntityAdded = () => {
    fetchData(); 
  };


  return (

    
    <div className = "Coders-Place">
      <AddForm onEntityAdded={handleEntityAdded} fetchData={fetchData} />
      {places.length > 0 ? (
        places.map((place, index) => (
          <div key = {index}>
            <h2>Name: {place.names}</h2>
            <p>Founder: {place.founder}</p>
            <p>Year of Establishment: {place.yearOfEstablishment}</p>
            <p>Difficulty Level: {place.difficultylevel}</p>
            <p>Description: {place.description}</p>
            <p>Compiler Link: {place.onlinecompilerlink}</p>
          </div>
        ))
      ) : (
        <p>No Data Available</p>
      )}
    </div>
  );
};

export default App;

