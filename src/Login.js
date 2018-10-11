import React, { Component } from 'react'; 
import {observer, inject} from 'mobx-react';


@observer
class Login extends Component {
  render() {
    loginOrRegisterUser = (e)=>{
      if (e.target.value){
        this.props.store.loginOrRegisterUser(e.target.value);
      }
      else{
          alert("Please enter a user name");
      }
    }
    return (
      <div className="login"> 
      <form>
        Username :
          <input type="text" />
          <button onClick={this.loginOrRegisterUser}/>
          </form>
      </div>
    );
  }
}

export default Login;
