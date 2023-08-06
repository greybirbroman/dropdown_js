import FeatherIcon from 'feather-icons-react';

export const menuList = [
    {
        id: 1,
        label: 'Поделиться в социальных сетях',
        icon: <FeatherIcon icon='share-2' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Поделиться в социальных сетях')    
        }
    },
    {
        id: 2,
        label: 'Редактировать страницу',
        icon: <FeatherIcon icon='edit' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Редактировать страницу')    
        }
    },
    {
        id: 3,
        label: 'Удалить страницу',
        icon: <FeatherIcon icon='trash-2' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Удалить страницу')    
        }
    },
]

export const menuList2 = [
    {
        id: 1,
        label: 'Добавить в календарь',
        icon: <FeatherIcon icon='calendar' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Добавить в календарь')    
        }
    },
    {
        id: 2,
        label: 'Проверить уведомления',
        icon: <FeatherIcon icon='bell' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Проверить уведомления')    
        }
    },
    {
        id: 3,
        label: 'Назначить встречу',
        icon: <FeatherIcon icon='coffee' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Назначить встречу')    
        }
    },
]

export const menuList3 = [
    {
        id: 1,
        label: 'Перейти в настройки',
        icon: <FeatherIcon icon='settings' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Перейти в настройки')    
        }
    },
    {
        id: 2,
        label: 'Настроить фильтры',
        icon: <FeatherIcon icon='filter' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Настроить фильтры')    
        }
    },
    {
        id: 3,
        label: 'Проверить настройки безопасности',
        icon: <FeatherIcon icon='alert-triangle' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Проверить настройки безопасности')    
        }
    },
]

export const menuList4 = [
    {
        id: 1,
        label: 'Добавить папку',
        icon: <FeatherIcon icon='folder-plus' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Добавить папку')    
        }
    },
    {
        id: 2,
        label: 'Удалить папку',
        icon: <FeatherIcon icon='folder-minus' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Удалить папку')    
        }
    },
    {
        id: 3,
        label: 'Отметить как важное',
        icon: <FeatherIcon icon='flag' strokeWidth='2' />,
        callback: () => {
            console.log('Действие: Отметить как важное')    
        }
    },
]

  export const calculatePosition = (refTrigger, refDropdown, setState) => {
    // Проверяем, что ссылки на элементы (triggerRef и dropdownRef) существуют
    if (refTrigger.current && refDropdown.current) {
        // Получаем координаты триггера и выпадающего меню
        const triggerRect = refTrigger.current.getBoundingClientRect();
        const dropdownRect = refDropdown.current.getBoundingClientRect();

        // Получаем размеры окна браузера
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Получаем текущую вертикальную прокрутку страницы
        const scrollY = window.scrollY;

        // Применяем смещение вертикальной прокрутки к координатам элементов
        const triggerTop = triggerRect.top + scrollY;
        const triggerBottom = triggerRect.bottom + scrollY;

        // Вычисляем доступное пространство в разных направлениях
        const spaceBelow = viewportHeight - triggerBottom;
        const spaceAbove = triggerTop;
        const spaceRight = viewportWidth - triggerRect.right;
        const spaceLeft = triggerRect.left;

        // Определяем, есть ли достаточно места сверху и справа
        const hasSpaceBelow = spaceBelow >= dropdownRect.height || spaceBelow >= spaceAbove;
        const hasSpaceRight = spaceRight >= dropdownRect.width || spaceRight >= spaceLeft;

        // Смещение вертикальной прокрутки к позиции выпадающего меню
        const dropdownTop = triggerBottom;
        const dropdownLeft = triggerRect.left;

        // Выбор оптимальной позиции
        if (hasSpaceBelow && hasSpaceRight) {
            setState({ top: dropdownTop, left: dropdownLeft });
        } else if (hasSpaceBelow && !hasSpaceRight) {
            setState({ top: dropdownTop, left: triggerRect.right - dropdownRect.width });
        } else if (!hasSpaceBelow && hasSpaceRight) {
            setState({ top: triggerTop - dropdownRect.height, left: dropdownLeft });
        } else {
            setState({ top: triggerTop - dropdownRect.height, left: triggerRect.right - dropdownRect.width });
        }
    }
};

// export const dropdowns = [
//     {
//         id: 1,
//         list: menuList,
//         trigger: <FeatherIcon icon='more-vertical' strokeWidth='2' />
//     },
//     {
//         id: 2,
//         list: menuList2,
//         trigger: <FeatherIcon icon='arrow-down' strokeWidth='2' />
//     },
//     {
//         id: 3,
//         list: menuList3,
//         trigger: <FeatherIcon icon='menu' strokeWidth='2' />
//     },
//     {
//         id: 4,
//         list: menuList4,
//         trigger: <FeatherIcon icon='grid' strokeWidth='2' />
//     },
// ]
