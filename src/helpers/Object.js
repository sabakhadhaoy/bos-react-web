const NewPrendaState = {
  errorMessage: '',
  isError: false,
  successMessage: '',
  isSuccess: false,
  showModal: true,
  itemModal: false,
  // bgcolor: 'black',

  currentRow: '',
  entryNo: '',
  ptn: '',
  customerid: '',
  firstname: '',
  lastname: '',
  middlename: '',
  cardno: '',
  address: '',
  city: '',
  gender: '',
  telno: '',
  bdate: '',

  branchmanager: '',
  branchcode: '',
  zonecode: '',
  branchname: '',
  branchaddress: '',
  branchbusinesshours: '',
  branchbusinessdays: '',
  branchtin: '',
  corpname: '',
  celno: '',
  employeeres: '',
  employeeuser: '',
  employeeuserfullname: '',

  datenow: '',
  loandate: '',
  matdate: '',
  matdate2: '',
  expirydate: '',
  expirydate2: '',

  items: [],
  karats: [],
  // interests: [],
  sortclasses: [],

  karatRate: '',
  // interest: '',
  withInterest: '',
  interestamt: '',
  dstRate: '',

  row1: {
    itemcode: '',
    itemdesc: '',
  },

  itemquantity: '',
  itemweight: '',
  itemkarat: '',
  itemkaratGrade: '',
  itemkaratCode: '',
  itemcarat: '',
  itemsclass: '',
  appvalue: '',

  row2: {
    itemcode: '',
    itemdesc: '',
  },

  itemquantity2: '',
  itemkarat2: '',
  itemkaratGrade2: '',
  itemkaratCode2: '',
  itemcarat2: '',
  itemsclass2: '',
  itemweight2: '',
  appvalue2: '',

  row3: {
    itemcode: '',
    itemdesc: '',
  },

  itemquantity3: '',
  itemkarat3: '',
  itemkaratGrade3: '',
  itemkaratCode3: '',
  itemcarat3: '',
  itemsclass3: '',
  itemweight3: '',
  appvalue3: '',

  totalAppValue: '',


  loanValue: '',
  netproc: '',
  transType: 'PRENDA',
  bosVersion: 'BOS Web Node v1',

  APPAI_PCT: '',
  APPAI_AMT: '',
  AI_PCT: '',
  AI_AMT: '',
  CASHBUFF: '',
  DAYS_ALLOW: '',
  I_AMT: '',
  I_PCT: '',
  LAUNDERING_LIMIT: '',
  LD_AMT: '',
  LD_PCT: '',
  LD_MONTH: '',
  SF_MOADV: '',
  SC_AMT: '',
  SC_PCT: '',
  SC_VALUE: '',
  M_AMT: '',
  M_MONTH: '',
  MIN_SC: '',
  MAX_SC: '',
  USD_RATE: '',
  PCT_DAYS1MIN: '',
  PCT_DAYS1MAX: '',
  I_PCT1: '',
  PCT_DAYS2MIN: '',
  PCT_DAYS2MAX: '',
  I_PCT2: '',
  PCT_DAYS3MIN: '',
  PCT_DAYS3MAX: '',
  I_PCT3: '',
  PCT_DAYS4MIN: '',
  PCT_DAYS4MAX: '',
  I_PCT4: '',
  PCT_DAYS5MIN: '',
  PCT_DAYS5MAX: '',
  I_PCT5: '',
  DST_PCT: '',
  DST_AMT: '',
  MIN_DST: '',
  MAX_DST: '',
  DST_BASE: '',
  DST_CHARGE: '',
  DST_Collect: '',
  DST_FRACTION: '',
  CT01_MIN: '',
  CT01_MAX: '',
  CT01_AMT: '',

  CT02_MIN: '',
  CT02_MAX: '',
  CT02_AMT: '',

  CT03_MIN: '',
  CT03_MAX: '',
  CT03_AMT: '',

  CT04_MIN: '',
  CT04_MAX: '',
  CT04_AMT: '',

  CT05_MIN: '',
  CT05_MAX: '',
  CT05_AMT: '',

  CT06_MIN: '',
  CT06_MAX: '',
  CT06_AMT: '',

  CT07_MIN: '',
  CT07_MAX: '',
  CT07_AMT: '',

  CT08_MIN: '',
  CT08_MAX: '',
  CT08_AMT: '',

  CT09_MIN: '',
  CT09_MAX: '',
  CT09_AMT: '',

  CT010_MIN: '',
  CT010_MAX: '',
  CT010_AMT: '',

  CT011_MIN: '',
  CT011_MAX: '',
  CT011_AMT: '',

  CT012_MIN: '',
  CT012_MAX: '',
  CT012_AMT: '',

  CT013_MIN: '',
  CT013_MAX: '',
  CT013_AMT: '',

  CT014_MIN: '',
  CT014_MAX: '',
  CT014_AMT: '',

  CT015_MIN: '',
  CT015_MAX: '',
  CT015_AMT: '',

  CT016_MIN: '',
  CT016_MAX: '',
  CT016_AMT: '',

  CT017_MIN: '',
  CT017_MAX: '',
  CT017_AMT: '',
}

const LoginState = {
  userid: '',
  password: '',
  errorMessage: '',
  showModal: false,
  isError: false
}

const CustomerState = {
  firstname: '',
  lastname: '',
  middlename: '',
  errorMessage: '',
  showModal: false,
  isError: false,
  customers: [],
  page: 0
}

export {
  NewPrendaState,
  LoginState,
  CustomerState
}