module.exports = {
  default: {
    require: [
      "features/step-definitions/*.ts",
      "features/support/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "json:reports/cucumber-report.json", "rerun:@rerun.txt"],
    publishQuiet: true,
    retry: 2,   //Retry each failed scenario 2 times
    parallel: 3
  },
  rerun: {
    paths: ["@rerun.txt"],    
    publishQuiet: true,    
    require: [
      "features/step-definitions/*.ts",
      "features/support/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "json:reports/cucumber-report.json", "rerun:@rerun.txt"],
    

  }

};