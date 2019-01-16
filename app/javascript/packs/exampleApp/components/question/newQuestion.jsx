import React from 'react'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import QuestionFormComponent from './questionForm';

class NewQuestionComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='row'>
        <QuestionFormComponent  {...this.props} propagateQuestion={this.props.propagateQuestion}/>
      </div>
    )
  }


}



export default NewQuestionComponent;
