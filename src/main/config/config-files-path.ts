import path from "path";
import { getRootDir } from "../../root-dir";
// import { isDev } from "../infra/utils/environment/is-dev";

export class ConfigFilesPath {

    public static getConfigFilesPath() {

        return path.join(getRootDir(), 'config');
    }
}