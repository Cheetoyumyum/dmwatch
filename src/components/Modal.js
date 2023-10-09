import React, { useState } from 'react';
import '../styles/Modal.css';

function Modal({ isOpen, onClose, title, onSubmit, modalType }) {
  const [scammerName, setScammerName] = useState('');
  const [victimName, setVictimName] = useState('');
  const [amountScammed, setAmountScammed] = useState('');
  const [itemsScammed, setItemsScammed] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleEvidenceUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    setSelectedFile(file);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const reportSubmissionForm = (
    <form onSubmit={handleReportSubmit}>
      <div className="form-group">
        <label htmlFor="scammerName">Scammer's RSN *</label>
        <input
          type="text"
          id="scammerName"
          value={scammerName}
          onChange={(e) => setScammerName(e.target.value)}
          placeholder="Scammer's RuneScape in-game name"
          required
          className="modal-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="victimName">Victim's RSN *</label>
        <input
          type="text"
          id="victimName"
          value={victimName}
          onChange={(e) => setVictimName(e.target.value)}
          placeholder="Victim's RuneScape in-game name"
          required
          className="modal-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="amountScammed">Amount Scammed *</label>
        <input
          type="text"
          id="amountScammed"
          value={amountScammed}
          onChange={(e) => setAmountScammed(e.target.value)}
          placeholder="The amount scammed (e.g., 1.5b)"
          required
          className="modal-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="itemsScammed">Items Scammed *</label>
        <textarea
          id="itemsScammed"
          value={itemsScammed}
          onChange={(e) => setItemsScammed(e.target.value)}
          placeholder="Enter the items scammed"
          required
          maxLength="200"
          className="modal-textarea"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description of Scam *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What happened?"
          required
          maxLength="500"
          className="modal-textarea"
        />
      </div>
      <div className="form-group">
        <label htmlFor="evidence" className="custom-file-input-label">
          Upload Evidence
        </label>
        <input
          type="file"
          id="evidence"
          accept=".mp4, .avi, .mov, .pdf, .jpg, .png"
          onChange={(e) => handleEvidenceUpload(e)}
          multiple
          className="modal-input custom-file-input"
        />
        <div className="selected-files">
          {selectedFile ? (
            <div className="selected-file" onClick={removeSelectedFile}>
              {selectedFile.name}
            </div>
          ) : null}
        </div>
      </div>
      <div className="modal-buttons">
        <button type="button" onClick={onClose} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <div className={`overlay ${isOpen ? 'modal-open' : 'modal-closed'}`}></div>
      <div className={`modal ${isOpen ? 'modal-open' : 'modal-closed'}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>{title}</h2>
            <button onClick={onClose} className="close-button">
              &times;
            </button>
          </div>
          {modalType === 'SignIn' ? null : reportSubmissionForm}
        </div>
      </div>
    </div>
  );
}

export default Modal;
