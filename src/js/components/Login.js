import React, { Component } from 'react';
import fire from '../../config/fire';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handelChenge = this.handelChenge.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSingup = this.handleSingup.bind(this);
  }

  handelChenge = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleSingup = event => {
    event.preventDefault();

    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => console.log(res))
      .catch(er => console.l);
  };

  handleLogin = event => {
    event.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        localStorage.clear();
        localStorage.setItem('email', res.user.email);
        console.log('in login res>>>', res.user.email);
      })
      .catch(err => {
        console.log('in login catch', err);
      });
  };
  render() {
    return (
      <div>
        <form onChange={this.handelChenge}>
          <label>
            Enter Email
            <input type="email" name="email" value={this.state.email} />
          </label>
          <label>
            Enter password
            <input
              type="password"
              name="password"
              value={this.state.password}
            />
          </label>
          <button onClick={this.handleLogin}>Login</button>
          <button onClick={this.handleSingup}>Singup</button>
        </form>
      </div>
    );
  }
}

export default Login;
