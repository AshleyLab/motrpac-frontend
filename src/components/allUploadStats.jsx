import React from 'react';
import PropTypes from 'prop-types';

const stats = {
  totalSamples: 176,
  totalSize: 13.4,
};

function AllUploadStats({ allUploadStats = stats }) {
  return (
    <div className="col uploadStats align-self-center ">
      <p className="align-middle">
        Total Samples:&nbsp;
        <span className="green">
          {allUploadStats.totalSamples}
        </span>
      </p>
      <p className="align-middle">
        Total Data Size:&nbsp;
        <span className="green">
          {allUploadStats.totalSize}
          &nbsp;GB
        </span>
      </p>
    </div>
  );
}

export default AllUploadStats;