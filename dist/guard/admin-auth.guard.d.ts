import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
export declare class AdminAuthGuard implements CanActivate {
    private readonly roleService;
    constructor(roleService: RoleService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
