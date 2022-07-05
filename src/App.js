import React, { useEffect, useState } from "react";
import Navbar from './components/Navbar';
import Characters from './components/Characters';
import Pagination from "./components/Pagination";

function App() {

  const [characters, setCharacter] = useState([]);

  const [info, setInfo] = useState({});

  //implementacion de WebApi de Rick & Morty
  const initialurl = "https://rickandmortyapi.com/api/character";

  //promesas y respuesta en la consola del navegador
  const fectCharacters = (url) => {
    fetch(url)
      .then(Response => Response.json())
      .then(data => {
        setCharacter(data.results);
        setInfo(data.info);
      })
      .catch(error => console.log(error))
  };

  //visualizar anteriores personajes
  const onPrevious = () => {
    fectCharacters(info.prev);
  }
  //funcion para ver mas personajes
  const onNext = () => {
    fectCharacters(info.next);
  }
  //llamando al paramentro para el Fetch 
  useEffect(() => {
    fectCharacters(initialurl);
  }, []);
  return (
    <>
      <Navbar brand="Rick & Morty" />
      <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext} />
      <div className="container mt-5">
        <Characters characters={characters} />
      </div>
    </>
  );
}

export default App;
