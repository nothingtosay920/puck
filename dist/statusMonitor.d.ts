declare const statusMonitorConfig: {
    title: string;
    path: string;
    socketPath: string;
    port: any;
    spans: {
        interval: number;
        retention: number;
    }[];
    chartVisibility: {
        cpu: boolean;
        mem: boolean;
        load: boolean;
        eventLoop: boolean;
        heap: boolean;
        responseTime: boolean;
        rps: boolean;
        statusCodes: boolean;
    };
    ignoreStartsWith: string[];
    healthChecks: any[];
};
export default statusMonitorConfig;
