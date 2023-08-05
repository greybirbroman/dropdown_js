import styles from './DropdownTrigger.module.css';

const DropdownTrigger = ({ onClick, onMouseEnter, onMouseLeave, triggerRef, children, style, disabled }) => {

  return (
    <button
      ref={triggerRef}
      type='button'
      id='trigger'
      title='Открыть меню'
      area-aria-label='trigger'
      onClick={onClick}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      className={styles.dropdownTrigger}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DropdownTrigger;
