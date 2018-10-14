import React, { Component } from 'react'; 
import {observer, inject} from 'mobx-react';
import UserBox from './UserBox.js'
 
@inject("store") 
@observer
class UserBoxs extends Component {  
 
  render() {
    console.log(this.props.store.user)
    if(this.props.store.user){
    return (
      <UserBox searchUser={this.props.store.searchUser} user={this.props.store.user} />
    );
  }
  else{
    return (<div>Please choose a user</div>)
  }
  }
}

export default UserBoxs;
