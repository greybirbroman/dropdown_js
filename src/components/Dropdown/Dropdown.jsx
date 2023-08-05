import DropdownTrigger from './DropdownTrigger/DropdownTrigger';
import DropdownContent from './DropdownContent/DropdownContent';
import useDropdown from '../../utils/hooks/useDropdown';

const Dropdown = ({ id, trigger, content }) => {
  const {
    isOpen,
    position,
    triggerRef,
    dropdownRef,
    wasOpenBeforeScrollState,
    handleTriggerClick,
    handleMenuItemClick,
    isHovered,
    setIsHovered,
  } = useDropdown(id);

  console.log(isHovered)
  return (
    <>
      <DropdownTrigger
        triggerRef={triggerRef}
        onClick={handleTriggerClick}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        {trigger}
      </DropdownTrigger>
      {isOpen && wasOpenBeforeScrollState.current[id] && (
        <DropdownContent
          dropdownRef={dropdownRef}
          content={content}
          position={position}
          onSelect={handleMenuItemClick}
        />
      )}
    </>
  );
};

export default Dropdown;
