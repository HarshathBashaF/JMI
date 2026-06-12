import fs from "fs";
import path from "path";

const resultsDir = path.resolve("tests", "appium", "results");
const jsonFile = path.join(resultsDir, "appium-e2e-results.json");
const analysisFile = path.join(resultsDir, "appium-analysis.md");

async function generateAnalysis() {
  if (!fs.existsSync(jsonFile)) {
    console.error("❌ No Appium results found. Run the test first with: pnpm run test:appium");
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
  const pass = results.filter(r => r.status === "PASS").length;
  const fail = results.filter(r => r.status === "FAIL").length;
  const partial = results.filter(r => r.status === "PARTIAL").length;
  const total = results.length;
  const passPercentage = ((pass / total) * 100).toFixed(2);

  // Group by category
  const categories = {};
  results.forEach(r => {
    if (!categories[r.category]) categories[r.category] = { tests: [], pass: 0, fail: 0 };
    categories[r.category].tests.push(r);
    if (r.status === "PASS") categories[r.category].pass += 1;
    if (r.status === "FAIL") categories[r.category].fail += 1;
  });

  const failedTests = results.filter(r => r.status === "FAIL");
  const partialTests = results.filter(r => r.status === "PARTIAL");

  // Generate markdown report
  let report = `# Appium Mobile E2E Test Analysis Report

**Generated:** ${new Date().toISOString()}

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Tests | ${total} |
| ✅ Passed | ${pass} |
| ❌ Failed | ${fail} |
| ⚠️ Partial | ${partial} |
| Pass Rate | **${passPercentage}%** |

## Test Breakdown by Category

`;

  Object.entries(categories).forEach(([category, stats]) => {
    const catPassPercent = ((stats.pass / stats.tests.length) * 100).toFixed(2);
    report += `### ${category}\n`;
    report += `- Total: ${stats.tests.length}\n`;
    report += `- Passed: ${stats.pass}\n`;
    report += `- Failed: ${stats.fail}\n`;
    report += `- Pass Rate: **${catPassPercent}%**\n\n`;
  });

  if (failedTests.length > 0) {
    report += `## ❌ Failed Tests (${failedTests.length})\n\n`;
    failedTests.forEach(test => {
      report += `### Test ID: ${test.testId} - ${test.title}\n`;
      report += `- **Category:** ${test.category}\n`;
      report += `- **Status:** ${test.status}\n`;
      report += `- **Details:** ${test.details}\n`;
      report += `- **Timestamp:** ${test.timestamp}\n\n`;
    });
  }

  if (partialTests.length > 0) {
    report += `## ⚠️ Partial Tests (${partialTests.length})\n\n`;
    partialTests.forEach(test => {
      report += `### Test ID: ${test.testId} - ${test.title}\n`;
      report += `- **Category:** ${test.category}\n`;
      report += `- **Status:** ${test.status}\n`;
      report += `- **Details:** ${test.details}\n`;
      report += `- **Timestamp:** ${test.timestamp}\n\n`;
    });
  }

  report += `## 📊 Detailed Results\n\n`;
  report += `| Test ID | Category | Title | Status | Details |\n`;
  report += `|---------|----------|-------|--------|----------|\n`;
  results.forEach(r => {
    const statusEmoji = r.status === "PASS" ? "✅" : r.status === "FAIL" ? "❌" : "⚠️";
    const shortDetails = r.details.substring(0, 45) + (r.details.length > 45 ? "..." : "");
    report += `| ${r.testId} | ${r.category} | ${r.title} | ${statusEmoji} ${r.status} | ${shortDetails} |\n`;
  });

  report += `\n## 🔍 Recommendations\n\n`;
  if (passPercentage === "100") {
    report += `✅ **All tests passed!** Mobile application is fully functional on the tested device/browser.\n\n`;
  } else {
    report += `⚠️ **Issues detected.** Review failed and partial tests above for details.\n\n`;
    if (failedTests.length > 0) {
      report += `### Priority Issues:\n`;
      failedTests.slice(0, 5).forEach(test => {
        report += `- ${test.category}: ${test.title}\n`;
      });
      report += `\n`;
    }
  }

  report += `## 📱 Device/Browser Information\n\n`;
  report += `- Test Framework: Appium\n`;
  report += `- Target Platform: Android\n`;
  report += `- Execution Date: ${new Date().toLocaleDateString()}\n`;
  report += `- Execution Time: ${new Date().toLocaleTimeString()}\n`;

  // Save analysis
  fs.writeFileSync(analysisFile, report);
  console.log(`\n✅ Analysis Report Generated`);
  console.log(`📄 Markdown Report: ${analysisFile}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Total: ${total}`);
  console.log(`   ✅ Passed: ${pass}`);
  console.log(`   ❌ Failed: ${fail}`);
  console.log(`   ⚠️ Partial: ${partial}`);
  console.log(`   Pass Rate: ${passPercentage}%\n`);
}

generateAnalysis().catch(err => {
  console.error("❌ Error generating analysis:", err.message);
  process.exit(1);
});
