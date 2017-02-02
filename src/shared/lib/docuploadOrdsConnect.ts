import { DocuploadConfig } from "src/shared/model/docupload";
import { ResponseHandler } from "src/shared/lib/responseHandler";
// let base64 = require("base-64");
let reqPromise = require("request-promise");

export enum DocuploadDatatype {
    GENERAL,
    ENROLLMENT,
    FINANCIAL,
    ACCOUNT,
    DEFAULT
}

export class DocuploadLogic {
    private config: DocuploadConfig;

    constructor(config: DocuploadConfig) {
        this.config = config;
    }

    handle(event: any, context: any, type: DocuploadDatatype, callback: Function) {
        // if (event.headers && typeof event.headers["Authorization"] === "undefined")
        //     return ResponseHandler.unauthorized("403", new Error("Authorization Token is required."), callback);

        let localConfig = this.config;
        // this.getPantherId(event.headers["Authorization"])
        //     .then(function (resp: any) {
        //         let credString = localConfig.username + ":" + localConfig.password;
        //         // let credentials = base64.encode(credString);
        //         console.log("uri: " + localConfig.URL + ", id: " + resp.gsupersonpantherid);

        let options = {
            // uri: localConfig.URL + resp.gsupersonpantherid,
            uri: localConfig.URL,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": "Basic " + credentials

            },
            json: true,
            rejectUnauthorized: false
        };
        console.log(options);

        reqPromise.get(options).then(function (resp: any) {
            if (type === DocuploadDatatype.ENROLLMENT)
                return ResponseHandler.done(null, resp.enrollAdvice, callback);
            else if (type === DocuploadDatatype.GENERAL)
                return ResponseHandler.done(null, resp.general, callback);
            else if (type === DocuploadDatatype.FINANCIAL)
                return ResponseHandler.done(null, resp.financialAid, callback);
            else if (type === DocuploadDatatype.ACCOUNT)
                return ResponseHandler.done(null, resp.studentAccounts, callback);
            else
                return ResponseHandler.done(null, resp, callback);
        }).catch(function (err: any) {
            console.log("@@@@ Error retrieving Banner Data");
            console.log(JSON.stringify(err));
            ResponseHandler.done(err, null, callback);
        });
        // })
        // .catch(function (err: any) {
        //     return ResponseHandler.unauthorized("401", { "message": "Error retrieving User Info" }, callback);
        // });

    };

    getPantherId(token: string) {
        // console.log("GLUU Url: " + this.config.gluuUrl);
        // console.log("Authorization: " + token);
        let options = {
            // uri: this.config.gluuUrl,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            json: true
        };

        return reqPromise.get(options);
    };
}