import React, { Component } from 'react'; 
import {observer, inject} from 'mobx-react';
import { observable , action} from 'mobx';
import SearchForm from './SearchForm.js'
import AddForm from './AddForm.js'

@inject("store") 
@observer
class SearchOrAdd extends Component {
  @observable display =  false;
   
  @action setForm = () =>{
    this.display = !this.display;
} 

  render() {
    return (
      <div className="loginOrSearch"> 
        {this.display?<AddForm/>:<SearchForm />}
         <button onClick={this.setForm}>{this.display ? "Search" : "New"}</button>
      </div>
    );
  }
}

export default SearchOrAdd;
