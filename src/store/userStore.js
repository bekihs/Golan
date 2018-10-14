import { observable, computed, action, decorate } from "mobx";

import axios from 'axios';

class userStore{
    @observable userName = "";
    @observable user = null;

    @action setupUser=(user)=>{
        this.userName = user.data.userName;
        this.user = user.data;
    }

    @action searchUser = (userName) =>{
        axios.get("http://localhost:3001/users/down/"+ userName).then(this.setupUser)
    }

    @action addUser = (user) =>{
axios.post("http://localhost:3001/users", user).then(action((user)=>{
    this.user = user;
}))
    }
}

const store = new userStore();
export default store;