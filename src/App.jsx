import React, { useState } from 'react';
import './App.css'

const MenuItem = ({ label, onClick }) => {
  return <div onClick={onClick}>{label}</div>;
};

const Menu = ({ items, onClose }) => {
  return (
    <div className='menu-list'>
      {items.map((item, index) => (
        <MenuItem key={index} label={item.label} onClick={item.onClick} />
      ))}
    </div>
  );
};

const ContextMenu = ({ items, posX, posY, onClose }) => {
  return (
    <div style={{ position: 'absolute', top: posY, left: posX }}>
      <Menu items={items} onClose={onClose} />
    </div>
  );
};

const App = () => {
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
  };

  const menuItems = [
    { label: 'Selected Option', onClick: () => console.log('Selected Option clicked') },
    { label: 'Default Option', onClick: () => console.log('Default Option clicked') },
    { label: 'Hovered Option', onClick: () => console.log('Hovered Option clicked') },
    { label: 'Disabled Option', onClick: () => console.log('Disabled Option clicked') },
    { label: 'Text Option', onClick: () => console.log('Text Option clicked') },
    { label: 'Icon and text option', onClick: () => console.log('Icon and text option clicked') },
  ];

  return (
    <div onContextMenu={handleContextMenu} className="menu-bar" >
      {showContextMenu && (
        <ContextMenu
          items={menuItems}
          posX={contextMenuPos.x}
          posY={contextMenuPos.y}
          onClose={handleCloseContextMenu}
        />
      )}
      <button onClick={handleCloseContextMenu}>Close Context Menu</button>
    </div>
  );
};

export default App;
