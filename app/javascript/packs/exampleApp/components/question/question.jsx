import React from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert, NavItem} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";

const Api = require('../../middleware/Api');

class QuestionComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: undefined
    }
  }

  componentDidMount() {
    this.getQuestion(this.props.match.params.id)
  }

  getQuestion(id) {
    Api.getQuestion(id).then(data => {
      this.setState({
        question: (data !== undefined ? data : undefined)
      });
    });
  }

  render() {
    return (
      <div>
        { this.state.question &&
        <div>
          <div className="panel panel-info">
            <div className="panel-heading"># { this.state.question.question }</div>
            <div className="panel-body">
              <p> { this.state.question.description }</p>
              <p> { this.state.question.tag }</p>
            </div>
            <LinkContainer key={'page_' + this.state.question.id} exact to={'/questions/' + this.state.question.id + '/edit'}>
              <Button>
                Edit Question
              </Button>
            </LinkContainer>
          </div>
        </div>
        }
      </div>

    )
  }

}

export default QuestionComponent;
