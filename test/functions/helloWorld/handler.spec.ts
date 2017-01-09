import { expect } from "chai";
import { helloWorld } from "src/functions/helloWorld/handler";

describe("helloWorld", () => {
    describe("#helloWorld", () => {
        it("should say 'GET worked!' when GET is called", (done) => {
            let cb = (err: any, res: any) => {
                expect(err).to.equal(null);
                expect(typeof res).to.equal("object");
                expect(res.statusCode).to.equal("200");
                expect(JSON.stringify(res)).to.contain("GET worked!");
                done();
            };

            helloWorld({ "httpMethod": "GET" }, null, cb);
        });

        it("should say 'POST worked!' when POST is called", (done) => {
            let cb = (err: any, res: any) => {
                expect(err).to.equal(null);
                expect(typeof res).to.equal("object");
                expect(res.statusCode).to.equal("200");
                expect(JSON.stringify(res)).to.contain("POST worked!");
                done();
            };

            helloWorld({ "httpMethod": "POST" }, null, cb);
        });
    });
});
