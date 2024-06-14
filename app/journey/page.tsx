"use client";
import { getApiUrl } from "@/utils/url";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CharacterResponse {
  characterPrompt: string;
  characterOptions: CharacterOption[];
  lifeSummary: string;
  alternatePaths: string[];
  comparison: string;
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
  const [characterName, setCharacterName] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  // get url param to get the stage

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
    if (res.status !== 200) {
      setLoading(false);
      setError(true);
      console.error("Error fetching data");
      return;
    }
    console.log("Uo");

    let data = await res.json();
    console.log(data.data);
    try {
      const responseData = data.data
        .replace(/\\n/g, "\\\\n")
        .replace(/\\t/g, "\\\\t")
        .replace(/\\r/g, "\\\\r");
      const parsedData = JSON.parse(responseData);

      setCharPrompt(parsedData);
      console.log("ko");

      console.log(parsedData);
      console.log("op");

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const changeStage = async (
    stage: string,
    charPrompt: string,
    option: CharacterOption
  ) => {
    let stringOption = `Scenerio: ${charPrompt} \n User Selected:${option.name} (${option.description}) \n`;
    if (stage === "start") {
      setOption(`Character Name is ${characterName}.\n`);
    }
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
    setCharacterName(
      window.localStorage.getItem("characterName") || "restart the game"
    );
    const urlParams = new URLSearchParams(window.location.search);
    const stage = urlParams.get("stage") || "start";
    if (stage != "start") {
      setOption(window.localStorage.getItem(characterName + "-option") || "");
      setStage(stage);
    } else {
      getAIResponse("start");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    //set url params to current stage
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("stage", stage);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );
    if (stage !== "start") {
      window.localStorage.setItem(characterName + "-option", option);
      getAIResponse(stage);
    }
  }, [stage]);

  useEffect(() => {
    if (error) {
      window.localStorage.clear();
      window.alert("Error fetching data, please restart the game");
      // router.push("/");
    }
  }, [error]);
  return (
    <div className="h-full">
      <div className="relative h-full">
        {loading && (
          <div className="z-40 h-full flex w-full items-center justify-center absolute top-0 left-0 bg-bg">
            <div>
              <h1 className="text-center">Loading...</h1>
              <p className="font-sans text-sm mt-10">
                Please be patient, loading your dynamic socio-economic
                environment.
              </p>
            </div>
          </div>
        )}
        {stage != "end" ? (
          <>
            <div className="m-5 text-lg lg:text-4xl lg:m-10 bg-primary p-5 rounded-2xl border-2 text-bg border-dashed border-accent">
              {charPrompt && charPrompt.characterPrompt}
            </div>
            <div className="flex flex-wrap  justify-center items-center text-xl gap-5 font-light">
              {charPrompt &&
                charPrompt.characterOptions.map((option) => (
                  <div className="relative w-1/3 group">
                    <button
                      onClick={() => {
                        changeStage(stage, charPrompt.characterPrompt, option);
                      }}
                      className="w-full hover:bg-secondary/90 hover:scale-105 active:scale-95 active:bg-secondary  bg-secondary p-5  rounded-2xl border-2 text-bg border-dashed border-accent"
                    >
                      <h1>{option.name}</h1>
                    </button>
                    <p className="font-sans bg-text/90 min-w-80 text-bg absolute -left-[15%] bottom-20 p-5 rounded-xl font-normal text-base hidden group-hover:block">
                      {option.description}
                    </p>
                  </div>
                ))}
            </div>
          </>
        ) : (
          !loading && (
            <div className="relative font-normal text-base font-sans p-5 mt-5 min-h-[200dvh]">
              <div className="flex flex-col fixed top-1/2 left-5">
                <Link href="#summary">Jump to Summary</Link>
                <Link href="#alternaes">Jump to Alternate Path</Link>
                <Link href="#comparison">Jump to Comparison</Link>
              </div>
              <div className="flex flex-col gap-10">
                <div className="" id="#summary">
                  <h1 className="text-lg font-bold">
                    Summary of imaginative character ({characterName})
                  </h1>
                  <p>{charPrompt?.lifeSummary}</p>
                </div>
                <div className="" id="alternates">
                  <h1 className="text-lg font-bold">
                    Alternative Paths & Endings
                  </h1>
                  <div className="flex flex-col gap-5">
                    {charPrompt?.alternatePaths.map((path, index) => (
                      <div key={index}>
                        <h1 className="font-semibold">Path {index + 1}</h1>
                        <p>{path}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="" id="comparison">
                  <h1 className="text-lg font-bold">
                    Comparison with other life stages
                  </h1>
                  <p>{charPrompt?.comparison}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="fixed left-0 bottom-0 z-50 w-full">
        <div className="text-xs font-sans w-full">
          <p className="lg:hidden">
            Long press the options to see more details
          </p>
          <p className="hidden lg:block">
            Hover over the options to see more details
          </p>
        </div>
        <div className="flex flex-col lg:flex-row bg-primary w-full justify-between p-5">
          {/* show current life stage */}
          <div className="text-white text-lg lg:text-xl">
            Current Life Stage:{" "}
            <span className="text-accent">{lifeStageName[stage]}</span>
          </div>
          <div className="text-white text-xl">
            Character: <span className="text-accent">{characterName}</span>
          </div>
          <button
            onClick={() => {
              getAIResponse("start");
              setStage("start");
              setOption("");
            }}
            className="py-3 px-5 text-base text-secondary bg-accent rounded-xl"
          >
            Restart Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default JourneyPage;
