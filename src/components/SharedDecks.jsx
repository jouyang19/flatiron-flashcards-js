import Deck from "./Deck";
import { useEffect, useState, useContext } from "react";
import { userContext } from "./UserContext";

export default function SharedDecks({ isShared }) {
  const [decks, setDecks] = useState([]);

  const { setIsShared } = useContext(userContext);

  useEffect(() => {
    fetch("https://flatiron-flashcards-backend.onrender.com/decks")
      .then((response) => response.json())
      .then((decks) => {
        setDecks(decks);
        setIsShared(true);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`https://flatiron-flashcards-backend.onrender.com/decks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => setDecks(decks.filter((deck) => deck.id !== id)));
  };

  return decks.map((deck) => (
    <>
      <Deck
        key={deck.id}
        deck={deck}
        handleDelete={handleDelete}
        isShared={true}
      />
    </>
  ));
}
