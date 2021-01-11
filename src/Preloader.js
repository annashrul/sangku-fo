import React, { Component } from 'react';

export default class Preloader extends Component {
  render() {
    return (
        <div className="loading-container">
          <div className="loading">
            <div className="loading__letter">L</div>
            <div className="loading__letter">O</div>
            <div className="loading__letter">A</div>
            <div className="loading__letter">D</div>
            <div className="loading__letter">I</div>
            <div className="loading__letter">N</div>
            <div className="loading__letter">G</div>
            <div className="loading__letter">.</div>
            <div className="loading__letter">.</div>
            <div className="loading__letter">.</div>
          </div>
        </div>

    )
  }
};
