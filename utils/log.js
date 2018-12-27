const chalk = require("chalk");

const Log = type => text => {
  console.log(type(text));
  if (typeof text === "object") {
    console.log(chalk.red("LOGGER ERROR: "));
    console.log(text);
  }
};

module.exports = {
  Print: Log(chalk.white),
  Error: Log(chalk.red),
  Info: Log(chalk.green),
  Warning: Log(chalk.yellow),
  Debug: Log(chalk.cyan),
  Logger: Log(chalk.magenta.underline)
};
