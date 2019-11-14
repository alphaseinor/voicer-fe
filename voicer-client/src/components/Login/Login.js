import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Label } from 'reactstrap';
import { login } from '../../actions/login';
import NavBar from '../Home/NavBar';
import jwt from 'jsonwebtoken';

class Login extends Component {
    state = {
        creds: {
            username: '',
            password: ''
        },
        error: false
    }

    changeHandler = e => {
        this.setState({
            creds: {
                ...this.state.creds,
                [e.target.name]: e.target.value
            }
        }); 
    }
    
    submitHandler = e => {
        e.preventDefault();
    
        const { username, password } = this.state.creds
    
        this.props.login({
            username: username,
            password: password
        })
        .then(() => {
            if (localStorage.getItem('token')) {
                return this.props.userType === "client" ?
                    this.props.history.push('/client') :
                    this.props.history.push('/talent')
            } else {
                this.setState({ error: true });
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        const { username, password } = this.state.creds;

        return (
                <div>
                <NavBar className="navbar"/>
                <div className="login-page">

                  <div className="input-box">
                        <h2>Log In</h2>
                        <Form onSubmit={this.submitHandler}>
                            <Label className="input-label" for="username">Username</Label>
                            <Input
                                className="input"
                                type="text"
                                value={username}
                                name="username"
                                onChange={this.changeHandler}
                            />
                            <Label className="input-label" for="password">Password</Label>
                            <Input
                                className="input"
                                type="password"
                                value={password}
                                name="password"
                                onChange={this.changeHandler}
                            />


                          <Button type="submit" size="lg" className="btn-orange btn-centered">Log In</Button>

                            {this.state.error ? <p>There was an error.</p> : null}
                        </Form>
                  </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggingIn: state.loginReducer.logginIn,
    id: state.loginReducer.id,
    userType: state.loginReducer.userType
})

export default connect(
    mapStateToProps,
    { login }
)(Login)
