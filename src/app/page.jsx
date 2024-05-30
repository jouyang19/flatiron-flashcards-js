"use client";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SharedDecks from "@/components/SharedDecks";
import UserDecks from "@/components/UserDecks";
import { useContext } from "react";
import { userContext } from "@/components/UserContext";
import Deck from "@/components/Deck";

export default function Home() {
  const { user } = useContext(userContext);

  return (
    <>
      <h1 className="text-center pt-4 font-bold">
        Welcome to Flatiron Flashcards!
      </h1>
      <br />
      <h2 className="font-bold pt-2 text-center">Recent Shared Decks</h2>
      <br />
      <SharedDecks />
      <br />
      <h2 className="font-bold pt-2 text-center">
        {user.isLoggedIn ? "Your Decks" : ""}
      </h2>
      <br />
      {user.isLoggedIn ? <UserDecks user={user.id} /> : ""}
      <div>
        <CardTitle className="pt-12 pb-7 text-center">
          Ace in your memorization with our unique study tool
        </CardTitle>
        <div className="flex flex-wrap justify-between px-2">
          <Card className="max-w-xl xl:w-1/3 mx-auto mb-4">
            <CardHeader>
              <h2 className="font-bold">Create New Deck</h2>
            </CardHeader>
            <CardContent>
              <img
                src="images/create.jpeg"
                alt="a demo picture of creating a new deck"
                class="w-100 object-contain"
              />
            </CardContent>
            <CardFooter>
              <Button>
                <Link href="/create">Create Deck</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="max-w-xl xl:w-1/3 mb-4 mx-auto">
            <CardHeader>
              <h2 className="font-bold">
                Study with Flashcards - <em>Spaced Repetition coming soon!</em>
              </h2>
            </CardHeader>
            <CardContent className="max-w-xl">
              <img
                src="images/card.jpeg"
                alt="placeholder"
                class="w-100 object-contain"
              />
            </CardContent>
            <CardFooter>
              <Button>
                <Link href="/shared">Shared</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="max-w-xl xl:w-1/3 mx-auto">
            <CardHeader>
              <h2 className="font-bold">Log In for Community Benefits</h2>
            </CardHeader>
            <CardContent>
              <img
                src="images/login.jpeg"
                alt="placeholder"
                class="w-100 object-contain"
              />
            </CardContent>
            <CardFooter>
              <Button>
                <Link href="/login">Login</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
