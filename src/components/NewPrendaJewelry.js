import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem, TextField, Icon, Button, InputAdornment, Fab,
  RadioGroup, FormControlLabel, FormControl, FormLabel, Radio
} from '@material-ui/core';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import NewIcon from '@material-ui/icons/Refresh';
import CancelIcon from '@material-ui/icons/Cancel';
import Navbar from './Navbar';
import CompanyLogo from '../images/Diamante.png';
import ModalLoading from '../helpers/Modal';
import { NewPrendaStyles, InputProps, ReadOnlyInputProps } from '../styles/styles';
import { NewPrendaState } from '../helpers/Object';
import Functions from '../helpers/Functions';

class NewPrendaForm extends Functions {
  constructor(props) {
    super(props)

    this.state = NewPrendaState
    this.toggle = this.toggle.bind(this);
    this.toggleItem = this.toggleItem.bind(this);

  }

  toggle() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  toggleItem() {
    this.setState({
      itemModal: !this.state.itemModal
    });
  }

  toggleItemWithId(currentRow) {
    return () => {
      this.setState({
        itemModal: !this.state.itemModal,
        currentRow
      });
    }
  }

  componentDidMount() {

    const datenow = moment().format('YYYY-MM-DD HH:mm:ss');
    const loandate = moment().format('MM/DD/YYYY');
    const matdate1 = moment().add(1, 'month').calendar();
    const matdate2 = moment(matdate1).subtract(1, 'day').calendar();
    const matdate = moment(matdate2).format('YYYY-MM-DD');
    const expirydate1 = moment().add(6, 'month').calendar();
    const expirydate2 = moment(expirydate1).subtract(1, 'day').calendar();
    const expirydate = moment(expirydate2).format('YYYY-MM-DD');

    const customer = JSON.parse(localStorage.getItem('customerdetails'));
    const userdetails = JSON.parse(localStorage.getItem('userdetails'));
    const Customer = customer[0];
    const User = userdetails[0];
    const Birthdate = moment(Customer.Birthdate).format('YYYY-MM-DD');

    this.setState((currentState) => ({
      ...currentState,
      customerid: Customer.CustID,
      firstname: Customer.FirstName,
      lastname: Customer.LastName,
      middlename: Customer.MiddleName,
      cardno: Customer.cardno,
      address: Customer.Street,
      city: Customer.ProvinceCity,
      gender: Customer.Gender,
      telno: Customer.PhoneNo,
      bdate: Birthdate,
      branchcode: User.curbranch,
      zonecode: User.curzone,
      employeeres: User.ResourceID,
      employeeuser: User.UserLogin,
      employeeuserfullname: User.fullname,
      datenow,
      loandate,
      matdate,
      matdate2,
      expirydate,
      expirydate2
    }), () => {
      this.getDSTRate();
      this.getEntryNo();
      this.getBranchInfo();
      this.getServiceRate();
      this.getPTN();
      this.getItem();
      this.getKarat();
      this.getSortClass();
    })

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const self = this.state;

    if (!self.row1.itemcode.length || !self.row1.itemdesc.length || !self.itemquantity.length || !self.itemkarat.length || !self.itemcarat.length || !self.itemsclass.length || !self.itemweight.length || !self.loanValue.length) {
      this.setState(() => ({ errorMessage: 'No transaction to process', isError: true }))
    }
    else {
      this.setState({
        errorMessage: '',
        isError: false,
        totalAppValue: self.appvalue + self.appvalue2 + self.appvalue3
      })

      const options = {
        method: 'post',
        url: `${process.env.REACT_APP_SERVICE_API}/saveNewPrenda`,
        data: self
      };

      axios(options)
        .then(resp => {
          const { respcode, respmsg } = resp.data

          this.setState(() => ({ showModal: true }))

          if (respcode === 1) {
            setTimeout(() => {
              this.setState(() => ({ successMessage: respmsg, isSuccess: true }))
            }, 1000)
          }

          else {
            setTimeout(() => {
              this.setState(() => ({ errorMessage: respmsg, isError: true, loanValue: '', netproc: '' }))
            }, 1000)
          }
        })
        .catch(e => {
          this.setState(() => ({ errorMessage: e.message, isError: true, loanValue: '', netproc: '', interestamt: '' }))
        })
    }
  }

  handleRadio = event => {
    this.setState({ withInterest: event.target.value });
  };

  handleChange = name => event => {

    switch (event.target.name) {

      case 'itemquantity':
        const itemquantity = event.target.value
        if (!itemquantity || itemquantity.match(/^\d+$/)) {
          this.setState({
            itemquantity,
          })
        }
        break;

      case 'itemcarat':
        const itemcarat = event.target.value
        if (!itemcarat || itemcarat.match(/^\d{1,}(\.\d{0,9})?$/)) {
          this.setState({
            itemcarat
          })
        }
        break;

      case 'itemweight':
        const itemweight = event.target.value
        if (!itemweight || itemweight.match(/^\d{1,}(\.\d{0,9})?$/)) {
          this.setState({
            itemweight
          }, () => {
            if (this.state.itemkarat && this.state.itemweight) {
              this.setState({
                appvalue: this.computeAppVal(this.state.itemkarat, this.state.itemweight)
              })
            }
          })
        }
        break;

      case 'itemkarat':

        const itemkaratRate = event.target.value
        const selectedKarat = this.state.karats.filter(karat => karat.karatGrade === itemkaratRate);

        this.setState({
          itemkarat: selectedKarat[0].karatRate,
          itemkaratGrade: selectedKarat[0].karatGrade,
          itemkaratCode: selectedKarat[0].karatCode
        }, () => {
          if (this.state.itemkarat && this.state.itemweight) {
            this.setState({
              appvalue: this.computeAppVal(this.state.itemkarat, this.state.itemweight)
            })
          }
        })
        break;

      case 'itemquantity2':
        const itemquantity2 = event.target.value
        if (!itemquantity2 || itemquantity2.match(/^\d+$/)) {
          this.setState({
            itemquantity2,
          })
        }
        break;

      case 'itemcarat2':
        const itemcarat2 = event.target.value
        if (!itemcarat2 || itemcarat2.match(/^\d{1,}(\.\d{0,9})?$/)) {
          this.setState({
            itemcarat2
          })
        }
        break;

      case 'itemweight2':
        const itemweight2 = event.target.value
        if (!itemweight2 || itemweight2.match(/^\d{1,}(\.\d{0,9})?$/)) {
          this.setState({
            itemweight2
          }, () => {
            if (this.state.itemkarat2 && this.state.itemweight2) {
              this.setState({
                appvalue2: this.computeAppVal(this.state.itemkarat2, this.state.itemweight2)
              })
            }
          })
        }
        break;

      case 'itemkarat2':

        const itemkaratRate2 = event.target.value
        const selectedKarat2 = this.state.karats.filter(karat => karat.karatGrade === itemkaratRate2);

        this.setState({
          itemkarat2: selectedKarat2[0].karatRate,
          itemkaratGrade2: selectedKarat2[0].karatGrade,
          itemkaratCode2: selectedKarat2[0].karatCode
        }, () => {
          if (this.state.itemkarat2 && this.state.itemweight2) {
            this.setState({
              appvalue2: this.computeAppVal(this.state.itemkarat2, this.state.itemweight2)
            })
          }
        })
        break;

      case 'itemquantity3':
        const itemquantity3 = event.target.value
        if (!itemquantity3 || itemquantity3.match(/^\d+$/)) {
          this.setState({
            itemquantity3,
          })
        }
        break;

      case 'itemcarat3':
        const itemcarat3 = event.target.value
        if (!itemcarat3 || itemcarat3.match(/^\d{1,}(\.\d{0,9})?$/)) {
          this.setState({
            itemcarat3
          })
        }
        break;

      case 'itemweight3':
        const itemweight3 = event.target.value
        if (!itemweight3 || itemweight3.match(/^\d{1,}(\.\d{0,9})?$/)) {
          this.setState({
            itemweight3
          }, () => {
            if (this.state.itemkarat3 && this.state.itemweight3) {
              this.setState({
                appvalue3: this.computeAppVal(this.state.itemkarat3, this.state.itemweight3)
              })
            }
          })
        }
        break;

      case 'itemkarat3':
        const itemkaratRate3 = event.target.value
        const selectedKarat3 = this.state.karats.filter(karat => karat.karatGrade === itemkaratRate3);

        this.setState({
          itemkarat3: selectedKarat3[0].karatRate,
          itemkaratGrade3: selectedKarat3[0].karatGrade,
          itemkaratCode3: selectedKarat3[0].karatCode
        }, () => {
          if (this.state.itemkarat3 && this.state.itemweight3) {
            this.setState({
              appvalue3: this.computeAppVal(this.state.itemkarat3, this.state.itemweight3)
            })
          }
        })
        break;

      case 'loanValue':
        const loanValue = event.target.value
        if (!loanValue || loanValue.match(/^\d{1,}(\.\d{0,2})?$/)) {
          this.setState({
            loanValue,
            interestamt: this.computeInterestAmt(this.state.withInterest, loanValue),
            netproc: this.computeNetProc(this.state.withInterest, loanValue)
          })
        };
        break;
      case 'appvalue':
        const appvalue = event.target.value
        if (!appvalue || appvalue.match(/^\d{1,}(\.\d{0,2})?$/)) {
          this.setState({
            appvalue
          })
        }
        break;

      default:
        const { value } = event.target;
        this.setState({
          [name]: value,
        })
    }
  };

  handleItemSelect(id) {

    const itemSelected = this.state.items.filter(item => item.ItemCode === id);
    const row = this.state.currentRow;
    this.setState({
      itemModal: false,
      [row]: {
        itemcode: itemSelected[0].ItemCode,
        itemdesc: itemSelected[0].Description
      }
    })
  }

  onSubmit() {
    window.location.reload()
  }

  render() {
    const { classes } = this.props;
    const self = this.state;

    let data = self.items.map(o => {
      return (
        <tr key={o.ItemCode} className={classes.tableRow} onDoubleClick={() => this.handleItemSelect(o.ItemCode)}>
          <td>
            {o.ItemCode}
          </td>
          <td>
            {o.Description}
          </td>
        </tr>
      )
    });



    return (
      <div>
        <Navbar />
        <ModalLoading
          toggleModal={this.toggle}
          isError={self.isError}
          errMessage={self.errorMessage}
          open={self.showModal}
          isSuccess={self.isSuccess}
          succMessage={self.successMessage}
          onClick={this.onSubmit}
        />
        <Modal style={{ width: '350px' }} isOpen={self.itemModal} toggle={this.toggleItem} >
          <ModalBody>
            <table className="table" style={{ textAlign: 'center', margin: 0 }}>
              <thead className={classes.tableHead}>
                <tr>
                  <th>
                    Item Code
                  </th>
                  <th>
                    Item Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {data}
              </tbody>
            </table>
          </ModalBody>
        </Modal>

        <div style={{ margin: '40px auto', width: '80%' }}>
          <form onSubmit={this.handleSubmit} className={classes.container} >
            <div className='space-between'>
              <div>
                <TextField
                  error
                  id="outlined-ptn"
                  label="PTN"
                  className={classes.textField}
                  value={self.ptn}
                  margin="normal"
                  style={{ maxWidth: 165 }}
                  //variant="outlined"
                  InputLabelProps={{
                    className: 'small'
                  }}
                  InputProps={ReadOnlyInputProps}

                />
              </div>
              <div>
                <img src={CompanyLogo} height="35px" alt="ML" />
              </div>
            </div>
            <div className="space-around">
              <TextField
                id="outlined-fname"
                label="Customer ID"
                className={classes.textField}
                value={self.customerid}
                margin="normal"
                //variant="outlined"
                //style={{ maxWidth: 180 }}
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}

              />
              <TextField
                id="outlined-fname"
                label="First Name"
                className={classes.textField}
                value={self.firstname}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}

              />
              <TextField
                id="outlined-lname"
                label="Last Name"
                value={self.lastname}
                className={classes.textField}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
              />
              <TextField
                id="outlined-mname"
                label="Middle Name"
                value={self.middlename}
                className={classes.textField}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
              />
              <TextField
                id="outlined-cardno"
                label="ML Card No."
                className={classes.textField}
                value={self.cardno}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
              />
              <TextField
                id="outlined-telno"
                label="Telephone No."
                value={self.telno}
                className={classes.textField}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
              />
            </div>
            <div className="space-around">
              <TextField
                id="outlined-address"
                label="Address"
                style={{ width: 560, margin: '6px 5px' }}
                value={self.address}
                // fullWidth
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
              />
              <TextField
                id="outlined-city"
                label="City"
                className={classes.textField}
                value={self.city}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
              />
              <TextField
                id="outlined-gender"
                label="Gender"
                value={self.gender}
                className={classes.textField}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
              />
              <TextField
                id="outlined-bdate"
                label="Birthdate"
                className={classes.textField}
                value={self.bdate}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
              />
            </div>

            <div className="space-around">
              <div style={{ margin: '3px auto' }}>
                <Fab
                  style={{ width: 35, height: 35 }}
                  onClick={this.toggleItemWithId('row1')}
                  size="small"
                  color="primary"
                  aria-label="Search"
                  className={classes.margin}>
                  <SearchIcon />
                </Fab>
              </div>
              <TextField

                id="outlined-itemcode"
                label="Item Code"
                className={classes.itemField}
                name='itemcode'
                value={self.row1.itemcode}
                style={{ width: 90 }}
                onChange={this.handleChange('itemcode')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />
              <TextField

                id="outlined-itemdesc"
                label="Item Description"
                name='itemdesc'
                value={self.row1.itemdesc}
                style={{ width: 250, margin: '6px 5px' }}
                onChange={this.handleChange('itemdesc')}
                // fullWidth
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={InputProps}


              />
              <TextField
                style={{ maxWidth: 70 }}
                id="outlined-itemquantity"
                label="Quantity"
                name="itemquantity"
                className={classes.itemField}
                value={self.itemquantity}
                onChange={this.handleChange('itemquantity')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small',
                }}
                InputProps={InputProps}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />
              <TextField
                id="outlined-select-karat"
                style={{ width: 70 }}
                select
                name="itemkarat"
                label="Karat"
                className={classes.itemField}
                onChange={this.handleChange('itemkarat')}
                value={self.itemkaratGrade}
                InputLabelProps={{
                  className: 'small'
                }}
                SelectProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  MenuProps: {
                    className: classes.menu,

                  },
                }}

                margin="normal"
              //variant="outlined"
              >
                {self.karats.map(karat => (
                  <MenuItem key={karat.karatGrade} value={karat.karatGrade}>
                    {karat.karatGrade}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                style={{ maxWidth: 100 }}
                id="outlined-itemcarat"
                label="Carat"
                name="itemcarat"
                className={classes.itemField}
                value={self.itemcarat}
                onChange={this.handleChange('itemcarat')}
                margin="normal"
                //variant="outlined"
                InputProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  endAdornment: <InputAdornment position="end">G</InputAdornment>,
                }}
                InputLabelProps={{
                  className: 'small'
                }}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />

              <TextField
                id="outlined-select-class"
                select
                style={{ width: 140 }}
                label="Sorting Class"
                name="itemsclass"
                className={classes.itemField}
                value={self.itemsclass}
                onChange={this.handleChange('itemsclass')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                SelectProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  MenuProps: {
                    className: classes.menu,

                  },
                }}
              >
                {self.sortclasses.map(sclass => (
                  <MenuItem key={sclass.valueamount} value={sclass.valueamount}>
                    {sclass.valueamount}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                style={{ maxWidth: 90 }}
                id="outlined-itemweight"
                label="Weight"
                name="itemweight"
                className={classes.itemField}
                value={self.itemweight}
                onChange={this.handleChange('itemweight')}
                margin="normal"
                //variant="outlined"
                InputProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  endAdornment: <InputAdornment position="end">G</InputAdornment>,
                }}
                InputLabelProps={{
                  className: 'small'
                }}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />

              <TextField
                style={{ maxWidth: 140 }}
                id="outlined-appvalue"
                name="appvalue"
                label="Appraised Value"
                placeholder="0.00"
                className={classes.itemField}
                value={self.appvalue}
                onChange={this.handleChange('appvalue')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                }}
              />
            </div>
            <div className="space-around">
              <div style={{ margin: '3px auto' }}>
                <Fab
                  style={{ width: 35, height: 35 }}
                  onClick={this.toggleItemWithId('row2')}
                  size="small"
                  color="primary"
                  aria-label="Search"
                  className={classes.margin}>
                  <SearchIcon />
                </Fab>
              </div>
              <TextField

                id="outlined-itemcode"
                label="Item Code"
                className={classes.itemField}
                name='itemcode2'
                value={self.row2.itemcode}
                style={{ width: 90 }}
                onChange={this.handleChange('itemcode2')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />
              <TextField

                id="outlined-itemdesc"
                label="Item Description"
                name='itemdesc2'
                value={self.row2.itemdesc}
                style={{ width: 250, margin: '6px 5px' }}
                onChange={this.handleChange('itemdesc2')}
                // fullWidth
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={InputProps}

              />
              <TextField
                style={{ maxWidth: 70 }}
                id="outlined-itemquantity"
                label="Quantity"
                name="itemquantity2"
                className={classes.itemField}
                value={self.itemquantity2}
                onChange={this.handleChange('itemquantity2')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={InputProps}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />
              <TextField
                id="outlined-select-karat"
                style={{ width: 70 }}
                select
                name="itemkarat2"
                label="Karat"
                className={classes.itemField}
                value={self.itemkarat2}
                onChange={this.handleChange('itemkarat2')}
                InputLabelProps={{
                  className: 'small'
                }}
                SelectProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  MenuProps: {
                    className: classes.menu,

                  },
                }}

                margin="normal"
              //variant="outlined"
              >
                {self.karats.map(karat => (
                  <MenuItem key={karat.karatGrade} value={karat.karatGrade}>
                    {karat.karatGrade}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                style={{ maxWidth: 100 }}
                id="outlined-itemcarat"
                label="Carat"
                name="itemcarat2"
                className={classes.itemField}
                value={self.itemcarat2}
                onChange={this.handleChange('itemcarat2')}
                margin="normal"
                //variant="outlined"
                InputProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  endAdornment: <InputAdornment position="end">G</InputAdornment>,
                }}
                InputLabelProps={{
                  className: 'small'
                }}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />

              <TextField
                id="outlined-select-class"
                select
                style={{ width: 140 }}
                label="Sorting Class"
                name="itemsclass2"
                className={classes.itemField}
                value={self.itemsclass2}
                onChange={this.handleChange('itemsclass2')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                SelectProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  MenuProps: {
                    className: classes.menu,

                  },
                }}
              >
                {self.sortclasses.map(sclass => (
                  <MenuItem key={sclass.valueamount} value={sclass.valueamount}>
                    {sclass.valueamount}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                style={{ maxWidth: 90 }}
                id="outlined-itemweight"
                label="Weight"
                name="itemweight2"
                className={classes.itemField}
                value={self.itemweight2}
                onChange={this.handleChange('itemweight2')}
                margin="normal"
                //variant="outlined"
                InputProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  endAdornment: <InputAdornment position="end">G</InputAdornment>,
                }}
                InputLabelProps={{
                  className: 'small'
                }}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}

              />

              <TextField
                style={{ maxWidth: 140 }}
                id="outlined-appvalue"
                name="appvalue2"
                label="Appraised Value"
                placeholder="0.00"
                className={classes.itemField}
                value={self.appvalue2}
                onChange={this.handleChange('appvalue2')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                }}
              />
            </div>
            <div className="space-around">
              <div style={{ margin: '3px auto' }}>
                <Fab
                  style={{ width: 35, height: 35 }}
                  onClick={this.toggleItemWithId('row3')}
                  size="small"
                  color="primary"
                  aria-label="Search"
                  className={classes.margin}>
                  <SearchIcon />
                </Fab>
              </div>
              <TextField

                id="outlined-itemcode"
                label="Item Code"
                className={classes.itemField}
                name='itemcode3'
                value={self.row3.itemcode}
                style={{ width: 90 }}
                onChange={this.handleChange('itemcode3')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={ReadOnlyInputProps}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />
              <TextField

                id="outlined-itemdesc"
                label="Item Description"
                name='itemdesc3'
                value={self.row3.itemdesc}
                style={{ width: 250, margin: '6px 5px' }}
                onChange={this.handleChange('itemdesc3')}
                // fullWidth
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={InputProps}

              />
              <TextField
                style={{ maxWidth: 70 }}
                id="outlined-itemquantity"
                label="Quantity"
                name="itemquantity3"
                className={classes.itemField}
                value={self.itemquantity3}
                onChange={this.handleChange('itemquantity3')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={InputProps}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />
              <TextField
                id="outlined-select-karat"
                style={{ width: 70 }}
                select
                name="itemkarat3"
                label="Karat"
                className={classes.itemField}
                value={self.itemkarat3}
                onChange={this.handleChange('itemkarat3')}
                InputLabelProps={{
                  className: 'small'
                }}
                SelectProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  MenuProps: {
                    className: classes.menu,

                  },
                }}

                margin="normal"
              //variant="outlined"
              >
                {self.karats.map(karat => (
                  <MenuItem key={karat.karatGrade} value={karat.karatGrade}>
                    {karat.karatGrade}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                style={{ maxWidth: 100 }}
                id="outlined-itemcarat"
                label="Carat"
                name="itemcarat3"
                className={classes.itemField}
                value={self.itemcarat3}
                onChange={this.handleChange('itemcarat3')}
                margin="normal"
                //variant="outlined"
                InputProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  endAdornment: <InputAdornment position="end">G</InputAdornment>,
                }}
                InputLabelProps={{
                  className: 'small'
                }}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />

              <TextField
                id="outlined-select-class"
                select
                style={{ width: 140 }}
                label="Sorting Class"
                name="itemsclass3"
                className={classes.itemField}
                value={self.itemsclass3}
                onChange={this.handleChange('itemsclass3')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                SelectProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  MenuProps: {
                    className: classes.menu,

                  },
                }}
              >
                {self.sortclasses.map(sclass => (
                  <MenuItem key={sclass.valueamount} value={sclass.valueamount}>
                    {sclass.valueamount}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                style={{ maxWidth: 90 }}
                id="outlined-itemweight"
                label="Weight"
                name="itemweight3"
                className={classes.itemField}
                value={self.itemweight3}
                onChange={this.handleChange('itemweight3')}
                margin="normal"
                //variant="outlined"
                InputProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  endAdornment: <InputAdornment position="end">G</InputAdornment>,
                }}
                InputLabelProps={{
                  className: 'small'
                }}
                inputProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
              />

              <TextField
                style={{ maxWidth: 140 }}
                id="outlined-appvalue"
                name="appvalue3"
                label="Appraised Value"
                placeholder="0.00"
                className={classes.itemField}
                value={self.appvalue3}
                onChange={this.handleChange('appvalue3')}
                margin="normal"
                //variant="outlined"
                InputLabelProps={{
                  className: 'small'
                }}
                InputProps={{
                  style: {
                    height: 30,
                    marginTop: 3
                  },
                  startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                }}
              />
            </div>

            <div className='space-between'>
              <div style={{ width: 250 }}>
                <div style={{ borderLeft: '3px solid #2196F3', backgroundColor: '#ddffff', padding: 8, margin: 8, }}>
                  <div className="space-between">
                    <small><strong>Date Loan Granted :</strong></small>
                    <small><strong>{self.loandate}</strong></small>
                  </div>
                  <div className="space-between">
                    <small><strong>Maturity Date :</strong></small>
                    <small><strong>{self.matdate2}</strong></small>
                  </div>
                  <div className="space-between">
                    <small><strong>Expiry Date : </strong></small>
                    <small><strong>{self.expirydate2}</strong></small>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-between">
                  <div >
                    <RadioGroup
                      style={{ height: 0 }}
                      aria-label="position"
                      name="position"
                      value={self.withInterest}
                      onChange={this.handleRadio}
                      row
                    >
                      <FormControlLabel
                        value={self.AI_PCT}
                        control={<Radio color="primary" />}
                        label="With Advance Interest"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="0.0"
                        control={<Radio color="primary" />}
                        label="No Advance Interest"
                        labelPlacement="end"
                      />

                    </RadioGroup>
                  </div>
                  <div>
                    <TextField
                      style={{ maxWidth: 140 }}
                      id="outlined-loanVal"
                      name="loanValue"
                      label="Loan Value"
                      placeholder="0.00"
                      value={self.loanValue}
                      className={classes.textField}
                      onChange={this.handleChange('loanValue')}
                      margin="normal"
                      //variant="outlined"
                      InputLabelProps={{
                        className: 'small'
                      }}
                      InputProps={{
                        style: {
                          height: 30,
                          marginTop: 3
                        },
                        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                      }}
                    />
                  </div>
                </div>
                {/* <div className="space-between">
                  <div >
                    <RadioGroup
                      style={{ height: 0 }}
                      aria-label="position"
                      name="position"
                      value={self.withInterest}
                      onChange={this.handleRadio}
                      row
                    >
                      <FormControlLabel
                        value={self.AI_PCT}
                        control={<Radio color="primary" />}
                        label="Regular Appraisal"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="0.0"
                        control={<Radio color="primary" />}
                        label="Special Appraisal"
                        labelPlacement="end"
                      />

                    </RadioGroup>
                  </div>
                  <div>
                    <TextField
                      style={{ maxWidth: 140 }}
                      id="outlined-loanVal"
                      name="loanValue"
                      label="Loan Value"
                      placeholder="0.00"
                      value={self.loanValue}
                      className={classes.textField}
                      onChange={this.handleChange('loanValue')}
                      margin="normal"
                      //variant="outlined"
                      InputLabelProps={{
                        className: 'small'
                      }}
                      InputProps={{
                        style: {
                          height: 30,
                          marginTop: 3
                        },
                        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                      }}
                    />
                  </div>
                </div> */}
                <div className='flex-end'>

                  <TextField
                    style={{ maxWidth: 140 }}
                    id="outlined-interestamt"
                    name="interestamt"
                    label="Interest"
                    placeholder="0.00"
                    value={self.interestamt}
                    className={classes.textField}
                    onChange={this.handleChange('interestamt')}
                    margin="normal"
                    //variant="outlined"
                    InputLabelProps={{
                      className: 'small'
                    }}
                    InputProps={{
                      readOnly: true,
                      style: {
                        height: 30,
                        marginTop: 3
                      },
                      startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                    }}
                  />
                </div>

                <div className='flex-end'>
                  <TextField
                    style={{ maxWidth: 140 }}
                    id="outlined-netproc"
                    name="netproc"
                    label="Net Proceed"
                    placeholder="0.00"
                    value={self.netproc}
                    className={classes.textField}
                    onChange={this.handleChange('netproc')}
                    margin="normal"
                    //variant="outlined"
                    InputLabelProps={{
                      className: 'small'
                    }}
                    InputProps={{
                      readOnly: true,
                      style: {
                        height: 30,
                        marginTop: 3

                      },
                      startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='flex-end' style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.cancelButton}>
                <CancelIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Cancel
      				</Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                onClick={this.toggle}
                className={classes.saveButton}>
                <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Save
      				</Button>
            </div>
          </form >
        </div>
      </div>
    );
  }
}

NewPrendaForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(NewPrendaStyles)(NewPrendaForm);