import '../css/course-selection.css';
import React from 'react';
import { Ring } from 'react-spinners-css';


export default class LoadingOverlay extends React.Component {
    constructor(props) {
      super(props);
      console.log('hit!');
      this.state = {
      };
    }


    render() {
      
      return(
        <div className="loading-overlay">
          <Ring className="loading-ring" color="#8bd3e6" /> {/*BW Sky Blue*/}
        </div>
      );
    }
  }