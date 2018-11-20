import { observable, computed, action, decorate } from "mobx";

import axios from 'axios';

class userStore{
    @observable user = null;

    @action setupUser=(user , parentName)=>{
        user = user.data;
    if (!parentName || this.userName === user.userName){
        this.user = user;
    }
    else{
        this.setupChild(this.user.Children , user);
    }
    }

    @action setupChild = (children , user)=>{
        for (const i in children){
            if (children[i].userName === user.userName){
                children[i] = user;
                return true;
            }
            if (this.setupChild(children[i].Children , user)){
                return true;
            }
        }
        return false;
    }

    @action searchUser = (userName) =>{
        axios.get("http://localhost:3001/users/down/"+ userName).then(this.setupUser)
    }


    @action addUser = (user,parentName) =>{
        if (parentName){
            user.parentName = parentName;
        }
return axios.post("http://localhost:3001/users", user).then(action((user)=>{
    this.setupUser(user , parentName)}));
    }
}

const store = new userStore();
export default store;