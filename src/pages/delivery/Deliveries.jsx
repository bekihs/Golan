import React  from 'react';
import {observer, inject} from 'mobx-react';
import { Redirect } from 'react-router'
import AddPopUp from '../entities/AddPopUp';
import Entity from './Entity';
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

  getSums = ()=>{ 
   if (this.props.entitiesStore.deliveriseSum){
      return ( <div className="row">  <div>-</div>
    <div className="column"> סהכ כמות  {this.props.entitiesStore.deliveriseSum[0]}</div>
    <div className="column"> סהכ ליטרים  {this.props.entitiesStore.deliveriseSum[1]} </div>
    <div>-</div>
    <div className="column">{ Math.round(this.props.entitiesStore.deliveriseSum[2]*100)/100   + " ש\"ח" }</div> </div>)
}
else{
  return null;
}
  }
  getTable() {
    if (this.props.userStore.user){
      if (this.props.entitiesStore.entities["delivery"]){
       return (<div>
    <h2 className="title" >{this.props.entitiesStore.entitiesFields["delivery"].name+ " חדש "} </h2>
        <AddPopUp togglePopUp={this.editEntity} entityName={"delivery"} entity={this.entity}></AddPopUp>
         <div className="table">
       {this.getSums()}
        </div>
         <table className="table">
       {this.props.entitiesStore.entities["delivery"].reverse().map((item)=>{
        
         return (<Entity item={item} editEntity={this.editEntity} deleteEntity={this.props.entitiesStore.deleteDelivery}/>)
       })}
       </table></div>)
      }
      else{
        return (<div>
           <h2 className="title" >{this.props.entitiesStore.entitiesFields["delivery"].name+ " חדש "} </h2>
        <AddPopUp togglePopUp={this.editEntity} entityName={"delivery"} entity={this.entity}></AddPopUp>
          loading
          </div>)
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