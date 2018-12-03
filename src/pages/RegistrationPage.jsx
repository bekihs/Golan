import React  from 'react';
import SignUpForm from '../components/Registration.jsx';
import { Redirect } from 'react-router'
import axios from 'axios';
import {observer, inject} from 'mobx-react';

@inject("userStore") 
@observer
class SignUpPage extends React.Component {
 
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      user: {
        name: '',
        password: ''
      }
    };

  }
 
  changeUser =(event) =>{
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }
  
  processForm=(event) =>{
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
 this.props.userStore.register(this.state.user);
  }
 
  render() {
    if (!this.props.userStore.user){
        return (
        <SignUpForm
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

export default SignUpPage;