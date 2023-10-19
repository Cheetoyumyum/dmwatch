import React, { useState } from 'react'
import { replaceItemNamesWithIcons } from '../utils/replaceItemNamesWithIcons'
import Draggable from 'react-draggable'
import '../styles/ItemSelectionPopup.css'
import PropTypes from 'prop-types'

const items = [
  'Dharoks Set',
  'Guthans Set',
  'Veracs Set',
  'Inquisitors Set',
  'Brim Tort Prim',
  'Amulet of Torture',
  'Brimstone Ring',
  'Primordial Boots',
  'Dragon Boots',
  'Bandos Chestplate',
  'Bandos Tassets',
  'Elysian Spirit Shield',
  '3rd Age Robe Top',
  '3rd Age Robe Bottom',
  'Arcane Spirit Shield',
  'Torva Full Helm',
  'Torva Platebody',
  'Torva Platelegs',
  'Ghrazi Rapier',
  'Elder Maul',
  'Fang',
  'Voidwaker',
  'Dragon Claws',
  'Dragon Dagger',
  'Ancient Godsword',
  'Armadyl Godsword',
  'Abyssal Whip',
  'Tentacle Whip',
  'Inquisitors Mace',
  'Dharoks Greataxe',
  '3rd Age Mage Set',
  'Bandos Armor Set',
  'Inqusitor Armor Set',
  'Torva Armor Set'
]

function ItemSelectionPopup ({ isOpen, onClose, onSelectItems }) {
  const [selectedItems, setSelectedItems] = useState([])
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [manualInput, setManualInput] = useState('')
  const [isManualEntry, setIsManualEntry] = useState(false)

  const addItemSelection = (itemName) => {
    setSelectedItems([...selectedItems, itemName])
  }

  const handleRemoveSelectedItem = (itemNameToRemove) => {
    const indexToRemove = selectedItems.indexOf(itemNameToRemove)
    if (indexToRemove !== -1) {
      const updatedItems = [...selectedItems]
      updatedItems.splice(indexToRemove, 1)
      setSelectedItems(updatedItems)
    }
  }
  const handleConfirmSelection = () => {
    onSelectItems(selectedItems)
    onClose()
  }

  const handleOpenPopup = (e) => {
    const x = e.clientX + 400
    const y = e.clientY
    setPopupPosition({ x, y })
  }

  const handleStop = (e, data) => {
    setPopupPosition({ x: data.x, y: data.y })
  }

  const handleManualInputChange = (e) => {
    setManualInput(e.target.value)
  }

  const handleAddManualInput = () => {
    if (manualInput.trim() !== '') {
      if (!selectedItems.includes(manualInput)) {
        setSelectedItems([...selectedItems, manualInput])
      }
      setManualInput('')
      setIsManualEntry(false)
    }
  }

  const handleEnableManualEntry = () => {
    setIsManualEntry(true)
  }

  const checkIsManualEntry = (itemName) => {
    return !items.includes(itemName)
  }

  const renderSelectedItemsWithIcons = () => {
    return selectedItems.map((itemName, index) => (
      <div key={index} className="selected-item" onClick={() => handleRemoveSelectedItem(itemName)}>
        <div className="item-icon">
          {checkIsManualEntry(itemName) ? null : replaceItemNamesWithIcons(itemName)}
        </div>
        <div className="item-text">{itemName}</div>
      </div>
    ))
  }

  return (
    <Draggable handle=".popup-title" position={popupPosition} onStop={handleStop}>
      <div
        className={`item-selection-popup ${isOpen ? 'open' : 'closed'}`}
        onMouseDown={handleOpenPopup}
      >
        <div className="popup-content">
          <h2 className="popup-title">Select Items</h2>
          <div className="item-grid">
            {items.map((itemName, index) => (
              <div
                key={index}
                className={`item-container ${
                  selectedItems.includes(itemName) ? 'selected' : ''
                }`}
                onClick={() => addItemSelection(itemName)}
              >
                <div className="item-icon">
                  {replaceItemNamesWithIcons(itemName)}
                </div>
                <div className="item-text">{itemName}</div>
              </div>
            ))}
          </div>
          {!isManualEntry
            ? (
            <div className="manual-input">
              <button onClick={handleEnableManualEntry}>Add Manual Entry</button>
            </div>
              )
            : (
            <div className="manual-input">
              <input
                type="text"
                value={manualInput}
                onChange={handleManualInputChange}
                placeholder="Enter item name"
              />
              <button onClick={handleAddManualInput}>Add</button>
            </div>
              )}
          <div className="preview-selected-items">
            <h3>Selected Items:</h3>
            {renderSelectedItemsWithIcons()}
          </div>
          <div className="button-container">
            <button className="item-selection-button" onClick={handleConfirmSelection}>
              Confirm Selection
            </button>
            <button className="item-selection-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

ItemSelectionPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectItems: PropTypes.func.isRequired
}

export default ItemSelectionPopup
