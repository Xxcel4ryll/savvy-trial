import { WaitlistService } from '../services/waitlist.service';
import { WaitlistDto } from '../dtos/index';
import { Request } from 'express';
export declare class WaitlistController {
    private waitlistService;
    constructor(waitlistService: WaitlistService);
    getWaitlists(req: Request): Promise<{
        rows: import("../entities/waitlist.entity").default[];
        count: number;
    }>;
    createWaitlist(Waitlist: WaitlistDto): Promise<import("../entities/waitlist.entity").default>;
}
