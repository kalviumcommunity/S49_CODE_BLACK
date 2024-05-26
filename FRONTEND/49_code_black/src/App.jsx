// import './App.css'

// function App() {
  
//   return (
//     <>
//       <h1>Hello World</h1>
//     </>
//   )
// }

// export default App

import React from 'react';
import { CodersPlace, dummyCodersPlaces } from './Components/FirstPage';
import "./App.css"

const App = () => {
  return (

    <div className = "app-coder">
      {dummyCodersPlaces.map((place, index) => (
        <CodersPlace key={index} {...place} />
      ))}
    </div>
  );
};

export default App;