import expect = require("expect.js");
import { PetsLogic } from "src/functions/pets/lib/petsLogic";
import { Pet } from "src/functions/pets/model/pet";

describe("PetsLogic", () => {
    it("should call fetch", (done) => {
        let repo = {
            type: "mock",
            fetch(callback: Function) {
                let pet = {
                    "name": "cat",
                    "price": 1,
                    "weight": 2
                };

                callback(null, [pet]);
            },
            save(pet: Pet, callback: Function) {

            }
        };

        let cb = function (err: any, res: any) {
            expect(res.pets.length).to.equal(1);
            expect(res.pets[0].name).to.equal("cat");
        };

        let petsLogic = new PetsLogic(repo);
        petsLogic.handle({ "httpMethod": "GET" }, {}, cb);
    });
});