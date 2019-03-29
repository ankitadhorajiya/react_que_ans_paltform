import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppHeader from '../../components/common/AppHeader';
import AuthSignIn from '../../components/common/AuthSignIn';
import AuthSignUp from '../../components/common/AuthSignUp';
import AuthSignOut from '../../components/common/AuthSignOut';
import Dashboard from '../../components/dashboard';
import BlogPage from '../blog/blogPage';
import Blog from '../blog/blog';
import NewQuestionComponent from '../question/newQuestion';
import QuestionComponent from '../question/question';
import CategoryQuestionComponent from '../question/categoryQuestion';

const Api = require('../../middleware/Api');

class TokenAuthComponent extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  render() {
    return (
        <Router>
          <div>
            <AppHeader appState={this.state} />

            {!this.state.jwt &&
            <Route
                exact path="/sign-in"
                render={(routeProps) => (
                    <AuthSignIn {...routeProps} propagateSignIn={this.propagateSignIn} />
                )}
            />
            }

            {!this.state.jwt &&
            <Route
              exact path="/sign-up"
              render={(routeProps) => (
                <AuthSignUp {...routeProps} propagateSignUp={this.propagateSignUp}/>
              )}
            />
            }

            {this.state.jwt &&
              <Route
                exact path="/sign-out"
                render={(routeProps) => (
                    <AuthSignOut {...routeProps} propagateSignOut={this.propagateSignOut} />
                )}
              />
            }

            {this.state.jwt &&
              <Route
                exact path="/"
                render={(routeProps) => (
                    <Dashboard {...routeProps}  appState={this.state} />
                )}
              />
            }

            {
              this.state.jwt &&
              <Route
                exact path="/questions"
                render={(routeProps) => (
                  <NewQuestionComponent {...routeProps} propagateQuestion={this.propagateQuestion} />
                )}
              />
            }

            <div className='container'>
              <Route
                exact path="/"
                render={(routeProps) => (
                    <Dashboard {...routeProps} appState={this.state}/>
                )}
              />

              <Route
                exact path="/blogs"
                render={(routeProps) => (
                    <BlogPage {...routeProps} appState={this.state}/>
                )}
              />

              <Route
                exact path='/blogs/:id'
                render={(routeProps) => (
                  <Blog {...routeProps} appState={this.state} />
                )}
              />

              <Route
                exact path='/questions/:id'
                render={(props) => (
                  <QuestionComponent {...props} appState={this.state} />
                )}
              />

              <Route
                exact path='/questions/:id/edit'
                render={(routeProps) => (
                  <NewQuestionComponent {...routeProps} propagateQuestion={this.propagateQuestion}/>
                )}
              />

              <Route
                exact path='/topic/:id'
                render={(routeProps) => (
                  <CategoryQuestionComponent {...routeProps} appState={this.state} />
                )}
              />
            </div>
          </div>
        </Router>
    )
  }

  componentDidMount() {
    this.getUser()
    // this.getPages()
  }

  defaultState() {
    return {
      cookieName: 'rails-react-token-auth-jwt',
      email: undefined,
      jwt: undefined,
      user_id: undefined,
      categories: undefined,
      pages: []
    }
  }

  constructor(props) {
    super(props)

    this.state = this.defaultState();

    this.propagateSignIn = this.propagateSignIn.bind(this);
    this.propagateSignOut = this.propagateSignOut.bind(this);
    this.propagateSignUp = this.propagateSignUp.bind(this);
    this.propagateQuestion = this.propagateQuestion.bind(this);
  }

  propagateSignUp(jwt, history = undefined){
    this.propagateSignIn(jwt, history);
    // const { cookies } = this.props;
    // cookies.set(this.state.cookieName, jwt, { path: '/' });
    // this.getUser(history)
  }
  
  propagateSignIn(jwt, history = undefined) {
    const { cookies } = this.props
    cookies.set(this.state.cookieName, jwt, { path: '/' });
    this.getUser(history)
  }

  propagateSignOut(history = undefined) {
    const { cookies } = this.props;
    cookies.remove(this.state.cookieName);
    this.setState({
      email: undefined,
      user_id: undefined,
      jwt: undefined
    });
    if (history) history.push('/')
  }

  propagateQuestion(data, history = undefined){
    const { cookies } = this.props;
    if (history) history.push('/questions/'+data)
  }

  getUser(history = undefined) {
    const { cookies } = this.props;
    let jwt = cookies.get(this.state.cookieName);
    if (!jwt) return null;

    Api.getCurrentUser(jwt).then(response => {
      if (response !== undefined) {
        this.setState({
          email: response.user.email,
          user_id: response.user.id,
          categories: response.categories,
          jwt: jwt
        });
        if (history) history.push('/');
      }
      else {
        // user has cookie but cannot load current user
        cookies.remove(this.state.cookieName);
        this.setState({
          email: undefined,
          user_id: undefined,
          jwt: undefined
        })
      }
    })
  }
}

export default withCookies(TokenAuthComponent)
