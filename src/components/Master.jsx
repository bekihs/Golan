import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { observer, inject } from 'mobx-react';


@inject("entitiesStore")
@inject("userStore")
@observer
class Master extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: false
    };
  }
  getLinks() {
    if (this.props.userStore.user) {
      return (<div>
        <Link to="/deliveries" className="delivery">משלוחים</Link>
        <Link to="/entity/delivery" className="delivery">הוסף משלוח</Link>
        <Link to="/entities/driver">נהגים</Link>
        <Link to="/entities/truck">משאיות</Link>
        <Link to="/entities/milkman">חלבנים</Link>
        <Link to="/entities/manufacturers">יצרנים</Link>
        <Link to="/entities/entityType">מוצרים</Link>
        {this.state.downloading ? <Link to="#">מוריד</Link> : <Link to="#" onClick={this.downloadExcel}>הורד אקסל</Link>} </div>
      );
    } else {
      return (<Link to="/login">Log in</Link>)
    }

  }



  downloadExcel = async () => {
    try {
      this.setState({
        downloading: true
      });
      const response = await this.props.entitiesStore.downloadExcel();
      const outputFilename = `${Date.now()}.xls`;

      // If you want to download file automatically using link attribute.
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', outputFilename);
      document.body.appendChild(link);
      link.click();
      
      this.setState({
        downloading: false
      });

    } catch (error) {
      throw Error(error);
    }
  }

  render() {
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