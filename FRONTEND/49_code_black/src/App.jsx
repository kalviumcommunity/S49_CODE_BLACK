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




// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import './App.css';
// import AddForm from "./Components/AddForm";

// const App = () => {
//   const [places, setPlaces] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/getCoders");
//       setPlaces(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleEntityAdded = () => {
//     fetchData(); 
//   };


//   return (

    
//     <div className = "Coders-Place">
//       <AddForm onEntityAdded={handleEntityAdded} fetchData={fetchData} />
//       {places.length > 0 ? (
//         places.map((place, index) => (
//           <div key = {index}>
//             <h2>Name: {place.names}</h2>
//             <p>Founder: {place.founder}</p>
//             <p>Year of Establishment: {place.yearOfEstablishment}</p>
//             <p>Difficulty Level: {place.difficultylevel}</p>
//             <p>Description: {place.description}</p>
//             <p>Compiler Link: {place.onlinecompilerlink}</p>
//           </div>
//         ))
//       ) : (
//         <p>No Data Available</p>
//       )}
//     </div>
//   );
// };

// export default App;


import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import LanguageList from "./Components/LanguageList";
import Profile from "./Components/Profile";
import About from "./Components/About"; 
import Login from "./Components/Login"; 
import "./App.css";

const App = () => {


  const [places, setPlaces] = useState([]);
  const [username, setUsername] = useState("");


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


  const handleLogin = (username) => {
    setUsername(username);
  };

  const handleLogout = () => {
    axios.post("http://localhost:3000/api/logout")
      .then(() => {
        setUsername("");
      })
      .catch((error) => console.error("Error in Logging out:", error));
  };

  return (

    <div className = "App-Coder">
    <Router>
    <Navbar username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-Languages" element={<LanguageList />} />
        {/* <Route path="/profile" element={<Profile onEntityAdded={handleEntityAdded} fetchData={fetchData}/>} /> */}
        <Route
            path="/profile"
            element={
              username ? (
                <Profile
                  onEntityAdded={handleEntityAdded}
                  fetchData={fetchData}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
    </div>
    );

};

export default App;