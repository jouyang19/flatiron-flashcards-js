"use client";
import { useContext, useState } from "react";
import { userContext } from "@/components/UserContext";
import UserDecks from "@/components/UserDecks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { user, setUser, setIsShared } = useContext(userContext);

  function validateForm(data) {
    const errors = { name: "", pass: "" };
    console.log("validateForm errors object", errors);

    if (!data.name) {
      errors.name = "Username is required";
    } else if (!/^[a-zA-Z0-9\s'-]+$/.test(data.name.trim())) {
      errors.name =
        "Username can only contain letters, numbers, spaces, hyphens, and apostrophes.";
    }
    if (!data.pass) {
      errors.pass = "Password is required";
    } else if (!/^[a-zA-Z0-9\s.,!?'"-:()]+$/.test(data.pass.trim())) {
      errors.pass =
        "Password can only contain letters, numbers, spaces, and common punctuation.";
    }
    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submit!");
    setErrors({});

    const validationErrors = validateForm({
      name: event.target.username.value,
      pass: event.target.password.value,
    });

    console.log(Object.values(validationErrors));

    if (validationErrors.name === "" && validationErrors.pass === "") {
      fetch("https://flatiron-flashcards-backend.onrender.com/users")
        .then((response) => response.json())
        .then((users) => {
          console.log("fetching", users);
          const user = users.find(
            (user) =>
              user.username === event.target.username.value &&
              user.password === event.target.password.value
          );
        });

      if (user) {
        if (
          user.username === event.target.username.value &&
          user.password === event.target.password.value
        ) {
          setUser({
            isLoggedIn: true,
            username: `${user.username}`,
            id: user.id,
          });
          setIsShared(false);
        } else {
          fetch("https://flatiron-flashcards-backend.onrender.com/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              username: event.target.username.value,
              password: event.target.password.value,
              decks: [],
            }),
          });
          setUser({
            isLoggedIn: true,
            username: `${user.username}`,
            id: user.id,
          });
        }
      }
    } else {
      setErrors(validationErrors);
    }
  }

  function handleLogOut() {
    setUser({ isLoggedIn: false, username: "", id: undefined });
  }

  console.log(user);

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card style={{ display: user.isLoggedIn ? "block" : "none" }}>
        <CardHeader>
          <CardTitle className="text-center">
            Welcome {`${user.username}`}
          </CardTitle>
          <CardContent className="flex justify-center pt-7">
            <Button onClick={handleLogOut}>Log Out</Button>
          </CardContent>
          <CardContent>
            <h2 className="font-bold pt-2 text-center">
              {user.isLoggedIn ? "Your Decks" : ""}
            </h2>
            <br />
            {user.isLoggedIn ? <UserDecks user={user.id} /> : ""}
          </CardContent>
        </CardHeader>
      </Card>
      <div style={{ display: user.isLoggedIn ? "none" : "block" }}>
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Log in or Sign up to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input defaultValue="true" name="remember" type="hidden" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label className="sr-only" htmlFor="username">
                  Username
                </label>
                <input
                  autoComplete="username"
                  className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  type="password"
                />
              </div>
            </div>
            <div className="text-red-600">
              <p>{errors.name && <p>{errors.name}</p>}</p>
              <p>{errors.pass && <p>{errors.pass}</p>}</p>
            </div>
            <div className="pt-4">
              <button
                className="group relative flex w-full justify-center rounded-md border border-white bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray focus:outline-none focus:ring-2 focus:ring-3 focus:ring-offset-2"
                type="submit"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Log in or Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
