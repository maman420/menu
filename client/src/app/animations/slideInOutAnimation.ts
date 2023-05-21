import { trigger, transition, style, animate, group, state } from '@angular/animations';

export const slideInOutLeft = trigger('slideInOutLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('500ms ease-in', style({ transform: 'translateX(0%)' }))
   ]),
   transition(':leave', [
     style({ transform: 'translateX(0%)' }),
     animate('500ms ease-in', style({ transform: 'translateX(-100%)' }))
   ])
]);

export const slideInOutRight = trigger('slideInOutRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('500ms ease-in', style({ transform: 'translateX(0%)' }))
  ])
//   transition(':leave', [
//     style({ transform: 'translateX(0%)' }),
//     animate('500ms ease-in', style({ transform: 'translateX(100%)' }))
//   ])
]);