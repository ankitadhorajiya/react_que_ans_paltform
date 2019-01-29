import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Alert,
  NavItem,
  Panel,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import $ from 'jquery';

const Api = require('../../middleware/Api');

class QuestionPageComponent extends React.Component {
  setDefault() {
    return {
      questions: [],
      currentPage: 1,
      todosPerPage: 10,
      categories: [],
      options: []
    };
  }

  constructor(props) {
    super(props);
    this.state = this.setDefault();
    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
  }

  componentDidMount() {
    if (this.props.appState.jwt != undefined) {
      this.getQuestions()
    }
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  getQuestions() {
    var topic = undefined;
    Api.getQuestions(this.props.appState.jwt, topic).then(data => {
      this.setState({
        questions: (data != undefined ? data : []),
        currentPage: 1,
        todosPerPage: 10,
        categories: (this.props.appState.categories != undefined ? this.props.appState.categories : [])
      })
    });
    Api.getOptions().then(data => {
      if (data.length != 0) {
        this.setState({
          options: (data != undefined ? data : [])
        });
      }
    });
  }

  handleDeleteQuestion(event) {
    Api.deleteQuestion(event.target.id).then(data => {
      if (data.status == 200) {
        $('.questionPanel-' + data.id).addClass('hide')
      }
    })
  }

  getTags(tags) {
    let tagsList = tags.split(',');
    let tagList = tagsList.map((data, index) => {
      return (
        <div className='col-md-1 tag' key={index}>
          {data}
        </div>
      );
    });
    return tagList
  }

  renderQuestion(questions) {
    let questionsList = questions.map(data => {
      return (
        <Panel key={data.id} className={'questionPanel-' + data.id}>
          <Panel.Heading>
            {data.question}
            <LinkContainer exact to={'/questions/' + data.id + '/edit'}>
              <Button className='pull-right m-r-t-7'>
                Edit
              </Button>
            </LinkContainer>
            <Button className='pull-right m-r-t-7'>
              <a onClick={this.handleDeleteQuestion} id={data.id}>
                Delete
              </a>
            </Button>
          </Panel.Heading>
          <Panel.Body>{this.getTags(data.tag)}</Panel.Body>
          <Panel.Body>{data.description}</Panel.Body>
        </Panel>
      );
    });
    return questionsList;
  }

  render() {
    const {questions, currentPage, todosPerPage} = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = questions.slice(indexOfFirstTodo, indexOfLastTodo);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(questions.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li className={number == currentPage ? 'active' : ''} key={number}>
          <a role='button' href='javascript:void(0);' id={number} onClick={this.handleClick}>{number}</a>
        </li>
      );
    });

    const categories = this.state.categories;
    const renderCategories = categories.map(category => {
      return (
        <ListGroup key={category.id} className='text-center'>
          <ListGroupItem>
            <LinkContainer exact to={'topic/'+ category.name}>
              <a>{category.name}</a>
            </LinkContainer>
          </ListGroupItem>
        </ListGroup>
      )
    });
    const AllOptions = this.state.options;
    const renderAllOptions = AllOptions.map(option => {
      return (
        <ListGroup key={option.id} className='text-center'>
          <ListGroupItem>
            {option.name}
          </ListGroupItem>
        </ListGroup>
      )
    });

    return (
      <div className='col-md-12'>
        <div className='col-md-2 col-md-offset-1'>
          <Panel>
            {renderAllOptions}
          </Panel>
        </div>
        <div className='col-md-6'>
          {this.renderQuestion(currentTodos)}
          <ul className='pagination pagination-lg'>
            {renderPageNumbers}
          </ul>
        </div>
        {
          categories.length != 0 ? (
            <div className='col-md-2'>
              <Panel>
                <Panel.Heading className='text-center'>Your Interested Topics</Panel.Heading>
                {renderCategories}
              </Panel>
            </div>
          ) : ''
        }
      </div>
    )
  }
}

export default QuestionPageComponent;
