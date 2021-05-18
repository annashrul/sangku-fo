import React, { Component } from 'react';

export default class Preloader extends Component {
  render() {
    return (
      <div style={{ width: '100%', height: '100%', background: '#FFF', position: 'fixed' }}>
        <div className="loading-container">
          <div className="sk-grid">
            <div className="sk-grid-cube"></div>
            <div className="sk-grid-cube"></div>
            <div className="sk-grid-cube"></div>
            <div className="sk-grid-cube"></div>
            <div className="sk-grid-cube"></div>
            <div className="sk-grid-cube"></div>
            <div className="sk-grid-cube"></div>
            <div className="sk-grid-cube"></div>
            <div className="sk-grid-cube"></div>
          </div>
        </div>
      </div>
    )
  }
};
