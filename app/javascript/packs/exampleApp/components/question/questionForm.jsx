import React from 'react'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap'

const Api = require('../../middleware/Api');

class QuestionFormComponent extends React.Component {



  defaultState() {
    if (this.props.match.params.id != undefined) {
      this.getQuestion(this.props.match.params.id);
    }
    return {
      question: {
        value: '',
        error: 'Question can\'t be blank'
      },
      description: {
        value: '',
        error: ''
      },
      tag: {
        value: '',
        error: ''
      },
      submit: {
        error: ''
      },
      formSubmitted: false,
      editForm: false
    }

  }

  getQuestion(id) {
    Api.getQuestion(id).then(data => {
      this.setState({
        question: {
          value: (data !== undefined ? data.question : ''),
          error: 'Question can\'t be blank'
        },
        description: {
          value: (data !== undefined ? data.description : ''),
          error: ''
        },
        tag: {
          value: (data !== undefined ? data.tag: ''),
          error: ''
        },
        editForm: true
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = this.defaultState();
    this.setQuestion = this.setQuestion.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setTagValues = this.setTagValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onKeyUp(event) {
    let tagArray = [];
    if (event.keyCode == 188) {
      let tag = event.target.value.substr(0, event.target.value.indexOf(','));
      console.log(tagArray.length);
      tagArray.push(tag);
      console.log(tagArray.length);
      // console.log(tagArray);
    }
    // console.log(tag);
  }


  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      question: {
        formSubmitted: true,
        submit: {
          error: ''
        }
      }
    });

    if (this.getFormErrors().length > 0) {
      return false;
    }

    if (this.state.editForm == true) {
      Api.updateQuestion(this.props.match.params.id, this.state.question.value, this.state.description.value, this.state.tag.value)
        .then(data => {
        if (data.status == 200) {
          this.props.propagateQuestion(data.question_id, this.props.history);
        }else {
          this.setState({
            question: {
              submit: {
                error: data.message
              }
            }
          })
        }
      });
    }else {
      Api.createQuestion(this.state.question.value, this.state.description.value, this.state.tag.value).then(data => {
        if (data.status == 200) {
          console.log(this.props.history);
          this.props.propagateQuestion(data.question_id, this.props.history);
        }else {
          this.setState({
            question: {
              submit: {
                error: data.message
              }
            }
          })
        }
      });
    }
  }

  getFormErrors(){
    let fields = ['question', 'description', 'tag', 'submit'];
    let errors = [];
    fields.map(field => {
      let fieldError = this.state[field].error || '';
      if (fieldError.length > 0) {
        errors.push(fieldError);
      }
    })
    return errors;
  }

  setQuestion(event) {
    let newQuestion = event.target.value || ''
    let errorMessage = newQuestion.length === 0 ? 'Question can\'t be blank' : ''
    this.setState({
      question: {
        value: newQuestion,
        error: errorMessage
      },
      submit: {
        error: ''
      }
    })
  }

  setDescription(event) {
    let newDescription = event.target.value || ''
    this.setState({
      description: {
        value: newDescription,
        error: ''
      },
      submit: {
        error: ''
      }
    })
  }

  setTagValues(event) {
    let newTag = event.target.value || ''
    this.setState({
      tag: {
        value: newTag,
        error: ''
      },
      submit: {
        error: ''
      }
    })
  }



  render(){
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            {this.getFormErrors().length > 0 && this.state.formSubmitted &&
            <Alert bsStyle="danger">
              <strong>Please correct the following errors:</strong>
              <ul>
                {
                  this.getFormErrors().map((message,index) =>
                    <li key={'error_message_'+index}>{message}</li>
                  )
                }
              </ul>
            </Alert>
            }
            <form  onSubmit={this.handleSubmit} >
              <FormGroup>
                <ControlLabel>Question</ControlLabel>
                <FormControl
                 id="question"
                 type="text"
                 label="Question"
                 placeholder="Write your question"
                 value={this.state.question.value || ''}
                 onChange={this.setQuestion}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  id="description"
                  label="Question"
                  placeholder="Question description"
                  value={this.state.description.value || ''}
                  onChange={this.setDescription}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Tags</ControlLabel>
                <FormControl
                  id="questionTag"
                  label="Tag"
                  placeholder="Tags"
                  value={this.state.tag.value || ''}
                  onKeyUp={this.onKeyUp}
                  onChange={this.setTagValues}
                />
              </FormGroup>
              <Button type='submit'>
                Post Question
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }


}

export default QuestionFormComponent;
