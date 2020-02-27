import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { observer, inject, propTypes } from 'mobx-react';
import { observable, action } from 'mobx';
import TextField from 'material-ui/TextField';
import SaveIcon from '@material-ui/icons/Save';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import Checkbox from '@material-ui/core/Checkbox';
import PricesArray from './PricesArray';
import ManifuctresArray from './ManifuctresArray';
import FormControlLabel from '@material-ui/core/FormControlLabel';

@inject("entitiesStore")
@observer
class CreateEntity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entity: props.entity || { prices: {}, types: [] }
    };
  }
  componentWillReceiveProps(e) {
    this.setState({ entity: e.entity || { prices: {}, types: [] } })
  }
  @action changeEntity = (e) => {
    this.setState({ entity: { ...this.state.entity, [e.target.name]: e.target.value } });
    this.state.entity[e.target.name] = e.target.value;
  }

  @action ChangeCheckBox = (e) => {
    this.setState({ entity: { ...this.state.entity, [e.target.name]: !this.state.entity[e.target.name] } });
  }
  @action arrayChange = (key, value) => {
    // this.state.entity.prices[key]=value;
    this.setState({ entity: { ...this.state.entity, prices: { ...this.state.entity.prices, [key]: value } } });
  }

  @action manArrayChange = (key, value) => {
    if (!value) {
      this.setState({ entity: { ...this.state.entity, types: this.state.entity.types.filter((i) => i !== key) } });
    }
    else if (this.state.entity.types.indexOf(key) < 0) {
      this.setState({ entity: { ...this.state.entity, types: this.state.entity.types.concat(key) } });
    }
  }
  togglePopUp = () => {
    this.props.togglePopUp();
  }
  setArchive = () => {
    this.setState(state => ({ entity: { ...state.entity, isArchive: !state.entity.isArchive } }))
  }
  saveEntity = async () => {
    if (this.props.entity) {
      await this.props.entitiesStore.editEntity(this.state.entity);
    }
    else {
      await this.props.entitiesStore.createItem(this.state.entity, this.props.entityName);
    }
    this.props.togglePopUp();
  }
  getTitle = () => {
    if (this.props.entity) {
      return "ערוך " + this.props.entitiesStore.entitiesFields[this.props.entityName].name;
    }
    else return this.props.entitiesStore.entitiesFields[this.props.entityName].name + " חדש ";
  }

  render() {
    return (<Card className="popUp">
      <CardTitle title={this.getTitle()} />
      {this.props.entitiesStore.entitiesFields[this.props.entityName].fields.map((item) => {
        if (item === "isClose") {
          return (<div class="row"><span>האם הוא קרוב? </span>
            <Checkbox name={item} onChange={this.ChangeCheckBox} className="checkbox" checked={this.state.entity[item]} value="האם הוא קרוב" />
          </div>)
        }
        else if (item === "arrPrices") {
          return (<PricesArray name="item" changeEntity={this.arrayChange} values={this.state.entity.prices || {}} />)
        }
        else if (item === "types") {
          return (<ManifuctresArray name="item" changeEntity={this.manArrayChange} values={this.state.entity.types || []} />)
        }
        else if (item === "isArchive") {
          return (<div class="row"><span>פעיל </span>
            <Checkbox name="isArchive" onChange={this.ChangeCheckBox} className="checkbox" checked={!this.state.entity.isArchive} value="האם הוא פעיל" />
          </div>)
        }
        else {
          return (<div className="row">  <TextField
            floatingLabelText={item} type="text" name={item}
            value={this.state.entity[item] || ""} onChange={this.changeEntity} /></div>)
        }
      })}
      <div className="row">
        <SaveIcon className="buttons" onClick={this.saveEntity} />
        <CancelTwoToneIcon title="cancel" className="buttons" onClick={this.togglePopUp} />
      </div>
    </Card>)
  } 
}

export default CreateEntity;