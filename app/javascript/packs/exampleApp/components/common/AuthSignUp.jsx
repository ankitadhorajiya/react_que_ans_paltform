import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';

const Api = require('../../middleware/Api')

class AuthSignUpComponent extends React.Component {

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
        value: [],
        error: 'Password is required.'
      },
      category_ids: {
        value: '',
        error: 'Please select at least one.'
      },
      submit: {
        error: ''
      },
      formSubmitted: false,
      options: []
    }
  }

  constructor(props){
    super(props)

    this.state = this.defaultState();

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setConfirmPassword = this.setConfirmPassword.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Api.getOptions().then(data => {
      if (data.length != 0) {
        this.setState({
          options: (data != undefined ? data : [])
        });
      }
    })
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

  handleSelectChange(event) {
    var value = [];
    let selected_val = event.target.options || ''
    let errorMessage = selected_val.lengh === 0 ? 'Please select at least one.' : ''
    for (var i = 0, l = selected_val.length; i < l; i++) {
      if (selected_val[i].selected) {
        value.push(selected_val[i].value)
      }
    }
    this.setState({
      category_ids: {
        value: value,
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
      Api.authenticateCreateUser(this.state.email.value, this.state.password.value, this.state.confirm_password.value, this.state.category_ids.value).then(data => {
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

  render() {
    const options = this.state.options;

    const renderOptions = options.map(option => {
      return (
        <option key={option.id} value={option.id}>{option.name}</option>
      )
    });

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

              <FormGroup>
                <ControlLabel>Interest field</ControlLabel>
                <FormControl componentClass='select' multiple onChange={this.handleSelectChange}>
                  {renderOptions}
                </FormControl>
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

}

export default AuthSignUpComponent
