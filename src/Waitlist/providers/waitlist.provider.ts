import Waitlist from '../entities/waitlist.entity';

export const WaitListProviders = [
  {
    provide: 'WAITLIST_ENTITY',
    useValue: Waitlist,
  },
];
