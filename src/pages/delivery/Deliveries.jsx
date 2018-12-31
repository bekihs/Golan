import React  from 'react';
import {observer, inject} from 'mobx-react';
import { Redirect } from 'react-router'
import AddPopUp from '../entities/AddPopUp';
import Entity from '../entities/Entity';
import {observable} from "mobx"
import SearchDelivery from './SearchDelivey';
@inject("userStore") 
@inject("entitiesStore") 
@observer
class Deliveries extends React.Component {
       @observable entity=null;
  
  editEntity=(entity)=>{
    this.entity = entity;
  }

  getTable() {
    if (this.props.userStore.user){
      if (this.props.entitiesStore.entities["delivery"]){
       return (<div>
    <h2 className="title" >{this.props.entitiesStore.entitiesFields["delivery"].name+ " חדש "} </h2>
        <AddPopUp togglePopUp={this.editEntity} entityName={"delivery"} entity={this.entity}></AddPopUp> <div className="table">
       {this.props.entitiesStore.entities["delivery"].reverse().map((item)=>{
        
         return (<Entity item={item} editEntity={this.editEntity}/>)
       })}
       </div></div>)
      }
      else{
        return (<div>loading</div>)
      }
    }
    else{
        return <Redirect to="/login"/>;
    }
  }

  render(){
    return (<div class="container">
      <SearchDelivery></SearchDelivery>
      {this.getTable()}
    </div>)
  }
}

export default Deliveries;