export class ResultSet {
    constructor(public readonly goal: string, public readonly criteriaResult: Map<string, number>, public readonly alternativesResult: Map<string, number>) {
    }
}