import { ResponseHandler } from "src/shared/lib/responseHandler";
import { BaseConfig } from "src/shared/model/baseConfig";
let ping = require("ping");
let config = new BaseConfig();

export class HeartbeatHandler {
    static alive(callback: any) {
        let host = [config.vpcPingTarget];

        // If this is a VPC-Connected Service, allow for the heartbeat to
        // ping across the VPN.  This keeps the ENI 'warm' and makes startup faster.
        // ping.sys.probe(host, function(isAlive: boolean){
        //     let msg = isAlive ? "host " + host + " is alive" : "host " + host + " is dead";
        //     console.log(msg);
        // });

        return ResponseHandler.done(null, { "alive": true }, callback);
    }
}

