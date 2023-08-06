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
    handleTriggerMouseEnter,
    handleDropdownMouseLeave
  } = useDropdown(id);

  return (
    // "и раскрывать его по клику и ховеру" ?
    // Раскомментировать onMouseEnter & onMouseLeave для реакции dropdown на hover
    <>
     {/* <div onMouseLeave={handleDropdownMouseLeave}> */}
      <DropdownTrigger
        triggerRef={triggerRef}
        onClick={handleTriggerClick}
        //onMouseEnter={handleTriggerMouseEnter}
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
    {/* </div> */}
    </>
  );
};

export default Dropdown;
