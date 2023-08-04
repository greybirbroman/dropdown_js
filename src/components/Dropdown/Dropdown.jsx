import { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styles from './Dropdown.module.css';

const Dropdown = ({ trigger, content, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [wasOpenBeforeScroll, setWasOpenBeforeScroll] = useState(false);

  //   useEffect(() => {
  //       console.log(isOpen)

  //   }, [isOpen])

  // Для хранения ссылки на элемент выпадающего меню
  const dropdownRef = useRef(null);
  // Для хранения ссылки на элемент триггера, который открывает выпадающее меню
  const triggerRef = useRef(null);

  // Функция для определения оптимальной позиции для отображения выпадающего меню
  const calculatePosition = () => {
    // Проверяем, что ссылки на DOM-элементы (triggerRef и dropdownRef) существуют
    if (triggerRef.current && dropdownRef.current) {
      // Получаем координаты (прямоугольник) триггера и выпадающего меню
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      // Получаем размеры окна браузера
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Вычисляем доступное пространство в разных направлениях

      // Свободное пространство снизу от триггера
      const spaceBelow = viewportHeight - triggerRect.bottom;
      // Свободное пространство сверху от триггера
      const spaceAbove = triggerRect.top;
      // Свободное пространство справа от триггера
      const spaceRight = viewportWidth - triggerRect.right;
      // Свободное пространство слева от триггера
      const spaceLeft = triggerRect.left;

      // Определяем, есть ли достаточно места сверху и справа
      const hasSpaceBelow =
        spaceBelow >= dropdownRect.height || spaceBelow >= spaceAbove;
      const hasSpaceRight =
        spaceRight >= dropdownRect.width || spaceRight >= spaceLeft;

      // Выбираем оптимальную позицию на основе доступного пространства

      // Если достаточно места сверху и справа, размещаем выпадающее меню снизу слева от триггера
      if (hasSpaceBelow && hasSpaceRight) {
        setPosition({ top: triggerRect.bottom, left: triggerRect.left });

        // Если достаточно места сверху, но справа места не хватает, размещаем снизу справа от триггера
      } else if (hasSpaceBelow && !hasSpaceRight) {
        setPosition({
          top: triggerRect.bottom,
          left: triggerRect.right - dropdownRect.width,
        });

        // Если сверху места не хватает, но справа достаточно, размещаем сверху слева от триггера
      } else if (!hasSpaceBelow && hasSpaceRight) {
        setPosition({
          top: triggerRect.top - dropdownRect.height,
          left: triggerRect.left,
        });

        // В остальных случаях, когда и сверху и справа места не хватает, размещаем сверху справа от триггера
      } else {
        setPosition({
          top: triggerRect.top - dropdownRect.height,
          left: triggerRect.right - dropdownRect.width,
        });
      }
    }
  };

  // Обработчик для закрытия меню при клике вне его области
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setWasOpenBeforeScroll(false)
    }
  };

  // Обработчик для открытия/закрытия меню при клике на триггер
  const handleTriggerClick = () => {
    setIsOpen((prevState) => {
      if (!prevState) {
        setWasOpenBeforeScroll(!prevState);
      }
      return !prevState;
    });
  };



  // Обработчик для закрытия меню при клике на пункт меню,
  // по условию клик внутри контента не должен закрывать дропдаун
  const handleMenuItemClick = () => {
    setIsOpen(true);
  };

  //Обработчик события прокрутки
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.target === triggerRef.current) {
        // Устанавливаем состояние открытости только если дропдаун был открыт до скролла
        if (wasOpenBeforeScroll) {
          setIsOpen(entry.isIntersecting);
        }
      }
    });
  };


  useEffect(() => {
    calculatePosition();
    window.addEventListener('click', handleClickOutside);
    const observer = new IntersectionObserver(handleIntersection);
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
      observer.disconnect();
    };
  }, []);

  // Пересчет позиции при изменении состояния isOpen
  useEffect(() => {
    calculatePosition();
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type='button'
        id='trigger'
        onClick={handleTriggerClick}
        className={styles.dropdownTrigger}
        style={style}
      >
        {trigger}
      </button>

      {isOpen && wasOpenBeforeScroll &&
        ReactDOM.createPortal(
          <div ref={dropdownRef} style={{ position: 'absolute', ...position }}>
            <ul className={styles.dropdownList}>
              {content.map((item) => (
                <li
                  key={item.id}
                  onClick={handleMenuItemClick}
                  className={styles.dropdownItem}
                >
                  <p>{item.label}</p>
                  {item.icon}
                </li>
              ))}
            </ul>
          </div>,
          document.getElementById('modal')
        )}
    </>
  );
};

export default Dropdown;