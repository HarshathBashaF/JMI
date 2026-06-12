# 📱 Appium Mobile E2E Testing Suite

Comprehensive end-to-end mobile testing for the JMI Frontend application using Appium with Android devices/emulators.

## 📋 Overview

This testing suite provides complete mobile application coverage including:
- **UI/UX Testing** - Layout, components, responsiveness
- **Functional Testing** - Navigation, search, filters, forms
- **API Testing** - Backend connectivity and data validation
- **Accessibility Testing** - Touch targets, contrast, readability
- **Performance Testing** - Page load times, responsiveness
- **Responsive Design** - Testing across multiple screen sizes
- **101 Test Cases** - Comprehensive test catalog

## 📁 Folder Structure

```
tests/appium/
├── mobile-appium-test.js          # Main E2E test suite (101 tests)
├── test-cases/
│   └── appium-test-catalog.json   # Test case definitions
├── results/
│   ├── appium-e2e-results.json    # Raw test results (JSON)
│   ├── appium-e2e-results.xlsx    # Excel report with summary & breakdown
│   └── appium-analysis.md         # Detailed analysis report
├── report/
│   └── generate-analysis.js       # Report generation script
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

1. **Appium Server** - Install and running
   ```bash
   npm install -g appium
   # Or use npx
   npx appium
   ```

2. **Android SDK & Tools**
   - Java JDK 11+ (set `JAVA_HOME`)
   - Android SDK Platform Tools
   - Android AVD emulator or physical device
   - `adb` configured

3. **Node.js & Dependencies**
   ```bash
   pnpm install
   ```

### Quick Start

**1. Start Appium Server (Terminal 1)**
```bash
npx appium
# or globally: appium
```

**2. Ensure Device is Ready (Terminal 2)**
```bash
# Check device list
adb devices

# For emulator: Launch via Android Studio or
emulator -avd <emulator_name>

# For device: Enable USB debugging → Connect → Accept RSA prompt
```

**3. Run Tests (Terminal 3)**
```bash
# Mobile browser (Chrome) - recommended for local testing
pnpm run test:appium

# Generate analysis report
node tests/appium/report/generate-analysis.js
```

## 🎯 Running Tests

### Mobile Browser Testing (Recommended)
```bash
# Uses Chrome browser on Android device
pnpm run test:appium

# Custom app URL
APP_URL=http://192.168.1.100:5174 pnpm run test:appium
```

### Native Android App Testing
```bash
# Test via APK file
ANDROID_APP_APK=/path/to/app-debug.apk pnpm run test:appium

# Test via package/activity
ANDROID_APP_PACKAGE=com.example.jmi \
ANDROID_APP_ACTIVITY=.MainActivity \
pnpm run test:appium
```

### Custom Appium Server
```bash
# Custom host/port
APPIUM_HOST=192.168.1.50 APPIUM_PORT=4723 pnpm run test:appium
```

### Port Forwarding (Mobile Web)
```bash
# Forward device port to host (for local Vite dev server)
adb reverse tcp:5174 tcp:5174

# Or use your machine's LAN IP
APP_URL=http://<YOUR_LAN_IP>:5174 pnpm run test:appium
```

## 📊 Test Coverage

### Test Categories (101 Total Tests)

| Category | Tests | Purpose |
|----------|-------|---------|
| Setup | 1-2 | Session initialization |
| Home Page | 10-12 | Hero, features, CTAs |
| Navigation | 20 | Route transitions |
| Dashboard | 30-31 | Layout, cards |
| Jobs Page | 40-47 | Search, filters, results |
| Analytics | 50-51 | Charts, graphs |
| Responsive | 60-62 | Mobile/Tablet/Desktop |
| API & Performance | 70 | Backend validation |
| Form Interactions | 80-81 | Input handling |
| Accessibility | 90-92 | WCAG compliance |
| Routing | 100-101 | Navigation stability |

### Test Statuses
- ✅ **PASS** - Test completed successfully
- ❌ **FAIL** - Test failed with error
- ⚠️ **PARTIAL** - Test partially passed

## 📈 Reports Generated

### 1. Excel Report (`appium-e2e-results.xlsx`)
Three sheets:
- **Appium E2E Results** - All test cases with details
- **Summary** - Total, pass, fail, partial, pass %
- **By Category** - Breakdown by test category

### 2. Analysis Report (`appium-analysis.md`)
- Executive summary
- Category breakdown
- Failed/partial tests details
- Recommendations
- Device information

### 3. JSON Report (`appium-e2e-results.json`)
- Raw test data
- Timestamps
- Full error messages

## 🔍 Viewing Results

```bash
# View latest results
ls -la tests/appium/results/

# Generate analysis
node tests/appium/report/generate-analysis.js

# Open Excel report
open tests/appium/results/appium-e2e-results.xlsx

# View markdown analysis
cat tests/appium/results/appium-analysis.md
```

## 🔧 Configuration

### Environment Variables

```bash
# Appium server
APPIUM_HOST=127.0.0.1
APPIUM_PORT=4723

# Android platform
ANDROID_PLATFORM_NAME=Android
ANDROID_AUTOMATION_NAME=UiAutomator2
ANDROID_DEVICE_NAME="Android Emulator"

# App targeting (pick one)
ANDROID_APP_APK=/path/to/app.apk              # Native app APK
ANDROID_APP_PACKAGE=com.example.app           # Native app package
ANDROID_APP_ACTIVITY=.MainActivity            # Native app activity
ANDROID_BROWSER_NAME=Chrome                   # Mobile browser

# URLs
APP_URL=http://localhost:5174
API_URL=https://backend-6o6o.onrender.com/jobs
```

## 🐛 Troubleshooting

### Appium Connection Failed
```bash
# Verify Appium server is running
curl http://127.0.0.1:4723/wd/hub/status

# If port in use, kill process
lsof -i :4723 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Restart Appium
npx appium
```

### Device Not Found
```bash
# List connected devices
adb devices

# If offline/unauthorized:
# 1. Check USB debugging is enabled
# 2. Accept RSA prompt on device
# 3. Try: adb kill-server && adb start-server
```

### Elements Not Found
```bash
# Check selectors are valid
# Verify device/emulator is ready
# Add debugging to mobile-appium-test.js to inspect DOM

# Enable logging
APPIUM_LOG_LEVEL=debug pnpm run test:appium
```

### Tests Timing Out
```bash
# Increase wait timeouts in mobile-appium-test.js
# Ensure network connectivity
# Check backend API is responding
```

## 📱 Tested Resolutions

- **Mobile** - 375x667 (iPhone 6/7 equivalent)
- **Tablet** - 768x1024 (iPad equivalent)
- **Desktop** - 1920x1080 (Full HD)

## 🎯 Pass Rate Targets

- **Ideal**: 100%
- **Acceptable**: ≥ 95%
- **Warning**: 90-95%
- **Critical**: < 90%

## 🔄 CI/CD Integration

### GitHub Actions
```yaml
- name: Run Appium Tests
  env:
    APPIUM_HOST: ${{ secrets.APPIUM_HOST }}
  run: pnpm run test:appium

- name: Generate Analysis
  if: always()
  run: node tests/appium/report/generate-analysis.js

- name: Upload Reports
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: appium-reports
    path: tests/appium/results/
```

## 📝 Adding New Tests

1. Edit `mobile-appium-test.js`
2. Add test code in appropriate section
3. Record result with unique testId:
```javascript
try {
  const element = await driver.elementByXPath("//xpath");
  // Test logic
  record(testId, "Category", "Title", "PASS", "Details");
} catch (e) {
  record(testId, "Category", "Title", "FAIL", e.message);
}
```
4. Update `test-cases/appium-test-catalog.json`

## 🔗 Related Documentation

- [Selenium E2E Tests](../e2e/) - Browser testing
- [Unit Tests](../unit/) - Component testing
- [Test Reports](../report/) - Report generation
- [Appium Official Docs](http://appium.io)

## 📞 Support

- **Appium Issues** - Check [Appium Docs](http://appium.io/docs/)
- **Device Issues** - See Android documentation
- **Test Failures** - Review analysis report and logs
- **Selectors** - Inspect using Android Studio Layout Inspector

---

**Last Updated**: 2026-06-12  
**Framework**: Appium + WebDriver (Node.js)  
**Coverage**: 101 test cases across all major user flows

Regenerate combined report (includes Appium results)
```bash
node tests/report/generate-report.js
```

If you want, run the prereq checker:
```powershell
powershell -ExecutionPolicy Bypass -File tests/appium/check-prereqs.ps1
```

Troubleshooting
- If `test-analysis.xlsx` is open, the generator will write a timestamped fallback file.
- If chromedriver mismatch occurs, download the matching chromedriver binary and pass `CHROMEDRIVER_PATH`.

Contact me if you want CI config (GitHub Actions) to run these tests automatically.
