import { BaseConfig } from "src/shared/model/baseConfig";

export class DocuploadConfig extends BaseConfig {
    get username(): string {
        return process.env.BANNER_USER;
    }

    get password(): string {
        return process.env.BANNER_PASSWORD;
    }

    get URL(): string {
        return process.env.BANNER_URL;
    }

    // Catalogue configuration information
    get info(): any {
        return {
            username: this.username.substring(0, 1) + "*********",
            password: this.password.substring(0, 1) + "*********",
            URL: this.URL,
            isServerlessOffline: this.isServerlessOffline,
            isServerless: this.isServerless,
            lifecycle: this.lifecycle
        };
    }
}