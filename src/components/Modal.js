import React, { useState, useEffect } from 'react'
import { replaceItemNamesWithIcons } from '../utils/replaceItemNamesWithIcons'
import '../styles/Modal.css'
import ItemSelectionPopup from './ItemSelectionPopup'
import PropTypes from 'prop-types'

function Modal ({ isOpen, onClose, title, onSubmit, modalType }) {
  const [scammerName, setScammerName] = useState('')
  const [victimName, setVictimName] = useState('')
  const [amountScammed, setAmountScammed] = useState('')
  const [itemsScammed, setItemsScammed] = useState([])
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isItemPopupOpen, setIsItemPopupOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffsetX] = useState(0)
  const [dragOffsetY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {}

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isItemPopupOpen) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isItemPopupOpen, isDragging, dragOffsetX, dragOffsetY])

  const handleReportSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  const handleEvidenceUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target.result)
      }
      reader.readAsDataURL(file)
    }

    setSelectedFile(file)
  }

  const removeSelectedFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handleAddItemsClick = () => {
    setIsItemPopupOpen(true)
  }

  const handleCloseItemPopup = () => {
    setIsItemPopupOpen(false)
  }

  const handleItemSelect = (item) => {
    setItemsScammed([...itemsScammed, item])
  }

  const handleRemoveItem = (indexToRemove) => {
    const updatedItems = [...itemsScammed]
    updatedItems.splice(indexToRemove, 1)
    setItemsScammed(updatedItems)
  }

  const itemsWithIcons = replaceItemNamesWithIcons(itemsScammed.join(', '))

  const reportSubmissionForm = (
    <form onSubmit={handleReportSubmit}>
      <div className="form-group">
      <label htmlFor="scammerName">Scammer&apos;s RSN *</label>
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
        <label htmlFor="victimName">Victim&apos;s RSN *</label>
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
        {itemsWithIcons.length > 0
          ? (
          <div className="items-selected">
            {itemsWithIcons.map((itemWithIcon, index) => (
              <div key={index} className="selected-item">
                <div className="remove-item" onClick={() => handleRemoveItem(index)}>
                  {itemWithIcon}
                </div>
              </div>
            ))}
          </div>
            )
          : null}
        <button type="button" onClick={handleAddItemsClick} className="add-items-button">
          Add Items
        </button>
        <button type="button" onClick={() => setItemsScammed([])} className="remove-items-button">
          Remove Items
        </button>
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
          size={500 * 1024 * 1024}
        />
        <div className="selected-files">
          {selectedFile
            ? (
            <div className="selected-file" onClick={removeSelectedFile}>
              {selectedFile.name}
            </div>
              )
            : null}
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
  )

  return (
    <div>
      <div className={`overlay ${isOpen ? 'modal-open' : 'modal-closed'}`} />
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

      <ItemSelectionPopup
        isOpen={isItemPopupOpen}
        onClose={handleCloseItemPopup}
        onSelectItems={handleItemSelect}
      />
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired
}

export default Modal
