import React from 'react';

function ContactPage() {
  return (
    <div className="container contactPage">
      <div className="row mt-4">
        <div className="col">
          <h2 className="light">Contact the BIC</h2>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-12">
          <h5 className="heavy">Accessing Data: <a href="mailto:MoTrPAC-data-requests@xxx.xxx" target="_new"> MoTrPAC-data-requests@xxx.xxx</a></h5>
          <p>
            Data generated to date is not yet publicly accessible. 
          </p>
          <p>
            For updates when publicly accessible data are available, please contact us at the email above.
          </p>

          <h5 className="heavy">Uploading Data From Study Sites: <a href="mailto:MoTrPAC-helpdesk@xxx.xxx" target="_new"> MoTrPAC-helpdesk@xxx.xxx</a></h5>

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
