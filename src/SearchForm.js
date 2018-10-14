import React, { Component } from 'react'; 
import {observer, inject} from 'mobx-react';
import { observable , action} from 'mobx';

@inject("store") 
@observer
class SearchForm extends Component {
  @observable userName = "";
  
  @action inputChange = (e)=>{
    this.userName = e.target.value;
  }
 
  searchOrAdd = ()=>{
    if (this.userName){
        this.props.store.searchUser(this.userName) 
    }
    else{
        alert("Please enter a user name");
    }
  }

  render() {
    return (
      <div className="login"> 
        Username :
          <input type="text" name="userName" onChange={this.inputChange} value={this.userName} />
          <button type="button" onClick={this.searchOrAdd}>Search</button>
      </div>
    );
  }
}

export default SearchForm;
