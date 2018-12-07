import React  from 'react';
import {observer, inject} from 'mobx-react';
import TextField from 'material-ui/TextField';

@inject("entitiesStore") 
@observer
class PricesArray extends React.Component {
      entityType = "entityType" 
  componentDidMount() {
    this.props.entitiesStore.getItems(this.entityType);
  }
  render() { 
      if (this.props.entitiesStore.entities[this.entityType]){
       return (<div class="prices">    <h4>מחירים</h4> <div className="pricesTable">
       {this.props.entitiesStore.entities[this.entityType] .map((item)=>{
              return <div className="row"><span> {item.name} - </span><TextField className="priceInput"
              type="number" name={item.name}   
              value={this.props.values[item.name]}
               onChange={(e)=>{this.props.changeEntity(item.name , e.target.value)}} />
              
              </div>
          })} </div>
       </div> );
      }
      else{
        return (<div>loading</div>)
      }
    }
}

export default PricesArray;