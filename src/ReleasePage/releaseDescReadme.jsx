import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EmailLink from '../lib/ui/emailLink';

function ReleaseDescReadme({ releaseVersion, fileLocation }) {
  if (releaseVersion === '1.2.1') {
    return (
      <p className="release-description">
        A
        {' '}
        <a
          href={fileLocation}
          className="inline-link-with-icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          README
          <i className="material-icons readme-file-icon">description</i>
        </a>
        {' '}
        document has been provided detailing data available in this release. With
        the prior released dataset, please see
        {' '}
        <Link to="/announcements" className="inline-link">recent announcement</Link>
        . For any technical issues, please contact us at
        {' '}
        <EmailLink mailto="motrpac-helpdesk@lists.stanford.edu" label="MoTrPAC Helpdesk" />
      </p>
    );
  }

  return (
    <p className="release-description">
      A
      {' '}
      <a
        href={fileLocation}
        className="inline-link-with-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        README
        <i className="material-icons readme-file-icon">description</i>
      </a>
      {' '}
      document has been provided detailing the different data types available
      in this release in addition to how to access them. For updates on known
      issues with the initial dataset, please see our
      {' '}
      <Link to="/announcements" className="inline-link">recent announcement</Link>
      . For any technical issues, please contact us at
      {' '}
      <EmailLink mailto="motrpac-helpdesk@lists.stanford.edu" label="MoTrPAC Helpdesk" />
    </p>
  );
}

ReleaseDescReadme.propTypes = {
  releaseVersion: PropTypes.string.isRequired,
  fileLocation: PropTypes.string.isRequired,
};

export default ReleaseDescReadme;