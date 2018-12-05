// import React from 'react'
// import {
//   BrowserRouter as Router,
//   Route,
// } from 'react-router-dom'
//
// import LandingPage from './components/landingPage';
// const App = (props) => (
//     <Router>
//       <div>
//         <Route exact path='/' component={LandingPage} />
//       </div>
//     </Router>
// )
// export default App;


import React from 'react'
import { CookiesProvider } from 'react-cookie'
import TokenAuth from './components/auth/TokenAuth';

class App extends React.Component {
  render() {
    return (
        <CookiesProvider>
          <TokenAuth />
        </CookiesProvider>
    )
  }
}

App.defaultProps = {}

export default App;