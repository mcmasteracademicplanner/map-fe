import '../css/search.css';
import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl } from 'react-bootstrap';
import {searchForCourse} from '../api/courses-api';
import Course from './Course';

const generateSearchResults = (selectedCourses, addCourseToCart) => {
  return selectedCourses.map((course, index) => {
    return ( <Course key={`search-${course.courseID}`} course={course} addCourseToCart={addCourseToCart}/> );
  })
}


export default class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: '',
        results: [],
        errorMessage: '',
        searching: false,
        isSearchValid: null,
      };
      this.submitSearch = this.submitSearch.bind(this);
      this.validateAndSubmitSearch = this.validateAndSubmitSearch.bind(this);
      this.updateSearchForm = this.updateSearchForm.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() { document.addEventListener("click", this.handleClickOutside, false); }
    componentWillUnmount() { document.removeEventListener("click", this.handleClickOutside, false); }
    
    submitSearch() {
      const {searchTerm} = this.state;
      searchForCourse({searchTerm}).then(res => {
        // console.log(res);
        if (res.data.error && res.data.error === "long query"){
          this.setState({errorMessage: "Your request was too long", results: []});
        } else if (res.data.results && res.data.results.length === 0){
          this.setState({errorMessage: "No results found", results: []});
        } else {
          this.setState({results: res.data.results , errorMessage:""});
        }
      }).catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
    } 

    // before submitting form, set validation state and enable searching mode
    validateAndSubmitSearch() {
      const {searchTerm} = this.state;
      const isSearchValid = searchTerm.length > 0 && searchTerm.length <= 30;

      this.setState({searching: true, isSearchValid},
        ()=> {
          if (isSearchValid) {
            this.submitSearch();
          }
      });
    }

    // We perform a live search after updating the search term
    updateSearchForm(e) {
      this.setState(
        { searchTerm: e.target.value},
         () => this.validateAndSubmitSearch());
    }

    handleClickOutside(e){
      if (this.searchBox.contains(e.target)) {
        return;
      }
      this.setState({results: [], errorMessage: "", searching: false});
    }

    // Allow user to submit search via the enter button
    enterToSubmit(e){
      if(e.key === "Enter"){
          this.validateAndSubmitSearch(); 
      }
      return false;
    }

    render() {
      const {searchTerm, results, errorMessage, searching, isSearchValid} = this.state;
      return(
        <div className="search-bar">
            <h2> Search </h2>
            <InputGroup size="md" className="mb-3" ref={searchBox => { this.searchBox = searchBox; }}>
                <FormControl
                 type="text"
                 className="search-input"
                 placeholder="Search For a Course..." 
                 defaultValue={searchTerm} 
                 onChange={this.updateSearchForm}
                 aria-labelledby="Search for a course"
                 onKeyPress={this.enterToSubmit.bind(this)}
                 isInvalid={searching && isSearchValid===false}
                >
                </FormControl>
                <InputGroup.Append>
                    <button className="btn btn-secondary btn-search" disabled={searching && isSearchValid===false} onClick={this.validateAndSubmitSearch}></button>
                </InputGroup.Append>
                  {searching && 
                    <React.Fragment>
                      { isSearchValid ? 
                        <div className="search-results-container">
                          <div className="search-results">
                            {results.length > 0 ? generateSearchResults(results, this.props.addCourseToCart) : errorMessage}
                          </div>
                        </div>
                        : <FormControl.Feedback type="invalid" role="alert">Your search must be between 0 and 31 characters.</FormControl.Feedback> 
                      }
                    </React.Fragment> 
                  }
            </InputGroup>
        </div>
      );
    }
}


SearchBar.propTypes = {
  addCourseToCart: PropTypes.func.isRequired,
}