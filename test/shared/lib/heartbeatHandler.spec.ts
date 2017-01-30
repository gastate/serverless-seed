import { assert } from "chai";
import { HeartbeatHandler } from "src/shared/lib/heartbeatHandler";
import { BaseConfig } from "src/shared/model/baseConfig";

describe("HeartbeatHandler", () => {
    describe("#alive", () => {

        let callbackSuccess = (err: any , res: any) => {
            assert.equal(err, null);
            assert.equal(typeof res, "object");
            assert.equal(res.statusCode, "200");
            assert.isTrue(JSON.stringify(res).indexOf("alive") > -1);
        };

        it("should return alive when ping succeeds", () => {
            process.env.VPC_PING_TARGET = "131.96.6.237";
            HeartbeatHandler.alive(callbackSuccess);
        });

        it("should return alive when ping fails", () => {
            process.env.VPC_PING_TARGET = "";
            HeartbeatHandler.alive(callbackSuccess);
        });

    });
});

