import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class AppHeaderComponent extends React.Component {

  render() {
    return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              Essence
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {/*<LinkContainer exact to="/">*/}
                {/*<NavItem eventKey={2}>*/}
                  {/*Home*/}
                {/*</NavItem>*/}
              {/*</LinkContainer>*/}
              {/*<LinkContainer exact to="/">*/}
                {/*<NavItem eventKey={3}>*/}
                  {/*Portfolio*/}
                {/*</NavItem>*/}
              {/*</LinkContainer>*/}
              {/*<LinkContainer exact to="/">*/}
                {/*<NavItem eventKey={4}>*/}
                  {/*Services*/}
                {/*</NavItem>*/}
              {/*</LinkContainer>*/}
              {/*<LinkContainer exact to="/blogs">*/}
                {/*<NavItem eventKey={5}>*/}
                  {/*Blog*/}
                {/*</NavItem>*/}
              {/*</LinkContainer>*/}
              {/*<LinkContainer exact to="/">*/}
                {/*<NavItem eventKey={6}>*/}
                  {/*More*/}
                {/*</NavItem>*/}
              {/*</LinkContainer>*/}

              {this.props.appState.pages.map(page =>
                  <LinkContainer key={'page_' + page.id} exact to={'/page/' + page.id}>
                    <NavItem eventKey={'7.' + page.id}>
                      {page.title}
                    </NavItem>
                  </LinkContainer>
              )}
            </Nav>
            <Nav pullRight>
              {!this.props.appState.jwt &&
              <LinkContainer exact to="/sign-in">
                <NavItem eventKey={8}>
                  Sign In
                </NavItem>
              </LinkContainer>
              }
              {this.props.appState.jwt &&
              <LinkContainer exact to="/sign-out">
                <NavItem eventKey={9}>
                  Sign Out
                </NavItem>
              </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
  }

  constructor(props) {
    super(props)
  }

}

export default AppHeaderComponent