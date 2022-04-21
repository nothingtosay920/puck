import { Strategy } from 'passport-jwt';
import { ExecutionContext } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
export interface LocalGuardReturns {
    cid: string;
}
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly role;
    constructor(role: RoleService);
    validate(context: ExecutionContext): Promise<void>;
}
export {};
