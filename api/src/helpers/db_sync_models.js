const User = require("../services/v1/models/userModel");
const Client = require("../services/v1/models/clientModel");
const City = require("../services/v1/models/cityModel");
const SubCity = require("../services/v1/models/subCityModel");
const MemberEdu = require("../services/v1/models/memberEduModel");
const MemberType = require("../services/v1/models/memberTypeModel");
const Member = require("../services/v1/models/memberModel");
const MemberLot = require("../services/v1/models/memberLots");
const MemberId = require("../services/v1/models/memberIdModel");
const MemberJob = require("../services/v1/models/memberJobModel");
const MemberEC = require("../services/v1/models/memberECModel");
const MemberAddress = require("../services/v1/models/memberAddressModel");
const Child = require("../services/v1/models/child/childModel");
const ChildAddress = require("../services/v1/models/child/childAddressModel");
const Interest = require("../services/v1/models/common/interestModel");
const Loan = require("../services/v1/models/loan/loanModel");
const LoanPayment = require("../services/v1/models/loan/loanPaymentModel");
const LoanRequest = require("../services/v1/models/loan/loanRequestModel");
const RegistrationFee = require("../services/v1/models/common/registrationFeeModel");
const Saving = require("../services/v1/models/saving/savingModel");
const SavingDeposit = require("../services/v1/models/saving/savingDepositModel");
const Withdrawal = require("../services/v1/models/saving/withdrawalModel");
const SpecialSaving = require("../services/v1/models/special_saving/specialSavingModel");
const SpecialSavingDeposit = require("../services/v1/models/special_saving/specialSavingDepositModel");
// DEV
async function migrate_tables() {
  try {
    if (!User) {
      throw new Error("userModel is not defined");
    }
    await User.sync();
    await Client.sync();
    await City.sync();
    await SubCity.sync();
    await MemberType.sync();
    await MemberEdu.sync();
    await Member.sync();
    await MemberAddress.sync();
    await MemberJob.sync();
    await MemberEC.sync();
    await MemberId.sync();
    await MemberLot.sync();
    await Child.sync();
    await ChildAddress.sync();
    await Interest.sync();
    await Loan.sync();
    await LoanPayment.sync();
    await LoanRequest.sync();
    await RegistrationFee.sync();
    await Saving.sync();
    await Withdrawal.sync();
    await SavingDeposit.sync();
    await SpecialSaving.sync();
    await SpecialSavingDeposit.sync();
    console.log("Table Migrated Successfully");
    return true;
  } catch (error) {
    console.error("Error synchronizing database:", error);
    return false;
  }
}

module.exports = migrate_tables;
