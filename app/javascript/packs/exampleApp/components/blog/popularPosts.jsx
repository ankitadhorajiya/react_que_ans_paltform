import React from 'react'
import {LinkContainer} from "react-router-bootstrap";
const Api = require('../../middleware/Api');

const BLOG_TYPE = require('../../constants/const').BlogType;

class PopularPosts extends React.Component {
  defaultState() {
    return {
      blogs: []
    }
  }
  constructor(props) {
    super(props);
    this.state = this.defaultState()
  }
  componentDidMount() {
    this.getBlogs(BLOG_TYPE.POPULAR)
  }
  getBlogs(blogType) {
    Api.getBlogsList(blogType).then(response => {
      this.setState({
        blogs: (response !== undefined ? response : [])
      });
    })
  }
  renderBlogs(blogs) {
    let blogList = blogs.map(blog => {
      let href = 'blogs/' + blog.id ;
      return <LinkContainer exact to={href} key={blog.id}>
        <a className='list-group-item' href='#' > { blog.title } </a>
      </LinkContainer>
    });
    return blogList;
  }

  render() {
    return (
      <div className='col-md-9'>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Popular Posts</h3>
          </div>
          <div className="list-group ">
            { this.renderBlogs(this.state.blogs) }
          </div>
        </div>
      </div>
    )
  }
}

export default PopularPosts;