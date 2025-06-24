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
    contents: `
Please provide a comprehensive **Markdown-formatted summary**(not markdown code, but markdown format) of the following text. The summary should:

- Cover all key points and main ideas
- Be concise and easy to understand
- Use **headings**, **bullet points**, and **paragraphs** where appropriate
- Add extra newlines for readability
- Avoid unnecessary repetition

Text to summarize:

${text}
    `,
  });
  return response.text;
}

export async function refineSummary(text, prompt){
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `
You are given a summary in Markdown format. Please **refine it** according to the following instruction:

**Instruction:** ${prompt}

**Guidelines:**
- If the instruction asks for a **table**, include a **Markdown-formatted table** using pipes (|), headers, and alignment (e.g., | Column 1 | Column 2 |).
- If the instruction asks for a **chart**, provide a **text-based chart** like an ASCII bar chart or a list-based format — avoid saying "visual not supported".
- Do not return Markdown code blocks — return **actual Markdown-formatted output**, not wrapped in \`\`\`markdown.
- Ensure headings (**#**, **##**), bullet points (**-**) and spacing are clean.
- Do not repeat the original summary.
- Focus on clarity, structure, and formatting improvements.

---

Make sure to:
- Keep the Markdown formatting consistent
- Preserve the key information unless asked to shorten
- Improve clarity, readability, and structure as needed
- Add or modify bullet points, headings, or paragraphs if it improves comprehension
- Avoid duplicating content

---

**Summary to Refine:**

${text}
    `,
  });
  return response.text;
}