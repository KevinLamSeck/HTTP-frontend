import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s ease-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        animate('.5s ease-out', style({ opacity: 0 }))
    ])
]);
