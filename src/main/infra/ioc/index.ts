import { container } from "./container";
import { ServicesName, ServicesType } from "./types";

export class ServiceProvider {

    public static getService<TName extends ServicesName>(serviceName: TName): ServicesType[TName] {

        return container.resolve(serviceName);
    }
}