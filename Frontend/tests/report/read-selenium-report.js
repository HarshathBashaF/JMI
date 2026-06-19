import ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile('selenium-test-results.xlsx');
const sheet = workbook.getWorksheet('Selenium Results');
console.log('Failing rows:');
for (let i = 2; i <= sheet.rowCount; i += 1) {
  const row = sheet.getRow(i);
  const status = row.getCell('D').text;
  if (status === 'FAIL' || status === 'PARTIAL') {
    console.log(
      row.getCell('A').text,
      row.getCell('B').text,
      row.getCell('C').text,
      status,
      row.getCell('E').text
    );
  }
}
