export interface CreateValuesUseCase {
    setAlternatives(alternatives: Array<string>);

    setCriteria(criteria: Array<string>);

    setGoal(goal: String);
}