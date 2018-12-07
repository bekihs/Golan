import React  from 'react';
import {observer, inject} from 'mobx-react';
import EditTwoTone from '@material-ui/icons/EditTwoTone';
import DeleteToneIcon from '@material-ui/icons/DeleteTwoTone';

@inject("entitiesStore") 
@observer
class Entity extends React.Component {
        
  getItemText = (value)=>{
    return (<div className="column">{Object.keys(value).map((key)=>{
      return <div className="column1"> {value[key]} - {key}</div>
    })}</div>);
  }

  editEntity = ()=>{
    this.props.editEntity(this.props.item);
  }
  
  deleteEntity = ()=>{
    this.props.entitiesStore.deleteEntity(this.props.item);
  }
  
  getItemArrayText = (value)=>{
    return  value.map((key)=>{
      return <div className="column1"> {key}</div>

    })
  }
  render() {
     
         return (<div className="row">
         <div className="column buttons">
          <EditTwoTone  className="buttons" onClick={this.editEntity}/>
          <DeleteToneIcon  className="buttons" onClick={this.deleteEntity}/>
         </div>
         {Object.keys(this.props.item).map((key)=>{
           if (key[0] != "_" && key!="prices" && key != "types")
             return <div className={key + " column"}>{key==="isClose" ?(this.props.item[key]?"קרוב": "רחוק"): this.props.item[key]}</div>
         })}
         {this.props.item.prices?  this.getItemText(this.props.item["prices"]) : null}
         {this.props.item.types?  this.getItemArrayText(this.props.item["types"]) : null}
         </div>) 
       
  }
}

export default Entity;