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
   
  render() {
     
         return (<div className="row">

         {this.props.grouping === "_id" ? <div className="column buttons">
          <EditTwoTone  className="buttons" onClick={this.editEntity}/>
          <DeleteToneIcon  className="buttons" onClick={this.deleteEntity}/>
         </div>:<div className="column">-</div>}
         <div className="name column"> {this.props.item["_id"]}</div>
         <div className="column"> {this.getItemText("price")}</div>
         <div className="column"> {this.getItemText("totalAmout")}</div>
         <div className="column"> {this.getItemText("sumPrice")}</div>
         </div>) 
       
  }
}

export default Delivery;