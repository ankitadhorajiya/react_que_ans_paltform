import React from 'react'
import { Navbar, Nav, NavItem, FormControl } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import TokenAuthComponent from "../auth/TokenAuth";

class AppHeaderComponent extends React.Component {

  constructor(props) {
    super(props)
  }
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
              <LinkContainer exact to="/">
                <NavItem eventKey={2}>
                  Questions
                </NavItem>
              </LinkContainer>
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
            </Nav>
            <Nav pullRight>
              {this.props.appState.pages.map(page =>
                  <LinkContainer key={'page_' + page.id} exact to={'/page/' + page.id}>
                    <NavItem eventKey={'7.' + page.id}>
                      {page.title}
                    </NavItem>
                  </LinkContainer>
              )}
              {
                <LinkContainer exact to='/'>
                  <NavItem eventKey={12}>
                    <FormControl
                      type='text'
                      id='questionSearch'
                      placeholder='Search Question'
                    />
                  </NavItem>
                </LinkContainer>
              }
              {!this.props.appState.jwt &&
              <LinkContainer exact to="/sign-in">
                <NavItem eventKey={8}>
                  Sign In
                </NavItem>
              </LinkContainer>
              }
              {!this.props.appState.jwt &&
              <LinkContainer exact to="/sign-up">
                <NavItem eventKey={10}>
                  Sign Up
                </NavItem>
              </LinkContainer>
              }
              {this.props.appState.jwt &&
              <LinkContainer exact to="/questions">
                <NavItem eventKey={11}>
                  Ask Question?
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


}

export default AppHeaderComponent