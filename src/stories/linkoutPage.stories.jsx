import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { LinkoutPage } from '../components/linkoutPage';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';

const footerActions = {
  onLogIn: action('logging in'),
  onLogOut: action('logging out'),
};

storiesOf('Linkout Page', module)
  .addDecorator(story => (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <div className="componentHolder">
        {story()}
      </div>
      <Footer {...footerActions} />
    </div>
  ))
  .add('Default', () => <LinkoutPage />);