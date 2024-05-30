"use client";
import { useState, useContext } from "react";
import { userContext } from "@/components/UserContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Create() {
  const [cards, setCards] = useState([{ front: "", back: "" }]);
  const [deckName, setDeckName] = useState("");

  const { user, isShared, setIsShared } = useContext(userContext);

  function handleAddCard() {
    setCards([...cards, { front: "", back: "" }]);
  }

  function handleInputChange(index, field, value) {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  }

  function handleSelectChange(event) {
    setIsShared(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const deck = {
      name: deckName,
      flashcards: cards,
    };

    if (user.isLoggedIn && !isShared) {
      fetch("https://flatiron-flashcards-backend.onrender.com/userdecks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: deckName,
          user: user.id,
          isShared: false,
          flashcards: cards,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setDeckName("");
          setCards([{ front: "", back: "" }]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      fetch("https://flatiron-flashcards-backend.onrender.com/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deck),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setDeckName("");
          setCards([{ front: "", back: "" }]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <>
      <br />
      <CardTitle className="text-center">Create New Deck</CardTitle>
      <br />
      <div className="flex flex-col justify-center text-center max-w-lg px-4 mb-4 mx-auto">
        <Card>
          <form onSubmit={handleSubmit} className="pt-4 px-4">
            <label htmlFor="deckName">Title</label>
            <Input
              placeholder="Type out your deck name."
              id="deckName"
              name="deckName"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
            />
            {cards.map((card, index) => (
              <div key={index}>
                <label htmlFor={`front-${index}`}>Front</label>
                <Textarea
                  placeholder="Type out your front card."
                  id={`front-${index}`}
                  name={`front-${index}`}
                  value={card.front}
                  onChange={(e) =>
                    handleInputChange(index, "front", e.target.value)
                  }
                />
                <label htmlFor={`back-${index}`}>Back</label>
                <Textarea
                  placeholder="Type out your back card"
                  id={`back-${index}`}
                  name={`back-${index}`}
                  value={card.back}
                  onChange={(e) =>
                    handleInputChange(index, "back", e.target.value)
                  }
                />
              </div>
            ))}
            <br />
            <div style={{ display: user.isLoggedIn ? "block" : "none" }}>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180]">
                  <SelectValue placeholder="Share Options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup name="shared">
                    <SelectLabel>Make it Public?</SelectLabel>
                    <SelectItem value={true}>Yes</SelectItem>
                    <SelectItem value={false}>No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <br />
            <Button type="button" onClick={handleAddCard}>
              Add New Card
            </Button>
            <br />
            <div className="pt-4 pb-4">
              <Button type="submit">Submit Deck</Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
