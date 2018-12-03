import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { Redirect } from 'react-router';
import axios from 'axios';

class CurrentUser extends React.Component {

  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: undefined,
      currentUser: ""
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/currentUser')
      .then(res => {
        this.setState({ currentUser: res.data });
      }).catch(err => {
        this.setState({ errors: err })
      });
  }

  render() {
    if (!this.state.errors) {
      return  <Card className="container">
        <CardTitle title={this.state.currentUser} subtitle="CurrentUser" />
      </Card>
    }
    else {
      return <Redirect to="/login" />;
    }
  }
}

export default CurrentUser;