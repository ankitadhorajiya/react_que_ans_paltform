import React from 'react'

const Api = require('../../middleware/Api');
const BLOG_TYPE = require('../../constants/const').BlogType;

class RecentlyPosted extends React.Component {
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
    this.getBlogs(BLOG_TYPE.RECENT)
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
      <div className='col-md-3'>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Recently Posted</h3>
          </div>
          <div className="panel-body">
            Recently Posted Blogs
          </div>
        </div>
      </div>
    )
  }
}


export default RecentlyPosted;