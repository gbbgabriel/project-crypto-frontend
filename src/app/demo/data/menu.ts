import { Navigation } from 'src/app/@theme/types/navigation';

export const menus: Navigation[] = [
  {
    id: 'navigation',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Conversão Cripto',
        type: 'item',
        icon: '#custom-status-up',
        url: '/'
      },
    ]
  },
  {
    id: 'perfil',
    title: 'Perfil',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'profile',
        title: 'Detalhes da Conta',
        type: 'item',
        url: '/perfil',
        icon: '#custom-user-square',
      },
    ]
  },
];
