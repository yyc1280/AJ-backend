// const options = {
//   OperationMode: "Test", //Test or Production
//   MercProfile: {
//     MerchantID: "2000132",
//     HashKey: "5294y06JbISpM5x9",
//     HashIV: "v77hoKGq4kWxNNIS",
//   },
//   IgnorePayment: [
//     //    "Credit",
//     //    "WebATM",
//     //    "ATM",
//     //    "CVS",
//     //    "BARCODE",
//     //    "AndroidPay"
//   ],
//   IsProjectContractor: false,
// }
const options = {
  OperationMode: "Production", //Test or Production
  MercProfile: {
    MerchantID: "3230302",
    HashKey: "iu2HxHP80BItKdGm",
    HashIV: "gAceJiTgKySiIPzo",
  },
  IgnorePayment: [
    //    "Credit",
    //    "WebATM",
    //    "ATM",
    //    "CVS",
    //    "BARCODE",
    //    "AndroidPay"
  ],
  IsProjectContractor: false,
}

module.exports = options
