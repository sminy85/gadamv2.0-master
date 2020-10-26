import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {TextField, OutlinedInput, InputAdornment, IconButton} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import '../css/Login.css'
import axios from 'axios'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  forceRefresh: true
});
const location = history.location;
history.listen((location, action) => {
  console.log(action, location.pathname, location.state);
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

class Login extends React.Component {

  constructor () {
    super();
    this.state = {
      username: "",
      password: "",
      user: ""};
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleLogout (event) {
    this.setState({user: ""});
    this.setState({username: ""});
    this.setState({password: ""});
    localStorage.clear();
  };

  handleUsernameChange (event) {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange (event) {
    this.setState({password: event.target.value});
  };

  componentDidMount () {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      this.setState({user: foundUser});
    }
  };

  login (event) {
    event.preventDefault();
    const request = {
      email: document.getElementById('exampleInputEmail1').value,
      password: document.getElementById('exampleInputPassword1').value
    };

    // axios.post('http://localhost:3000/login', request)
    //   .then(resp => {
    //     if (resp.data.message === 'successful login!') {
    //       history.push("/");
    //       return resp;
    //     } else {
    //       alert(resp.data.message);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    async function checkLogin() {
      const response = await axios.get('http://localhost:3000/login'
      );

      return new Promise(function(resolve, reject) {
        fetch('http://localhost:3000/login', request)
        .then(resp => {
          if (resp.data.message === 'successful login!') {
            history.push("/");
            return resp;
          } else {
            alert(resp.data.message);
          }
        });
      });
    }

    // this.setState({user: this.username});
    // store the user in localStorage
    localStorage.setItem("user", JSON.stringify(this.username));
  }

  render () {
    if (this.state.username === !null) {
      return (
        <div>
          {this.state.username} is loggged in
          <button onClick={this.handleLogout}>logout</button>
        </div>
      );
    }
  return (
    <div className="main">
    <b><p className="logintitle">Login</p></b>
    <form name="fo" className="login_form" method="get" onSubmit={this.login}>
    {/* <form name="fo" className="login_form" method="get" onSubmit={onSubmitHandler}> */}
      <div className="loginfo_id">
        <label for='exampleInputEmail1'><b><p id="un">Username</p></b></label>
        <input type="text" size={20} id='exampleInputEmail1'
          placeholder="enter a username"
          onChange={this.handleUsernameChange.bind(this)} />
        {/* <laberl>User Name</laberl>
        <input type="email" value={Email} onChange={onEmailHandler} /> */}
      </div>
      <div className="loginfo_pw">
        <label for='exampleInputPassword1'><b><p id="pw" >Password</p></b></label>
        <input id='exampleInputPassword1' type="password" size={20}
        placeholder="enter a password"
        onChange={this.handlePasswordChange.bind(this)} />
        {/* <laberl>Password</laberl>
        <input type="password" value={Password} onChange={onPasswordHandler} /> */}
        </div>
      <div className="login_btn">
        <input type="submit" Value="LOG IN" />
      </div>
      <div className="loginfo_bottom">
        <div className='storedId'>
          <input classname="remember_id" type="checkbox"/>
          <p>아이디 저장</p>
        </div>
        <li><NavLink to='/findidpw'>아이디/비밀번호 찾기</NavLink></li>
      </div>
      <br />
      <div className='gojoin-gadam'>
        <p id="notyet">아직 가담가담 회원이 아니신가요?</p>
        <li><NavLink id='go_to_join' to='/register'>회원가입 바로가기</NavLink></li>
      </div>
    </form>
    <hr />
    <h1 className="loginsubtitle">SNS LOG IN</h1>
    <div className="snslogin_btn">
      <a id="custom-login-btn" href="javascript:loginWithKakao()">
        <img width={222} src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" />
      </a>
      <p id="token-result" />
    </div>
  </div>
  )
      }
}

export default Login;