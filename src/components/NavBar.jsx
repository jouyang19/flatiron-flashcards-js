"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { SheetTrigger, Sheet, SheetContent, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { userContext } from "./UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(userContext);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800">
      <Link className="flex items-center gap-2" href="/">
        <span className="text-lg font-semibold">Flashcards</span>
      </Link>
      <ModeToggle />
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="/">Home</Link>
        <Link href="/create">Create</Link>
        <Link href="/shared">Shared</Link>
        <Link href="/login">{user.isLoggedIn ? "Your Account" : "Log In"}</Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-6">
            <SheetClose asChild>
              <Link className="font-medium hover:underline" href="/">
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link className="font-medium hover:underline" href="/create">
                Create
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link className="font-medium hover:underline" href="/shared">
                Shared
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link className="font-medium hover:underline" href="/login">
                {user.isLoggedIn ? "Your Account" : "Log In"}
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
export default NavBar;
