import React, {Component} from "react"
import "./form.css"

class FormPage2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      emailValid: false,
      password: "",
      passwordValidLength: false,
      passwordValidCharacters: false, 
      formValid: false,
      submitted: false,
      formErrors: {
        email: "",
        passwordLength: "",
        passwordCharacters: ""
      },
      touched: {
        email: false,
        password: false
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkInput = this.checkInput.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(event){
    let name = event.target.name
    let value = event.target.value
    this.setState({[name]: value},
      // setState can take a callback function as a second argument. 
      // we pass the arrow function check input with the arguments name and value as our second argument to setState
    () => {this.checkInput(name, value)})
  }

  handleSubmit(event){
    event.preventDefault()
    this.setState({submitted: true})
  }

  checkInput(fieldName, value){
    let emailValid = this.state.emailValid
    let formErrors = this.state.formErrors
    let passwordValidLength = this.state.passwordValidLength
    let passwordValidCharacters = this.state.passwordValidCharacters

    switch (fieldName) {
      case "email":
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      //  / = start regex
      // special characters are escaped in brackets 
      // square brackets are a set
      // + sign outside of bracket is telling get one or more matching characters from that set
      // domain name can only be words or dashes
      // last group can only be word characters and has to be at least two long
      formErrors.email = emailValid ? '': 'invalid email'

      break;
      case "password":
       passwordValidLength = value.length >= 6
       passwordValidCharacters = /\d/.test(value)
      //  does value contain a number
       formErrors.passwordLength = passwordValidLength ? '': 'password must be 8 characters'
       formErrors.passwordCharacters = passwordValidCharacters ? '': 'password must contain 1 number'
        break;
      default:
      break

    }   
    this.setState({formErrors: formErrors,
                    emailValid: emailValid,
                    passwordValidLength: passwordValidLength,
                    passwordValidCharacters: passwordValidCharacters,
                    }, this.validateForm)
                    // set state with all our variables and new values, then pass validate form as second argument

  }

  validateForm(){
    this.setState({formValid: this.state.emailValid && this.state.passwordValid})
    // formValid is true if emailValid and passwordValid

  }

  handleBlur(event) {
    // console.log(event.target.name)
    let field = event.target.name
    console.log(field)
    this.setState({ touched: {...this.state.touched, [field]: true},
      // {...this.state.touched} = maintain the rest of the touched state
      // change just the field 
    });
  }

  render(){
    console.log("state", this.state)
    return (<div>
    {!this.state.submitted && (
    <form onSubmit= {this.handleSubmit}>
    <input
      className={this.state.formErrors.email ? "error": ""}
      name= "email"
      type="email"
      value={this.state.email}
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      />
    <input
      className={this.state.formErrors.password ? "error": ""}
      name= "password"
      type="password"
      value={this.state.password}
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      />
      <br></br>
      {this.state.touched.email && (
        <div>{this.state.formErrors.email}</div>
      )}
      {this.state.touched.password && (
        <div>{this.state.formErrors.passwordLength} {this.state.formErrors.passwordCharacters}</div>
      )}
      

    <button disabled={!this.state.formValid} type="submit">Submit</button>
    </form>
  )}
  {this.state.submitted && (
    <div>Thank you!</div>
  )
  }

    </div>
    )
  }
    
}

export default FormPage2
