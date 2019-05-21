import React, {Component} from "react"

class FormPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      passwordValid: false,
      emailValid: false,
      formValid: false,
      submitted: false,
      formErrors: {
        email: "",
        password: ""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.checkInput = this.checkInput.bind(this)
  }

  handleChange(event){
    let name = event.target.name
    let value = event.target.value
    this.setState({[name]: value},
    () => {this.checkInput(name, value)})
  }

  handleSubmit(event){
  event.preventDefault()
  console.log("submitted")
  this.setState({submitted: true})
}

  checkInput(fieldName, value){
    let fieldValidationErrors = this.state.formErrors
    let emailValid = this.state.emailValid
    let passwordValid = this.state.passwordValid

    switch(fieldName) {
    case 'email':
    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    fieldValidationErrors.email = emailValid ? '': 'is invalid';
    break;
    case 'password':
    passwordValid= value.length >= 6;
    fieldValidationErrors.password = passwordValid ? '': 'is too short';
    default:
    break
  }
  this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                  passwordValid: passwordValid
                }, this.validateForm)
}
validateForm(){
this.setState({formValid: this.state.emailValid && this.state.passwordValid})
}
  render(){
    console.log(this.state)

    return <div>
    {!this.state.submitted && (
    <form onSubmit={this.handleSubmit}>
    <input
    name="email"
    type="email"
    value={this.state.email}
    onChange={this.handleChange}

    />
    <input
    name ="password"
    type="password"
    value={this.state.password}
    onChange={this.handleChange}

    />
      <br></br>
      <div>{this.state.formErrors.email}</div>

    <button disabled={!this.state.formValid} type="submit">Submit</button>
    </form>
  )}
  {this.state.submitted && (
    <div>
    <h1>Thank you! </h1>
    </div>
  )}
    </div>
  }
}

export default FormPage
