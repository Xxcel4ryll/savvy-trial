import { JwtService } from '@nestjs/jwt';
export declare class Encode {
    private jwtService;
    constructor(jwtService: JwtService);
    sign(payload: any): string | false;
}
