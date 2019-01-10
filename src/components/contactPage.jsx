import React from 'react';

function ContactPage() {
  return (
    <div className="container contactPage">
      <div className="row mt-4">
        <div className="col">
          <h2 className="light">Contact the BIC</h2>
        </div>
      </div>
      <div className="row pt-3 justify-content-center mt-5">
        <div className="col-5 mx-3 contactCol">
          <h5 className="heavy">
            Accessing Data:
            <br />
            <a href="mailto:motrpac-data-requests@xxx.xxx?subject=Data Access Help" target="_new"> motrpac-data-requests@xxx.xxx</a>
          </h5>
          <p>
            Data generated to date is not yet publicly accessible.
          </p>
          <p>
            For updates when publicly accessible data are available, please contact us at the email above.
          </p>
        </div>
        <div className="col-5 mx-3 contactCol">
          <h5 className="heavy">
            Uploading Data From Study Sites:
            <br />
            <a href="mailto:motrpac-helpdesk@xxx.xxx?subject=Data Upload Help" target="_new"> motrpac-helpdesk@xxx.xxx</a>
          </h5>

          <p>
          If you are a member of one of the sites involved with MoTrPAC please log in using
          your provided ID at the link on the bottom right of this website.
          </p>
          <p>
          If you have issues logging in please contact our helpdesk at the email above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
