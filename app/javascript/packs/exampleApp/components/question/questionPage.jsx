import React from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert, NavItem, Panel} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";

const Api = require('../../middleware/Api');

class QuestionPageComponent extends React.Component {
  setDefault() {
    return {
      questions: [],
      currentPage: 1,
      todosPerPage: 10
    };
  }

  constructor(props) {
    super(props);
    this.state = this.setDefault()
    this.handleClick = this.handleClick.bind(this);
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
    Api.getQuestions(this.props.appState.jwt).then(data => {
      this.setState({
        questions: (data != undefined ? data : []),
        currentPage: 1,
        todosPerPage: 10
      })
    })
  }

  getSelectedQuestions() {
    Api.getSelectedQuestions
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
        <Panel bsStyle='info' key={data.id}>
          <Panel.Heading>
            {data.question}
            <LinkContainer key={'page_'} exact to={'/questions/' + data.id + '/edit'}>
              <Button className='pull-right m-r-t-7'>
                Edit
              </Button>
            </LinkContainer>
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
      <div className='col-md-8 col-md-offset-2'>
        {this.renderQuestion(currentTodos)}
        <ul className='pagination pagination-lg'>
          {renderPageNumbers}
        </ul>
      </div>
    )
  }
}

export default QuestionPageComponent;
