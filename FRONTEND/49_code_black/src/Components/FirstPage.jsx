import React from 'react';
import './FirstPage.css';


const CodersPlace = ({ names, founder, yearOfEstablishment, difficultylevel, onlinecompilerlink, image }) => (
  <div className = "Coders-Place">
    <h2>{names}</h2>
    <p>Founder: {founder}</p>
    <p>Year of Establishment: {yearOfEstablishment}</p>
    <p>Difficulty Level: {difficultylevel}</p>
    <p>Compiler Link: {onlinecompilerlink}</p>
    <div><img src = {image} alt = "Identity"/></div>
  </div>
);

const dummyCodersPlaces = [
  {
    names: "C++",
    founder: "Bjarne Stroustrup",
    yearOfEstablishment: "1979",
    difficultylevel: "Moderate",
    onlinecompilerlink: "https://www.programiz.com/cpp-programming/online-compiler/",
    image: "https://w0.peakpx.com/wallpaper/668/259/HD-wallpaper-c-logo-white-silk-texture-c-emblem-programming-language-c-silk-background.jpg"
  },

  {
    names: "Python",
    founder: "Guido van Rossum",
    yearOfEstablishment: "1991",
    difficultylevel: "Easy",
    onlinecompilerlink: "https://www.programiz.com/python-programming/online-compiler/",
    image: "https://w0.peakpx.com/wallpaper/142/758/HD-wallpaper-python-logo-white-silk-texture-python-emblem-programming-language-python-silk-background.jpg"
  }
];

export { CodersPlace, dummyCodersPlaces };