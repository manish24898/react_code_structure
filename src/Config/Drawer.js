import { Icons } from '../Shared';
import { Routes } from './RouteConfig';

const MenuList = [
    {
        title: '',
        items: [
            { title: 'Profile', icon: Icons.favorite, route: Routes.MATCHES },
            { title: 'Settings', icon: Icons.settings, route: Routes.SETTINGS },
        ]
    },
    {
        title: 'Others',
        items: [
            { title: 'Share App', icon: Icons.sharePink },
            { title: 'Rate App', icon: Icons.subscribePink },
            { title: 'Give Feedback', icon: Icons.feedback },
            { title: 'Submit Complain', icon: Icons.complain },
            { title: 'Deactivate Account', icon: Icons.removeAccount },
        ]
    },
    {
        title: 'Legal',
        items: [
            { title: 'Privacy Policy', icon: Icons.privacy },
            { title: 'Terms of Service', icon: Icons.serviceTerms },
        ]
    }
];

export default MenuList;