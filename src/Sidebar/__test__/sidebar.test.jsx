import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { Sidebar } from '../sidebar';

Enzyme.configure({ adapter: new Adapter() });

const shallowDefaultSidebar = shallow(<Sidebar />);

const navItems = ['Dashboard', 'Analysis', 'Methods', 'Data'];

describe('Sidebar', () => {
  test('Logged In sidebar has expected elements', () => {
    shallowDefaultSidebar.find('.navLink').forEach((navLink) => {
      expect(navItems.indexOf(navLink.text())).not.toBe(-1);
    });
  });
});