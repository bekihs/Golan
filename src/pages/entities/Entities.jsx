import React  from 'react';
import {observer, inject} from 'mobx-react';
import { Redirect } from 'react-router'


@inject("userStore") 
@inject("entitiesStore") 
@observer
class EntitesPage extends React.Component {
       
  componentWillReceiveProps(e) {
    this.props.entitiesStore.getItems(e.match.params.name);
  }
  componentDidMount() {
    this.props.entitiesStore.getItems(this.props.match.params.name);
  }
  render() {
    if (this.props.userStore.user){
      if (this.props.entitiesStore.entities){
       return (<div className="table">
       {this.props.entitiesStore.entities[this.props.match.params.name].map((item)=>{
         return (<div className="row">{Object.values(item).map((value)=>{
           return <div className="column">{value}</div>
         })} </div>)
       })}
       </div>)
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