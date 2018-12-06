import React from 'react'
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
  render() {
    return (
      <div className='col-md-9'>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Popular Posts</h3>
          </div>
          <div className="panel-body">
            Popular Blog Posts
          </div>
        </div>
      </div>
    )
  }
}

export default PopularPosts;