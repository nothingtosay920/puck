import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class UserAuthGuard implements CanActivate {
    private readonly roleService;
    constructor(roleService: any);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
