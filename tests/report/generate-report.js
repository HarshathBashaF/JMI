import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";

const root = process.cwd();
const reportDir = path.resolve(root, "tests/report");
const destination = path.join(reportDir, "test-analysis.xlsx");
const testCaseFile = path.resolve(root, "tests/test-cases/test-case-list.json");
const seleniumResultFile = path.join(reportDir, "selenium-test-results.xlsx");
const appiumResultFile = path.join(reportDir, "appium-results.json");
const altAppiumResultFile = path.resolve('tests', 'appium', 'results', 'appium-results.json');

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (e) {
    console.error("Failed to parse JSON:", filePath, e.message);
    return null;
  }
}

function normalizeSheetName(name) {
  return name.replace(/[^a-zA-Z0-9 \-_]/g, "").slice(0, 31);
}

async function generateReport() {
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

  const workbook = new ExcelJS.Workbook();

  // Summary sheet
  const summarySheet = workbook.addWorksheet("Summary");
  summarySheet.columns = [
    { header: "Item", key: "item", width: 40 },
    { header: "Value", key: "value", width: 60 },
  ];

  // Load test cases
  const testCases = loadJson(testCaseFile) || [];

  // Load selenium results and map by Test ID
  const seleniumMap = new Map();
  if (fs.existsSync(seleniumResultFile)) {
    const tempBook = new ExcelJS.Workbook();
    await tempBook.xlsx.readFile(seleniumResultFile);
    const sourceSheet = tempBook.getWorksheet("Selenium Results") || tempBook.worksheets[0];
    if (sourceSheet) {
      sourceSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return;
        const values = row.values.slice(1);
        const testId = values[0];
        const status = values[3] || values[2] || "";
        const details = values[4] || "";
        const timestamp = values[5] || "";
        if (testId != null) seleniumMap.set(String(testId), { status: String(status), details: String(details), timestamp: String(timestamp) });
      });
    }
  }

  // Summary top lines
  summarySheet.addRow({ item: "Total planned test cases", value: testCases.length });
  summarySheet.addRow({ item: "Selenium report path", value: fs.existsSync(seleniumResultFile) ? seleniumResultFile : "(not found)" });
  summarySheet.addRow({ item: "Appium report path", value: fs.existsSync(appiumResultFile) ? appiumResultFile : "(not found)" });
  summarySheet.addRow({ item: "Excel analysis output", value: destination });
  summarySheet.addRow({ item: "" });

  // Group test cases by category and create sheets
  const grouped = testCases.reduce((acc, t) => {
    acc[t.category] = acc[t.category] || [];
    acc[t.category].push(t);
    return acc;
  }, {});

  // Track pass/fail counts
  let overallPass = 0;
  let overallFail = 0;

  for (const category of Object.keys(grouped).sort()) {
    const sheetName = normalizeSheetName(category);
    const sheet = workbook.addWorksheet(sheetName);
    sheet.columns = [
      { header: "ID", key: "id", width: 8 },
      { header: "Title", key: "title", width: 60 },
      { header: "Expected Result", key: "expectedResult", width: 80 },
      { header: "Priority", key: "priority", width: 12 },
      { header: "Status", key: "status", width: 12 },
      { header: "Details", key: "details", width: 80 },
      { header: "Timestamp", key: "timestamp", width: 28 },
    ];

    const rows = grouped[category];
    let pass = 0, fail = 0, notrun = 0;
    rows.forEach((t) => {
      const res = seleniumMap.get(String(t.id));
      const status = res ? (res.status || "") : "NOT RUN";
      const details = res ? res.details : "";
      const timestamp = res ? res.timestamp : "";
      if (status === "PASS") pass++;
      else if (status === "FAIL") fail++;
      else notrun++;
      sheet.addRow({ id: t.id, title: t.title, expectedResult: t.expectedResult, priority: t.priority, status, details, timestamp });
    });

    summarySheet.addRow({ item: `${category} test cases`, value: rows.length });
    summarySheet.addRow({ item: `${category} PASS`, value: pass });
    summarySheet.addRow({ item: `${category} FAIL`, value: fail });
    summarySheet.addRow({ item: `${category} NOT RUN`, value: notrun });

    overallPass += pass;
    overallFail += fail;
  }

  summarySheet.addRow({ item: "" });
  summarySheet.addRow({ item: "Overall PASS", value: overallPass });
  summarySheet.addRow({ item: "Overall FAIL", value: overallFail });

  // Raw selenium sheet (copy) if present
  if (fs.existsSync(seleniumResultFile)) {
    const tempBook = new ExcelJS.Workbook();
    await tempBook.xlsx.readFile(seleniumResultFile);
    const sourceSheet = tempBook.getWorksheet("Selenium Results") || tempBook.worksheets[0];
    if (sourceSheet) {
      const raw = workbook.addWorksheet("Raw Selenium Results");
      sourceSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        raw.addRow(row.values.slice(1));
      });
    }
  }

  // Appium results
  const appiumSheet = workbook.addWorksheet("Appium Results");
  const appiumSource = fs.existsSync(appiumResultFile) ? appiumResultFile : (fs.existsSync(altAppiumResultFile) ? altAppiumResultFile : null);
  if (appiumSource) {
    const appiumResults = loadJson(appiumSource) || [];
    appiumSheet.columns = [
      { header: "Test ID", key: "step", width: 10 },
      { header: "Category", key: "category", width: 16 },
      { header: "Title", key: "title", width: 60 },
      { header: "Status", key: "status", width: 15 },
      { header: "Details", key: "details", width: 80 },
      { header: "Timestamp", key: "timestamp", width: 28 },
    ];
    appiumResults.forEach((r) => appiumSheet.addRow(r));
  } else {
    appiumSheet.addRow(["No Appium results found", "INFO", "Run tests/appium/mobile-appium-test.js first."]);
  }

  try {
    await workbook.xlsx.writeFile(destination);
    console.log(`Combined test-analysis report written to ${destination}`);
  } catch (err) {
    if (err && (err.code === 'EBUSY' || err.code === 'EPERM')) {
      const alt = path.join(reportDir, `test-analysis-${Date.now()}.xlsx`);
      await workbook.xlsx.writeFile(alt);
      console.log(`Target file locked. Wrote combined report to ${alt} instead.`);
    } else {
      throw err;
    }
  }
}

await generateReport();
