import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ContactPage from '../components/contactPage';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';


const footerActions = {
  onLogIn: action('logging in'),
  onLogOut: action('logging out'),
};

storiesOf('Contact Page', module)
  .addDecorator(story => (
    <div className="App">
      <header>
        <Navbar loggedIn />
      </header>
      <div className="componentHolder">
        {story()}
      </div>
      <Footer loggedIn {...footerActions} user={{ name: 'Test User', site: 'CAS' }} />
    </div>

  ))
  .add('default', () => <ContactPage />);
