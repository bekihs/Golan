import { observable, runInAction,action } from "mobx";

import axios from 'axios';

class entitiesStore {
    @observable entities = {};
    @observable deliveries = [];
    @observable errors = {};
    @observable searchObj = {};
    entitiesFields = {
        driver :{name:"נהג" , names:"נהגים" , fields: ["name" , "number"]},
        truck :{name:"משאית" , names:"משאיות" , fields:[ "number"]},
        milkman : {name:"חלבן" , names:"חלבנים" ,fields:["name"  , "arrPrices"]},
        entityType : {name:"מוצר" , names:"מוצרים" ,fields:["name"]},
        manufacturers : {name:"יצרן" , names:"יצרנים" ,fields:["name" , "isClose" , "types"]},
        delivery : {name: "משלוח" , names:"משלוחים" , fields:["cerDel", "cerSell","count" , 
        "date", "driver", "entityType", "liter", "manufacturer","isClose", "milkman", "price", "truck","_id"]}
    }
    @observable entityType = "";

    deleteEntity = (entity)=>{
        axios.delete('/api/'+ this.entityType + "/" + entity._id)
        .then((result)=>{
            runInAction(()=>{
                this.entities[this.entityType ]=this.entities[this.entityType ].filter((item)=>item._id!=entity._id)
            })
        }).catch(this.setError);
    }
    editDelivery =(entity)=>{
        
        axios.post("/delivery/"+entity._id , entity)
        .then((result)=>{
            runInAction(()=>{
                this.entities["delivery" ]=this.entities["delivery" ]
                        .map((item)=>item._id===entity._id?result.data:item);
            })
        }).catch(this.setError);
    }
    createDelivery=(entity)=>{
     
        axios.post("/delivery/" , entity)
        .then((result)=>{
            this.entities["delivery" ].push(result.data)
        }).catch(this.setError);
    }
    editEntity = (entity)=>{
        axios.post('/api/'+ this.entityType + "/" + entity._id , entity)
        .then((result)=>{
            runInAction(()=>{
                this.entities[this.entityType ]=this.entities[this.entityType ]
                        .map((item)=>item._id===entity._id?result.data:item);
            })
        }).catch(this.setError);
    }
    getItems = (entityName) => {
        
        axios.get('/api/'+ entityName)
            .then((result)=>{
                runInAction(()=>{
                    this.entities[entityName] = result.data;
                })
            }).catch(this.setError);
    } 

    @action setEntityType = (entityName)=>{
        this.entityType = entityName;
    }

    createItem = (entity,entityName)=>{
       return axios.post('/api/'+ entityName , entity)
            .then((result)=>{
                runInAction(()=>{
                    this.entities[entityName].push(result.data);
                })
            }).catch(this.setError);
    }

    
    @action setError = (err) => {
        this.errors = { message: err.response ? err.response.data.message : err.data, stack: err.stack };
    }

    searchDeliveries = (entity)=>{

            axios.post("/delivery/search/" + entity.grouping , entity)
            .then((result)=>{
                runInAction(()=>{
                    if (entity.grouping === "milkman"){
                        const arr = [];
                        result.data.forEach(item => {
                            if (item._id.milkman === "שטראוס"){
                              arr.push(item); 
                              if (!item._id.isClose){
                                    item._id.milkman= "שטראוס הובלה יצרני חלב רחוק"
                          }
                            }
                            else{
                            let items = arr.filter((i)=>i._id.milkman === item._id.milkman);
                            if (items.length > 0){
                              items[0].totalAmout["$numberDecimal"] = parseFloat( items[0].totalAmout["$numberDecimal"]) + 
                               parseFloat(item.totalAmout["$numberDecimal"])
                            }
                            else{
                              arr.push(item); 
                             
                            }
                        }
                        });
                        result.data = arr;
                    }
                    this.deliveries = (result.data);
                    this.searchObj = {...entity};    
                })
            }).catch(this.setError);
}
}
const store = new entitiesStore();
export default store;