import React  from 'react';
import LoginForm from '../components/Login.jsx';
import axios from 'axios';
import {observer, inject} from 'mobx-react';
import { Redirect } from 'react-router'


@inject("store") 
@observer
class LoginPage extends React.Component {
   
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: '',
        password: ''
      }
    };
 
  }
 
   processForm = (event)=> {
    event.preventDefault();
 
    axios.post('http://localhost:3001/auth/login', this.state.user)
      .then(res => {
        this.setState({
          errors: {} , user :res.data
        });
      }).catch(err => {
          this.setState({errors: {message:  err.response? err.response.data.message :  err.data, stack:err.stack}});
      });
  }
  
  geUser(event) {
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
       if (!this.state.user._id){

    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
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