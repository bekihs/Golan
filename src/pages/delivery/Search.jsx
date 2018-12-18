
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
class SearchBar extends React.Component {
 
  getFirstDayOfTheMonth(){
    var date = new Date();
return new Date(date.getFullYear(), date.getMonth(), 1);}

getLasttDayOfTheMonth(){
  var date = new Date();
return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }
  @observable entity = {fromDate:this.getFirstDayOfTheMonth(),
     toDate:this.getLasttDayOfTheMonth()
    ,grouping:"milkman" , entityType:"חלב" };
   
    
   
    @action changeEntity=(e)=>{
      this.entity[e.target.name] = e.target.value;
      
    } 
    @action changeDateEntity=(e)=>{
      const values = e.target.value.split("-");
      this.entity[e.target.name] = new Date( values[0] , values[1],values[2]);
      
    }

  search = ()=>{
    this.props.entitiesStore.searchDeliveries(this.entity);
  }
  componentDidMount() {
    this.props.entitiesStore.getItems("entityType"); 
  } 
  padNumber(number){
    return number>9 ? number : "0"+number;
  }
  toDateString(date){
    return date.getFullYear() + "-" + this.padNumber(date.getMonth() + 1) + "-"+this.padNumber(date.getDate());
  }
  render() {  
        return  (<Card className="popUp">
    <CardTitle title="דוחות"/>
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
            {this.props.entitiesStore.entities["entityType"] ? this.props.entitiesStore.entities["entityType"] .map(item=>  <MenuItem value={item.name}><em>{item.name}</em></MenuItem>): null}
          </Select>
        </FormControl>
        </div><div className="row">
          <FormControl >
          <InputLabel htmlFor="mani-simple">דוח עבור</InputLabel>
          <Select className="input"
            value={this.entity.grouping}
            onChange={this.changeEntity}
            inputProps={{
              name: 'grouping',
              id: 'mani-simple',
            }} > 
                {/* <MenuItem value="_id"><em>הצג את כל ההעברות</em></MenuItem>  */}
                <MenuItem value="milkman"><em>חלבנים</em></MenuItem> 
                <MenuItem value="manufacturer"><em>יצרנים</em></MenuItem> 
          </Select>
        </FormControl>
        </div> <div className="row"> 
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

export default SearchBar;