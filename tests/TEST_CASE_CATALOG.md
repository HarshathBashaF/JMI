# JMI Frontend Test Case Catalog

Total planned test cases: 105

## Accessibility

### 101. Inputs have accessible placeholders or labels

- Description: Verify key inputs like search and skill filter have readable labels.
- Expected Result: Inputs are accessible.
- Priority: Medium

### 102. Interactive elements are keyboard focusable

- Description: Confirm buttons and links can receive focus via keyboard navigation.
- Expected Result: Elements are keyboard navigable.
- Priority: High

### 103. Images and icons have alt text or aria labels

- Description: Verify meaningful icons and interactive elements expose accessible names.
- Expected Result: ARIA labels or alt semantics exist.
- Priority: Medium

### 104. Color contrast is sufficient for text

- Description: Check the contrast ratio for primary text on background colors.
- Expected Result: Contrast meets WCAG guidelines.
- Priority: Medium

### 105. Page structure supports screen readers

- Description: Ensure the page uses headings and landmark sections consistently.
- Expected Result: Accessible page structure is present.
- Priority: Medium

## Deployment

### 91. Build script completes successfully

- Description: Run the Vite build and verify it finishes without errors.
- Expected Result: Build succeeds.
- Priority: High

### 92. Production preview serves correctly

- Description: Run vite preview and verify the app serves the built assets.
- Expected Result: Preview works and home route loads.
- Priority: Medium

### 93. Network requests use HTTPS for backend

- Description: Confirm the backend endpoint is HTTPS and the app loads it securely.
- Expected Result: Backend request path is HTTPS.
- Priority: High

### 94. Browser console has no critical errors

- Description: Verify the browser console does not show uncaught exceptions during normal use.
- Expected Result: No console errors on page load.
- Priority: High

### 95. Application is route-guarded by client side routing

- Description: Verify navigation does not trigger a full page refresh.
- Expected Result: Client-side route navigation is active.
- Priority: Medium

### 96. Bundle size is within acceptable limits

- Description: Inspect the built bundle size and verify it is not unreasonably large.
- Expected Result: Bundle size remains reasonable for deployment.
- Priority: Medium

### 97. App has a valid meta title

- Description: Verify the page title is set in index.html.
- Expected Result: Page title is configured.
- Priority: Low

### 98. App can be served over a static host

- Description: Confirm the Vite build is static and can be deployed to S3, Netlify, or Render.
- Expected Result: Build output is static and deployable.
- Priority: High

### 99. App recovers gracefully after refresh

- Description: Refresh the page on /jobs and verify the app reloads without a broken layout.
- Expected Result: Refresh works without errors.
- Priority: High

### 100. App is installable as PWA placeholder

- Description: Verify service worker related manifest or metadata are present if PWA support is intended.
- Expected Result: PWA metadata exists or is documented.
- Priority: Low

## Functional

### 16. Home page route loads

- Description: Navigate to / and verify the home route renders without errors.
- Expected Result: Home route loads successfully.
- Priority: High

### 17. Dashboard route loads

- Description: Navigate to /dashboard and ensure dashboard content is present.
- Expected Result: Dashboard loads and summary cards appear.
- Priority: High

### 18. Jobs route loads

- Description: Navigate to /jobs and confirm jobs content is available after data load.
- Expected Result: Jobs list is displayed.
- Priority: High

### 19. Analytics route loads

- Description: Navigate to /analytics and verify analytics charts appear.
- Expected Result: Analytics charts are shown.
- Priority: High

### 20. Search filters job cards

- Description: Enter a keyword into the Jobs search input and verify returned job cards match the query.
- Expected Result: Filtering reduces list to relevant jobs.
- Priority: High

### 21. Location filter works

- Description: Select a location from the Jobs page dropdown and verify results update accordingly.
- Expected Result: Jobs show only selected location matches.
- Priority: High

### 22. Skill filter works

- Description: Type a skill into the Jobs page skill filter and verify filtered jobs are relevant.
- Expected Result: Filtering by skill returns matching jobs.
- Priority: High

### 23. Clear filters resets search state

- Description: Apply filters on Jobs page, then click Clear Filters and verify the search fields are reset.
- Expected Result: Filters clear and all jobs are shown.
- Priority: High

### 24. Apply link opens a new tab

- Description: Click the Apply button on a job card and confirm the link targets a new tab or URL.
- Expected Result: Apply link opens without breaking the app.
- Priority: Medium

### 25. API call fetches jobs

- Description: Call the backend jobs endpoint and verify the JSON payload contains a jobs array.
- Expected Result: Backend returns a jobs array with at least one item.
- Priority: High

### 26. Error state displays on API failure

- Description: Simulate API failure and verify the app displays the failed to load jobs message.
- Expected Result: Error message appears when API request fails.
- Priority: Medium

### 27. Loading skeleton displays while jobs fetch

- Description: Confirm the dashboard loading skeleton or loading text shows while data is being retrieved.
- Expected Result: Loading indicator appears until jobs load.
- Priority: Medium

### 28. Job cards show location label

- Description: Verify each job card displays a location pill for the job.
- Expected Result: Location labels appear on all cards.
- Priority: Medium

### 29. Job cards show company name

- Description: Confirm the company name is visible on rendered job cards.
- Expected Result: Company names appear on cards.
- Priority: Medium

### 30. Dashboard charts update from data

- Description: Verify the analytics charts receive data from the job list and render values.
- Expected Result: Chart data arrays render with non-empty values.
- Priority: Medium

### 31. Navigation links change routes

- Description: Click each top nav link and verify the browser route updates appropriately.
- Expected Result: Routes update correctly without page crash.
- Priority: High

### 32. Search input updates state

- Description: Type in the search input and verify the value changes with each keystroke.
- Expected Result: Search input reflects typed characters.
- Priority: High

### 33. Location dropdown shows options

- Description: Open the location dropdown and verify it lists at least one location option.
- Expected Result: Dropdown options display properly.
- Priority: Medium

### 34. Analytics page handles no-data gracefully

- Description: When jobs list is empty, verify analytics page still renders and does not crash.
- Expected Result: No-data state does not break the page.
- Priority: Medium

### 35. Dashboard latest opportunities appear

- Description: Verify the latest job cards section renders on the dashboard.
- Expected Result: Latest opportunities cards appear.
- Priority: Medium

### 36. App refetch works

- Description: Trigger the refetch action from the context and verify jobs reload.
- Expected Result: Refetch fetches new results and updates jobs.
- Priority: Medium

### 37. Home button navigates to Dashboard

- Description: Verify that any home CTA navigates to the dashboard route.
- Expected Result: Navigation occurs successfully.
- Priority: Medium

### 38. Job card apply URL is properly formed

- Description: Inspect a job card's Apply anchor and verify it contains a valid external URL.
- Expected Result: Apply anchor href points to a job URL.
- Priority: Medium

### 39. Jobs route shows no results message

- Description: Enter a search query that matches no jobs and verify the no jobs found message appears.
- Expected Result: No results message is visible.
- Priority: High

### 40. Hover effects do not break layout

- Description: Hover over interactive job cards and verify the visual effect is applied without layout shift.
- Expected Result: Hover effect is visible and layout remains stable.
- Priority: Low

### 41. Analytics route uses chart components

- Description: Verify analytics page contains the SkillChart and LocationChart component placeholders.
- Expected Result: Chart components render.
- Priority: Medium

### 42. Dashboard top skill shows valid text

- Description: Confirm the dashboard top skill card displays a non-empty skill label.
- Expected Result: Top skill label is not empty.
- Priority: Medium

### 43. Dashboard top location shows valid text

- Description: Confirm the dashboard top location card displays a non-empty location label.
- Expected Result: Top location label is not empty.
- Priority: Medium

### 44. Jobs page loads within acceptable time

- Description: Measure the time from route load to job card render and confirm it stays under an acceptable threshold.
- Expected Result: Jobs page loads quickly.
- Priority: Medium

### 45. Search query is case-insensitive

- Description: Enter search text in a different case and verify the same results appear.
- Expected Result: Search is case-insensitive.
- Priority: Medium

## UI/UX

### 1. Home page hero is visible

- Description: Load the home page and verify the hero section appears with the main value proposition.
- Expected Result: User sees the home hero section and feature cards.
- Priority: High

### 2. Navigation bar renders on desktop

- Description: Open the app and confirm the top navigation bar displays Dashboard, Jobs, and Analytics links.
- Expected Result: Top navigation bar is visible and links are present.
- Priority: High

### 3. Sidebar toggles correctly

- Description: On pages using the layout, open and close the sidebar drawer and verify the overlay state.
- Expected Result: Sidebar opens and closes without layout breakage.
- Priority: Medium

### 4. Page headings are readable

- Description: Verify that each page contains a clear page title such as Dashboard, Jobs, or Analytics.
- Expected Result: Each route shows a descriptive heading.
- Priority: Medium

### 5. Search input is visible on Jobs page

- Description: When visiting /jobs, confirm the search input field and filter controls are displayed.
- Expected Result: Search and filter UI elements appear.
- Priority: High

### 6. Filter controls are aligned

- Description: Inspect the Jobs page filter row to make sure controls align and have sufficient spacing.
- Expected Result: Filter controls are laid out cleanly.
- Priority: Medium

### 7. Job cards render in a responsive grid

- Description: Verify job cards present in a responsive grid after jobs load.
- Expected Result: Grid layout adapts without overlap.
- Priority: High

### 8. Apply button is accessible on job cards

- Description: Each job card should contain an Apply button that is visible and clickable.
- Expected Result: Apply button appears on each job card.
- Priority: High

### 9. Dashboard summary cards are visible

- Description: Confirm the dashboard displays summary cards for top skill, top location, and market status.
- Expected Result: All summary cards load successfully.
- Priority: Medium

### 10. Analytics charts render after data load

- Description: Load the analytics page and verify chart placeholders are replaced with actual charts.
- Expected Result: Charts appear without empty placeholders.
- Priority: High

### 11. Header sticks to the top during scroll

- Description: Scroll down a page and verify the header remains sticky at the top.
- Expected Result: Header stays visible while scrolling.
- Priority: Low

### 12. Button hover states are visible

- Description: Verify interactive buttons show hover styling changes.
- Expected Result: Hover states occur on buttons.
- Priority: Low

### 13. Color contrast meets readability

- Description: Check that text on colored backgrounds is readable and not too low contrast.
- Expected Result: Text contrast is acceptable for key UI elements.
- Priority: Medium

### 14. Mobile layout collapses gracefully

- Description: Resize the page to a mobile width and verify layout elements stack correctly.
- Expected Result: Mobile layout is usable and readable.
- Priority: High

### 15. Live status badge is visible on dashboard

- Description: Confirm the dashboard page shows the active hiring live badge.
- Expected Result: Live badge is displayed.
- Priority: Medium

## Unit

### 71. Home component renders without crashing

- Description: Mount the Home page component in a unit test and verify it renders.
- Expected Result: Component renders successfully.
- Priority: High

### 72. Jobs component renders loading state

- Description: Test that Jobs component can render the loading state before data is available.
- Expected Result: Loading text appears in unit test.
- Priority: Medium

### 73. JobCard component renders a job title

- Description: Render JobCard with sample props and verify the title appears.
- Expected Result: Job title is visible.
- Priority: High

### 74. JobCard handles missing salary prop

- Description: Render JobCard without salary data and verify it still mounts.
- Expected Result: Component does not crash.
- Priority: Medium

### 75. JobContext provides initial state

- Description: Test the JobContext provider initial states for jobs, loading, and error.
- Expected Result: Provider initializes with expected default values.
- Priority: High

### 76. Navigation bar renders links

- Description: Verify the Navbar component renders the Dashboard, Jobs, and Analytics links.
- Expected Result: Navbar includes all navigation items.
- Priority: High

### 77. Sidebar component shows toggle state

- Description: Render Sidebar with open state and verify it displays.
- Expected Result: Sidebar appears when open prop is true.
- Priority: Low

### 78. Footer renders copyright text

- Description: Confirm Footer component renders expected copyright or brand text.
- Expected Result: Footer component displays content.
- Priority: Low

### 79. Dashboard handles empty jobs array

- Description: Verify Dashboard renders fallback text when jobs array is empty.
- Expected Result: Component mounts without error.
- Priority: Medium

### 80. LocationExtractor returns unique locations

- Description: Test extractLocations utility with sample job input.
- Expected Result: Unique locations list is returned.
- Priority: Medium

### 81. SkillExtractor returns correct counts

- Description: Test extractSkills utility with sample jobs and validate counts.
- Expected Result: Skill counts are correct.
- Priority: Medium

### 82. JobSearch debounce hook delays updates

- Description: Verify useDebounce returns values after the delay.
- Expected Result: Debounced values update as expected.
- Priority: Medium

### 83. Home page feature cards render

- Description: Test that the Home page includes at least one feature card with expected text.
- Expected Result: Feature card text is visible.
- Priority: Low

### 84. Layout renders child content

- Description: Render Layout with a child element and verify it appears.
- Expected Result: Child content is rendered inside layout.
- Priority: Medium

### 85. Navbar active route highlights link

- Description: Render Navbar with a router location and verify active link styling.
- Expected Result: Active link styling appears.
- Priority: Medium

### 86. JobCard apply link has rel attributes

- Description: Render JobCard and verify the anchor has noopener noreferrer.
- Expected Result: Security rel attributes exist.
- Priority: Medium

### 87. Jobs page filter variables update on input

- Description: Test that the Jobs page state updates when filter fields are changed.
- Expected Result: State updates correctly.
- Priority: Medium

### 88. Analytics page uses chart data props

- Description: Render charts with sample data and verify they mount.
- Expected Result: Chart components render successfully.
- Priority: Low

### 89. Search field placeholder is present

- Description: Render JobSearch and confirm the placeholder text appears.
- Expected Result: Placeholder text is visible.
- Priority: Low

### 90. Layout overlay renders when sidebar open

- Description: Render Layout with open state and verify overlay exists.
- Expected Result: Overlay element is present.
- Priority: Low

## Validation

### 46. Search input handles empty query

- Description: Clear the search field and verify the page shows all jobs again.
- Expected Result: Empty search resets to all jobs.
- Priority: High

### 47. Location filter handles invalid selection

- Description: Select an invalid location (or clear) and verify the page does not crash.
- Expected Result: Invalid or cleared location does not break the UI.
- Priority: Medium

### 48. Skill filter handles special characters

- Description: Type special characters into the skill input and verify the app still handles the filter.
- Expected Result: Special characters do not crash the app.
- Priority: Medium

### 49. Search input trims whitespace

- Description: Enter a search query with leading/trailing spaces and verify filtering behaves as expected.
- Expected Result: Query whitespace does not prevent expected results.
- Priority: Medium

### 50. Jobs list handles empty backend array

- Description: Simulate an empty jobs array from the backend and verify the no jobs message is displayed.
- Expected Result: Empty jobs response shows no results properly.
- Priority: High

### 51. Error message uses user-friendly language

- Description: When API fails, confirm the displayed message is clear and non-technical.
- Expected Result: User-friendly error text appears.
- Priority: Medium

### 52. Dashboard handles undefined skill data

- Description: Verify the dashboard does not error if skillData is undefined or empty.
- Expected Result: Dashboard continues rendering safely.
- Priority: Medium

### 53. Location dropdown handles empty options

- Description: Verify Jobs page still renders if the location list is empty.
- Expected Result: Page renders without location options.
- Priority: Medium

### 54. Apply link safely opens external sites

- Description: Confirm the Apply anchor includes rel noopener noreferrer.
- Expected Result: Link uses correct security attributes.
- Priority: Medium

### 55. Search and filters work when jobs load slowly

- Description: Verify filtering is still functional while jobs are loading or reloading.
- Expected Result: Filters do not break when data is delayed.
- Priority: Medium

### 56. Dashboard numeric cards handle zero values

- Description: Verify the summary cards display gracefully if the data value is zero or missing.
- Expected Result: Cards show N/A or fallback text.
- Priority: Medium

### 57. Jobs page handles large job arrays

- Description: Verify the Jobs page remains usable when the backend returns a very large number of jobs.
- Expected Result: Page remains responsive with many jobs.
- Priority: Medium

### 58. Empty search placeholder text remains

- Description: Ensure the job search input placeholder text remains visible when the field is empty.
- Expected Result: Placeholder text is visible.
- Priority: Low

### 59. Analytics charts handle malformed data

- Description: Provide malformed analytics input data and verify charts do not crash.
- Expected Result: Charts fail gracefully or remain hidden.
- Priority: Medium

### 60. Job card displays fallback for missing salary

- Description: Verify job cards do not crash when salary is omitted.
- Expected Result: Job card still renders without salary text.
- Priority: Medium

### 61. Search input accepts long text

- Description: Type a long search phrase and verify the app still updates state correctly.
- Expected Result: Search query handles long input.
- Priority: Low

### 62. Filter controls remain enabled after error

- Description: When the API fails, verify the filter UI remains enabled or displays a proper disabled state.
- Expected Result: Filter controls do not appear broken.
- Priority: Medium

### 63. Page uses semantic HTML heading order

- Description: Verify primary headings follow a logical order for accessibility.
- Expected Result: Heading structure is semantically correct.
- Priority: Low

### 64. Analytics page does not show empty chart placeholders indefinitely

- Description: Confirm there is a fallback if chart data is unavailable.
- Expected Result: Fallback or empty state appears.
- Priority: Low

### 65. Jobs page retains state when navigating back

- Description: Navigate away from /jobs and return, then confirm search and filter state is preserved if intended.
- Expected Result: State remains consistent or resets intentionally.
- Priority: Medium

### 66. Navigation links do not cause full page reload

- Description: Click internal nav items and ensure the SPA does not perform a hard reload.
- Expected Result: Route change remains client-side.
- Priority: High

### 67. Filter controls have accessible labels

- Description: Confirm inputs and selects have identifiable labels or placeholders.
- Expected Result: Form controls are accessible.
- Priority: Medium

### 68. Page header text is unique per route

- Description: Ensure each route displays a unique header to avoid confusion.
- Expected Result: Route headers are distinct.
- Priority: Low

### 69. Job cards still render when date is missing

- Description: Verify the UI does not break if the job date field is absent.
- Expected Result: Job card renders without date.
- Priority: Medium

### 70. Clear button is labeled clearly

- Description: Ensure the Clear Filters button text is descriptive enough.
- Expected Result: Button label is clear and understandable.
- Priority: Low
