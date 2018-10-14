import { observable, computed, action, decorate } from "mobx";

import axios from 'axios';

class userStore{
    @observable userName = "";
    @observable user = null;

    @action setupUser=(user , parentName)=>{
    if (!parentName || this.userName === user.data.userName){
    this.userName = user.data.userName;
        this.user = user.data;
    }
    }

    @action searchUser = (userName) =>{
        axios.get("http://localhost:3001/users/down/"+ userName).then(this.setupUser)
    }


    @action addUser = (user,parentName) =>{
        if (parentName){
            user.parentName = parentName;
        }
return axios.post("http://localhost:3001/users", user).then(action((user)=>{this.setupUser(user , parentName)}));
    }
}

const store = new userStore();
export default store;