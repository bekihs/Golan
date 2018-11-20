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
        <img src={this.display ?"http://www.kilcregganantiques.com/wp-content/uploads/2018/01/eye_search.png" :"http://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/Button-Add-icon.png" }
        onClick={this.setForm}></img>
        {this.display?<AddForm/>:<SearchForm />}
      </div>
    );
  }
}

export default SearchOrAdd;
