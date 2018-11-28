import React from 'react';
import { storiesOf } from '@storybook/react';
import PreviousUploadsGraph from '../components/previousUploadsGraph';
import PreviousUploadsTable from '../components/previousUploadsTable';
import AllUploadsDoughnut from '../components/allUploadsDoughnut';
import AllUploadStats from '../components/allUploadStats';

const previousUploads = require('../testData/testPreviousUploads');


storiesOf('Dashboard Widgets', module)
  .add('Previous Uploads Graph', () => <PreviousUploadsGraph previousUploads={previousUploads} />)
  .add('Previous Uploads Table', () => <PreviousUploadsTable previousUploads={previousUploads} />)
  .add('All Uploads Doughnut', () => <AllUploadsDoughnut allUploads={previousUploads} />)
  .add('General Stats', () => <AllUploadStats />);
