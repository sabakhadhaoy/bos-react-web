import axios from 'axios';
import { Component } from 'react';

export default class Functions extends Component {

  getDSTRate() {
    const getDSTRateOption = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVICE_API}/getDSTRate`,
      data: {
        bcode: this.state.branchcode,
        zcode: this.state.zonecode
      }
    }

    axios(getDSTRateOption)
      .then(resp => {
        const { respcode, respmsg, respdata } = resp.data;
        setTimeout(() => {
          this.setState(() => ({ showModal: false }))
        }, 1000)

        if (respcode === 1) {
          this.setState({
            dstRate: respdata
          })
        }

        else {
          this.setState(() => ({ showModal: true, errorMessage: respmsg, isError: true }))
        }

      })
      .catch(e => {
        this.setState(() => ({ showModal: true, errorMessage: e.message, isError: true }))
      })
  }

  getEntryNo() {
    const getEntryNoOption = {
      method: 'get',
      url: `${process.env.REACT_APP_SERVICE_API}/getEntryNo/?bcode=${this.state.branchcode}`
    }

    axios(getEntryNoOption)
      .then(resp => {
        const { respcode, respmsg, respdata } = resp.data;
        setTimeout(() => {
          this.setState(() => ({ showModal: false }))
        }, 1000)
        if (respcode === 1) {
          this.setState({
            entryNo: respdata
          })
        }
        else {
          this.setState(() => ({ showModal: true, errorMessage: respmsg, isError: true }))
        }
      })
      .catch(e => {
        this.setState(() => ({ showModal: true, errorMessage: e.message, isError: true }))
      })
  }

  getBranchInfo() {
    const getBranchInfoOption = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVICE_API}/getBranchInfo`,
      data: {
        bcode: this.state.branchcode,
        zcode: this.state.zonecode
      }
    }

    axios(getBranchInfoOption)
      .then(resp => {
        const { respcode, respmsg, respdata } = resp.data;
        setTimeout(() => {
          this.setState(() => ({ showModal: false }))
        }, 1000)

        if (respcode === 1) {
          this.setState({
            branchmanager: respdata[0].BM,
            branchname: respdata[0].bcName,
            branchaddress: respdata[0].bcAddress,
            corpname: respdata[0].CorpName,
            celno: respdata[0].telno,
            branchbusinesshours: respdata[0].BusinessHours,
            branchbusinessdays: respdata[0].BusinessDays,
            branchtin: respdata[0].TIN
          })
        }
        else {
          this.setState(() => ({ showModal: true, errorMessage: respmsg, isError: true }))
        }
      })
      .catch(e => {
        this.setState(() => ({ showModal: true, errorMessage: e.message, isError: true }))
      })
  }

  getServiceRate() {
    const getServiceRateOption = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVICE_API}/getServiceRate`,
      data: {
        bcode: this.state.branchcode,
        zcode: this.state.zonecode
      }
    };

    axios(getServiceRateOption)
      .then(resp => {
        const { respcode, respmsg, respdata } = resp.data;

        let APPAI_AMT, APPAI_PCT, AI_AMT, AI_PCT, CASHBUFF, DAYS_ALLOW, I_AMT, I_PCT, LAUNDERING_LIMIT, LD_AMT, LD_PCT,
          LD_MONTH, SF_MOADV, SC_AMT, SC_PCT, M_AMT, M_MONTH, MIN_SC, MAX_SC, USD_RATE, PCT_DAYS1MIN, PCT_DAYS1MAX,
          I_PCT1, PCT_DAYS2MIN, PCT_DAYS2MAX, I_PCT2, PCT_DAYS3MIN, PCT_DAYS3MAX, I_PCT3, PCT_DAYS4MIN, PCT_DAYS4MAX, I_PCT4, PCT_DAYS5MIN, PCT_DAYS5MAX, I_PCT5,
          DST_PCT, DST_AMT, MIN_DST, MAX_DST, DST_BASE, DST_CHARGE, DST_Collect, DST_FRACTION,
          CT01_MIN, CT01_MAX, CT01_AMT, CT02_MIN, CT02_MAX, CT02_AMT, CT03_MIN, CT03_MAX, CT03_AMT, CT04_MIN, CT04_MAX, CT04_AMT, CT05_MIN, CT05_MAX, CT05_AMT,
          CT06_MIN, CT06_MAX, CT06_AMT, CT07_MIN, CT07_MAX, CT07_AMT, CT08_MIN, CT08_MAX, CT08_AMT, CT09_MIN, CT09_MAX, CT09_AMT, CT10_MIN, CT10_MAX, CT10_AMT,
          CT11_MIN, CT11_MAX, CT11_AMT, CT12_MIN, CT12_MAX, CT12_AMT, CT13_MIN, CT13_MAX, CT13_AMT, CT14_MIN, CT14_MAX, CT14_AMT, CT15_MIN, CT15_MAX, CT15_AMT,
          CT16_MIN, CT16_MAX, CT16_AMT, CT17_MIN, CT17_MAX, CT17_AMT;

        setTimeout(() => {
          this.setState(() => ({ showModal: false }))
        }, 1000)

        if (respcode === 1) {
          respdata.forEach(data => {
            const { loancode, valueamount } = data

            if (loancode === 'APPAI_AMT') {
              APPAI_AMT = valueamount
            }
            if (loancode === 'APPAI_PCT') {
              APPAI_PCT = valueamount
            }
            if (loancode === 'AI_AMT') {
              AI_AMT = valueamount
            }
            if (loancode === 'AI_PCT') {
              AI_PCT = valueamount
            }
            if (loancode === 'CASHBUFF') {
              CASHBUFF = valueamount
            }
            if (loancode === 'DAYS_ALLOW') {
              DAYS_ALLOW = valueamount
            }
            if (loancode === 'I_AMT') {
              I_AMT = valueamount
            }
            if (loancode === 'I_PCT') {
              I_PCT = valueamount
            }
            if (loancode === 'LAUNDERING_LIMIT') {
              LAUNDERING_LIMIT = valueamount
            }
            if (loancode === 'LD_AMT') {
              LD_AMT = valueamount
            }
            if (loancode === 'LD_PCT') {
              LD_PCT = valueamount
            }
            if (loancode === 'LD_MONTH') {
              LD_MONTH = valueamount
            }
            if (loancode === 'SF_MOADV') {
              SF_MOADV = valueamount
            }
            if (loancode === 'SC_AMT') {
              SC_AMT = valueamount
            }
            if (loancode === 'SC_PCT') {
              SC_PCT = valueamount
            }
            if (loancode === 'M_AMT') {
              M_AMT = valueamount
            }
            if (loancode === 'M_MONTH') {
              M_MONTH = valueamount
            }
            if (loancode === 'MIN_SC') {
              MIN_SC = valueamount
            }
            if (loancode === 'MAX_SC') {
              MAX_SC = valueamount
            }
            if (loancode === 'USD_RATE') {
              USD_RATE = valueamount
            }
            if (loancode === 'PCT_DAYS1MIN') {
              PCT_DAYS1MIN = valueamount
            }
            if (loancode === 'PCT_DAYS1MAX') {
              PCT_DAYS1MAX = valueamount
            }
            if (loancode === 'I_PCT1') {
              I_PCT1 = valueamount
            }
            if (loancode === 'PCT_DAYS2MIN') {
              PCT_DAYS2MIN = valueamount
            }
            if (loancode === 'PCT_DAYS2MAX') {
              PCT_DAYS2MAX = valueamount
            }
            if (loancode === 'I_PCT2') {
              I_PCT2 = valueamount
            }
            if (loancode === 'PCT_DAYS3MIN') {
              PCT_DAYS3MIN = valueamount
            }
            if (loancode === 'PCT_DAYS3MAX') {
              PCT_DAYS3MAX = valueamount
            }
            if (loancode === 'I_PCT3') {
              I_PCT3 = valueamount
            }
            if (loancode === 'PCT_DAYS4MIN') {
              PCT_DAYS4MIN = valueamount
            }
            if (loancode === 'PCT_DAYS4MAX') {
              PCT_DAYS4MAX = valueamount
            }
            if (loancode === 'I_PCT4') {
              I_PCT4 = valueamount
            }
            if (loancode === 'PCT_DAYS5MIN') {
              PCT_DAYS5MIN = valueamount
            }
            if (loancode === 'PCT_DAYS5MAX') {
              PCT_DAYS5MAX = valueamount
            }
            if (loancode === 'I_PCT5') {
              I_PCT5 = valueamount
            }
            if (loancode === 'DST_PCT') {
              DST_PCT = valueamount
            }
            if (loancode === 'DST_AMT') {
              DST_AMT = valueamount
            }
            if (loancode === 'MIN_DST') {
              MIN_DST = valueamount
            }
            if (loancode === 'MAX_DST') {
              MAX_DST = valueamount
            }
            if (loancode === 'DST_BASE') {
              DST_BASE = valueamount
            }
            if (loancode === 'DST_CHARGE') {
              DST_CHARGE = valueamount
            }
            if (loancode === 'DST_Collect') {
              DST_Collect = valueamount
            }
            if (loancode === 'DST_FRACTION') {
              DST_FRACTION = valueamount
            }
            if (loancode === 'CT01_MIN') {
              CT01_MIN = valueamount
            }
            if (loancode === 'CT01_MAX') {
              CT01_MAX = valueamount
            }
            if (loancode === 'CT01_AMT') {
              CT01_AMT = valueamount
            }
            if (loancode === 'CT02_MIN') {
              CT02_MIN = valueamount
            }
            if (loancode === 'CT01_MAX') {
              CT02_MAX = valueamount
            }
            if (loancode === 'CT01_AMT') {
              CT02_AMT = valueamount
            }
            if (loancode === 'CT03_MIN') {
              CT03_MIN = valueamount
            }
            if (loancode === 'CT03_MAX') {
              CT03_MAX = valueamount
            }
            if (loancode === 'CT03_AMT') {
              CT03_AMT = valueamount
            }
            if (loancode === 'CT04_MIN') {
              CT04_MIN = valueamount
            }
            if (loancode === 'CT04_MAX') {
              CT04_MAX = valueamount
            }
            if (loancode === 'CT04_AMT') {
              CT04_AMT = valueamount
            }
            if (loancode === 'CT05_MIN') {
              CT05_MIN = valueamount
            }
            if (loancode === 'CT05_MAX') {
              CT05_MAX = valueamount
            }
            if (loancode === 'CT05_AMT') {
              CT05_AMT = valueamount
            }
            if (loancode === 'CT06_MIN') {
              CT06_MIN = valueamount
            }
            if (loancode === 'CT06_MAX') {
              CT06_MAX = valueamount
            }
            if (loancode === 'CT06_AMT') {
              CT06_AMT = valueamount
            }
            if (loancode === 'CT07_MIN') {
              CT07_MIN = valueamount
            }
            if (loancode === 'CT07_MAX') {
              CT07_MAX = valueamount
            }
            if (loancode === 'CT07_AMT') {
              CT07_AMT = valueamount
            }
            if (loancode === 'CT08_MIN') {
              CT08_MIN = valueamount
            }
            if (loancode === 'CT08_MAX') {
              CT08_MAX = valueamount
            }
            if (loancode === 'CT08_AMT') {
              CT08_AMT = valueamount
            }
            if (loancode === 'CT09_MIN') {
              CT09_MIN = valueamount
            }
            if (loancode === 'CT09_MAX') {
              CT09_MAX = valueamount
            }
            if (loancode === 'CT09_AMT') {
              CT09_AMT = valueamount
            }
            if (loancode === 'CT10_MIN') {
              CT10_MIN = valueamount
            }
            if (loancode === 'CT10_MAX') {
              CT10_MAX = valueamount
            }
            if (loancode === 'CT10_AMT') {
              CT10_AMT = valueamount
            }
            if (loancode === 'CT11_MIN') {
              CT11_MIN = valueamount
            }
            if (loancode === 'CT11_MAX') {
              CT11_MAX = valueamount
            }
            if (loancode === 'CT11_AMT') {
              CT11_AMT = valueamount
            }
            if (loancode === 'CT12_MIN') {
              CT12_MIN = valueamount
            }
            if (loancode === 'CT12_MAX') {
              CT12_MAX = valueamount
            }
            if (loancode === 'CT12_AMT') {
              CT12_AMT = valueamount
            }
            if (loancode === 'CT13_MIN') {
              CT13_MIN = valueamount
            }
            if (loancode === 'CT13_MAX') {
              CT13_MAX = valueamount
            }
            if (loancode === 'CT13_AMT') {
              CT13_AMT = valueamount
            }
            if (loancode === 'CT14_MIN') {
              CT14_MIN = valueamount
            }
            if (loancode === 'CT14_MAX') {
              CT14_MAX = valueamount
            }
            if (loancode === 'CT14_AMT') {
              CT14_AMT = valueamount
            }
            if (loancode === 'CT15_MIN') {
              CT15_MIN = valueamount
            }
            if (loancode === 'CT15_MAX') {
              CT15_MAX = valueamount
            }
            if (loancode === 'CT15_AMT') {
              CT15_AMT = valueamount
            }
            if (loancode === 'CT16_MIN') {
              CT16_MIN = valueamount
            }
            if (loancode === 'CT16_MAX') {
              CT16_MAX = valueamount
            }
            if (loancode === 'CT16_AMT') {
              CT16_AMT = valueamount
            }
            if (loancode === 'CT17_MIN') {
              CT17_MIN = valueamount
            }
            if (loancode === 'CT17_MAX') {
              CT17_MAX = valueamount
            }
            if (loancode === 'CT17_AMT') {
              CT17_AMT = valueamount
            }
          })
        }

        else {
          setTimeout(() => {
            this.setState(() => ({ showModal: true, errorMessage: respmsg, isError: true }))
          }, 1000)
        }

        this.setState({
          APPAI_AMT, APPAI_PCT, AI_AMT, AI_PCT, CASHBUFF, DAYS_ALLOW, I_AMT, I_PCT, LAUNDERING_LIMIT, LD_AMT, LD_PCT,
          LD_MONTH, SF_MOADV, SC_AMT, SC_PCT, M_AMT, M_MONTH, MIN_SC, MAX_SC, USD_RATE, PCT_DAYS1MIN, PCT_DAYS1MAX,
          I_PCT1, PCT_DAYS2MIN, PCT_DAYS2MAX, I_PCT2, PCT_DAYS3MIN, PCT_DAYS3MAX, I_PCT3, PCT_DAYS4MIN, PCT_DAYS4MAX, I_PCT4, PCT_DAYS5MIN, PCT_DAYS5MAX, I_PCT5,
          DST_PCT, DST_AMT, MIN_DST, MAX_DST, DST_BASE, DST_CHARGE, DST_Collect,
          DST_FRACTION, CT01_MIN, CT01_MAX, CT01_AMT, CT02_MIN, CT02_MAX, CT02_AMT, CT03_MIN, CT03_MAX, CT03_AMT, CT04_MIN, CT04_MAX, CT04_AMT, CT05_MIN, CT05_MAX, CT05_AMT,
          CT06_MIN, CT06_MAX, CT06_AMT, CT07_MIN, CT07_MAX, CT07_AMT, CT08_MIN, CT08_MAX, CT08_AMT, CT09_MIN, CT09_MAX, CT09_AMT, CT10_MIN, CT10_MAX, CT10_AMT,
          CT11_MIN, CT11_MAX, CT11_AMT, CT12_MIN, CT12_MAX, CT12_AMT, CT13_MIN, CT13_MAX, CT13_AMT, CT14_MIN, CT14_MAX, CT14_AMT, CT15_MIN, CT15_MAX, CT15_AMT,
          CT16_MIN, CT16_MAX, CT16_AMT, CT17_MIN, CT17_MAX, CT17_AMT, withInterest: AI_PCT
        })
      })
      .catch(e => {
        this.setState(() => ({ showModal: true, errorMessage: e.message, isError: true }))
      })
  }

  getPTN() {
    const getPTNOption = {
      method: 'get',
      url: `${process.env.REACT_APP_SERVICE_API}/getPTN/?bcode=${this.state.branchcode}`,
    };

    axios(getPTNOption)
      .then(resp => {
        const { respcode, respmsg, respdata } = resp.data;
        setTimeout(() => {
          this.setState(() => ({ showModal: false }))
        }, 1000)

        if (respcode === 1) {
          this.setState({
            ptn: respdata
          })
        }
        else {
          this.setState(() => ({ showModal: true, errorMessage: respmsg, isError: true }))
        }
      })
      .catch(e => {
        this.setState(() => ({ showModal: true, errorMessage: e.message, isError: true }))
      })
  }

  getItem() {
    const itemoptions = {
      method: 'get',
      url: `${process.env.REACT_APP_SERVICE_API}/getItems/?bcode=${this.state.branchcode}`
    };

    axios(itemoptions)
      .then(resp => {
        const { respcode, respmsg, respdata } = resp.data;
        setTimeout(() => {
          this.setState(() => ({ showModal: false }))
        }, 1000)

        if (respcode === 1) {
          this.setState({
            items: respdata,
          })
        }
        else {
          this.setState(() => ({ showModal: true, errorMessage: respmsg, isError: true }))
        }
      })
      .catch(e => {
        this.setState(() => ({ showModal: true, errorMessage: e.message, isError: true }))
      })
  }

  getKarat() {
    const karatGoptions = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVICE_API}/items/getKaratGrading`,
      data: {
        bcode: this.state.branchcode,
        zcode: this.state.zonecode
      }
    };

    axios(karatGoptions)
      .then(resp => {
        const { respcode, respmsg, respdata } = resp.data;

        setTimeout(() => {
          this.setState(() => ({ showModal: false }))
        }, 1000)

        if (respcode === 1) {
          this.setState({
            karats: respdata,
          })
        }

        else {
          this.setState(() => ({ showModal: true, errorMessage: respmsg, isError: true }))
        }

      })
      .catch(e => {
        this.setState(() => ({ showModal: true, errorMessage: e.message, isError: true }))
      })
  }

  getSortClass() {
    const sortClassOptions = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVICE_API}/items/getSortClass`,
      data: {
        bcode: this.state.branchcode,
        zcode: this.state.zonecode
      }
    };

    axios(sortClassOptions)
      .then(resp => {
        setTimeout(() => {
          this.setState(() => ({ showModal: false }))
        }, 1000)
        if (resp.data.error) {
          console.log(resp.data.error)
        }

        if (resp.data.length) {
          this.setState({
            sortclasses: resp.data
          })
        }
      })
      .catch(e => {
        this.setState(() => ({ showModal: true, errorMessage: e.message, isError: true }))
      })
  }

  computeAppVal = (karatRate, weight) => {
    return karatRate * weight;
  }

  computeInterestAmt = (interest, loanVal) => {
    return loanVal * (interest / 100);
  }

  computeNetProc = (interest, loanVal) => {
    const ai = this.computeInterestAmt(interest, loanVal)
    return loanVal - ai;
  }
}


// const computeAppVal = (karatRate, weight) => {

//   return karatRate * weight;

// }

// const computeInterestAmt = (interest, loanVal) => {
//   return loanVal * (interest / 100)
// }

// const computeNetProc = (interest, loanVal) => {
//   const ai = computeInterestAmt(interest, loanVal)
//   return loanVal - ai
// }

// export {
//   computeAppVal,
//   computeInterestAmt,
//   computeNetProc
// }