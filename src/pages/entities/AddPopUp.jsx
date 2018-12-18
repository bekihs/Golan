import React  from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {observer} from 'mobx-react';
import {observable , action } from 'mobx';
import CreateEntity from './CreateEntity';
import DeliveryPage from '../delivery/DeliveryPage';

@observer
class AddPopUp extends React.Component {
    @observable showPopUp = false;
    @action togglePopUp=()=>{debugger;
        this.showPopUp = !this.showPopUp; 
    }
    getPopUp=()=>{
      if (this.props.entity ||this.showPopUp )
        {
          if (this.props.entityName === "delivery"){
              return (<DeliveryPage entity={this.props.entity} togglePopUp={this.props.entity?this.props.togglePopUp : this.togglePopUp} />)
          }
          else return  ( <CreateEntity entity={this.props.entity} togglePopUp={this.props.entity?this.props.togglePopUp : this.togglePopUp} entityName={this.props.entityName}></CreateEntity> );
        }
    }
  render() {
       return (<div className="popUpContainer">  <Fab color="primary" aria-label="Add" >
       <AddIcon onClick={this.togglePopUp} />
       {this.getPopUp()}
     </Fab>
     </div> )
  }
}

export default AddPopUp;