import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// const apiKey = process.env.GEMINI_API_KEY;
const apiKey = process.env.GEMINI_API_KEY;
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
    "Generate a detailed summary for the character based on the following stages and choices made throughout their life. Reflect on how each decision shaped their socio-economic status, education, relationships, career, and overall well-being. Then, provide an analysis of how a simple tweak in any of these choices could have led to a completely different end result. Compare these potential outcomes with the actual path and final result of our character. The output should be in JSON and must start with '{'. It should include the following keys: 'lifeSummary' which provides an overview of the character's life based on the choices made in each stage, 'alternatePaths' which explores how different choices could have led to different outcomes (only arary of strings), and 'comparison' which compares these potential outcomes with the actual path and final result of our character. Ensure that all strings in the JSON are properly escaped and there are no unescaped control characters.",
};

const generatePrompt = (stage: string, options: string | null = null) => {
  let prompt = "";
  if (stage === "start") {
    prompt += promptLibrary.startingPrompt;
    prompt += promptLibrary.generalPrompt;
  } else if (stage === "end") {
    prompt += promptLibrary.endingPrompt;
    // let tmpOp =
    //   "Character Name is Shekh.\nScenerio: You are born in a bustling city in the year 2030.  What path will you take in your early years? \n User Selected:Urban Slums (Your family struggles to survive in a cramped apartment, relying on government aid and informal work.) \nScenerio: As Shekh, you grow in the cramped apartment. What path do you take in your early childhood? \n User Selected:Digital Dreamer (Drawn to the bright screens in the neighborhood, you find yourself spending hours playing virtual games, a world of escape from reality.) \nScenerio: Shekh, surrounded by the vibrant, digital world, spends hours in virtual games.  What kind of early education and social interactions shape your young mind? \n User Selected:Community Center (Seek out the local community center, finding a safe haven and engaging in structured learning and play.) \nScenerio: The community center becomes your sanctuary, offering a world of learning and play.  How does this environment shape your early experiences and values? \n User Selected:Digital Explorer (You continue to explore the digital world, using your skills to navigate both real and virtual challenges.) \nScenerio: Shekh, you find yourself at the crossroads of your life, your skills honed in both the digital and real world.  Which path will you choose to pursue? \n User Selected:Urban Explorer (Navigate the complexities of city life, applying your resourcefulness to solve problems and create opportunities for yourself and others.  You use technology as a tool to understand and shape the city around you.) \nScenerio: Shekh, you are now 18 and starting to think about your future. How will you build upon your experiences to forge a path in the city?  \n User Selected:Data Analyst (Apply your knowledge of the city's data and patterns to work in a professional setting, analyzing trends and informing strategic decisions.) \nScenerio: As Shekh, you're about to turn 18. Armed with your tech skills and city savvy, what's your next move?  \n User Selected:Community Educator (Share your knowledge and skills with younger generations, empowering them to navigate the city.) \nScenerio: Shekh, you are now 23, working as a data analyst while mentoring kids in the community center.  You're starting to feel the weight of responsibility, juggling work, community commitments, and your own aspirations.  What will you focus on? \n User Selected:Career Advancement (Invest heavily in your career, aiming for a promotion and greater financial security.  You see this as a way to secure a better future for yourself and those you care about.) \nScenerio: Shekh, you are now in your mid-40s.  Your career has progressed, providing financial security but leaving little room for your passion for community work.  You've also built a family, but the demands of balancing career and family have become increasingly stressful.  What choices will you make now? \n User Selected:Family Focus (Prioritize your family's well-being, taking a step back from your demanding career to spend more time with your loved ones.  This could involve seeking a less demanding job or even exploring entrepreneurial ventures.) \nScenerio: Shekh, you're now in your mid-50s.  The family focus has brought joy, but you long for a renewed sense of purpose.  How do you navigate this phase of life? \n User Selected:Family Business (Combine your skills with your family's interests, starting a small business or venture that combines personal passion with financial security.) \nScenerio: Shekh, you're now in your late 60s, the family business is thriving, and you've achieved a sense of fulfillment.  As you approach retirement, how do you reflect on your journey and what lies ahead?  What will you dedicate your time to? \n User Selected:Digital Advocacy (You become a vocal advocate for digital literacy and ethical technology use, working to bridge the digital divide in your community.) \n";
    // prompt += tmpOp;
    prompt += options;
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

  // get data from body
  const data = await req.json();
  const previousChoices = data.choices;

  parts = [
    {
      text: generatePrompt(stage, previousChoices),
    },
  ];

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
