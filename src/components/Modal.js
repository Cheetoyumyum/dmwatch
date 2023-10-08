import React, { useState } from 'react';
import '../styles/Modal.css';

function Modal({ isOpen, onClose, title, onSubmit, modalType }) {
  const [scammerName, setScammerName] = useState('');
  const [victimName, setVictimName] = useState('');
  const [amountScammed, setAmountScammed] = useState('');
  const [itemsScammed, setItemsScammed] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, setSignIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const fakeSignIn = () => {
    setIsAuthenticated(true);
    console.log('User is now authenticated:', isAuthenticated);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log("Handle sign-in submit");
    fakeSignIn();
  };
  

  const signInForm = (
    <form onSubmit={handleSignInSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username *</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username"
          required
          className="modal-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
          className="modal-input"
        />
      </div>
      <div className="modal-buttons">
        <button type="button" onClick={onClose} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Login
        </button>
      </div>
    </form>
  );

  const reportSubmissionForm = (
    <form onSubmit={handleReportSubmit}>
      <div className="form-group">
        <label htmlFor="scammerName">Scammer's RSN *</label>
        <input
          type="text"
          id="scammerName"
          value={scammerName}
          onChange={(e) => setScammerName(e.target.value)}
          placeholder='Scammers runescape in-game name'
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
          placeholder='Victim Runescape in-game name'
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
          placeholder='The amount scammed Example: 1.5b'
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
          placeholder='Enter the items scammed'
          required
          maxLength="200"
          className="modal-textarea"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description & Evidence of Scam *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='What happened/proof&#10;https://www.streamable.com/link'
          required
          maxLength="500"
          className="modal-textarea"
        />
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
          {modalType === 'SignIn' ? signInForm : reportSubmissionForm}
        </div>
      </div>
    </div>
  );
}

export default Modal;
