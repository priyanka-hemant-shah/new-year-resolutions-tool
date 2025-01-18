import { useState } from 'react';

function ResolutionCard({ list, onClick, onRename }) {
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
        <p className="resolution-count">{list.resolutions.length} resolutions</p>
        <div className="card-preview">
          {list.resolutions.slice(0, 2).map((resolution, index) => (
            <p key={index} className="preview-item">{resolution}</p>
          ))}
          {list.resolutions.length > 2 && <p className="preview-more">...</p>}
        </div>
      </div>
    </div>
  );
}

export default ResolutionCard;
