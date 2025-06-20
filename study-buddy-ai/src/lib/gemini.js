// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function summarizeText(text) {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const prompt = `Please summarize the following text in simple bullet points:\n\n${text}`;

//   const result = await model.generateContent({
//     contents: [{ parts: [{ text: prompt }] }],
//   });

//   const response =  result.response;
//   return response.text();
// }

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function summarizeText(text) {
  console.log(text);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `Can you provide a comprehensive summary of the given text? The summary should cover all the key points and main ideas presented in the original text, while also condensing the information into a concise and easy-to-understand format. Please ensure that the summary includes relevant details and examples that support the main ideas, while avoiding any unnecessary information or repetition. The length of the summary should be appropriate for the length and complexity of the original text, providing a clear and accurate overview without omitting any important information. text:\n\n${text}. \n also highlight important points.`,
  });
  return response.text;
}

export async function refineSummary(text, prompt){
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `I am providing you the summary, ${prompt}. summary:\n\n${text}`,
  });
  return response.text;
}