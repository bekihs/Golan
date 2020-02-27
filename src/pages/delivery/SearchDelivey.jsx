
import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import {observer, inject} from 'mobx-react';
import { observable, action } from 'mobx';
import TextField from 'material-ui/TextField';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

@inject("entitiesStore") 
@observer
class SearchDelivery extends React.Component {
 
  getFirstDayOfTheMonth(){
    var date = new Date();
return new Date(date.getFullYear(), date.getMonth(), 1);}

getLasttDayOfTheMonth(){
  var date = new Date();
return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }
  @observable entity = {fromDate:this.getFirstDayOfTheMonth(),
     toDate:this.getLasttDayOfTheMonth()
    ,milkman:undefined , entityType:undefined };
   
    
   
    @action changeEntity=(e)=>{
      this.entity[e.target.name] = e.target.value;
      
    } 
    @action changeDateEntity=(e)=>{
      const values = e.target.value.split("-");
      this.entity[e.target.name] = new Date( values[0] , values[1] -1,values[2]);
    }

  search = ()=>{
    this.props.entitiesStore.searchDeliveriesEntities(this.entity);
  }
  componentDidMount() {
    this.props.entitiesStore.getItems("entityType"); 
    this.props.entitiesStore.getItems("milkman"); 
    this.props.entitiesStore.getItems("truck"); 
    this.props.entitiesStore.getItems("driver"); 
    this.props.entitiesStore.getItems("manufacturers"); 
  } 
  padNumber(number){
    return number>9 ? number : "0"+number;
  }
  toDateString(date){
    return date.getFullYear() + "-" + this.padNumber(date.getMonth() + 1) + "-"+this.padNumber(date.getDate());
  }
  render() {  
        return  (<Card className="popUp">
    <div  className="row">
            <FormControl>
          <InputLabel htmlFor="age-simple">מוצר</InputLabel>
          <Select className="input"
            value={this.entity.entityType}
            onChange={this.changeEntity}
            inputProps={{
              name: 'entityType',
              id: 'age-simple',
            }} > 
                <MenuItem  ><em>-</em></MenuItem> 
            {this.props.entitiesStore.entities["entityType"] ? this.props.entitiesStore.entities["entityType"] .map(item=>  <MenuItem value={item.name}><em>{item.name}</em></MenuItem>): null}
          </Select>
        </FormControl>
        </div><div className="row">
          <FormControl >
          <InputLabel htmlFor="mani-simple">חלבן</InputLabel>
          <Select className="input"
            value={this.entity.milkman}
            onChange={this.changeEntity}
            inputProps={{
              name: 'milkman',
              id: 'mani-simple',
            }} > 
                <MenuItem  ><em>-</em></MenuItem> 
            {this.props.entitiesStore.entities["milkman"] ? this.props.entitiesStore.entities["milkman"] .map(item=>  <MenuItem value={item.name}><em>{item.name}</em></MenuItem>): null}
          </Select>
        </FormControl>
        </div>
        
        <div  className="row">
            <FormControl>
          <InputLabel htmlFor="age-simple">יצרן</InputLabel>
          <Select className="input"
            value={this.entity.manufacturer}
            onChange={this.changeEntity}
            inputProps={{
              name: 'manufacturer',
              id: 'manufacturer',
            }} > 
                <MenuItem  ><em>-</em></MenuItem> 
            {this.props.entitiesStore.entities["manufacturers"] ? this.props.entitiesStore.entities["manufacturers"] .map(item=>  <MenuItem value={item.name}><em>{item.name}</em></MenuItem>): null}
          </Select>
        </FormControl>
        </div>
        
        <div  className="row">
            <FormControl>
          <InputLabel htmlFor="age-simple">נהג</InputLabel>
          <Select className="input"
            value={this.entity.driver}
            onChange={this.changeEntity}
            
              name='driver'
              id= 'driver'
             >
                <MenuItem  ><em>-</em></MenuItem> 
            {this.props.entitiesStore.entities["driver"] ? this.props.entitiesStore.entities["driver"].sort((a,b)=>( a.isArchive?1:0)-(b.isArchive?1:0)).map(item=>  <MenuItem value={item.name}><em>{item.name}</em></MenuItem>): null}
             </Select>  
        </FormControl>
        </div> 
        <div  className="row">
            <FormControl>
          <InputLabel htmlFor="age-simple">משאית</InputLabel>
          <Select className="input"
            value={this.entity.truck}
            onChange={this.changeEntity}
              name= 'truck'
              id='truck'
             >
                <MenuItem  ><em>-</em></MenuItem> 
            {this.props.entitiesStore.entities["truck"] ? this.props.entitiesStore.entities["truck"].sort((a,b)=>( a.isArchive?1:0)-( b.isArchive?1:0)) .map(item=>  <MenuItem value={item.number}><em>{item.number}</em></MenuItem>): null}
             </Select>  
        </FormControl>
        </div>  
        
         <div className="row"> 
        <span htmlFor="mani-simple">מתאריך</span>
          <FormControl className="row">
          <TextField className="input"
             type="date" name="fromDate"   
             value={this.toDateString(this.entity.fromDate)} onChange={this.changeDateEntity} />
        </FormControl>
 </div><div className="row"> 
          <span htmlFor="toDate">עד תאריך</span>
          <TextField className="input"
             type="date" name="toDate"   InputLabelProps={{
              shrink: true,
            }}  label="עד תאריך" 
            value={this.toDateString(this.entity.toDate)} onChange={this.changeDateEntity} />
 </div> 
        <div className="row"> 
         <SearchIcon className="buttons" onClick={this.search} />
         </div>
      </Card>)  
  }
}

export default SearchDelivery;