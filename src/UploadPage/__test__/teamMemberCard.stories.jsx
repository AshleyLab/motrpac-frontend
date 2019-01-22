import React from 'react';
import { storiesOf } from '@storybook/react';
import TeamMemberCard from '../components/teamMemberCard';
import teamInfo from '../assets/teamInfo';

const oneMember = teamInfo.PIs[0];

storiesOf('Team Member Card', module)
  .addDecorator(story => <div className="container-fluid"><div className="row">{story()}</div></div>)
  .add('default', () => <TeamMemberCard image="https://via.placeholder.com/150" memberInfo={oneMember} />);
