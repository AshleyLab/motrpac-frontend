import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MOTRLogo from '../assets/MoTrPAC_horizontal.png';
import NIHLogo from '../assets/ExternalLogos/NIHCommonFund.png';
import ENCODELogo from '../assets/ExternalLogos/ENCODE.png';
import MWLogo from '../assets/ExternalLogos/MetabolomicsWorkbench.jpeg';
import GTExLogo from '../assets/ExternalLogos/GTEx.png';
import AuthContentContainer from '../lib/ui/authContentContainer';

const linkList = [
  {
    name: 'Partners',
    links: [
      {
        protocol: 'https',
        url: 'Commonfund.nih.gov',
        text: 'The primary funding source for the MoTrPAC Initiative',
        image: NIHLogo,
        title: 'NIH Common Fund',
      },
      {
        protocol: 'https',
        url: 'ENCODEProject.org',
        text: 'ENCODE project website',
        image: ENCODELogo,
        title: 'ENCODE Project',
      },
      {
        protocol: 'http',
        url: 'METABOLOMICSworkbench.org',
        text: 'UCSD Metabolomics Workbench',
        image: MWLogo,
        title: 'Metabolomics Workbench',
      },
      {
        protocol: 'https',
        url: 'GTExPortal.org',
        text: 'The Genotype-Tissue Expression (GTEx) project',
        image: GTExLogo,
        title: 'GTEx',
      },
    ],
  },
];

/**
 * Renders the External Links page in both
 * unauthenticated and authenticated states.
 *
 * @param {Boolean} isAuthenticated Redux state for user's authentication status.
 * @param {Boolean} expanded        Redux state for sidebar
 *
 * @returns {Object} JSX representation of the External Links page.
 */
export function LinkoutPage({ isAuthenticated, expanded }) {
  const links = linkList.map((category) => (
    <div key={category.name} className="LinkCategory">
      <h4>{category.name}</h4>
      <div className="card-deck">
        {category.links.map((link) => (
          <UsefulLink key={link.url} link={link} />
        ))}
      </div>
    </div>
  ));

  const pageContent = (
    <>
      <div className="page-title pt-3 pb-2 border-bottom">
        <h3>Useful Links</h3>
      </div>
      <div className="row align-items-center justify-content-center motrLink">
        <div className="col-12 col-md-5 centered">
          <img src={MOTRLogo} className="img-fluid" alt="MoTrPAC Logo" />
        </div>
        <div className="col MoTrLinkInfo h5">
          <a href="http://MoTrPAC.org">
            MoTrPAC Main Site
            {' '}
            <span className="oi oi-external-link" />
          </a>
          <p>
            Primary entrance point for overarching MoTrPAC study of which the
            Bioinformatic Datahub is a component.
          </p>
        </div>
      </div>
      <div className="externalLinks">{links}</div>
    </>
  );

  if (!isAuthenticated) {
    return (
      <div className="col-md-9 col-lg-10 px-4 linkoutPage">
        <div className="container">{pageContent}</div>
      </div>
    );
  }

  return (
    <AuthContentContainer classes="linkoutPage" expanded={expanded}>
      <div>{pageContent}</div>
    </AuthContentContainer>
  );
}

function UsefulLink({ link }) {
  let imgUrl = 'https://via.placeholder.com/200';
  if (link.image) {
    imgUrl = link.image;
  }
  return (
    <div className="card mb-4 shadow-sm">
      <div
        className="card-img-top"
        style={{ backgroundImage: `url("${imgUrl}")` }}
      />
      <div className="card-body">
        <h6 className="card-title">
          <a href={`${link.protocol}://www.${link.url}`} target="_new">
            {link.title}
            &nbsp;
            <span className="oi oi-external-link" />
          </a>
        </h6>
        <p className="card-text">{link.text}</p>
      </div>
    </div>
  );
}

UsefulLink.propTypes = {
  link: PropTypes.shape({
    protocol: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

LinkoutPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  expanded: PropTypes.bool,
};

LinkoutPage.defaultProps = {
  isAuthenticated: false,
  expanded: false,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  expanded: state.sidebar.expanded,
});

export default connect(mapStateToProps)(LinkoutPage);
