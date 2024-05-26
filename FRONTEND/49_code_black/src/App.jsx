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

const App = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getCoders") 
      .then((response) => {
        console.log("Response:", response.data.data);
        setPlaces(response.data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (

    <div className = "Coders-Place">
      {places.length > 0 ? (
        places.map((place, index) => (
          <div key = {index}>
            <h2>Name: {place.names}</h2>
            <p>Founder: {place.founder}</p>
            <p>Year of Establishment: {place.yearOfEstablishment}</p>
            <p>Difficulty Level: {place.difficultylevel}</p>
            <p>Description: {place.description}</p>
            <p>Compiler Link: {place.onlinecompilerlink}</p>
            <p>{}</p>
          </div>
        ))
      ) : (
        <p>No Data Available</p>
      )}
    </div>
  );
};

export default App;

