import React  from 'react';
import LoginForm from '../components/Login.jsx';
import axios from 'axios';
import {observer, inject} from 'mobx-react';
import { Redirect } from 'react-router'


@inject("userStore") 
@observer
class LoginPage extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = { 
      user: {
        username: '',
        password: ''
      }
    };
  }
 
   processForm = (event)=> {
    event.preventDefault();
    this.props.userStore.login(this.state.user);
  }
  
  changeUser=(event) =>{
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({user
    });
  }

  /**
   * Render the component.
   */
  render() {
       if (!this.props.userStore.user){

    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.props.userStore.errors}
        user={this.state.user}
      />
    );
       }
       else{
                 return <Redirect to="/profile"/>;
       }
  }

}

export default LoginPage;