/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from "electron";
import { AppError } from "../../../common/errors/app-error";
import { Response } from "./main-listener-types";

export abstract class MainListener {

    public static handle(channel: string, handle: Handle) {

        const safeHandle = (handle: Handle) => async function (event: unknown, request: any) {

            try {
                const result = await handle(request);
                return { result } as Response;
            }
            catch(error) {

                console.log(error);
                console.log(JSON.stringify(error));
                return { error: AppError.parse(error) } as Response;
            }

        };

        ipcMain.handle(channel, safeHandle(handle));
    }
}

export type Handle = (requestData: any) => Promise<any>;