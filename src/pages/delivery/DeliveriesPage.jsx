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
  componentWillReceiveProps(e) {
    this.props.entitiesStore.getItems(e.match.params.name);
    this.props.entitiesStore.setEntityType(e.match.params.name);
  }
  componentDidMount() {
    this.props.entitiesStore.getItems(this.props.match.params.name);
    this.props.entitiesStore.setEntityType(this.props.match.params.name);
  }
  
  editEntity=(entity)=>{
    this.entity = entity;
  }
  render() {
    if (this.props.userStore.user){ 
       return (<div class="container">
        {this.entity ? <DeliveryPage togglePopUp={this.editEntity} entityName={this.props.entitiesStore.entityType} entity={this.entity}></DeliveryPage>:null}
         <SearchBar></SearchBar>
         <div className="table">
         <div className="row"> <div className="column">-</div> <div className="column">-</div>
         <div className="column">מחיר ליחידה</div>
         <div className="column">סכה כמות</div>
         <div className="column">סהכ מחיר</div></div>
       {this.props.entitiesStore.deliveries?this.props.entitiesStore.deliveries.map((item)=>{
         return (<Delivery grouping={this.props.entitiesStore.searchObj.grouping} key={item._id} item={item} editEntity={this.editEntity}/>)
       }) : <div>Loading</div>}
       
       </div></div>)
    }
    else{
        return <Redirect to="/login"/>;
    }
  }
}

export default DeliveriesPage;