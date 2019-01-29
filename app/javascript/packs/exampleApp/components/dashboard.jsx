import React from 'react'
import QuestionPageComponent from './question/questionPage';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>
          <QuestionPageComponent {...this.props} />
        </div>
    )
  }
}


export default Dashboard;