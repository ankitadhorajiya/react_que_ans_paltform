import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert, NavItem, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import $ from "jquery";
import {LinkContainer} from "react-router-bootstrap";

const Api = require('../../middleware/Api');

class CategoryQuestionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.match.params.id,
      questions: [],
      currentPage: 1,
      todosPerPage: 10
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
  }

  componentDidMount() {
    var jwt = undefined;
    Api.getQuestions(jwt, this.props.match.params.id).then(data => {
      this.setState({
        questions: (data != undefined ? data : []),
        currentPage: 1,
        todosPerPage: 10
      });
    })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
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

    return (
      <div className='col-md-6'>
        {this.renderQuestion(currentTodos)}
        <ul className='pagination pagination-lg'>
          {renderPageNumbers}
        </ul>
      </div>
    )
  }
}

export default CategoryQuestionComponent;