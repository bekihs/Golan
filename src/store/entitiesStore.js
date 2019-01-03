import { observable, runInAction, action, computed } from "mobx";

import axios from 'axios';

class entitiesStore {
    @observable entities = {};
    @observable deliveries = null;
    @observable errors = {};
    @observable searchObj = {};
    entitiesFields = {
        driver: { name: "נהג", names: "נהגים", fields: ["name", "number"] },
        truck: { name: "משאית", names: "משאיות", fields: ["number"] },
        milkman: { name: "חלבן", names: "חלבנים", fields: ["name", "arrPrices"] },
        entityType: { name: "מוצר", names: "מוצרים", fields: ["name"] },
        manufacturers: { name: "יצרן", names: "יצרנים", fields: ["name", "isClose", "types"] },
        delivery: {
            name: "משלוח", names: "משלוחים", fields: ["cerDel", "cerSell", "count",
                "date", "driver", "entityType", "liter", "manufacturer", "isClose", "milkman", "price", "truck", "_id"]
        }
    }
    @observable deliveriseSum = {};
    @observable shtraosDeliveries = [];
    @observable entityType = "";
    sumColumns = {
        manufacturer: ["totalAmout", "shtrue", "shfalse"],
        milkman: ["price", "totalAmout", "totalLiter", "sumPrice"]
    };

    deleteEntity = (entity) => {
        axios.delete('/api/' + this.entityType + "/" + entity._id)
            .then((result) => {
                runInAction(() => {
                    this.entities[this.entityType] = this.entities[this.entityType].filter((item) => item._id != entity._id)
                })
            }).catch(this.setError);
    }

    deleteDelivery = (entity) => {
        axios.delete('/api/delivery/' + entity._id)
            .then((result) => {
                runInAction(() => {
                    this.entities["delivery"] = this.entities["delivery"].filter((item) => item._id != entity._id)
                })
            }).catch(this.setError);
    }

    editDelivery = (entity) => {

        axios.post("/delivery/" + entity._id, entity)
            .then((result) => {
                runInAction(() => {
                    this.entities["delivery"] = this.entities["delivery"]
                        .map((item) => item._id === entity._id ? result.data : item);
                })
            }) 
    }
    createDelivery = (entity) => {

        axios.post("/delivery/", entity)
            .then((result) => {
                this.entities["delivery"].push(result.data)
            }) 
    }
    editEntity = (entity) => {
        axios.post('/api/' + this.entityType + "/" + entity._id, entity)
            .then((result) => {
                runInAction(() => {
                    this.entities[this.entityType] = this.entities[this.entityType]
                        .map((item) => item._id === entity._id ? result.data : item);
                })
            }).catch(this.setError);
    }
    getItems = (entityName) => {

        axios.get('/api/' + entityName)
            .then((result) => {
                runInAction(() => {
                    this.entities[entityName] = result.data;
                })
            }).catch(this.setError);
    }

    searchDeliveriesEntities=(entity)=>{
        axios.post("/delivery/get" , entity)
        .then((result) => {
            runInAction(() => {

                this.entities["delivery"] = result.data;
                this.deliveriseSum = [0, 0, 0];
                result.data.forEach((i)=>{
                
                    this.deliveriseSum[0] += parseFloat(i.count["$numberDecimal"]);
                    this.deliveriseSum[1] += parseFloat(i.liter["$numberDecimal"]);
                    this.deliveriseSum[2] +=( parseFloat(i.price["$numberDecimal"]) * parseFloat(i.count["$numberDecimal"]));
                })

            })
        }).catch(this.setError);
    }
    @action setEntityType = (entityName) => {
        this.entityType = entityName;
    }

    createItem = (entity, entityName) => {
        return axios.post('/api/' + entityName, entity)
            .then((result) => {
                runInAction(() => {
                    this.entities[entityName].push(result.data);
                })
            }).catch(this.setError);
    }


    @action setError = (err) => {
        this.errors = { message: err.response ? err.response.data.message : err.data, stack: err.stack };
    }
    searchDeliveries = (entity) => {
        this.shtraosDeliveries = [];
        this.deliveries = [];

        axios.post("/delivery/search/" + entity.grouping, entity)
            .then((result) => {
                runInAction(() => { 
                    this.shtraosDeliveries = [];
                    if (entity.grouping === "milkman") {
                        const arr = [];
                        this.deliveriseSum = ["-",0, 0, 0]
                        result.data.forEach(item => {
                            if (item._id.milkman === "שטראוס") {
                                if (!item._id.isClose) {
                                    item._id.milkman = "שטראוס הובלה יצרני חלב רחוק"
                                }
                                this.shtraosDeliveries.push(item);
                            }
                            else {
                                let items = arr.filter((i) => i._id.milkman === item._id.milkman);
                                if (items.length > 0) {
                                    items[0].totalAmout["$numberDecimal"] = parseFloat(items[0].totalAmout["$numberDecimal"]) +
                                        parseFloat(item.totalAmout["$numberDecimal"]);

                                    items[0].totalLiter["$numberDecimal"] = parseFloat(items[0].totalLiter["$numberDecimal"]) +
                                        parseFloat(item.totalLiter["$numberDecimal"]);

                                    items[0].sumPrice["$numberDecimal"] = parseFloat(items[0].sumPrice["$numberDecimal"]) +
                                        parseFloat(item.sumPrice["$numberDecimal"]);
                                }
                                else {
                                    arr.push(item);

                                }

                                this.deliveriseSum[1] += parseFloat(item.totalAmout["$numberDecimal"]);
                                this.deliveriseSum[2] += parseFloat(item.totalLiter["$numberDecimal"]);
                                this.deliveriseSum[3] += parseFloat(item.sumPrice["$numberDecimal"]);
                            }
                        });
                        result.data = arr;
                    }
                    else {
                        this.deliveriseSum = [0, 0, 0]
                        result.data.forEach(item => {
                            this.sumColumns["manufacturer"].forEach((key, i) => {
                                    this.deliveriseSum[i] +=item[key]? parseFloat(item[key]["$numberDecimal"]):0;
                            });
                        });
                    }
                    this.deliveries = (result.data);
                    this.searchObj = { ...entity };
                })
            }).catch(this.setError);
    }
}
const store = new entitiesStore();
export default store;