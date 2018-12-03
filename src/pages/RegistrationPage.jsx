import React  from 'react';
import SignUpForm from '../components/Registration.jsx';
import { Redirect } from 'react-router'
import axios from 'axios';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Change the user object.
   *
   * param  event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Process the form.
   *
   * param event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
 
    axios.post('http://localhost:3001/auth/register', this.state.user)
      .then(res => {
        this.setState({
          errors: {} , user :res.data
        });
      }).catch(err => {
          this.setState({errors: {message:  err.response? err.response.data.message :  err.data, stack:err.stack}});
      });
  }

  /**
   * Render the component.
   */
  render() {
    if (!this.state.user._id){
        return (
        <SignUpForm
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

export default SignUpPage;