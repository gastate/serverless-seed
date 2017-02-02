export class ResponseHandler {
    static done(err: any, res: any, callback: Function) {
        callback(null, {
            statusCode: err ? "400" : "200",
            body: err ? JSON.stringify({ error: err.message }) : JSON.stringify(res),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    static unauthorized(statusCode: string, err: any, callback: Function) {
        callback(null, {
            statusCode: statusCode,
            body: JSON.stringify({ error: err.message }),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}

