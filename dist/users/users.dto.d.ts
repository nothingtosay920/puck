export declare class UsersDTO {
    phone: string;
}
export declare class LoginDTO {
    message: string;
    code: number;
}
export declare class LogOutDto {
    code: number;
}
export declare class UsersDATA {
    name: string;
    user_img: string;
    open_id: string;
}
export declare class Draft {
    article_id: string;
    time_stmap: string;
    type: string;
    title: string;
}
export declare class Dynamic {
    content: string;
    type: string;
    time_tamp: string;
    dynamic_id: string;
}
export declare class DynamicApiRes {
    dynamic: Dynamic[];
    next: number;
    count: number;
}
export declare class BaseUserInfo {
    user_img: string;
    name: string;
}
export declare class BaseMusterInfo {
    muster_data: BaseMusterData[];
}
export declare class BaseMusterData {
    name: string;
    muster_id: string;
}
