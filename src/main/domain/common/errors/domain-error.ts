import { AppError } from "../../../../common/errors/app-error";

export class DomainError extends AppError {

    private readonly __isDomainError: boolean = true;
}