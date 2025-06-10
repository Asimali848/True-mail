import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface ChartData {
  name: "Deliverable" | "Undeliverable" | "Risky" | "Duplicate";
  value: number;
  fill: string;
}

export const mapToPieChart = (data: GetOverview): ChartData[] => {
  return [
    {
      name: "Deliverable",
      value: data.deliverable,
      fill: "var(--color-deliverable)",
    },
    {
      name: "Undeliverable",
      value: data.undeliverable,
      fill: "var(--color-undeliverable)",
    },
    {
      name: "Risky",
      value: data.risky,
      fill: "var(--color-risky)",
    },
    {
      name: "Duplicate",
      value: data.duplicates,
      fill: "var(--color-duplicate)",
    },
  ];
};

type TxtResult = { content: string[]; sheets?: never };
type XlsxResult = { sheets: Record<string, unknown[]>; content?: never };

export const parseFileToJson = async (
  file: File
): Promise<TxtResult | XlsxResult> => {
  const name = file.name.toLowerCase();

  if (name.endsWith(".txt")) {
    let txt = await file.text();
    txt = txt.replace(/^\uFEFF/, ""); // Remove UTF-8 BOM if present

    // Split on commas, semicolons, newlines, and carriage returns
    const content = txt
      .split(/[,;\r\n]+/)
      .map((email) => email.trim())
      .filter((email) => email.length > 0)
      .filter(isValidEmail); // Optional: filter only valid emails

    return { content };
  }

  if (name.endsWith(".xlsx")) {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheets: Record<string, unknown[]> = {};

    for (const sheetName of workbook.SheetNames) {
      const ws = workbook.Sheets[sheetName];
      sheets[sheetName] = XLSX.utils.sheet_to_json(ws, { defval: null });
    }

    return { sheets };
  }

  const ext = name.slice(name.lastIndexOf("."));
  throw new Error(
    `Unsupported file type "${ext}" in file "${file.name}". Please upload a .txt or .xlsx file.`
  );
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function downloadCSV(data: DownloadProducts[]) {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const csvData = XLSX.write(workbook, { bookType: "csv", type: "string" });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.log(error);
  }
}
