"use client";
import { useState, useEffect, useContext } from "react";
import { userContext } from "@/components/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const DeckViewer = () => {
  const { currentDeck } = useContext(userContext);

  const [deck, setDeck] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [count, setCount] = useState(0);
  const [showingBack, setShowingBack] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDeck(currentDeck);
    if (currentDeck.flashcards && currentDeck.flashcards.length > 0) {
      setFront(currentDeck.flashcards[0].front);
    }
  });

  function showBack() {
    if (deck.flashcards && deck.flashcards.length > 0) {
      setBack(deck.flashcards[count].back);
      setShowingBack(true);
    }
  }

  function nextCard() {
    const newCount = count + 1;
    if (deck.flashcards && newCount < deck.flashcards.length) {
      setFront(deck.flashcards[newCount].front);
      setBack("");
      setCount(newCount);
      setShowingBack(false);
      setIsFinished(false);
    } else {
      setIsFinished(true);
    }
  }

  function restartDeck() {
    setCount(0);
    showFront();
  }

  function showFront() {
    if (deck.flashcards && deck.flashcards.length > 0) {
      setFront(deck.flashcards[0].front);
      setBack("");
      setShowingBack(false);
      setIsFinished(false);
    }
  }

  return (
    <>
      <Card className="max-w-2xl px-4 w-full mx-auto card">
        <CardHeader>
          <CardTitle>
            <h1 className="font-bold text-center">{deck.name}</h1>
            <br />
          </CardTitle>
        </CardHeader>
        <CardContent className="items-center text-center card">
          <CardTitle>
            <h2>{front}</h2>
          </CardTitle>
          <br />
          <Button onClick={showBack} disabled={showingBack}>
            Show Answer
          </Button>
          <p>{back}</p>
          <br />
        </CardContent>
        <CardContent className="flex justify-center items-center card">
          <Button onClick={nextCard} disabled={!showingBack || isFinished}>
            Next Card
          </Button>
        </CardContent>
        <CardContent className="flex justify-center items-center card">
          <Button onClick={restartDeck} disabled={!isFinished || !showingBack}>
            Restart Deck
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default DeckViewer;
