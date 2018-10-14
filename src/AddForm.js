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
      <div className="login"> 
        Username :
          <input type="text" name="userName" onChange={this.inputChange} value={this.user.userName} />
           <div>image URL: <input type="text" name="imageURL" onChange={this.inputChange} value={this.user.imageURL} /></div>
          <button type="button" onClick={this.searchOrAdd}>Create</button>
      </div>
    );
  }
}

export default AddForm;
