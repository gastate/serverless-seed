import { expect } from "chai";
import { helloUni } from "src/functions/helloUniverse/handler";

describe("helloUniverse", () => {
    describe("#helloUni", () => {
        it("should say 'GET worked! Q value: 111' when GET is called with 111", (done) => {
            let cb = (err: any, res: any) => {
                expect(err).to.equal(null);
                expect(typeof res).to.equal("object");
                expect(res.statusCode).to.equal("200");
                expect(JSON.stringify(res)).to.contain("GET Universe worked! Qvalue: 111");
                done();
            };

            helloUni({
                "httpMethod": "GET",
                "queryStringParameters": {
                    "q": "111"
                }
            }, null, cb);
        });

        it("should say 'POST worked!' when POST is called", (done) => {
            let cb = (err: any, res: any) => {
                expect(err).to.equal(null);
                expect(typeof res).to.equal("object");
                expect(res.statusCode).to.equal("200");
                expect(JSON.stringify(res)).to.contain("POST Universe worked!");
                done();
            };

            helloUni({ "httpMethod": "POST" }, null, cb);
        });
    });
});
