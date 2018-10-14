import React, { Component } from 'react'; 
import {observer, inject} from 'mobx-react';
import { observable , action} from 'mobx';

@inject("store") 
@observer
class Login extends Component {
  @observable user= {userName : "", imageURL:""};
  @observable display = false;
  
  @action inputChange = (e)=>{
    this.user[e.target.name] = e.target.value;
  }

  @action setForm = () =>{
      this.display = !this.display;
  } 

  searchOrAdd = ()=>{
    if (this.user.userName){
      if (this.display){
        this.props.store.addUser(this.user);
      }else{
        this.props.store.searchUser(this.user.userName) 
      }
    }
    else{
        alert("Please enter a user name");
    }
  }

  render() {
    return (
      <div className="login"> 
        Username :
          <input type="text" name="userName" onChange={this.inputChange} value={this.user.userName} />
          { this.display ?  <div>image URLL <input type="text" name="imageURL" onChange={this.inputChange} value={this.user.imageURL} /></div>:""}
          <button type="button" onClick={this.searchOrAdd}>{!this.display ? "Search" : "Add"}</button>

          <button onClick={this.setForm}>{this.display ? "Search" : "New"}</button>  
      </div>
    );
  }
}

export default Login;
