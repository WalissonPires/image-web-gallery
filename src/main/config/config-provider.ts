import config from "config";

export class ConfigProvider {

    public getConfig<TConfig extends object>(sectionName: string): TConfig {

        const configValues = config.get(sectionName) as TConfig;
        return configValues;
    }
}