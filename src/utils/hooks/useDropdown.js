import { useState, useEffect, useRef } from 'react';
import { calculatePosition } from '../dropdown';

const useDropdown = (id) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: -1000 });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const wasOpenBeforeScrollState = useRef({});

  // Для хранения ссылки на элемент выпадающего меню
  const dropdownRef = useRef(null);
  // Для хранения ссылки на элемент триггера, который открывает выпадающее меню
  const triggerRef = useRef(null);

  // Функция для определения оптимальной позиции для отображения выпадающего меню
  function dropdownPositionRender() {
    calculatePosition(triggerRef, dropdownRef, setPosition);
  }

  // Пересчет позиции при изменении состояния isOpen
  useEffect(() => {
    dropdownPositionRender();
  }, [isOpen]);

  // Обработчик для закрытия меню при клике вне его области
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      wasOpenBeforeScrollState.current[id] = false;
    }
  };

  // Обработчик для закрытия активного дропдауна
  const closeActiveDropdown = (id) => {
    if (activeDropdown === id) {
      wasOpenBeforeScrollState.current[activeDropdown] = false;
      setActiveDropdown(null);
    }
  };
  // Обработчик для открытия/закрытия меню при клике на триггер
  const handleTriggerClick = () => {
    //closeActiveDropdown();
    if (!isOpen) {
      wasOpenBeforeScrollState.current[id] = true;
      setActiveDropdown(id);
      setIsOpen(true)
    } else {
      wasOpenBeforeScrollState.current[id] = false;
      setActiveDropdown(null);
      setIsOpen(false)
    }
    //setIsOpen((prevState) => !prevState);
  };

  // Обработчик для закрытия меню при клике на пункт меню,
  const handleMenuItemClick = (callback) => {
    if (callback) {
      callback();
    }
    handleTriggerClick();
  };

  //Обработчик события прокрутки
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.target === triggerRef.current) {
        // Устанавливаем состояние открытости только если дропдаун был открыт до скролла
        if (wasOpenBeforeScrollState.current[id]) {
          setIsOpen(entry.isIntersecting);
        } else {
          setIsOpen(false);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    const observer = new IntersectionObserver(handleIntersection);
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      observer.disconnect();
    };
  }, []);

  // Добавляем обработчики событий
  // useEffect(() => {
  //   const handleMouseLeave = () => {
  //     setIsHovered(false);
  //   };

  //   const handleMouseEnter = () => {
  //     setIsHovered(true);
  //   };

  //   if (triggerRef.current) {
  //     triggerRef.current.addEventListener('mouseleave', handleMouseLeave);
  //     triggerRef.current.addEventListener('mouseenter', handleMouseEnter);
  //   }

  //   // Удаляем обработчики событий при размонтировании компонента
  //   return () => {
  //     if (triggerRef.current) {
  //       triggerRef.current.removeEventListener('mouseleave', handleMouseLeave);
  //       triggerRef.current.removeEventListener('mouseenter', handleMouseEnter);
  //     }
  //   };
  // }, []);

  // // Этот эффект будет слушать изменения в состоянии наведения
  // useEffect(() => {
  //   if (!isHovered && isOpen) {
  //     setIsOpen(false);
  //   }
  // }, [isHovered, isOpen]);

  return {
    isOpen,
    position,
    triggerRef,
    dropdownRef,
    wasOpenBeforeScrollState,
    handleTriggerClick,
    handleMenuItemClick,
    isHovered,
    setIsHovered,
  };
};
export default useDropdown;
