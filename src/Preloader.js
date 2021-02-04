import React, { Component } from 'react';

export default class Preloader extends Component {
  render() {
    return (
      <div style={{width:'100%',height:'100%',background:'#333',position:'fixed'}}>
        <div className="loading-container">
          <div className="loader loader-42">
            <div className="loader-holder">
              <div className="loader-container">
                <p className="loader-title">SANGQU</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
};
