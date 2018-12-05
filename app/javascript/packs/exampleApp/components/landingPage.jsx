// import React from 'react';
// // Components
// import Pricing from './landingPage/pricing';
// import Pitch from './landingPage/pitch';
//
// class LandingPage extends React.Component {
//   render() {
//     return(
//         <div>
//           <Pitch {...this.props} />
//           <Pricing {...this.props}/>
//         </div>
//     )
//   }
// }
// export default LandingPage;


import React from 'react'
import { CookiesProvider } from 'react-cookie'
import TokenAuth from './auth/TokenAuth'

class LandingPage extends React.Component {
  render() {
    return (
        <CookiesProvider>
          <TokenAuth />
        </CookiesProvider>
    )
  }
}

LandingPage.defaultProps = {}

export default LandingPage;