import React, { Component } from "react";

class Comment extends Component {
  render() {
    return (
      <div>
        <div style={{ color: "white" }}>{this.props.item.body}</div>
      </div>
    );
  }
}

export default Comment;
