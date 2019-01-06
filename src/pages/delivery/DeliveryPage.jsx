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
   @observable error = "";
  padNumber(number){
    return number>9 ? number : "0"+number;
  }
    
  @action changeDateEntity=(e)=>{
    const values = e.target.value.split("-");
    this.entity[e.target.name] = new Date( values[0] , values[1]-1,values[2]);
    
  }

  @action changeEntity=(e)=>{
    this.entity[e.target.name] = e.target.value;
    if (e.target.name==="milkman" || e.target.name === "entityType"){
         this.props.entitiesStore.entities.milkman.forEach(element => {
            if (element.name === e.target.value)
                this.entity.price = element.prices[this.entity.entityType];
        });
    }
    if (e.target.name === "manufacturer"){
      this.props.entitiesStore.entities.manufacturers.forEach(element => {
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
  
  constructor(props){
    super(props);
    this.setEntity(props)

  }
  setEntity(props){
    if( props.entity){
      this. entity  =  {...props.entity}
       this.entity.price = this.entity.price ?  this.entity.price ["$numberDecimal"] : 1;
       this.entity.liter = this.entity.liter? this.entity.liter["$numberDecimal"] : 1;
       this.entity.count = this.entity.count? this.entity.count["$numberDecimal"] : 1;
    }
    else{ 
      this.entity =  {entityType:"חלב",liter:1 , count:1 , date:new Date()}
    }
  }
  componentWillReceiveProps(props) {
   this.setEntity(props)
}
   saveEntity = async()=>{
     try{ let res;
    if (this.props.entity){
      res = await this.props.entitiesStore.editDelivery(this.entity );
     }
     else{
        res = await this.props.entitiesStore.createDelivery(this.entity , this.props.entityName);
      }
      if (res && res.length > 0){
        this.error = res;
      }
      else{
       this.props.togglePopUp();
      }
    }
    catch(err){
      alert(err);
    }
    }
    togglePopUp = ()=>{
      this.props.togglePopUp();
    }
    
  toDateString(date){
    if (!date.getFullYear){
      date = new Date(date);
    }
    if (date.getFullYear)
    return date.getFullYear() + "-" + this.padNumber(date.getMonth() + 1) + "-"+this.padNumber(date.getDate());
    else{
      return date;
    }
  }
  render() { 
    if(this.props.userStore.user) {
        return  (<Card className="popUp">
    <CardTitle title="משלוח חדש"/>
    <div  className="row">
            <FormControl>
              <span className="error">{this.error}</span>
          <InputLabel htmlFor="entityType">מוצר</InputLabel>
          <Select className="select"
            value={this.entity.entityType}
            onChange={this.changeEntity}
            inputProps={{
              name: 'entityType',
              id: 'entityType',
            }} > 
            {this.props.entitiesStore.entities["entityType"] ? this.props.entitiesStore.entities["entityType"] .map(item=>  <MenuItem value={item.name}><em>{item.name}</em></MenuItem>): null}
          </Select>
        </FormControl>
        </div><div className="row">
          <FormControl >
          <InputLabel htmlFor="manufacturer">יצרן</InputLabel>
          <Select className="select"
            value={this.entity.manufacturer}
            onChange={this.changeEntity}
            inputProps={{
              name: 'manufacturer',
              id: 'manufacturer',
            }} > 
            {this.props.entitiesStore.entities["manufacturers"] ? this.props.entitiesStore.entities["manufacturers"] .map(item=>  {
                if (item.types.indexOf(this.entity.entityType) >= 0  )
                return ( <MenuItem value={item.name}><em>{item.name}</em></MenuItem> )
            }): null}
          </Select>
        </FormControl>
        </div><div className="row">

          <FormControl className="row">
          <InputLabel htmlFor="liter">ליטר</InputLabel>
          <TextField id="liter" className="input"
            floatingLabelText="ליטר" type="number" name="liter"   
            value={this.entity.liter} onChange={this.changeEntity} />
        </FormControl>
        </div><div className="row">
          <FormControl className="row">
          <InputLabel htmlFor="count">כמות</InputLabel>
          <TextField id="count" className="input"
            floatingLabelText="כמות" type="number" name="count"   
            value={this.entity.count} onChange={this.changeEntity} />
        </FormControl>
        </div><div className="row">
          <FormControl className="row">
          <TextField className="input"
             type="date" name="date"   
            value={this.toDateString(this.entity.date)} onChange={this.changeDateEntity}  onInput={this.changeDateEntity} />
        </FormControl>

          </div><div className="row"> 
        <FormControl className="row">
          <InputLabel htmlFor="milkman">מחלבה</InputLabel>
          <Select className="select"
            value={this.entity.milkman}
            onChange={this.changeEntity}
            inputProps={{
              name: 'milkman',
              id: 'milkman',
            }} > 
            {this.props.entitiesStore.entities["milkman"] ? this.props.entitiesStore.entities["milkman"] .map(item=>  {
                if(Object.keys(item.prices).indexOf(this.entity.entityType) >= 0 )
                return ( <MenuItem value={item.name}><em>{item.name}</em></MenuItem> )
            }): null 
            }
          </Select>
        </FormControl>  </div><div className="row">
        
        <FormControl className="row">
          <InputLabel htmlFor="price">מחיר</InputLabel>
          <TextField id="price" className="input"
             type="text" name="price"   
            value={this.entity.price} onChange={this.changeEntity} />
        </FormControl>  </div><div className="row">
        <FormControl className="row">
          <InputLabel htmlFor="driver">נהג</InputLabel>
          <Select className="select"
            value={this.entity.driver}
            onChange={this.changeEntity}
            inputProps={{
              name: 'driver',
              id: 'driver',
            }} > 
            {this.props.entitiesStore.entities["driver"] ? this.props.entitiesStore.entities["driver"] .map(item=>  <MenuItem value={item.name}><em>{item.name}</em></MenuItem>): null}
          </Select>
        </FormControl>
        </div><div className="row">
        <FormControl className="row">
          <InputLabel htmlFor="truck">משאית</InputLabel>
          <Select className="select"
            value={this.entity.truck}
            onChange={this.changeEntity}
            inputProps={{
              name: 'truck',
              id: 'truck',
            }} > 
            {this.props.entitiesStore.entities["truck"] ? this.props.entitiesStore.entities["truck"] .map(item=>  <MenuItem value={item.number}><em>{item.number}</em></MenuItem>): null}
          </Select>
        </FormControl>
        </div><div className="row">
        
        <FormControl className="row">
          <InputLabel htmlFor="cerDel">תעודת משלוח</InputLabel>
          <TextField id="cerDel" className="input"
             type="text" name="cerDel"   
            value={this.entity.cerDel} onChange={this.changeEntity} />
        </FormControl>
        </div><div className="row">
        
        <FormControl className="row">
          <InputLabel htmlFor="cerSell">תעודת מכירה </InputLabel>
          <TextField id="cerSell" className="input"
             type="text" name="cerSell"   
            value={this.entity.cerSell} onChange={this.changeEntity} />
        </FormControl>
        
</div>
        <div className="row"> 
         <SaveIcon className="buttons" onClick={this.saveEntity} />
         <CancelTwoToneIcon  className="buttons" onClick={this.togglePopUp}/>
         </div>
      </Card>)  
      } else{
        return (<Link to="/login">Log in</Link>)
      }
  }
}

export default DeliveryPage;