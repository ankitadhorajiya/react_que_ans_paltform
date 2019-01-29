import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

class Star extends Component {
  constructor(props) {
    super(props);
    this.state = {star: this.props.star};
  }

  handleOnClick(value) {
    this.setState({
      star: value
    });
  }

  render() {
    return (
      <div>
        <div>Stars: {this.state.star}</div>
        <Glyphicon
          glyph={this.state.star >= 1 ? 'star' : 'star-empty'}
          id='container'
          onClick={this.handleOnClick.bind(this, 1)}
        />
        <Glyphicon
          glyph={this.state.star >= 2 ? 'star' : 'star-empty'}
          id='container'
          onClick={this.handleOnClick.bind(this, 2)}
        />
        <Glyphicon
          glyph={this.state.star >= 3 ? 'star' : 'star-empty'}
          id='container'
          onClick={this.handleOnClick.bind(this, 3)}
        />
        <Glyphicon
          glyph={this.state.star >= 4 ? 'star' : 'star-empty'}
          id='container'
          onClick={this.handleOnClick.bind(this, 4)}
        />
        <Glyphicon
          glyph={this.state.star >= 5 ? 'star' : 'star-empty'}
          id='container'
          onClick={this.handleOnClick.bind(this, 5)}
        />
        {this.props.numOfReviews}
      </div>
    )
  }
}

export default Star;