import React, { Component } from 'react';
import Action from './Action';
import axios from 'axios';

class Situation extends Component {
  constructor(props) {
    super(props);
    this.povList = [{
      id: 0,
      description: ""
    }];

    this.state = {
      situation : null,
      currentPov: 0,
      score: 0
    };


    this.select = this.select.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/situation/')
      .then((res) => {
        const situation = res.data;
        this.setState({situation});
        this.povList.push.apply(this.povList, situation.povs);
        console.log(this.povList);
      });
  }

  select(actionId) {
    console.log();
    if (this.state.currentPov < this.povList.length - 1) {
      axios.post('http://localhost:8080/situation/answer', {
        situation: this.state.situation.id,
        pov: this.povList[this.state.currentPov].id,
        action: actionId
      }).then((res) => {
        this.setState({
          score: this.state.score + res.data.score,
          currentPov: this.state.currentPov+1
        });
      });
    }
  }

  render() {
    if (this.state.situation != null) {
      return (
        <div>
          {
            this.state.situation.statements.map((statement) =>
              <p key={statement.step}>{statement.statement}</p>
            )
          }
          <div className="pov">
            <h2>{this.povList[this.state.currentPov].description}</h2>
          </div>
          <div className="score">
            score: {this.state.score}
          </div>
          <ul>
            {
              this.state.situation.actions.map((action) =>
                <Action id={action.id} key={action.id} img={action.img} onClick={this.select}>{action.description}</Action>
              )
            }
          </ul>
        </div>
      );
    } else {
      return (
        <h1>Chargement en cours...</h1>
      );
    }

  }
}

export default Situation;
