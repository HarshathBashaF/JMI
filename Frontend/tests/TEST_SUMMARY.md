npm i -g appium
# or use npx appium when running# JMI Frontend Test Summary

This repo contains a complete quality plan for the JMI Frontend application, with more than 100 unique test cases covering UI/UX, functional behavior, validation, unit coverage, deployable readiness, and accessibility.

## Test Case Breakdown

- UI/UX Testing: 15
- Functional Testing: 30
- Validation Testing: 25
- Unit Testing: 20
- Deployment Readiness: 10
- Accessibility Testing: 5

## Total Planned Test Cases

- 105 unique planned test cases

## Categories

- UI/UX Testing: Verify layout, navigation, responsive display, action buttons, and visual feedback.
- Functional Testing: Validate routing, search/filter workflows, job card behavior, data rendering, and page interactions.
- Validation Testing: Confirm edge cases, empty state handling, malformed input resilience, error recovery, and safe state transitions.
- Unit Testing: Cover component rendering, hook behavior, utility functions, and context state initialization.
- Deployable Readiness: Validate build success, static deployability, secure backend usage, SPA routing, and console stability.
- Accessibility Testing: Ensure accessible labels, keyboard focus, color contrast, semantic structure, and screen reader compatibility.

## Deliverables

- 
  - tests/test-cases/test-case-list.json — JSON catalog of all planned cases
  - tests/TEST_CASE_CATALOG.md — human-readable catalog grouped by category
  - tests/e2e/selenium-web-test.js — Selenium E2E script
  - tests/report/generate-report.js — Excel report generator
  - tests/unit/Home.test.jsx — unit test example
  - tests/report/test-analysis.xlsx — generated combined report after test execution
