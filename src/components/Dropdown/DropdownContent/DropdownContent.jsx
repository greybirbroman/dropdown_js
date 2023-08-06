import ReactDOM from 'react-dom';
import styles from './DropdownContent.module.css';

const DropdownContent = ({ content, position, dropdownRef, onSelect, onMouseLeave }) => {
    
  const handleKeyDown = (event, callback) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (callback) {
        callback();
      }
      onSelect();
    }
  };

  return ReactDOM.createPortal(
    <div style={{ position: 'absolute', ...position }} ref={dropdownRef}>
      <ul className={styles.dropdownList}>
        {content.map((item) => (
          <li
            key={item.id}
            className={styles.dropdownItem}
            onClick={() => onSelect(item.callback)}
            onKeyDown={(event) => handleKeyDown(event, item.callback)}
            onMouseLeave={onMouseLeave}
            tabIndex={0}
          >
            <p>{item.label}</p>
            {item.icon}
          </li>
        ))}
      </ul>
    </div>,
    document.getElementById('modal')
  );
};
export default DropdownContent;
