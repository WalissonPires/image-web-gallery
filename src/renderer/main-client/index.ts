import { ipcRenderer } from "electron";
import { Response } from "../../main/infra/ipc/main-listener-types";

export type MainContext = {
    sendRequest: <TRequest, TResponse>(channel: string, request: TRequest) => Promise<TResponse>;
}

export const mainContext: MainContext = {
    sendRequest: async <TRequest, TResponse>(channel: string, request: TRequest): Promise<TResponse> => {

        const response = await ipcRenderer.invoke(channel, request) as Response;

        if (response.error)
            throw response.error;

        return response.result;
    }
}

export type WindowWithMainContext = Window & typeof globalThis & {
    mainContext: MainContext;
}