const cron = require("node-cron");
const Loan = require("../services/v1/models/loan/loanModel");

cron.schedule("0 0 1 * *", async () => {
  const loans = await Loan.findAll();

  loans.forEach(async (loan) => {
    // do the monthly update for each record here
    // (remaining_amount + accrued interest)
    // (principal_amount - total_principal_paid)
  });
});
