import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { observer, inject } from 'mobx-react';
import { Link, NavLink } from 'react-router-dom';

@inject("userStore")
@observer
class HomePage extends React.Component {

  render() {
    if (this.props.userStore.user) {
      return (<Card className="container">
      </Card>)
    }
    else {
      return (<Link to="/login">Log in</Link>)

    }
  }
}
export default HomePage;