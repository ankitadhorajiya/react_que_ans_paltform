import React from 'react';
const Api = require('../../middleware/Api');

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: undefined
    }
  }
  componentDidMount() {
    this.getBlog(this.props.match.params.id)
  }
  getBlog(id) {
    Api.getBlog(id).then(response => {
      this.setState({
        blog: (response !== undefined ? response : undefined)
      });
    })
  }
  render() {
    return (
      <div>
        { this.state.blog &&
        <div>
          <div className="panel panel-info">
            <div className="panel-heading"># { this.state.blog.title }</div>
            <div className="panel-body">
              <p> { this.state.blog.content }</p>
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default Blog;