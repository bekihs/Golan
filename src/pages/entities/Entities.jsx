import React  from 'react';
import {observer, inject} from 'mobx-react';
import { Redirect } from 'react-router'
import AddPopUp from './AddPopUp';
import Entity from './Entity';
import {observable} from "mobx"
@inject("userStore") 
@inject("entitiesStore") 
@observer
class EntitesPage extends React.Component {
       @observable entity=null;
  componentWillReceiveProps(e) {
    this.props.entitiesStore.getItems(e.match.params.name);
    this.props.entitiesStore.setEntityType(e.match.params.name);
  }
  componentDidMount() {
    this.props.entitiesStore.getItems(this.props.match.params.name);
    this.props.entitiesStore.setEntityType(this.props.match.params.name);
  }
  getItemText = (value)=>{
    return Object.keys(value).map((key)=>{
      return <div className="column1"> {value[key]} - {key}</div>

    })
  }
  editEntity=(entity)=>{
    this.entity = entity;
  }
  render() {
    if (this.props.userStore.user){
      if (this.props.entitiesStore.entities[this.props.entitiesStore.entityType]){
       return (<div class="container">
    <h2 className="title" >{this.props.entitiesStore.entitiesFields[this.props.entitiesStore.entityType].name+ " חדש "} </h2>
        <AddPopUp togglePopUp={this.editEntity} entityName={this.props.entitiesStore.entityType} entity={this.entity}></AddPopUp> <div className="table">
       {this.props.entitiesStore.entities[this.props.entitiesStore.entityType].map((item)=>{
        
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
}

export default EntitesPage;