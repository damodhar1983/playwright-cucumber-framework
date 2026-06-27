## 🎭 playwright-cucumber-framework

A modular, scalable end-to-end automation framework built using **Playwright** and **Cucumber (BDD)** with **TypeScript**.  
This framework follows Page Object Model (POM) principles, supports tagging, reporting, reusable utilities, and CI integration.

---
## 🚀 Features

- Playwright browser automation (Chromium, Firefox, WebKit)
- Cucumber BDD with Gherkin feature files
- Page Object Model (POM) structure
- HTML reporting (Cucumber + Playwright)
- execution trace
- Tag-based test execution
- GitHub Actions CI pipeline (runs on every Pull Request to main and every push to main).

---
## 📦 Prerequisites

Ensure the following are installed:

- Node.js (v20 or later recommended)
- npm (included with Node.js)
- Git
- Visual Studio Code (recommended)
- Cucumber (Gherkin) extension

---
## 🔧 Installation and How to Run Tests Locally

1. git clone https://github.com/damodhar1983/playwright-cucumber-framework.git
cd playwright-cucumber-framework

2. Install dependencies
npm install

3. Install Playwright browsers
npx playwright install --with-deps

4. Execute the tests
▶️ Running Tests
Run all tests one by one:
npm run test:report

Run tests with tags:
npx cucumber-js --tags "@TC1"

Run Tests in Parallel:
npm run test:parallel

📊 5. Generate the Reports:
Cucumber HTML Report: After a run the results will be stored in :
reports/cucumber-report.html

Traces & Screenshots:Stored under:

reports/traces/
screenshots/


## 🧱 Project Architecture
```
features/            - Gherkin feature files

step-definitions/    - Step implementations

pages/               - Page Object Model classes

support/             - Hooks and World setup

utils/               - Helper utilities

reports/             - Test reports (HTML, JSON)

traces/              - Playwright trace files

screenshots/         - Failure screenshots

.github/workflows/   - CI pipeline (GitHub Actions)

cucumber.js          - Cucumber configuration

tsconfig.json        - TypeScript configuration

package.json         - Project dependencies and scripts





🔄 **Continuous Integration (GitHub Actions)**
This project includes a CI workflow that runs tests on:
•	Every pull request
•	Every push to main


📍 How to access HTML report + traces from Github
**Follow this path inside GitHub:**
1.	Go to your repository
2.	Click Actions
3.	Open the workflow run (the one that succeeded)
4.	Scroll to the bottom of the page
5.	Look for a section called Artifacts
6.	You will see something like:
Code
reports
Click reports → it downloads a ZIP file.
Inside that ZIP, you will find:
✔ cucumber-report.html

Your full HTML report.
✔ cucumber-report.json

**Raw report data.**
✔ traces/
Playwright trace files (.zip)

**Command to view the trace**
npx playwright show-trace path/to/trace.zip

example: npx playwright show-trace .\traces\Submit_contact_form_successfully.zip



