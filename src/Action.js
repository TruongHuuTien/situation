import React, { Component } from 'react';

class Action extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.description = props.children;
    this.img = props.img;

    this.state = {
      show: true
    }

    this.select = this.select.bind(this);
  }

  select(event) {
    this.setState({
      show: false
    });
    this.props.onClick(this.id);
  }

  render() {
    if (this.state.show) {
      return (
        <div className="actionTile" onClick={this.select}>
          { this.img != null &&
            <img src={this.img} alt={this.description} />
          }
          <p>{this.description}</p>
        </div>
      );
    } else {
      return null;
    }

  }
}

export default Action;
