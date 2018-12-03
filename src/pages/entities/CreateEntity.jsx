import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import {observer, inject} from 'mobx-react';
import {  Link } from 'react-router-dom';

@inject("entitiesStore") 
@observer
class CreateEntity extends React.Component {
 
  render() { 
      return  (<Card className="container">
    <CardTitle title={this.props.name + " חדש "} />
    <CardContent>
        {this.props.entitiesStore.entitiesFields[this.props.name].map((item)=>{
            <input type="text" name={item} placholder={item}/>
        })}
         <Button variant="contained" color="primary" className={classes.button}>
        שמור
         <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
      </Button>
    </CardContent>
      </Card>)  
  }
}

export default CreateEntity;