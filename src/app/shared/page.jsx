"use client";
import { CardTitle } from "@/components/ui/card";
import SharedDecks from "@/components/sharedDecks";
import { useEffect } from "react";

export default function Shared() {
  return (
    <>
      <CardTitle className="flex justify-center py-5">Shared</CardTitle>
      <SharedDecks />
    </>
  );
}
