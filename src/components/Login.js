import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import imageLogo from '../images/Diamante.png';
import nameLogo from '../images/mlhuillier_heading_white.png';
import ModalLoading from '../helpers/Modal';
import { LoginState } from '../helpers/Object';

export default class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = LoginState;
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value.toUpperCase()
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { userid, password } = this.state;

    if (!userid) {
      this.setState(() => ({ errorMessage: 'Please input username', isError: true, }))
    }

    else if (!password) {
      this.setState(() => ({ errorMessage: 'Please input password', isError: true, }))
    }

    else {

      this.setState(() => ({ errorMessage: '', isError: false, password: '' }))

      const options = {
        method: 'post',
        url: process.env.REACT_APP_LOGIN_API,
        data: {
          userid,
          password
        }
      }

      axios(options)
        .then(resp => {

          const { respcode, respmsg, respdata } = resp.data

          if (respcode === 1) {
            setTimeout(() => {
              this.setState(() => ({ showModal: false }))
              localStorage.setItem('userdetails', JSON.stringify(respdata));
              this.props.history.push('/customer')
            }, 1000)
          }
          else {
            setTimeout(() => {
              this.setState(() => ({ errorMessage: respmsg, isError: true, password: '' }))
            }, 1000)
          }
        })

        .catch(e => {
          this.setState(() => ({ errorMessage: e.message, isError: true, password: '' }))
        })
    }
  }


  render() {
    const { showModal, errorMessage, isError, userid, password } = this.state;
    return (
      <div>
        <ModalLoading
          toggleModal={this.toggle}
          isError={isError}
          errMessage={errorMessage}
          open={showModal}
        />
        <div className="LoginForm">
          <Form onSubmit={this.handleSubmit}>
            <div className="logo">
              <img src={imageLogo} className="imageLogo" alt="Logo" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src={nameLogo} className="nameLogo" alt="Logo" />
            </div>
            <div className='input-login-password'>
              <FormGroup>
                <small style={{ color: 'white' }}>Username</small>
                <Input
                  autoFocus
                  name="userid"
                  type="text"
                  value={userid}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <small style={{ color: 'white' }}>Password</small>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
            <Button
              color="primary"
              type="submit"
              block
              onClick={this.toggle}
            >
              Login
            </Button>
            <div style={{ color: 'white', textAlign: 'right', paddingTop: 20 }}>
              <h6>Version 1.0</h6>
            </div>
          </Form>
        </div >
      </div>
    )
  }
}