import WaitlistRepository from '../repositories/waitlist.repository';
import { Email } from 'src/Globals/providers/email';
export declare class WaitlistService {
    private waitlistRepository;
    private Email;
    constructor(waitlistRepository: WaitlistRepository, Email: Email);
    find(query: any): Promise<{
        rows: import("../entities/waitlist.entity").default[];
        count: number;
    }>;
    create(payload: any): Promise<import("../entities/waitlist.entity").default>;
}
