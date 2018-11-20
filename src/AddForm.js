import React, { Component } from 'react'; 
import {observer, inject} from 'mobx-react';
import { observable , action} from 'mobx';

@inject("store") 
@observer
class AddForm extends Component {
  @observable user= {userName : "", imageURL:""};
  
  @action inputChange = (e)=>{
    this.user[e.target.name] = e.target.value;
  }
 

  searchOrAdd = ()=>{
    if (this.user.userName){
        let p = this.props.store.addUser(this.user , this.props.parentName );
        if (p){
          p.catch((err)=>{
            alert("Username is taken");
          })
        }
    }
    else{
        alert("Please enter a user name");
    }
  }

  render() {
    return (
      <div className="form"> 
          <input  className="formInput" type="text" placeholder="Name" name="userName" onChange={this.inputChange} value={this.user.userName} />
           <div><input className="formInput" placeholder="Image URL" type="text" name="imageURL" onChange={this.inputChange} value={this.user.imageURL} /></div>
          <input type="button" onClick={this.searchOrAdd} value="Create"></input>
      </div>
    );
  }
}

export default AddForm;
