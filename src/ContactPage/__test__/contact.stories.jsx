import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Contact } from '../contact';
import { Navbar } from '../../Navbar/navbar';
import { Footer } from '../../Footer/footer';

const footerActions = {
  login: action('logging in'),
  logout: action('logging out'),
};

storiesOf('Contact Us Page', module)
  .addDecorator(story => (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <div className="row justify-content-center">
        {story()}
      </div>
      <Footer {...footerActions} />
    </div>
  ))
  .add('Default', () => <Contact />);
