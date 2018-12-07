import React from 'react'
import RecentlyPosted from './recentlyPosted';
import PopularPosts from './popularPosts';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className='row'>
          <PopularPosts />
          <RecentlyPosted />
        </div>
    )
  }
}
export default BlogPage;