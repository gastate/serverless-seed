// This is a work around so the test files can find their code once compiled
// typescript understands that src/* is actually ./src/* due to the baseUrl
// in the tsconfig file.
// when compiled the files are actually in ./build/src/*
import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");
let dotenv = require("dotenv").config({ silent: true });

import { DocuploadConfig } from "src/shared/model/docupload";
import { DocuploadLogic, DocuploadDatatype } from "src/shared/lib/docuploadOrdsConnect";
import { ResponseHandler } from "src/shared/lib/responseHandler";
// import { HeartbeatHandler } from "src/shared/lib/heartbeatHandler";

// Initialize outside of scope for efficient re-use
// see http://blog.rowanudell.com/database-connections-in-lambda/
let config = new DocuploadConfig();

// Heartbeat used to keep Lambda Function from a cold start
// export function heartbeat(event: any, context: any, callback: Function) {
//     return HeartbeatHandler.alive(callback);
// }

// Info route to retrieve Config Information from running service
export function info(event: any, context: any, callback: Function) {
    return ResponseHandler.done(null, config.info, callback);
}

export function retrieveBannerData(event: any, context: any, callback: Function) {
    //   if (event && event.headers && event.headers["Authorization"] && event.headers["Authorization"] === "Heartbeat")
    // return heartbeat(event, context, callback);
    if (event && event.headers && event.headers["X-Gsu-Info"])
        return info(event, context, callback);

    let logic = new DocuploadLogic(config);

    logic.handle(event, context, DocuploadDatatype.DEFAULT, callback);
}

export function retrieveFinancialData(event: any, context: any, callback: Function) {
    //   if (event && event.headers && event.headers["Authorization"] && event.headers["Authorization"] === "Heartbeat")
    //     return heartbeat(event, context, callback);
    if (typeof event.headers["X-Gsu-Info"] !== "undefined")
        return info(event, context, callback);

    let logic = new DocuploadLogic(config);

    logic.handle(event, context, DocuploadDatatype.FINANCIAL, callback);
}

export function retrieveEnrollmentData(event: any, context: any, callback: Function) {
    //   if (event && event.headers && event.headers["Authorization"] && event.headers["Authorization"] === "Heartbeat")
    //     return heartbeat(event, context, callback);
    if (typeof event.headers["X-Gsu-Info"] !== "undefined")
        return info(event, context, callback);

    let logic = new DocuploadLogic(config);

    logic.handle(event, context, DocuploadDatatype.ENROLLMENT, callback);
}

export function retrieveGeneralData(event: any, context: any, callback: Function) {
    //   if (event && event.headers && event.headers["Authorization"] && event.headers["Authorization"] === "Heartbeat")
    //     return heartbeat(event, context, callback);
    if (typeof event.headers["X-Gsu-Info"] !== "undefined")
        return info(event, context, callback);

    let logic = new DocuploadLogic(config);

    logic.handle(event, context, DocuploadDatatype.GENERAL, callback);
}

export function retrieveAccountData(event: any, context: any, callback: Function) {
    //   if (event && event.headers && event.headers["Authorization"] && event.headers["Authorization"] === "Heartbeat")
    //     return heartbeat(event, context, callback);
    if (typeof event.headers["X-Gsu-Info"] !== "undefined")
        return info(event, context, callback);

    let logic = new DocuploadLogic(config);

    logic.handle(event, context, DocuploadDatatype.ACCOUNT, callback);
}
