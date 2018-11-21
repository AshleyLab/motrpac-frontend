import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import UploadForm from './uploadForm';
import UploadList from './uploadList';
import UploadAreaDnD from './uploadAreaDnD';

// Returns element containing a drag and drop area for file input
//    and a display for monitoring file status
// * Unintended but potentially useful bug: onces a valid form submitted,
//    cannot change form data but can still upload more files
export function UploadScreen({
  dragging,
  validated,
  submitted,
  formValues,
  files,
  uploadFiles,
  onDragEnter,
  onDragLeave,
  onDragDrop,
  onFileAdded,
  onRemoveFile,
  onFormSubmit,
  cancelUpload,
  handleFormChange,
  loggedIn,
}) {
  if (!loggedIn) {
    return (<Redirect to="/" />);
  }
  const screen = (
    <div className="container uploadScreen upload">
      <div className="row">
        <div className="col">
          <h2 className="light">Upload Data</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <UploadForm
            validated={validated}
            submitted={submitted}
            formValues={formValues}
            handleSubmit={onFormSubmit}
            handleFormChange={handleFormChange}
          />
        </div>
        <div className="col-8 centered">
          <UploadAreaDnD
            dragging={dragging}
            files={files}
            fileAdded={e => onFileAdded(e)}
            dragEnter={() => onDragEnter()}
            dragLeave={() => onDragLeave()}
            dragDrop={e => onDragDrop(e)}
            removeFile={onRemoveFile}
          />
          <div className="col-12 centered">
            <label htmlFor="submit-form" id="formSubmitLabel" className="btn btn-success uploadBtn" tabIndex={0}>Upload</label>
          </div>
        </div>
        <div className="col-12">
          <h3>{formValues.identifier}</h3>
          <UploadList uploadFiles={uploadFiles} cancelUpload={cancelUpload} />
        </div>
      </div>
    </div>
  );
  return screen;
}

UploadScreen.propTypes = {
  dragging: PropTypes.number.isRequired,
  submitted: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  formValues: PropTypes.shape({
    dataType: PropTypes.string,
    identifier: PropTypes.string,
    collectionDate: PropTypes.string,
    subjectType: PropTypes.string,
    studyPhase: PropTypes.string,
    submitted: PropTypes.bool,
    rawData: PropTypes.bool,
    processedData: PropTypes.bool,
  }),
  uploadFiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    file: PropTypes.file,
    status: PropTypes.string,
    errorCode: PropTypes.string,
  })),
  onDragEnter: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDragDrop: PropTypes.func.isRequired,
  onFileAdded: PropTypes.func.isRequired,
  onRemoveFile: PropTypes.func.isRequired,
  cancelUpload: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  ...(state.upload),
  loggedIn: state.auth.loggedIn,
});

// Maps required functions to specific actions handled by reducer in src/reducers.js
const mapDispatchToProps = dispatch => ({
  onDragEnter: () => dispatch({
    type: 'DRAG_ENTER',
  }),
  onDragLeave: () => dispatch({
    type: 'DRAG_LEAVE',
  }),
  onDragDrop: e => dispatch({
    type: 'FILES_ADDED',
    files: e.dataTransfer.files,
  }),
  onFileAdded: e => dispatch({
    type: 'FILES_ADDED',
    files: e.target.files,
  }),
  onUpload: () => dispatch({
    type: 'UPLOADING_FILES',
  }),
  onRemoveFile: fileName => dispatch({
    type: 'REMOVE_FILE',
    name: fileName,
  }),
  onFormSubmit: e => dispatch({
    type: 'FORM_SUBMIT',
    validity: e.target.checkValidity(),
    elements: e.target.elements,
  }),
  cancelUpload: ident => dispatch({
    type: 'CANCEL_UPLOAD',
    id: ident,
  }),
  handleFormChange: e => dispatch({
    type: 'FORM_CHANGE',
    eID: e.target.id,
    changeValue: e.target.value,
    checked: e.target.checked,
  }),
});

// exports screen using redux method to allow for interaction between individual components
export default connect(mapStateToProps, mapDispatchToProps)(UploadScreen);
