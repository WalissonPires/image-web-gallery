

export class AppError extends Error {

    private readonly __isAppError: boolean = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static parse(error: any): AppError {

        if (error instanceof AppError)
            return error;

        if (error instanceof Error) {
            const appError = new AppError(error.message);
            appError.name = error.name;
            appError.stack = error.stack;
            return appError;
        }

        return new AppError(error.message || 'Unknown error');
    }
}