import Paystack from '../entities/paystack.entity';

export const PaystackProviders = [
  {
    provide: 'PAYSTACK_ENTITY',
    useValue: Paystack,
  },
];
