import FeatherIcon from 'feather-icons-react';

export const menuList = [
    {
        id: 1,
        label: 'Поделиться в социальных сетях',
        icon: <FeatherIcon icon='share-2' strokeWidth='2' />
    },
    {
        id: 2,
        label: 'Редактировать страницу',
        icon: <FeatherIcon icon='edit' strokeWidth='2' />
    },
    {
        id: 3,
        label: 'Удалить страницу',
        icon: <FeatherIcon icon='trash-2' strokeWidth='2' />
    },
]

export const menuList2 = [
    {
        id: 1,
        label: 'Добавить в календарь',
        icon: <FeatherIcon icon='calendar' strokeWidth='2' />
    },
    {
        id: 2,
        label: 'Проверить уведомления',
        icon: <FeatherIcon icon='bell' strokeWidth='2' />
    },
    {
        id: 3,
        label: 'Назначить встречу',
        icon: <FeatherIcon icon='coffee' strokeWidth='2' />
    },
]

export const menuList3 = [
    {
        id: 1,
        label: 'Перейти в настройки',
        icon: <FeatherIcon icon='settings' strokeWidth='2' />
    },
    {
        id: 2,
        label: 'Настроить фильтры',
        icon: <FeatherIcon icon='filter' strokeWidth='2' />
    },
    {
        id: 3,
        label: 'Проверить настройки безопасности',
        icon: <FeatherIcon icon='alert-triangle' strokeWidth='2' />
    },
]

export const menuList4 = [
    {
        id: 1,
        label: 'Добавить папку',
        icon: <FeatherIcon icon='folder-plus' strokeWidth='2' />
    },
    {
        id: 2,
        label: 'Удалить папку',
        icon: <FeatherIcon icon='folder-minus' strokeWidth='2' />
    },
    {
        id: 3,
        label: 'Отметить как важное',
        icon: <FeatherIcon icon='flag' strokeWidth='2' />
    },
]

export const dropdowns = [
    {
        id: 1,
        list: menuList,
        trigger: <FeatherIcon icon='more-vertical' strokeWidth='2.5' />
    },
    {
        id: 2,
        list: menuList2,
        trigger: <FeatherIcon icon='arrow-down' strokeWidth='2.5' />
    },
    {
        id: 3,
        list: menuList3,
        trigger: <FeatherIcon icon='menu' strokeWidth='2.5' />
    },
    {
        id: 4,
        list: menuList4,
        trigger: <FeatherIcon icon='grid' strokeWidth='2.5' />
    },
]

export const positions = [
    { position: 'absolute', top: 0, left: 0 },
    { position: 'absolute', top: 0, right: 0 },
    { position: 'absolute', bottom: 0, left: 0 },
    { position: 'absolute', bottom: 0, right: 0 },
  ];