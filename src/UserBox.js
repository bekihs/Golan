import React, { Component } from 'react'; 
import {observer, inject} from 'mobx-react';
import { observable , action} from 'mobx';
import AddForm from './AddForm'
 
@observer
  class UserBox extends Component {  
  @observable display =  false;

  @action addChild=()=>{
      this.display = !this.display;
}
  changeUser=()=>{
    this.props.searchUser(this.props.user.userName);
  }
  getChildren(){
    if (this.props.user.Children){
      return this.props.user.Children.map((child)=><UserBox searchUser={this.props.searchUser} key={child.userName} user={child}/>);
    }
    else 
    return [];
  }
  render() {
    return (
      <div className="parentBox">
        <span className="userName">{this.props.user.userName}</span>
      <div className="userBox" onClick={this.changeUser}> 
        <img src={this.props.user.imageURL} className="userImage"/>
      </div>
      <div className="children">
      {this.getChildren()}
      <div className="addChild" onClick={this.addChild}>{!this.display?"+addChild":"hide"}</div>
      {this.display? <AddForm parentName={this.props.user.userName}/> : null}
      </div>
      </div>
    );
  }
}

export default UserBox;
