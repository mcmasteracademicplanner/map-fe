import '../css/course-selection.css';
import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class Course extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: 'false',
      };
    }

    toggleOpen(isOpen) {
      this.setState({isOpen:!isOpen});
    }

    render() {
      const {course, addCourseToCart} = this.props;
      const {isOpen} = this.state;

      return(
        <Col sm={12} md={6} className={"course-item"}>
          <span
              tabIndex={0}
              className={"fake-link"}
              id={course.courseID}
              name={course.name}
              onClick={!course.selected ? () => addCourseToCart(course.courseID) : null}
              onKeyPress={!course.selected ? (e) => e.key === "Enter" && addCourseToCart(course.courseID) : null}
              aria-label="Add course to cart"
          >
          {course.courseCode} 
          </span>
          {/*Add clickability to expand course to show info about course*/}
          {/*onKeyPress={(e) => e.key === "Enter" && showCourseInfo(course.courseID)}
          onClick={() => showCourseInfo(course.courseID)}*/}
          <div
              tabIndex={0}
              className="float-right"
              onKeyPress={(e) => e.key === "Enter" && this.toggleOpen(isOpen)}
              onClick={() => this.toggleOpen(isOpen)}
              aria-label="Expand Course Information"
          >
            <FontAwesomeIcon icon={faAngleDown} size="xs" />
          </div>
          {
            isOpen === true && <div>Course Description stuff</div>
          }    
        </Col>
      );
    }
  }