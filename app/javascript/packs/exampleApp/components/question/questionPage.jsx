import React from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert, NavItem, Panel, Pager} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";

const Api = require('../../middleware/Api');

class QuestionPageComponent extends React.Component {
  setDefault() {
    return {
      questions: []
    };
  }

  constructor(props) {
    super (props);
    this.state = this.setDefault()
  }
  componentDidMount() {
    this.getAllQuestions()
  }

  getAllQuestions() {
    Api.getAllQuestions().then(data => {
      this.setState({
        questions: (data != undefined ? data : [])
      })
    })
  }

  getTags(tags) {
    let tagsList = tags.split(',');
    let tagList = tagsList.map(data => {
      return <div className='col-md-1 tag'>
        {data}
      </div>
    });
    return tagList
  }

  renderQuestion(questions) {
    let questionsList = questions.map(data => {
      return <Panel bsStyle='info'>
        <Panel.Heading>{data.question}</Panel.Heading>
        <Panel.Body>{this.getTags(data.tag)}</Panel.Body>
        <Panel.Body>{data.description}</Panel.Body>
      </Panel>
    });
    return questionsList;
  }
  render() {
    return (
      <div className='col-md-12'>
        {this.renderQuestion(this.state.questions)}

      </div>
    )
  }
}

export default QuestionPageComponent;