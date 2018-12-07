import React  from 'react';
import {observer, inject} from 'mobx-react';
import Checkbox from '@material-ui/core/Checkbox';

@inject("entitiesStore") 
@observer
class ManifuctresArray extends React.Component {
      entityType = "entityType" 
  componentDidMount() {
    this.props.entitiesStore.getItems(this.entityType);
  }
  render() { 
      if (this.props.entitiesStore.entities[this.entityType]){
       return (<div class="prices">    <h4>באיזה מסכים להציגו?</h4> <div className="pricesTable">
       {this.props.entitiesStore.entities[this.entityType] .map((item)=>{
              return <div className="row"><span> {item.name} - </span><Checkbox 
              className="checkbox"
              name={item.name}   
              checked={this.props.values.indexOf(item.name) >-1}
              onChange={(e)=>{ this.props.changeEntity(item.name , e.target.checked)}} />
              
              </div>
          })} </div>
       </div> );
      }
      else{
        return (<div>loading</div>)
      }
    }
}

export default ManifuctresArray;