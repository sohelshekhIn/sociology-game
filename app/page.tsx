"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const userName = useRef<HTMLInputElement>(null);
  const characterName = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const saveData = async () => {
    setLoading(true);
    const userNameValue = userName.current?.value;
    const characterNameValue = characterName.current?.value;

    if (!userNameValue || !characterNameValue) {
      alert("Please fill in the details");
      return;
    }

    window.localStorage.setItem("userName", userNameValue);
    window.localStorage.setItem("characterName", characterNameValue);
    // redirect to journey page
    router.push("/journey");
  };

  return (
    <div className="w-[80%] mx-auto text-xl md:text-4xl flex flex-col gap-10 md:gap-20 items-center pt-20">
      <div className="flex flex-col items-center gap-5">
        <h4 className="user-details-label">Your Name:</h4>
        <input ref={userName} className="user-details-input " type="text" />
      </div>

      <div className="flex flex-col items-center gap-5">
        <h4 className="user-details-label">Character Name:</h4>
        <input ref={characterName} className="user-details-input" type="text" />
      </div>
      <div className="mt-14">
        <button
          onClick={saveData}
          disabled={loading}
          className="py-3 px-5 text-bg bg-primary rounded-xl active:bg-primary/90 active:scale-95 transition duration-150 ease-in-out"
        >
          {loading ? "Loading..." : "Start Journey"}
        </button>
      </div>
    </div>
  );
}
