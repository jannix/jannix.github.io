import React from 'react';
import "./_signin-form.scss";
//import * as Constants from "../../constants/apiconst";

export default class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};

    }

    handleChangeState(targetName, targetValue) {
        this.setState({[targetName]: targetValue});
    }

    handleChangeEmail(event) {
        //TODO: check email format
        this.handleChangeState(event.target.name, event.target.value);
    }

    handleChangePassword(event) {
        //TODO: check password format
        this.handleChangeState(event.target.name, event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();

        /*fetch(Constants.API_AUTH+'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                //TODO: keep token, go to home page (for now user details page)
            })
            .catch((error) => {
                console.error('Error:', error);
            });*/
    }

    render() {
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit}>
                    <h2 id="login-form-title">Connexion</h2>
                    <div className="login-form-inputs-container">


                    </div>
                    <div className="login-form-btns-container">
                        <button onClick={this.props.onClickReturn}>Retour</button>
                        <button>Suivant</button>
                    </div>
                </form>
            </div>
        );
    }
}
