import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import {observer, inject} from 'mobx-react';
import {  Link , NavLink} from 'react-router-dom';

@inject("userStore") 
@observer
class CurrentUser extends React.Component {

  render() { 
    if(this.props.userStore.user) {
      return  (<Card className="container">
    <CardTitle title="גולן" subtitle={" שלום " + this.props.userStore.user.username} />
      </Card>) 
    }
    else{
      return (<Link to="/login">Log in</Link>)
    }
  }
}

export default CurrentUser;