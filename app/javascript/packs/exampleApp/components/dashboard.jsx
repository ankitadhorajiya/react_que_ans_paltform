import React from 'react'
import QuestionPage from './question/questionPage';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <div>
          <QuestionPage {...this.props}/>
        </div>
    )
  }
}


export default Dashboard;