# Test Framework for JMI Frontend

This directory contains the end-to-end, Appium, unit, and reporting scaffolding for the React application.

## Structure

- `tests/e2e/selenium-web-test.js` - Selenium WebDriver script for web E2E against `http://localhost:5173`.
- `tests/appium/mobile-appium-test.js` - Appium mobile web test scaffold for Android Chrome.
- `tests/report/generate-report.js` - Combines test case definitions and results into an Excel analysis workbook.
- `tests/test-cases/test-case-list.json` - Catalog of 105 planned test cases across UI/UX, functional, validation, unit, deployment, and accessibility.
- `tests/unit/Home.test.jsx` - Example unit test using Vitest and Testing Library.

## Run tests

1. Install dependencies:
   - `pnpm install`

2. Start the app:
   - `pnpm dev`

3. Run the web E2E suite:
   - `pnpm test:selenium`

4. Run the Appium mobile test:
   - Start Appium server: `npx appium`
   - `pnpm test:appium`

5. Generate the Excel analysis report:
   - `pnpm test:report`

6. Run unit tests:
   - `pnpm test:unit`

## Notes

- `tests/report/test-analysis.xlsx` is the consolidated report output.
- Appium tests are configured to use emulator/device settings from environment variables if needed.
- `tests/test-cases/test-case-list.json` can be extended with more cases or exported to other formats.
