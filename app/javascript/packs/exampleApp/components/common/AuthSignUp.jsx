import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';

const Api = require('../../middleware/Api')

class AuthSignUpComponent extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>

            {this.getFormErrors().length > 0 && this.state.formSubmitted &&
            <Alert bsStyle="danger">
              <strong>Please correct the following errors:</strong>
              <ul>
                {
                  this.getFormErrors().map((message,index) =>
                    <li key={'error_message_'+index}>{message}</li>
                  )
                }
              </ul>
            </Alert>
            }

            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  id="authEmail"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
                  onChange={this.setEmail}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  id="authPassword"
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  onChange={this.setPassword}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Confirm Password</ControlLabel>
                  <FormControl
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="Re-Enter your password"
                    onChange={this.setConfirmPassword}
                  />
              </FormGroup>

              <Button type="submit">
                Sign Up
              </Button>

            </form>
          </Col>
        </Row>
      </Grid>
    )
  }

  defaultState() {
    return {
      email: {
        value: '',
        error: 'Email is required.'
      },
      password: {
        value: '',
        error: 'Password is required.'
      },
      confirm_password: {
        value: '',
        error: 'Password is required.'
      },
      submit: {
        error: ''
      },
      formSubmitted: false
    }
  }

  constructor(props){
    super(props)

    this.state = this.defaultState();

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setConfirmPassword = this.setConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setEmail(event) {
    let email = event.target.value || ''
    let errorMessage = email.length === 0 ? 'Email is required.' : ''
    this.setState({
      email: {
        value: email,
        error: errorMessage
      }
    })
  }

  setPassword(event) {
    let password = event.target.value || ''
    let errorMessage = password.length === 0 ? 'Password is required.' : ''
    this.setState({
      password: {
        value: password,
        error: errorMessage
      }
    })
  }

  setConfirmPassword(event) {
    let confirm_password = event.target.value || ''
    let errorMessage = confirm_password.length === 0 ? 'Password is required.' : ''
    this.setState({
      confirm_password: {
        value: confirm_password,
        error: errorMessage
      }
    })
  }

  getFormErrors() {
    let fields = ['email', 'password', 'confirm_password', 'submit'];
    let errors = []
    fields.map(field => {
      let fieldError = this.state[field].error || ''
      if (fieldError.length > 0) {
        errors.push(fieldError)
      }
    })
    return errors
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      formSubmitted: true,
      submit: {
        error: ''
      }
    });

    this.state.password.value === this.state.confirm_password.value ?
      Api.authenticateCreateUser(this.state.email.value, this.state.password.value, this.state.confirm_password.value).then(data => {
        if (data.status == 200) {
          Api.authenticateUser(this.state.email.value, this.state.password.value).then(jwt => {
            this.props.propagateSignUp(jwt, this.props.history)
          });
        }else{
          this.setState({
            submit: {
              error: data.message
            }
          });
        }
      }) :
      this.setState({
        submit: {
          error: 'Password Is Not Valid !!'
        }
      })
  }

}

export default AuthSignUpComponent