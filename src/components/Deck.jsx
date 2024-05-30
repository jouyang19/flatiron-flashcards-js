"use client";
import Link from "next/link";
import { Card, CardFooter, CardTitle, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useContext } from "react";
import { userContext } from "./UserContext";

export default function Deck({ deck, handleDelete, isShared }) {
  const { setIsShared, setCurrentDeck } = useContext(userContext);

  function handleClick() {
    setCurrentDeck(deck);
    setIsShared(isShared);
    console.log("Setting Current Card...", deck);
  }

  return (
    <>
      <Card className="grid w-[350] items-center gap-4 text-center mx-auto w-full px-4 max-w-2xl mb-4">
        <CardHeader>
          <CardTitle>{deck.name}</CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-center space-x-4">
          <Button onClick={handleClick}>
            <Link href={`/deck/${deck.id}`}>View Deck</Link>
          </Button>
          <Button onClick={() => handleDelete(deck.id)}>Delete</Button>
        </CardFooter>
      </Card>
    </>
  );
}
