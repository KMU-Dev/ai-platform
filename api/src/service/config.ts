/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { resolve } from "app-root-path";
import nconf from "nconf";

export class ConfigurationService {
    private static instance: ConfigurationService;

    private readonly configPath = resolve("/config/default.json");

    private readonly requiredFiels: string[] = ["origin"];

    private constructor() {
        nconf
            .argv()
            .env()
            .file({ file: this.configPath })
            .required(this.requiredFiels);
    }

    static getInstance(): ConfigurationService {
        return this.instance || (this.instance = new this());
    }

    get(key: string): unknown {
        return nconf.get(key);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set(key: string, value: any): void {
        nconf.set(key, value);
    }

    save(): void {
        nconf.save(undefined);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setAndSave(key: string, value: any): void {
        nconf.set(key, value);
        this.save();
    }
}
