import ExcelJS from "exceljs";

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile("selenium-test-results.xlsx");
const sheet = workbook.getWorksheet("Selenium Results");
if (!sheet) {
  console.log("No sheet found");
  process.exit(0);
}
sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
  if (rowNumber === 1) return;
  const [testId, category, title, status, details] = row.values.slice(1);
  if (status === "FAIL" || status === "PARTIAL") {
    console.log(testId, category, title, status, details);
  }
});
