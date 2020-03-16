import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
// import { MessageModal } from '../helpers/Modal';
import ModalLoading from '../helpers/Modal';
import Navbar from './Navbar';
import moment from 'moment';
import { CustomerStyles, InputProps } from '../styles/styles';
import { CustomerState } from '../helpers/Object';

class Customer extends Component {
  constructor(props) {
    super(props)

    this.state = CustomerState;
    this.toggle = this.toggle.bind(this);
    this.handleCustomerSelect = this.handleCustomerSelect.bind(this)
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  toggle() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    if (!value || value.match(/^[A-Za-z]+$/)) {
      this.setState(() => ({
        [name]: value.toUpperCase()
      }));
    }
  }

  handleCustomerSelect = (id) => {

    const { customers } = this.state
    const customerSelected = customers.filter(customer => customer.CustID === id);

    localStorage.setItem('customerdetails', JSON.stringify(customerSelected));
    this.props.history.push('/qcl');

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, middlename } = this.state;

    if (!lastname) {
      this.setState(() => ({ errorMessage: 'Please input lastname', isError: true, }))
    }

    else if (!firstname) {
      this.setState(() => ({ errorMessage: 'Please input firstname', isError: true, }))
    }

    else {
      const options = {
        method: 'post',
        url: process.env.REACT_APP_SEARCH_CUSTOMER_API,
        data: {
          lastname,
          firstname,
          middlename
        }
      };

      axios(options)
        .then(resp => {
          const { respcode, respmsg, respdata } = resp.data
          this.setState(() => ({ showModal: true, isError: false }))

          if (respcode === 1) {
            setTimeout(() => {
              this.setState({
                showModal: false,
                customers: respdata,
                page: 0
              })
            }, 1000)
          }
          else {
            setTimeout(() => {
              this.setState(() => ({ errorMessage: respmsg, isError: true, firstname: '', lastname: '', middlename: '' }))
            }, 1000)
          }
        })
        .catch(e => {
          this.setState(() => ({ errorMessage: e.message, isError: true, firstname: '', lastname: '', middlename: '' }))
        })
    }
  }

  render() {
    const { classes } = this.props;
    const { customers, showModal, errorMessage, isError, page } = this.state;
    const itemsToDisplay = 5;
    const startIndex = page * itemsToDisplay;
    const visibleItems = customers.slice(startIndex, startIndex + itemsToDisplay)
    let data;

    if (visibleItems.length > 0) {
      data = visibleItems.map(o => {
        const Birthdate = moment(o.Birthdate).format('YYYY-MM-DD')
        return (
          <tr key={o.CustID} className={classes.tableRow} onDoubleClick={() => this.handleCustomerSelect(o.CustID)}>
            <td>
              {o.CustID}
            </td>
            <td>
              {o.cardno}
            </td>
            <td>
              {o.LastName}
            </td>
            <td>
              {o.FirstName}
            </td>
            <td>
              {o.MiddleName}
            </td>
            <td>
              {o.Street}
            </td>
            <td>
              {o.Gender}
            </td>
            <td>
              {Birthdate}
            </td>
            <td>
              {o.Mobile}
            </td>
            <td>
              {o.Gender}
            </td>
          </tr>
        )
      });
    }


    return (

      <div>
        <Navbar />
        <ModalLoading
          toggleModal={this.toggle}
          isError={isError}
          errMessage={errorMessage}
          open={showModal}
        />
        <div>
          <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
            <div className="space-between">
              <div className="space-around">
                <TextField
                  autoFocus
                  id="outlined-lname"
                  label="Last Name"
                  name="lastname"
                  value={this.state.lastname}
                  className={classes.textField}
                  onChange={this.handleChange}
                  margin="normal"
                  //variant="outlined"
                  InputLabelProps={{
                    className: 'small'
                  }}
                  InputProps={InputProps}
                />
                <TextField
                  id="outlined-fname"
                  label="First Name"
                  name="firstname"
                  className={classes.textField}
                  value={this.state.firstname}
                  onChange={this.handleChange}
                  margin="normal"
                  //variant="outlined"
                  InputLabelProps={{
                    className: 'small'
                  }}
                  InputProps={InputProps}
                />
                <TextField
                  id="outlined-mname"
                  name="middlename"
                  label="Middle Name"
                  value={this.state.middlename}
                  className={classes.textField}
                  onChange={this.handleChange}
                  margin="normal"
                  //variant="outlined"
                  InputLabelProps={{
                    className: 'small'
                  }}
                  InputProps={InputProps}
                />
              </div>
              <div className="space-around">
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  onClick={this.toggle}
                  className={classes.searchButton}>
                  <SearchIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                  Search
      		      </Button>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.addButton}>
                  <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                  New
      		      </Button>
              </div>
            </div>
            <div style={{ margin: 8, overflowX: 'auto' }}>
              <table className="table" style={{ width: 1000 }} >
                <thead className={classes.tableHead}>
                  <tr>
                    <th>
                      Customer ID
                    </th>
                    <th>
                      Card No.
                    </th>
                    <th>
                      Last Name
                    </th>
                    <th>
                      First Name
                    </th>
                    <th>
                      Middle Name
                    </th>
                    <th>
                      Street
                    </th>
                    <th>
                      City
                    </th>
                    <th>
                      Birth Date
                    </th>
                    <th>
                      Mobile
                    </th>
                    <th>
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data}
                </tbody>
              </table>
            </div>
            <div className="flex-end">
              <div style={{ margin: 5 }}>
                <Button
                  variant="contained"
                  size="small"
                  type="button"
                  onClick={this.previousPage}
                  className={classes.pageButton}>
                  <i className="fa fa-chevron-circle-left"></i>&nbsp; Prev
      		      </Button>
                <Button
                  variant="contained"
                  type="button"
                  size="small"
                  onClick={this.nextPage}
                  className={classes.pageButton}>
                  Next &nbsp;<i className="fa fa-chevron-circle-right"></i>
                </Button>
              </div>
            </div>
          </form >
        </div>
      </div>
    );
  }
}

Customer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(CustomerStyles)(Customer);