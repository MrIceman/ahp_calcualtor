export interface ValidateConsistencyUseCase {
    validateCriteria(): boolean;

    validateAlternatives(): boolean;
}