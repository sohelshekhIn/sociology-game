import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// const apiKey = process.env.GEMINI_API_KEY;
const apiKey = "AIzaSyCJtei6CD7c53FZfnjIAj2VwgI7PuD0w9I";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const lifeStages: {
  [key: string]: string;
} = {
  "1": 'Your character is an infant. What kind of family structure shapes their earliest years?\nGenerate a sociological scenario for the character with choices based on the following user selections:\nPrevious User selected character choices\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',

  "2": 'Your character is in early childhood. What kind of early education and social interactions do they experience?\nGenerate a sociological scenario for the character with choices based on the following user selections:\nPrevious User selected character choices\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',

  "3": 'Your character is in childhood. How do their family environment and school life influence them?\nGenerate a sociological scenario for the character with choices based on the following user selections:\nPrevious User selected character choices\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',

  "4": 'Your character is in early adolescence. What challenges and opportunities do they face at this stage?\nGenerate a sociological scenario for the character with choices based on the following user selections:\nPrevious User selected character choices\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',

  "5": 'Your character is in late adolescence. How do they prepare for adulthood and their future career?\nGenerate a sociological scenario for the character with choices based on the following user selections:\nPrevious User selected character choices\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',

  "6": 'Your character is in young adulthood. What kind of higher education or early career choices do they make?\nGenerate a sociological scenario for the character with choices based on the following user selections:\nPrevious User selected character choices\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',

  "7": 'Your character is in early adulthood. How do they balance work, personal life, and possibly starting a family?\nGenerate a sociological scenario for the character with choices based on the following user selections:\nPrevious User selected character choices\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',

  "8": 'Your character is in midlife. What are their major achievements and challenges in their career and family life?\nGenerate a sociological scenario for the character with choices based on the following user selections:\nPrevious User selected character choices\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',

  "9": 'Your character is in mature adulthood. How do they deal with aging, career transitions, and family responsibilities?\nGenerate a sociological scenario for the character with choices based on the following user selections:\nPrevious User selected character choices\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',

  "10": 'Your character is in late adulthood. How do they reflect on their life, legacy, and deal with retirement?\nGenerate a sociological scenario for the character with choices based on the following user selections:\nPrevious User selected character choices\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',
};

const promptLibrary = {
  startingPrompt:
    "Generate a sociological scenario for a character starting their life journey. Provide multiple choices affecting their socio-economic status, education, and early childhood experiences.\n",
  gamePrompt:
    "Generate a sociological scenario for with choices based on the following user selections:",
  generalPrompt:
    '\n\nOptions should be short name of the path not "Option 1"\n\nLimitations:\nDescription should be max of 2 lines only\n\nThe output should be in JSON where it should return a prompt with key "characterPrompt" and list of 4 options object with key "characterOptions" which contains "name" of option and "description"\nThe first line must start with { not with ```json\n\nOutput should be: \n{\ncharacterPrompt: "...",\ncharacterOptions: [{\nname: "...",\ndescription: "..."\n}...]\n}',
  endingPrompt:
    "Generate a summary for the character based on the following choices made throughout their life stages. Reflect on how these decisions shaped their socio-economic status, education, relationships, career, and overall well-being. \n The output should be in JSON and first line shoudl start with '{' and not with ```json The output for the summary should be in a key value pair format with key as 'summary' and value as the summary of the character's life journey. \n\nOutput should be: \n{\nsummary: '...'\n} The summary should be in full details and explain each and every aspects of the user choices to the scenerios",
};

const generatePrompt = (stage: string, options: string | null = null) => {
  let prompt = "";
  if (stage === "start") {
    prompt += promptLibrary.startingPrompt;
    prompt += promptLibrary.generalPrompt;
  } else if (stage === "end") {
    prompt += promptLibrary.endingPrompt;
  } else {
    prompt += lifeStages[stage];
    prompt += promptLibrary.gamePrompt;
    prompt += options;
    prompt += promptLibrary.generalPrompt;
  }

  return prompt;
};

export const POST = async (req: NextRequest) => {
  const url = new URL(req.url);
  const stage = url.searchParams.get("stage") || "start";

  let parts: Array<Object> = [];

  if (stage === "start" || stage === "end") {
    parts = [
      {
        text: generatePrompt(stage),
      },
    ];
  } else {
    // get data from body
    const data = await req.json();
    const previousChoices = data.choices;

    parts = [
      {
        text: generatePrompt(stage, previousChoices),
      },
    ];
  }

  console.log(parts);

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
  });

  return NextResponse.json(
    { data: result.response.text() },
    {
      status: 200,
    }
  );

  //   data: generatePrompt(stage),
  // });
};
