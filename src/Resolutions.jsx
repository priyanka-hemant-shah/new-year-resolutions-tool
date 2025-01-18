import { useState, useEffect } from 'react';
import ResolutionCard from './ResolutionCard';
import Modal from './Modal';

function Resolutions() {
  const [resolutions, setResolutions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [savedLists, setSavedLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedResolutions = localStorage.getItem('resolutions');
    const savedResolutionLists = localStorage.getItem('savedLists');
    if (savedResolutions) setResolutions(JSON.parse(savedResolutions));
    if (savedResolutionLists) setSavedLists(JSON.parse(savedResolutionLists));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const updatedResolutions = [...resolutions, inputValue.trim()];
      setResolutions(updatedResolutions);
      localStorage.setItem('resolutions', JSON.stringify(updatedResolutions));
      setInputValue('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(resolutions[index]);
  };

  const handleSaveEdit = (index) => {
    if (editValue.trim()) {
      const updatedResolutions = [...resolutions];
      updatedResolutions[index] = editValue.trim();
      setResolutions(updatedResolutions);
      localStorage.setItem('resolutions', JSON.stringify(updatedResolutions));
      setEditIndex(-1);
    }
  };

  const handleSaveList = () => {
    if (resolutions.length > 0) {
      const newList = {
        id: Date.now(),
        title: `Resolutions List ${savedLists.length + 1}`,
        resolutions: [...resolutions]
      };
      
      const updatedLists = [...savedLists, newList];
      setSavedLists(updatedLists);
      localStorage.setItem('savedLists', JSON.stringify(updatedLists));
      
      // Clear current list
      setResolutions([]);
      localStorage.setItem('resolutions', JSON.stringify([]));
    }
  };

  const handleOpenList = (list) => {
    setSelectedList(list);
    setIsModalOpen(true);
  };

  const handleRename = (id, newTitle) => {
    const updatedLists = savedLists.map(list => 
      list.id === id ? { ...list, title: newTitle } : list
    );
    setSavedLists(updatedLists);
    localStorage.setItem('savedLists', JSON.stringify(updatedLists));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="resolution-form standalone-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your resolution and press Enter..."
          className="full-width-input"
        />
      </form>

      {resolutions.length > 0 && (
        <div className="resolutions-container">
          <ol className="resolutions-list">
            {resolutions.map((resolution, index) => (
              <li key={index}>
                {editIndex === index ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                    />
                    <div>
                      <button onClick={() => handleSaveEdit(index)}>Save</button>
                      <button onClick={() => setEditIndex(-1)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="view-mode">
                    <span>{resolution}</span>
                    <button onClick={() => handleEdit(index)}>
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ol>

          <button 
            onClick={handleSaveList}
            className="save-list-button"
          >
            Save Resolutions
          </button>
        </div>
      )}

      <div className="saved-lists">
        {savedLists.map(list => (
          <ResolutionCard 
            key={list.id}
            list={list}
            onClick={() => handleOpenList(list)}
            onRename={handleRename}
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal
          title={selectedList?.title}
          onClose={() => setIsModalOpen(false)}
        >
          <ul>
            {selectedList?.resolutions.map((resolution, index) => (
              <li key={index}>{resolution}</li>
            ))}
          </ul>
        </Modal>
      )}
    </>
  );
}

export default Resolutions;
