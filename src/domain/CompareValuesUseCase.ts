export interface CompareValuesUseCase {
    compareCriteria(criteriaA: string, criteriaB: string, goal: string, ratingA: number, ratingB: number);

    compareAlternatives(alternativeA: string, alternativeB: string, criteria: string, ratingA: number, ratingB: number);
}