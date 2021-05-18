import React, { Component } from 'react';
import { useClearBrowserCache } from 'react-clear-browser-cache';

function Example() {
  // Deklarasi variabel state baru yang kita sebut "count"
  const { latestVersion, isLatestVersion } = useClearBrowserCache();

  return (
    <div style={{ width: '100%', height: '100%', background: '#333', position: 'fixed' }}>
      <div className="loading-container">
        <div className="loader loader-42 d-flex">
          <div className="loader-holder">
            <div className="loader-container">
              <p className="loader-title">SANGQU</p>
            </div>
          </div>
          {!isLatestVersion ?
            <p className="font-14 text-center py-2" style={{ marginTop: '13em', position: 'inherit', whiteSpace: 'nowrap', zIndex: '1' }}>Versi Saat Ini : {latestVersion === null || latestVersion === '' || latestVersion === undefined ? (isLatestVersion ? 'Versi Baru Tersedia' : 'Sudah Terbaru') : latestVersion}</p>
            : ''}
        </div>
      </div>
    </div>
  );
}
export default class Preloader extends Component {
  render() {
    return (
      <Example />
    )
  }
};
