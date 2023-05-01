const cron = require("node-cron");
const Loan = require("../services/v1/models/loan/loanModel");

const updateLoanBalances = async () => {
  const loans = await Loan.findAll();

  loans.forEach(async (loan) => {
    // do the monthly update for each record here
    // (remaining_amount + accrued interest)
    // (principal_amount - total_principal_paid)
    console.log("cron started today");
  });
};

cron.schedule("0 0 1 * *", updateLoanBalances);
