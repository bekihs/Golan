import React from 'react';
import {  Link , NavLink} from 'react-router-dom';

import {observer, inject} from 'mobx-react';


@inject("userStore") 
@observer
class Master  extends React.Component{

  getLinks(){
    if(this.props.userStore.user) {
      return(<div>
        <Link to="/deliveries" className="delivery">משלוחים</Link>
        <Link to="/entities/delivery" className="delivery">הוסף משלוח</Link>
        <Link to="/entities/driver">נהגים</Link>
      <Link to="/entities/truck">משאיות</Link>
      <Link to="/entities/milkman">חלבנים</Link>
      <Link to="/entities/manufacturers">יצרנים</Link>
      <Link to="/entities/entityType">מוצרים</Link> </div>
      );
    } else{
      return (<Link to="/login">Log in</Link>)
    }

  }

  render ( )   {
  return <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <NavLink to="/profile">Golan App</NavLink>
      </div>

      <div className="top-bar-right"> 
      {this.getLinks()}
      </div>

    </div>
 

  </div>
};
}
 

export default Master;