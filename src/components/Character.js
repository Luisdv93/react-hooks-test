import React, { useEffect } from "react";
import { useHttp } from "../hooks/http";

import Summary from "./Summary";

const Character = props => {
  /* Should component update puede reemplazarse con colocando el export del componente dentro de un React.memo()
  
  shouldComponentUpdate(nextProps, nextState) {
  console.log('shouldComponentUpdate');
  return (
    nextProps.selectedChar !== this.props.selectedChar ||
    nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
    nextState.isLoading !== this.state.isLoading
  );
  } */

  const [isLoading, fetchedData] = useHttp(
    "https://swapi.co/api/people/" + props.selectedChar,
    [props.selectedChar]
  );

  let loadedCharacter = null;

  if (fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  /* 
  componentDidUpdate(prevProps) {
    console.log('Component did update');
    if (prevProps.selectedChar !== this.props.selectedChar) {
      this.fetchData();
    }
  } */

  // Equivalente a ComponentDidUpdate ya que le pasamos props que van a cambiar

  /* Si el segundo argumento de useEffect es un Array vacio eso equivale al viejo componentDidMount, sin el array vacio ocurre un loop infinito. */

  // useEffect(() => {
  //   fetchData();

  //   // Equivalente a usar componentWillUnmount
  //   return () => {
  //     console.log("Cleaning");
  //   };
  // }, [props.selectedChar]);

  /* Equivalente al component will unmount de arriba pero aqui el efecto solo va a ejecutarse cuando se desmonte el componente, mientras que el de arriba va a ejecutarse tambien cuando cambien los props. */

  useEffect(() => {
    return () => {
      console.log("Component Will Unmount");
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }

  return content;
};

/* Se puede pasar una funcion como segundo argumento si se necesita mas control. Tiene que devolver true si los props son iguales (Si no deberia volver a reenderizar) y tiene que devolver false si los props no son iguales (Deberia reenderizar)  */

/* export default React.memo(Character, (prevProps, nextProps) => {
  return nextProps.selectedChar === prevProps.selectedChar;
}); */

export default React.memo(Character);
