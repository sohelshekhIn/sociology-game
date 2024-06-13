"use client";
import { getApiUrl } from "@/utils/url";
import { useEffect, useState } from "react";

interface CharacterResponse {
  characterPrompt: string;
  characterOptions: CharacterOption[];
}

interface CharacterOption {
  name: string;
  description: string;
}

const JourneyPage = () => {
  const [charPrompt, setCharPrompt] = useState<CharacterResponse | null>(null);
  const [stage, setStage] = useState("start"); // start, end and 1 to 10
  const [option, setOption] = useState("");
  const [loading, setLoading] = useState(true);

  // based on lifestages generate object to return short name
  const lifeStageName: {
    [key: string]: string;
  } = {
    start: "Start",
    end: "End",
    "1": "Infant",
    "2": "Early Childhood",
    "3": "Childhood",
    "4": "Early Adolescence",
    "5": "Late Adolescence",
    "6": "Young Adulthood",
    "7": "Early Adulthood",
    "8": "Midlife",
    "9": "Mature Adulthood",
    "10": "Late Adulthood",
  };

  const getAIResponse = async (stage: string) => {
    const res = await fetch(getApiUrl("/api/journey?stage=" + stage), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        choices: option,
      }),
    });
    let data = await res.json();
    data = JSON.parse(data.data);
    setCharPrompt(data);
    console.log(data);
    setLoading(false);
  };

  const changeStage = async (
    stage: string,
    charPrompt: string,
    option: CharacterOption
  ) => {
    let stringOption = `Scenerio: ${charPrompt} \n User Selected:${option.name} (${option.description}) \n`;
    setOption((prev) => prev + stringOption);

    if (stage === "start") {
      setStage("1");
    } else if (stage === "10") {
      setStage("end");
    } else {
      const nextStage = parseInt(stage) + 1;
      setStage(nextStage.toString());
    }
  };

  useEffect(() => {
    getAIResponse("start");
  }, []);

  useEffect(() => {
    setLoading(true);
    if (stage !== "start") {
      getAIResponse(stage);
    }
  }, [stage]);
  return (
    <div className="h-full">
      <div className="relative h-full">
        {loading && (
          <div className="z-40 h-full flex w-full items-center justify-center absolute top-0 left-0 bg-bg">
            <h1>Loading...</h1>
          </div>
        )}
        <div className="m-10 bg-primary p-5 rounded-2xl border-2 text-bg border-dashed border-accent">
          {charPrompt && charPrompt.characterPrompt}
        </div>

        <div className="flex flex-wrap  justify-center items-center text-xl gap-5 font-light">
          {charPrompt &&
            charPrompt.characterOptions.map((option) => (
              <button
                onClick={() => {
                  changeStage(stage, charPrompt.characterPrompt, option);
                }}
                className="w-1/3 relative  bg-secondary p-5 group rounded-2xl border-2 text-bg border-dashed border-accent"
              >
                <h1>{option.name}</h1>
                <p className="font-sans bg-text/90 min-w-80 text-bg absolute -left-[45%] bottom-20 p-5 rounded-xl font-normal text-base hidden group-hover:block">
                  {option.description}
                </p>
              </button>
            ))}
        </div>
      </div>
      <div className="flex z-50 bg-primary w-full absolute left-0 bottom-0 p-5">
        {/* <button
          onClick={() => {
            getAIResponse("start");
            setStage("start");
            setOption("");
          }}
          className="py-3 px-5 text-base text-white bg-primary rounded-xl"
        >
          Restart Journey
        </button> */}
        {/* show current life stage */}
        <div className="text-white text-xl">
          Current Life Stage: {lifeStageName[stage]}
        </div>
      </div>
    </div>
  );
};

export default JourneyPage;
