import React, { Component } from 'react';

export default class Preloader extends Component {
  render() {
    return (
        <div className="loading-container">
          <div className="loader loader-42">
            <div className="loader-holder">
              <div className="loader-container">
                <p className="loader-title">SANGQU</p>
              </div>
            </div>
          </div>
        </div>
    )
  }
};
