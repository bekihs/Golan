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
      
  getItemDecimalText = (value,key)=>{ 
    if (value){
    if (key === "date"){
      return new Date(value).toDateString();
    }
    return (value["$numberDecimal"]?value["$numberDecimal"]:value);
  }
  else{
    return "-"
  }
  }

  editEntity = ()=>{
    this.props.editEntity(this.props.item);
  }
  
  deleteEntity = ()=>{
    this.props.deleteEntity ? this.props.deleteEntity(this.props.item) : this.props.entitiesStore.deleteEntity(this.props.item);
  }
  
  getItemArrayText = (value)=>{
    return  value.map((key)=>{
      return <div className="column1"> {key}</div>

    })
  }
  render() {
     
         return (<tr className="row">
         <td className="column buttons">
          <EditTwoTone  className="buttons" onClick={this.editEntity}/>
          <DeleteToneIcon  className="buttons" onClick={this.deleteEntity}/>
         </td>
         <td className={"entityType" + " column"}>{this.getItemDecimalText(this.props.item["entityType"] , "entityType")}</td>
         <td className={"manufacturer" + " column"}>{this.getItemDecimalText(this.props.item["manufacturer"] , "manufacturer")}</td>
         <td className={"liter" + " column"}>{this.getItemDecimalText(this.props.item["liter"] , "liter")}</td>
         <td className={"count" + " column"}>{this.getItemDecimalText(this.props.item["count"] , "count")}</td>
         <td className={"date" + " column"}>{this.getItemDecimalText(this.props.item["date"] , "date")}</td>
         <td className={"milkman" + " column"}>{this.getItemDecimalText(this.props.item["milkman"] , "milkman")}</td>
         <td className={"price" + " column"}>{this.getItemDecimalText(this.props.item["price"] , "price")}</td>
         <td className={"driver" + " column"}>{this.getItemDecimalText(this.props.item["driver"] , "driver")}</td>
         <td className={"truck" + " column"}>{this.getItemDecimalText(this.props.item["truck"] , "truck")}</td>
         <td className={"cerDel" + " column"}>{this.getItemDecimalText(this.props.item["cerDel"] , "cerDel")}</td>
         <td className={"cerSell" + " column"}>{this.getItemDecimalText(this.props.item["cerSell"] , "cerSell")}</td>
         </tr>) 
       
  }
}

export default Entity;