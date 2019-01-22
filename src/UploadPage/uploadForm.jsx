import React from 'react';
import PropTypes from 'prop-types';
import assayList from '../lib/assayList';

/**
 * Form element for submission of data associated with files
 *
 * @param {Bool} validated Checks if form has been validated --> shows errors and styles
 * @param {Bool} submitted Checks if form has been successfully submitted,
 * locks fields from changing
 * @param {Object} formValues Stores all form values
 * @param {Function} handleSubmit Runs on submition of form
 * @param {Function} handleFormChange Runs after any change to any form field,
 * typically updates redux store
 *
 * @returns {Object} Form for data uploads
 */
function UploadForm({
  validated,
  submitted,
  formValues,
  handleSubmit,
  handleFormChange,
}) {
  const collectionDateField = formValues.subjectType === 'Human' ? '' : (
    <div className="form-group">
      <div className="invalid-feedback">Field Required</div>
      <label htmlFor="collection-date">
        Collection Date *
        <input type="text" onChange={handleFormChange} value={formValues.collectionDate} className="form-control" id="collectionDate" placeholder="MM/DD/YYYY" required disabled={submitted} />
      </label>
    </div>
  );
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} id="uploadForm" name="uploadForm" className={validated ? 'was-validated' : 'needs-validation'} noValidate disabled={submitted}>
      <div className="form-group">
        <div className="invalid-feedback">Field Required</div>
        <label htmlFor="data-type">
          Data Type *
          <select type="text" onChange={handleFormChange} value={formValues.dataType} className="form-control" id="dataType" required disabled={submitted}>
            {assayList.map(assay => <option key={assay} value={assay}>{assay}</option>)}
          </select>

        </label>
      </div>

      <div className="form-group">
        <div className="invalid-feedback">Field Required</div>
        <label htmlFor="biospecimenID">
          Biospecimen ID(s) * – comma seperate if multiple
          <input type="text" onChange={handleFormChange} value={formValues.biospecimenID} className="form-control" id="biospecimenID" placeholder="Ex: AS213141" required disabled={submitted} />
        </label>
      </div>

      {collectionDateField}

      <div className="form-group">
        <label htmlFor="subject-type">
          Subject Type *
          <select value={formValues.subjectType} onChange={handleFormChange} className="form-control" id="subjectType" disabled={submitted}>
            <option value="Animal">Animal</option>
            <option value="Human">Human</option>
          </select>
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="study-phase">
          Study Phase *
          <select value={formValues.studyPhase} onChange={handleFormChange} className="form-control" id="studyPhase" disabled={submitted}>
            <option value="1A">1A</option>
            <option value="1B">1B</option>
            <option value="Vanguard">Vanguard</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="N/A">N/A</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" onChange={handleFormChange} type="checkbox" name="Raw" id="rawData" value="Raw Data" disabled={submitted} checked={formValues.rawData} />
        <label className="form-check-label" htmlFor="rawData">
          Raw Data
        </label>
      </div>

      <div className="form-check form-check-inline">
        <input className="form-check-input" onChange={handleFormChange} type="checkbox" name="Pre-Processed" id="processedData" value="Processed Data" checked={formValues.processedData} disabled={submitted} />
        <label className="form-check-label" htmlFor="processedData">
          Pre-Processed Data
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="description">
          <br />
          Description
          <textarea type="textarea" onChange={handleFormChange} className="form-control" id="description" placeholder="Description" value={formValues.descript} disabled={submitted} />
        </label>
      </div>

      <input type="submit" id="submit-form" style={{ visibility: 'hidden' }} />

    </form>
  );
}

UploadForm.propTypes = {
  validated: PropTypes.bool,
  submitted: PropTypes.bool,
  formValues: PropTypes.shape({
    dataType: PropTypes.string,
    biospecimenID: PropTypes.string,
    collectionDate: PropTypes.string,
    subjectType: PropTypes.string,
    studyPhase: PropTypes.string,
    descript: PropTypes.string,
    submitted: PropTypes.bool,
    rawData: PropTypes.bool,
    processedData: PropTypes.bool,
  }),
  handleSubmit: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
};
UploadForm.defaultProps = {
  validated: false,
  submitted: false,
  formValues: {
    dataType: '',
    biospecimenID: '',
    collectionDate: '',
    subjectType: '',
    studyPhase: '',
    descript: '',
    submitted: false,
    rawData: true,
    processedData: false,
  },
};

export default UploadForm;
