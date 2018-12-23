import React  from 'react';
import {observer, inject} from 'mobx-react';
import EditTwoTone from '@material-ui/icons/EditTwoTone';
import DeleteToneIcon from '@material-ui/icons/DeleteTwoTone';

@inject("entitiesStore") 
@observer
class Delivery extends React.Component {
        
  getItemText = (key)=>{if (this.props.item[key])
    return (this.props.item[key]["$numberDecimal"]?this.props.item[key]["$numberDecimal"]:this.props.item[key]);
  }

  editEntity = ()=>{
    this.props.editEntity(this.props.item);
  }
  
  deleteEntity = ()=>{
    this.props.entitiesStore.deleteEntity(this.props.item);
  }
  getColumnsArray=()=>{
    return this.props.entitiesStore.sumColumns[this.props.grouping]; 
  }
   
  render() {
     const arr = this.getColumnsArray();
         return (<div className="row">

         {this.props.grouping === "_id" ? <div className="column buttons">
          <EditTwoTone  className="buttons" onClick={this.editEntity}/>
          <DeleteToneIcon  className="buttons" onClick={this.deleteEntity}/>
         </div>:<div className="column">-</div>}
         <div className="name column"> {this.props.item["_id"][this.props.grouping]}</div>
         <div className="column"> {this.getItemText(arr[0])}</div>
         <div className="column"> {this.getItemText(arr[1])}</div>
         <div className="column"> {this.getItemText(arr[2])}</div>
         <div className="column"> {this.getItemText(arr[3])}</div>
         </div>) 
       
  }
}

export default Delivery;