import React from 'react';
import {Col, Row, Tabs, Tab} from 'react-bootstrap';

export default class CourseSelection extends React.Component {
    constructor(props) {
      super(props);
      this.state = {color: "red"};
    }
    render() {
        return(
            <div className="course-selection">
                <h1> Course Selection </h1>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="fall" title="Fall">
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </Tab>
                    <Tab eventKey="winter" title="Winter">
                    </Tab>
                    <Tab eventKey="spring-summer" title="Spring/Summer">
                    </Tab>
                </Tabs> 
            </div>
        );
    }
  }
  