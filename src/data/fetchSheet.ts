import axios from "axios";

const API_KEY = "AIzaSyADK7u-ptZPZZSpRnS-RQk1vgcIRRgd46w";
const SPREADSHEET_ID = "108os02dE_gkQXClS9YOnAF84GPsg4S-FEyxD4O3urYI";
const RANGE = "Sheet1";

export interface Donor {
  id: number;
  name: string;
  amount: number;
}

export async function fetchSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    const response = await axios.get<{ values: string[][] }>(url);

    const rows = response.data.values;
    console.log("rows", rows);

    if (!rows || rows.length === 0) {
      throw new Error("No data found in the Google Sheet.");
    }

    const lastUpdate = rows[1][1]; // 'Last update' is in the second column

    const totalAmountString = rows[1][3]; // 'Total' is in the last column
    const totalAmount = totalAmountString
      ? parseInt(totalAmountString.replace(/,/g, ""), 10)
      : 0;
    console.log("totalAmount", totalAmount);

    const donors: Donor[] = rows
      .slice(3) // Skip headers and 'Last update' row
      .filter(
        (row) =>
          row.length >= 4 &&
          row[1] !== "Chưa có thông tin" &&
          row[2] !== "Chưa có thông tin"
      ) // Ensure there's a name and amount
      .map((row) => {
        let amount = 0;

        // Check if the amount is valid before parsing
        if (row[3]) {
          amount = parseInt(row[3].replace(/,/g, ""), 10); // Amount is in the fourth column, remove commas
        }

        return {
          id: parseInt(row[0], 10), // Convert the first column to an ID
          name: row[1], // Name is in the second column
          amount: amount, // Safely parsed amount
        };
      });

    return { donors, lastUpdate, totalAmount }; // Return donors, lastUpdate, and totalAmount
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return { donors: [], lastUpdate: "", totalAmount: 0 };
  }
}
