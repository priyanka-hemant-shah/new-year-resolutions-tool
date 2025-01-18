import { useState } from 'react';

function ResolutionCard({ list, onClick, onRename, allChecked }) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const handleRename = (e) => {
    e.stopPropagation();
    if (isRenaming) {
      onRename(list.id, newTitle);
    }
    setIsRenaming(!isRenaming);
  };

  return (
    <div className="resolution-card" onClick={onClick}>
      <div className="card-content">
        {allChecked && <div className="medal-badge"><i className="fas fa-medal"></i></div>}
        <div className="card-header">
          {isRenaming ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="rename-input"
              autoFocus
            />
          ) : (
            <h3 className="card-title">{list.title}</h3>
          )}
          <button 
            onClick={handleRename}
            className="rename-button"
          >
            <i className={`fas ${isRenaming ? 'fa-check' : 'fa-edit'}`}></i>
          </button>
        </div>
        <div className="card-preview">
          {list.resolutions[0] && (
            <p className="preview-item">{list.resolutions[0]}</p>
          )}
          {list.resolutions.length > 1 && (
            <p className="preview-more">+{list.resolutions.length - 1} more</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResolutionCard;
