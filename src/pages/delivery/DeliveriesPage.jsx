import React  from 'react';
import {observer, inject} from 'mobx-react';
import { Redirect } from 'react-router'
import {observable} from "mobx"
import DeliveryPage from './DeliveryPage';
import SearchBar from './Search';
import Delivery from './delivery';
@inject("userStore") 
@inject("entitiesStore") 
@observer
class DeliveriesPage extends React.Component {
       @observable entity=null; 
  
  editEntity=(entity)=>{
    this.entity = entity;
  }
  getTitles(){
    if(this.props.entitiesStore.searchObj.grouping === "manufacturer"){
return ( <div className="row"> <div className="column">-</div> <div className="column">-</div>
<div className="column">יצור חלב</div>
<div className="column">שטראוס</div>
<div className="column">שטראוס רחוקים</div></div>)
    }
    else{
      return ( <div className="row"> <div className="column">-</div> <div className="column">-</div>
      <div className="column">מחיר ליחידה</div>
      <div className="column">סכה כמות</div>
      <div className="column">סכה ליטר</div>
      <div className="column">סהכ מחיר</div></div>)
    }
  }

  getSums = ()=>{ 
      return ( <div className="row"> <div className="column">-</div> <div className="column">-</div> 
      <div className="column">{this.props.entitiesStore.deliveriseSum[0]}</div>
      <div className="column">{this.props.entitiesStore.deliveriseSum[1]}</div>
      <div className="column">{this.props.entitiesStore.deliveriseSum[2]}</div>
      <div className="column">{this.props.entitiesStore.deliveriseSum[3] ? this.props.entitiesStore.deliveriseSum[3] + "ש\"ח" : "-"}</div> </div>)
  }
  render() {
    if (this.props.userStore.user){ 
       return (<div class="container">
        {this.entity ? <DeliveryPage togglePopUp={this.editEntity} entityName={this.props.entitiesStore.entityType} entity={this.entity}></DeliveryPage>:null}
         <SearchBar></SearchBar>
         <div className="table">
        {this.getTitles()}
       {this.props.entitiesStore.deliveries?this.props.entitiesStore.deliveries.map((item)=>{
         return (<Delivery grouping={this.props.entitiesStore.searchObj.grouping} key={item._id} item={item} editEntity={this.editEntity}/>)
       }) : <div>Loading</div>}
       {<div className="row">סך הכל</div>}
       {this.props.entitiesStore.deliveries?this.getSums() : null}
       {this.props.entitiesStore.shtraosDeliveries?<div className="row">שטראוס</div>:null}
       
       {this.props.entitiesStore.shtraosDeliveries?this.props.entitiesStore.shtraosDeliveries.map((item)=>{
         return (<Delivery grouping={this.props.entitiesStore.searchObj.grouping} key={item._id} item={item} editEntity={this.editEntity}/>)
       }) : null}
       </div></div>)
    }
    else{
        return <Redirect to="/login"/>;
    }
  }
}

export default DeliveriesPage;