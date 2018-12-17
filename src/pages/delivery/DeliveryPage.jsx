import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import {observer, inject} from 'mobx-react';
import { observable, action } from 'mobx';
import TextField from 'material-ui/TextField';
import SaveIcon from '@material-ui/icons/Save';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import FormControl from '@material-ui/core/FormControl';
import {  Link , NavLink} from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

@inject("entitiesStore") 
@inject("userStore") 
@observer
class DeliveryPage extends React.Component {
 
  @observable entity = {entityType:"חלב",liter:1 , count:1 , date:new Date()};
   
   
  @action changeEntity=(e)=>{
    this.entity[e.target.name] = e.target.value;
    if (e.target.name==="milkman" || e.target.name === "entityType"){
         this.props.entitiesStore.entities.milkman.forEach(element => {
            if (element.name === e.target.value)
                this.entity.price = element.prices[this.entity.entityType];
        });
    }
    if (e.target.name === "manufacturer"){
      this.props.entitiesStore.entities.manufacturer.forEach(element => {
        if (element.name === e.target.value)
            this.entity.isClose = element.isClose;
    });
    }
  }

  @action ChangeCheckBox = (e)=>{
    this.entity[e.target.name] = !this.entity[e.target.name];
  }
  @action arrayChange = (key , value)=>{
    // this.entity.prices[key]=value;
    this.entity.prices = {...this.entity.prices , [key]:value};
  }
  componentDidMount() {
    this.props.entitiesStore.getItems("entityType");
    this.props.entitiesStore.getItems("driver");
    this.props.entitiesStore.getItems("truck");
    this.props.entitiesStore.getItems("manufacturers");
    this.props.entitiesStore.getItems("milkman");
  }
   saveEntity = async()=>{
        await this.props.entitiesStore.createDelivery(this.entity , this.props.entityName);
    }
    setEntity=()=>{

    }
  render() { 
    if(this.props.userStore.user) {
        return  (<Card className="popUp">
    <CardTitle title="משלוח חדש"/>
    <div  className="row">
            <FormControl>
          <InputLabel htmlFor="age-simple">מוצר</InputLabel>
          <Select
            value={this.entity.entityType}
            onChange={this.changeEntity}
            inputProps={{
              name: 'entityType',
              id: 'age-simple',
            }} > 
            {this.props.entitiesStore.entities["entityType"] ? this.props.entitiesStore.entities["entityType"] .map(item=>  <MenuItem value={item.name}><em>{item.name}</em></MenuItem>): null}
          </Select>
        </FormControl>
        </div><div className="row">
          <FormControl >
          <InputLabel htmlFor="mani-simple">יצרן</InputLabel>
          <Select
            value={this.entity.manufacturer}
            onChange={this.changeEntity}
            inputProps={{
              name: 'manufacturer',
              id: 'mani-simple',
            }} > 
            {this.props.entitiesStore.entities["manufacturers"] ? this.props.entitiesStore.entities["manufacturers"] .map(item=>  {
                if (item.types.indexOf(this.entity.entityType) >= 0  )
                return ( <MenuItem value={item.name}><em>{item.name}</em></MenuItem> )
            }): null}
          </Select>
        </FormControl>
        </div><div className="row">

          <FormControl className="row">
          <InputLabel htmlFor="mani-simple">ליטר</InputLabel>
          <TextField
            floatingLabelText="ליטר" type="number" name="liter"   
            value={this.entity.liter} onChange={this.changeEntity} />
        </FormControl>
        </div><div className="row">
          <FormControl className="row">
          <InputLabel htmlFor="mani-simple">כמות</InputLabel>
          <TextField
            floatingLabelText="כמות" type="number" name="count"   
            value={this.entity.count} onChange={this.changeEntity} />
        </FormControl>
        </div><div className="row">
          <FormControl className="row">
          <TextField
             type="datetime-local" name="date"   
            value={this.entity.date.toString()} onChange={this.changeEntity} />
        </FormControl>

          </div><div className="row"> 
        <FormControl className="row">
          <InputLabel htmlFor="mani-simple">מחלבה</InputLabel>
          <Select
            value={this.entity.milkman}
            onChange={this.changeEntity}
            inputProps={{
              name: 'milkman',
              id: 'mani-simple',
            }} > 
            {this.props.entitiesStore.entities["milkman"] ? this.props.entitiesStore.entities["milkman"] .map(item=>  {
                if(Object.keys(item.prices).indexOf(this.entity.entityType) >= 0 )
                return ( <MenuItem value={item.name}><em>{item.name}</em></MenuItem> )
            }): null 
            }
          </Select>
        </FormControl>  </div><div className="row">
        
        <FormControl className="row">
          <InputLabel htmlFor="mani-simple">מחיר</InputLabel>
          <TextField
             type="text" name="price"   
            value={this.entity.price} onChange={this.changeEntity} />
        </FormControl>  </div><div className="row">
        <FormControl className="row">
          <InputLabel htmlFor="age-simple">נהג</InputLabel>
          <Select
            value={this.entity.driver}
            onChange={this.changeEntity}
            inputProps={{
              name: 'driver',
              id: 'age-simple',
            }} > 
            {this.props.entitiesStore.entities["driver"] ? this.props.entitiesStore.entities["driver"] .map(item=>  <MenuItem value={item.name}><em>{item.name}</em></MenuItem>): null}
          </Select>
        </FormControl>
        </div><div className="row">
        <FormControl className="row">
          <InputLabel htmlFor="truck-simple">משאית</InputLabel>
          <Select
            value={this.entity.truck}
            onChange={this.changeEntity}
            inputProps={{
              name: 'truck',
              id: 'truck-simple',
            }} > 
            {this.props.entitiesStore.entities["truck"] ? this.props.entitiesStore.entities["truck"] .map(item=>  <MenuItem value={item.number}><em>{item.number}</em></MenuItem>): null}
          </Select>
        </FormControl>
        </div><div className="row">
        
        <FormControl className="row">
          <InputLabel htmlFor="mani-simple">תעודת משלוח</InputLabel>
          <TextField
             type="text" name="cerDel"   
            value={this.entity.cerDel} onChange={this.changeEntity} />
        </FormControl>
        </div><div className="row">
        
        <FormControl className="row">
          <InputLabel htmlFor="mani-simple">תעודת מכירה </InputLabel>
          <TextField
             type="text" name="cerSell"   
            value={this.entity.cerSell} onChange={this.changeEntity} />
        </FormControl>
        
</div>
        <div className="row"> 
         <SaveIcon className="buttons" onClick={this.saveEntity} />
         <CancelTwoToneIcon  className="buttons" onClick={this.props.togglePopUp}/>
         </div>
      </Card>)  
      } else{
        return (<Link to="/login">Log in</Link>)
      }
  }
}

export default DeliveryPage;