import React, {Component} from "react"
import "./form.css"

class FormPage3 extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            emailValid: false,
            passwordValid: {
                length: false,
                characters: false
            },
            formErrors: {
                email: "",
                password: {
                    length: "",
                    characters: ""
                }
            },
            formValid: false,
            submitted: false,
            touched: {
                email: false,
                password: false
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.checkInput = this.checkInput.bind(this)
        this.validateForm = this.validateForm.bind(this)

    }
    handleChange(event){
        let name = event.target.name
        let value = event.target.value
        this.setState({[name]: value}, 
            ()=> {this.checkInput(name, value)}
        )
    }

    checkInput(fieldName, value){
        let formErrors = this.state.formErrors
        let emailValid = this.state.emailValid
        let passwordValid = this.state.passwordValid

        switch(fieldName){
            case('email'):
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
            formErrors.email = emailValid ? '' : 'email not valid'
            // assign the value to the resu(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)lt of the ternary 
            break
            case('password'):
            passwordValid.length = value.length >= 6
            passwordValid.characters = value.test(/\d/)
            formErrors.password.length = passwordValid.length ? ' ' : 'password must be 6 characters'
            formErrors.password.characters = passwordValid.characters ? ' ' : 'password must contain at least one number'
            break 
            default:
            break
        }
        this.setState({emailValid:emailValid, 
                    passwordValid: passwordValid, 
                    formErrors: formErrors}, 
                    this.validateForm)
    }

    validateForm(){
        this.setState({formValid: this.state.emailValid && this.state.passwordValid})
    }

    handleBlur(event){
        let field = event.target.name
        this.setState({touched: {...this.state.touched, [field]: true},
        })
    }
    handleSubmit(event){
        event.preventDefault()
        this.setState({submitted: true})
    }

    render(){
        return <div>
            <form onSubmit={this.handleSubmit}>
                <input
                className={this.state.formErrors.email ? "errors": ""}
                type="email"
                name="email"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                />
                <input
                className={this.state.formErrors.password.length || this.state.formErrors.password.characters ? "errors": ""}
                type="password"
                name="password"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                />
                <br>
                </br>
                {this.state.formErrors.email}
                <button disabled={!this.state.formValid} type="submit">
                Submit
                </button>
            </form>

        </div>
    }
}

export default FormPage3