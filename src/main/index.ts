import { ConfigFilesPath } from "./config/config-files-path";
// Esse linha deve ser chamanda antes da lib node-config ser importada
process.env["NODE_CONFIG_DIR"] = ConfigFilesPath.getConfigFilesPath();

import { registerIpcLesterner } from "./infra/ipc";

registerIpcLesterner();