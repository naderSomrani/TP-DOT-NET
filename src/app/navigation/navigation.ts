import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Gestion des caisses',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'home',
                title    : 'Accueil',
                translate: 'NAV.HOME.TITLE',
                type     : 'item',
                icon     : 'home',
                url      : '/home'
            },
            {
                id       : 'historique',
                title    : 'Historique',
                translate: 'NAV.HISTORIQUE.TITLE',
                type     : 'item',
                icon     : 'history',
                url      : '/historique'
            }
        ]
    }
];
