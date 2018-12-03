import { observable, computed, action, decorate } from "mobx";

import axios from 'axios';

class userStore{
    @observable user = null;

    @action setupUser=(user , parentName)=>{
        user = user.data;
    
    }
   
}

const store = new userStore();
export default store;