import React from 'react';
import {  Link , NavLink} from 'react-router-dom'

const Master = ( ) =>  {
  return <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <NavLink to="/">React App</NavLink>
      </div>

      <div className="top-bar-right">
        <Link to="/login">Log in</Link>
      </div>

    </div>
 

  </div>
};
 

export default Master;