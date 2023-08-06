import { useState, useEffect, useRef } from 'react';
import { calculatePosition } from '../dropdown';

const useDropdown = (id) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: -1000 }); // Спрятал чтобы не моргал
  const wasOpenBeforeScrollState = useRef({});
  // Для хранения ссылки на элемент выпадающего меню
  const dropdownRef = useRef(null);
  // Для хранения ссылки на элемент триггера, который открывает выпадающее меню
  const triggerRef = useRef(null);

  // ОТЛАДОЧНЫЙ ВЫВОД
  useEffect(() => {
    const keys = Object.keys(wasOpenBeforeScrollState.current).map(key => key.toUpperCase());
    if (isOpen) {
      console.log(`Dropdown ${keys}_OPEN`);
    } else {
      console.log(`Dropdown ${keys}_CLOSED`);
    }
  }, [isOpen]);

  // Функция для определения оптимальной позиции для отображения выпадающего меню
  function dropdownPositionRender() {
    calculatePosition(triggerRef, dropdownRef, setPosition);
  }

  // Пересчет позиции при изменении состояния isOpen
  useEffect(() => {
    dropdownPositionRender();
  }, [isOpen]);

  // resize вызывается очень часто, подумать как оптимизировать | debounce?
  const handleWindowResize = () => {
      dropdownPositionRender();
  };

  const handleWindowScroll = () => {
      dropdownPositionRender();
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
      wasOpenBeforeScrollState.current[id] = false;
    }
  };

  // Обработчик для открытия/закрытия меню при клике на триггер
  const handleTriggerClick = () => {
    if (!isOpen) {
      wasOpenBeforeScrollState.current[id] = true;
      setIsOpen(true);
    } else {
      wasOpenBeforeScrollState.current[id] = false;
      setIsOpen(false);
    }
  };

  // Обработчик для открытия/закрытия меню при ховере на триггер
  const handleTriggerMouseEnter = () => {
    setIsOpen(true);
    wasOpenBeforeScrollState.current[id] = true;
  };

  // Обработчик для закрытия меню при уходе с дропдауна
  const handleDropdownMouseLeave = () => {
    setIsOpen(false);
    wasOpenBeforeScrollState.current[id] = false;
  };

  // Обработчик для вызова колбека и закрытия меню при клике на пункт меню,
  // Добавить event + event.preventDefault() если нужно предотвратить стандартное поведение
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
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleWindowScroll);
    const observer = new IntersectionObserver(handleIntersection);
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', handleWindowScroll);
      observer.disconnect();
    };
  }, []);

  return {
    isOpen,
    position,
    triggerRef,
    dropdownRef,
    wasOpenBeforeScrollState,
    handleTriggerClick,
    handleMenuItemClick,
    handleTriggerMouseEnter,
    handleDropdownMouseLeave,
  };
};
export default useDropdown;
