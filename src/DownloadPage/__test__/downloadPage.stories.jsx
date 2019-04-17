
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DownloadPage } from '../downloadPage';
import { defaultDownloadState } from '../downloadReducer';
import { Navbar } from '../../Navbar/navbar';
import { Footer } from '../../Footer/footer';
import { Sidebar } from '../../Sidebar/sidebar';

const testUser = require('../../testData/testUser');
const testPreviousUploads = require('../../testData/testPreviousUploads');

const downloadActions = {
  onDownload: action('on Download'),
  onChangeSort: action('on Change Sort'),
  onChangeFilter: action('Change Filter'),
  onChangePage: action('Change Page'),
  onCartClick: action('Add/Remove from Cart'),
  onViewCart: action('View Cart'),
  onEmptyCart: action('Empty Cart'),
  onAddAllToCart: action('Add All To Cart'),
};

const loggedInState = {
  ...defaultDownloadState,
  isAuthenticated: true,
};

const withFilesState = {
  ...defaultDownloadState,
  isAuthenticated: true,
  allUploads: testPreviousUploads,
  filteredUploads: testPreviousUploads,
};
const viewCartState = {
  ...defaultDownloadState,
  isAuthenticated: true,
  allUploads: testPreviousUploads,
  filteredUploads: testPreviousUploads,
  cartItems: testPreviousUploads,
  viewCart: true,
};

const navbarAction = {
  logout: action('logging out'),
};

const footerAction = {
  login: action('logging in'),
};

storiesOf('Download Page', module)
  .addDecorator(story => (
    <div className="App">
      <header>
        <Navbar isAuthenticated {...navbarAction} profile={testUser} />
      </header>
      <div className="componentHolder">
        <div className="container-fluid">
          <div className="row">
            <Sidebar isAuthenticated profile={testUser} />
            {story()}
          </div>
        </div>
      </div>
      <Footer isAuthenticated profile={testUser} {...footerAction} />
    </div>

  ))
  .add('default', () => <DownloadPage {...loggedInState} {...downloadActions} />)
  .add('With Data', () => <DownloadPage {...withFilesState} {...downloadActions} />)
  .add('View Cart', () => <DownloadPage {...viewCartState} {...downloadActions} />);
