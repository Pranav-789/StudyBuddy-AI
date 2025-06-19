import mammoth from "mammoth";
import AdmZip from "adm-zip";
import ExcelJS from "exceljs";
// import { getDataFromPDF } from "@/helpers/getdataformpdf";

export async function extractTextFromBuffer(buffer, fileType) {
  switch (fileType) {
    case "txt":
      return buffer.toString("utf-8");

    case "docx":
      const result = await mammoth.extractRawText({ buffer });
      return result.value;

    case "pptx":
      return extractTextFromPPTX(buffer);

    case "xlsx":
      return extractTextFromXLSX(buffer);
      
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
}

function extractTextFromPPTX(buffer) {
  const zip = new AdmZip(buffer);
  const slideFiles = zip
    .getEntries()
    .filter(
      (entry) =>
        entry.entryName.startsWith("ppt/slides/slide") &&
        entry.entryName.endsWith(".xml")
    );

  let extractedText = "";

  slideFiles.forEach((slide) => {
    const content = slide.getData().toString("utf-8");
    const matches = content.match(/<a:t>(.*?)<\/a:t>/g);
    if (matches) {
      matches.forEach((m) => {
        const cleaned = m.replace(/<\/?a:t>/g, "");
        extractedText += cleaned + " ";
      });
    }
  });

  return extractedText.trim();
}

async function extractTextFromXLSX(buffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  let extractedText = "";

  workbook.eachSheet((sheet) => {
    sheet.eachRow((row) => {
      extractedText += row.values.slice(1).join(" ") + "\n"; // skip first element (ExcelJS 1-based)
    });
  });

  return extractedText.trim();
}