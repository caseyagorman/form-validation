import React, {Component} from "react"

class FormPage2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      emailValid: false,
      password: "",
      passwordValid: false,
      formErrors: {
        email: "",
        password: ""
      },
      formValid: false,
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkInput = this.checkInput.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  handleChange(event){
    let name = [event.target.name]
    let value = event.target.value
    this.setState({name: value})
    () => this.checkInput(name, value)

  }

  handleSubmit(event){
    event.preventDefault()
    this.setState({submitted: true})


  }

  checkInput(fieldName, value){
    let formErrors = this.state.formErrors
    switch (fieldName) {
      case "email":
      value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      formErrors.email = this.state.emailValid ? '': 'invalid email'

        break;
      case "password":
        value.length > 8
        formErrors.password = this.state.passwordValid ? '': 'too short'

        break;
      default:

    }

  }

  validateForm(){

  }

  render(){
    return <div>
    {!this.state.submitted && (
    <form onSubmit= {this.handleSubmit}>
    <input
      name= "email"
      type="email"
      value={this.state.email}
      onChange={this.handleChange}
      />
    <input
      name= "password"
      type="password"
      value={this.state.password}
      onChange={this.handleChange}/>

    <button disable={this.state.formValid} type="submit">Submit</button>
    </form>
  )}
  {this.state.submitted && (
    <div>Thank you!</div>
  )
  }

    </div>
  }
}

export default FormPage2
