import React from 'react';
import { useAuth0 } from '../Auth/Auth';
import TeamMemberCard from './teamMemberCard';
import teamInfo from '../lib/teamInfo';

/**
 * The team page, includes all team members listed in the /src/lib/teamInfo.json file.
 * Members seperated by Principal Investigators, Staff and Co-Investigators
 *
 * @returns {Object} JSX representation of the Team page.
 */
function TeamPage() {
  // Custom Hook
  const { isAuthenticated } = useAuth0();

  const PIs = teamInfo.PIs
    .map(pi => <TeamMemberCard key={pi.name} memberInfo={pi} />);
  const staff = teamInfo.Staff
    .map(member => <TeamMemberCard key={member.name} memberInfo={member} />);
  const CoIs = teamInfo.CoIs
    .map(coi => <TeamMemberCard key={coi.name} memberInfo={coi} />);
  const Alumni = teamInfo.Alumni
    .map(alumni => <TeamMemberCard key={alumni.name} memberInfo={alumni} />);

  return (
    <div className={`teamPage col-md-9 ${isAuthenticated ? 'ml-sm-auto' : ''} col-lg-10 px-4`}>
      <div className={`${!isAuthenticated ? 'container' : ''}`}>
        <div className="page-title pt-3 pb-2 border-bottom">
          <h3>
            MoTrPAC Bioinformatics Center Team
          </h3>
        </div>
        <div className="row d-flex justify-content-center">
          {PIs}
        </div>
        <div className="row">
          {staff}
        </div>
        <div className="row">
          {CoIs}
        </div>
        <div className="row pt-3 pb-2 border-top">
          {Alumni}
        </div>        
      </div>
    </div>
  );
}

export default TeamPage;
