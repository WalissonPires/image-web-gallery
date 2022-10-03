import { contextBridge } from "electron";
import { mainContext } from "./main-client";

contextBridge.exposeInMainWorld('mainContext', mainContext);