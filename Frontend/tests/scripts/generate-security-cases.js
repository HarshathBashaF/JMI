import fs from 'fs';
import path from 'path';

const casesDir = path.resolve('tests', 'test-cases');
const casesPath = path.join(casesDir, 'security-vulnerability-cases.json');

if (!fs.existsSync(casesDir)) {
  fs.mkdirSync(casesDir, { recursive: true });
}

const categories = [
  {
    name: "Input Sanitization & XSS Prevention",
    prefix: "XSS",
    count: 40,
    scenarios: [
      "Verify that user inputs in job search fields are escaped before rendering in the DOM.",
      "Verify that query parameters parsed from the URL are sanitized before component rendering.",
      "Confirm that no React components use 'dangerouslySetInnerHTML' without input validation.",
      "Verify that skill filter input trims and strips HTML tags prior to state updates.",
      "Ensure event handlers for keystrokes reject inline script payloads (e.g., javascript: URI).",
      "Check that external API payloads are sanitized before binding to text nodes.",
      "Validate that form submission inputs encode angle brackets '<' and '>' to prevent DOM injection.",
      "Test that the search bar filters out common XSS payload sequences such as '<script>'.",
      "Confirm the absence of document.write() in all frontend components.",
      "Verify client-side routing validates target URLs to prevent open redirect vulnerabilities."
    ]
  },
  {
    name: "Broken Access Control & Routing",
    prefix: "BAC",
    count: 40,
    scenarios: [
      "Verify that authenticated routes like '/dashboard' redirect unauthenticated users to home/login.",
      "Confirm that client-side route guards check the presence of active tokens before loading state.",
      "Ensure that analytics reports are hidden or inaccessible for non-admin user roles.",
      "Verify that navigation controls hide restricted tabs when role permissions are insufficient.",
      "Check that route change events re-evaluate token expiration states.",
      "Ensure state-level guards reject unauthorized component mounting.",
      "Verify that API requests include the authorization header on protected page loads.",
      "Validate that URL modification to sub-routes is intercepted if context auth is empty.",
      "Confirm that session validation hooks reject invalid or expired local session tokens.",
      "Ensure the UI displays a proper access-denied state when a 403 Forbidden is received."
    ]
  },
  {
    name: "Client-Side Storage & Cookie Safety",
    prefix: "CSS",
    count: 40,
    scenarios: [
      "Verify that no plaintext sensitive parameters (e.g. passwords, secret keys) are written to localStorage.",
      "Confirm that session storage keys are cleared immediately upon user logout.",
      "Verify that sensitive cookies are configured with the Secure attribute.",
      "Confirm that cookies containing session markers use the SameSite=Strict configuration.",
      "Ensure HttpOnly is recommended for backend-issued auth cookies.",
      "Check that local cache data is pruned after inactivity thresholds.",
      "Verify that Supabase authentication state keys are stored securely using appropriate adapters.",
      "Ensure that the application does not store PII in persistent unencrypted browser caches.",
      "Validate that IndexedDB stores do not contain sensitive system environment configurations.",
      "Confirm that console logs are suppressed in production to prevent token leakage."
    ]
  },
  {
    name: "Information Disclosure & Env Security",
    prefix: "INF",
    count: 35,
    scenarios: [
      "Verify that production builds exclude source maps to prevent exposing source structure.",
      "Confirm that `.env` files containing local secrets are added to `.gitignore`.",
      "Verify that Vite configuration does not expose sensitive OS environment variables to the bundle.",
      "Check that console.error outputs do not print stack traces or raw API connection parameters in production.",
      "Ensure default passwords or mock developer tokens are removed from source constants.",
      "Verify that public manifests do not disclose developer server internal network paths.",
      "Validate that index.html contains no debug comments or inline server configurations.",
      "Confirm that Vite's define block doesn't bind raw system configurations to global window attributes.",
      "Verify that build bundle metadata files do not leak repository contributor details.",
      "Ensure that client-side error boundaries catch failures without displaying raw database schemas."
    ]
  },
  {
    name: "Secure Network & Protocol Safety",
    prefix: "NET",
    count: 35,
    scenarios: [
      "Verify that all application API endpoints use HTTPS exclusively.",
      "Confirm that WebSocket links (if any) utilize the secure 'wss://' protocol.",
      "Check that the frontend enforces SSL/TLS checks on all third-party external resources.",
      "Ensure HTTP-to-HTTPS redirects are handled at the CDN/Hosting tier.",
      "Verify that Axios or fetch timeout parameters are set to prevent connection exhaustion attacks.",
      "Check that external CSS/JS fonts are loaded from verified HTTPS CDNs.",
      "Verify that CORS policies for target APIs explicitly restrict origin access.",
      "Ensure that no mixed-content warning is triggered in the browser console during navigation.",
      "Validate that external job apply buttons navigate exclusively to HTTPS external targets.",
      "Verify that API requests carry appropriate request identifier headers to track security audits."
    ]
  },
  {
    name: "Injection Prevention & Form Validation",
    prefix: "INJ",
    count: 30,
    scenarios: [
      "Verify that form values are bound via React state properties rather than direct string concat.",
      "Confirm that search expressions do not parse special characters into regex objects dynamically.",
      "Check that numbers are explicitly parsed via Number() or parseInt() before calculations.",
      "Ensure that email inputs enforce standard formatting validators prior to submission.",
      "Verify that alphanumeric constraints are applied to key form input text fields.",
      "Check that no database-like query expressions are constructed on the client side.",
      "Validate that input lengths are restricted on search bars to mitigate buffer or crash threats.",
      "Confirm that special characters in search fields are escaped before API fetch parameters are set.",
      "Verify that state updates discard null or undefined variables safely.",
      "Ensure that user profiles reject binary payload injection strings in standard text fields."
    ]
  },
  {
    name: "Secure Framing & Clickjacking Prevention",
    prefix: "FRA",
    count: 30,
    scenarios: [
      "Verify that the application uses frame-busting scripts or meta tag controls if X-Frame-Options is missing.",
      "Confirm that external links on job cards specify target='_blank' and rel='noopener noreferrer'.",
      "Check that the app renders properly under strict Content Security Policies (CSP).",
      "Verify that the CSP directives restrict scripts to trusted origins and hashes.",
      "Ensure that CSS layouts cannot be easily spoofed via iframe overlays.",
      "Validate that standard click targets enforce boundary checks to prevent click hijack overlays.",
      "Verify that third-party widgets are sandboxed in isolated iframes.",
      "Confirm that third-party scripts do not have write access to the host document cookie scope.",
      "Verify that external inline assets are checked against SRI (Subresource Integrity) hashes.",
      "Ensure no external scripts are loaded dynamically from unvalidated user inputs."
    ]
  }
];

const testCases = [];
let overallId = 1;

for (const cat of categories) {
  const casesPerCategory = cat.count;
  for (let i = 1; i <= casesPerCategory; i++) {
    const scenarioTemplate = cat.scenarios[(i - 1) % cat.scenarios.length];
    const details = i <= cat.scenarios.length ? "" : ` Variant check #${i}`;
    testCases.push({
      id: overallId++,
      category: cat.name,
      code: `${cat.prefix}-${String(i).padStart(3, '0')}`,
      title: `${scenarioTemplate}${details}`,
      expectedResult: `Complies with security policy requirements for ${cat.name}.`,
      priority: i % 3 === 0 ? "High" : (i % 2 === 0 ? "Medium" : "Low")
    });
  }
}

fs.writeFileSync(casesPath, JSON.stringify(testCases, null, 2), 'utf8');
console.log(`Generated ${testCases.length} security vulnerability test cases in ${casesPath}`);
