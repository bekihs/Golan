import React, { Component } from 'react'; 
import {observer, inject} from 'mobx-react';
 
class UserBox extends Component {  

  getChildren(){
    if (this.props.user.Children){
      return this.props.user.Children.map((child)=><UserBox key={child.Child.userName} user={child.Child}/>);
    }
    else 
    return [];
  }
  render() {
    return (
      <div className="parentBox">
        <span className="userName">{this.props.user.userName}</span>
      <div className="userBox"> 
        <img src={this.props.user.imageURL} className="userImage"/>
      </div>
      <div className="children">
      {this.getChildren()}
      </div>
      </div>
    );
  }
}

export default UserBox;
