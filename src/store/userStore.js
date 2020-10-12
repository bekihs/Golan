import { observable, computed, action, decorate } from "mobx";

import axios from 'axios';

class userStore {
    @observable user = null;
    @observable errors = {};

    login = (user) => {
        axios.post('/auth/login', user)
            .then(this.setUser).catch(this.setError);
    }
    // register = (user) => {
    //     axios.post('/auth/register', user)
    //         .then(this.setUser).catch(this.setError);
    // }
    @action setUser = (res)=> {
        this.errors = {};
        this.user = res.data;
    }

    @action setError = (err) => {
        this.errors = { message: err.response ? err.response.data.message : err.data, stack: err.stack };
    }

}

const store = new userStore();
export default store;