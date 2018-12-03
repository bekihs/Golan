import { observable, runInAction,action } from "mobx";

import axios from 'axios';

class entitiesStore {
    @observable entities = {};
    @observable errors = {};
    entitiesFields = {
        driver : ["name" , "number"],
        truck : [ "number"],
        milkman : ["name" ],
        entityType : ["name"]
    }

    getItems = (entityName) => {
        axios.get('/api/'+ entityName)
            .then((result)=>{
                runInAction(()=>{
                    this.entities[entityName] = result.data;
                })
            }).catch(this.setError);
    } 

    createItem = (entityName , entity)=>{
        axios.post('/api/'+ entityName , entity)
            .then((result)=>{
                runInAction(()=>{
                    this.entities[entityName].push(result.data);
                })
            }).catch(this.setError);
    }

    
    @action setError = (err) => {
        this.errors = { message: err.response ? err.response.data.message : err.data, stack: err.stack };
    }
}

const store = new entitiesStore();
export default store;