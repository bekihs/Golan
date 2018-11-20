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
      <div className="userBox"> 
      <img className="plusButton" onClick={this.changeUser} src={this.display ?"http://www.haipic.com/icon/4948/4948.png" :"http://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/Button-Add-icon.png" }
        onClick={this.addChild}></img>
        <img src={this.props.user.imageURL} className="userImage"/>
        <span className="userName" onClick={this.changeUser}>{this.props.user.userName}</span>
        
      </div>
      {this.display? <AddForm parentName={this.props.user.userName}/> : null}
      <div className="children">
      {this.getChildren()}
      </div>
      </div>
    );
  }
}

export default UserBox;
