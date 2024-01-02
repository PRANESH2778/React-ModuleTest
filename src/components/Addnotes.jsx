import React, { useState, useEffect } from 'react';
import './Addnotes.css';
import image1 from './image1.png';
import Newnotes from './Newnotes';

const Addnotes = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedData = JSON.parse(localStorage.getItem('groupData') || '[]');
    setGroupData(storedData);
  }, []);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setInputValue(''); // Clear input value when selecting a new group
  };

  const handleAddInput = () => {
    if (selectedGroup && inputValue.trim() !== '') {
      // Update the local state
      setSelectedGroup((prevGroup) => ({
        ...prevGroup,
        inputs: [...(prevGroup.inputs || []), inputValue],
      }));

      // Update the localStorage
      const updatedData = groupData.map((data) =>
        data.groupname === selectedGroup.groupname
          ? { ...data, inputs: [...(data.inputs || []), inputValue] }
          : data
      );

      setGroupData(updatedData);
      localStorage.setItem('groupData', JSON.stringify(updatedData));

      setInputValue(''); // Clear input value after adding
    }
  };

  return (
    <div className='notes-area'>
      <div className='image'>
        <img src={image1} height={'300px'} width={'500px'} alt='Pocket Notes' />
        <h1>Pocket Notes</h1>
        <p>
          Send and receive messages without keeping your phone online.<br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
        <div>
          {selectedGroup && (
            <div>
              <h2>Notes for {selectedGroup.groupname}</h2>
              <div>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder='Enter text...'
                />
                <button onClick={handleAddInput}>Save</button>
              </div>
              {selectedGroup.inputs && (
                <ul>
                  {selectedGroup.inputs.map((input, index) => (
                    <li key={index}>{input}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <p>end-to-end encryption</p>
      </div>
      <Newnotes onSelectGroup={handleSelectGroup} />
    </div>
  );
};

export default Addnotes;
