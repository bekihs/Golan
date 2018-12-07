import React from 'react';
import { Card } from 'material-ui/Card';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

@inject("userStore")
@observer
class HomePage extends React.Component {

  render() {
      return (<Card className="container">
      </Card>)
  }
}
export default HomePage;