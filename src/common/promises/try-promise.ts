import { AppError } from "../errors/app-error";


export abstract class TryPromise {

    public static async try<T>(promise: Promise<T>): Promise<TryPromiseResult<T>> {

        try {
            const result = await promise;
            return { result };
        }
        catch(error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return { error: AppError.parse(error), result: undefined as any };
        }
    }
}

type TryPromiseResult<T> = {
    result: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: AppError;
}