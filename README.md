# 🎭 Playwright Cucumber Framework

A modular, scalable, end-to-end automation framework built using **Playwright** and **Cucumber (BDD)** with **TypeScript**.  

This framework strictly follows Page Object Model (POM) design principles and comes fully equipped with custom tagging, robust reporting, reusable utilities, and built-in continuous integration.

---

## 🚀 Features

- **Multi-Browser Support**: Cross-browser testing across Chromium, Firefox, and WebKit.
- **Behavior-Driven Development**: Clean Gherkin feature files powered by Cucumber BDD.
- **Page Object Model (POM)**: Scalable, dry, and easily maintainable code architecture.
- **Rich Reporting**: Built-in HTML reporting with embedded screenshots and execution traces.
- **Tag-Based Execution**: Target specific test suites easily using Cucumber tags.
- **CI/CD Ready**: Pre-configured GitHub Actions pipeline that triggers on pushes and pull requests.
- **Automatic Retry for Failed Scenarios**: Built‑in retry mechanism using Cucumber’s --retry flag to re‑run flaky scenarios automatically, improving test stability and reducing false failures.

---

## 📦 Prerequisites

Before getting started, ensure you have the following installed on your local machine:

- **Node.js**: v20 or later (Recommended)
- **npm**: Installed automatically with Node.js
- **Git**: For version control
- **IDE**: Visual Studio Code with the **Cucumber (Gherkin)** extension installed

---

## 🔧 Installation & Local Execution

### 1. Clone and Navigate to the Repository
```bash
git clone https://github.com/damodhar1983/playwright-cucumber-framework.git
cd playwright-cucumber-framework
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Install Playwright System Binary Browsers
```bash
npx playwright install --with-deps
```

### 4. Execute the Tests

* **Run all tests :**
  ```bash
  npm run test:report
  ```
* **Run specific tests using tags:**
  ```bash
  npx cucumber-js --tags "@TC1"
  ```
* **Re-Run failed tests:**
  ```bash
  npm run retry:failed
  ```

### 5. View Test Reports
- **Cucumber HTML Report**: Open `reports/cucumber-report.html` in any browser.
- **Traces & Screenshots**: Debug artifacts are automatically saved inside:
  - `reports/traces/`
  - `screenshots/`
---
##🔐 Environment Variables & Secrets (Required)

#This framework requires two environment variables for both local execution and GitHub Actions CI:

Code
BROWSER=chromium
BASEURL=http://jupiter.cloud.planittesting.com
These control browser selection and the base URL for test execution.

##🖥️ Local Setup (.env file)
Create a .env file in the project root:

Code
BROWSER=chromium
BASEURL=http://jupiter.cloud.planittesting.com
The framework automatically loads this file using dotenv.

☁️ GitHub Actions Setup (Repository Secrets)
GitHub does not copy secrets when someone clones or forks the repository.
Each user must add their own secrets manually.

Steps:
Go to Settings

Select Secrets and variables → Actions

Click New repository secret

Add:

Secret Name	Value
BROWSER	chromium
BASEURL	http://jupiter.cloud.planittesting.com


workflow already maps these secrets:

yaml
env:
  BROWSER: ${{ secrets.BROWSER }}
  BASEURL: ${{ secrets.BASEURL }}
  
---

## 🧱 Project Architecture

| Folder / File | Description |
| :--- | :--- |
| `features/` | Gherkin feature files written in plain text |
| `step-definitions/` | Step definitions mapping Gherkin steps to TypeScript code |
| `pages/` | Page Object Model (POM) elements and component abstractions |
| `support/` | Test lifecycle hooks and Cucumber World configurations |
| `utils/` | Reusable global helper utilities |
| `reports/` | Test execution reports generated in HTML and JSON formats |
| `traces/` | Playwright execution trace files |
| `screenshots/` | Automated screenshots captured during test failures |
| `.github/workflows/`| Continuous Integration pipelines handled via GitHub Actions |
| `cucumber.js` | Main configuration profile settings for Cucumber |
| `tsconfig.json` | Global compilation configuration settings for TypeScript |
| `package.json` | Project dependencies, metadata, and execution scripts |

---

## 🔄 Continuous Integration (GitHub Actions)

This project includes a CI workflow that automatically triggers on:
- Every **Pull Request** targeting the `main` branch.
- Every **Push** directly to the `main` branch.

### 📍 Downloading Reports and Traces from GitHub

1. Navigate to your repository on **GitHub**.
2. Click on the **Actions** tab.
3. Select your latest successful or failed workflow run.
4. Scroll to the bottom of the execution summary page to the **Artifacts** section.
5. Click **Code reports** to download the compressed ZIP file.

### 🔍 Viewing Your Downloaded Artifacts

Extract the downloaded ZIP file to find your assets:
- `cucumber-report.html` — Your interactive web-viewable HTML test report.
- `cucumber-report.json` — Raw JSON data used for third-party dashboard ingestions.
- `traces/` — Compressed Playwright trace files (`.zip`).

To open and visually inspect a test recording trace, run the following command in your terminal:

```bash
npx playwright show-trace path/to/trace.zip
```

**Example:**
```bash
npx playwright show-trace .\traces\Submit_contact_form_successfully.zip
```
