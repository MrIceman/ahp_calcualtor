export interface ValidateConsistencyUseCase {
    validateCriteria(): boolean;

    validateAlternatives(): Promise<boolean>;
}