import {instance, mock, when} from "ts-mockito";
import {Repository} from "../../data/Repository";
import {GetCompareMatrixUseCaseImpl} from "../../domain/impl/GetCompareMatrixUseCaseImpl";
import {Criteria} from "../../data/model/Criteria";
import {Goal} from "../../data/model/Goal";
import {ComparisionMatrix} from "../../domain/model/ComparisionMatrix";
import {ComparisionItem} from "../../data/model/ComparisionItem";
import {Score} from "../../data/model/Score";
import {MatrixCalculator} from "../../domain/matrix/MatrixCalculator";
import {Alternative} from "../../data/model/Alternative";

const repositoryMock = mock(Repository);
const repository = instance(repositoryMock);
const subject = new GetCompareMatrixUseCaseImpl(repository, new MatrixCalculator());
const goal = new Goal('Success');
const criteriaA = new Criteria('A');
const criteriaB = new Criteria('B');
const criteriaC = new Criteria('C');
const criteriaD = new Criteria('D');
const criteriaE = new Criteria('E');
const criterias: Array<Criteria> = [criteriaA, criteriaB, criteriaC, criteriaD, criteriaE];
const alternativeA = new Alternative('Dive');
const alternativeB = new Alternative('Program');
const alternativeC = new Alternative('Teach');
const alternatives: Array<Alternative> = [alternativeA, alternativeB, alternativeC];
it('gets compare matrix for all criterias regarding the goal', () => {

    when(repositoryMock.getCriteria()).thenReturn(criterias);
    when(repositoryMock.goal).thenReturn(goal);

    const result = subject.getCriteriaMatrix();
    const expectedRows = [
        new ComparisionItem(criteriaA, criteriaB, goal, new Score(0)),
        new ComparisionItem(criteriaA, criteriaC, goal, new Score(0)),
        new ComparisionItem(criteriaA, criteriaD, goal, new Score(0)),
        new ComparisionItem(criteriaA, criteriaE, goal, new Score(0)),
        new ComparisionItem(criteriaB, criteriaC, goal, new Score(0)),
        new ComparisionItem(criteriaB, criteriaD, goal, new Score(0)),
        new ComparisionItem(criteriaB, criteriaE, goal, new Score(0)),
        new ComparisionItem(criteriaC, criteriaD, goal, new Score(0)),
        new ComparisionItem(criteriaC, criteriaE, goal, new Score(0)),
        new ComparisionItem(criteriaD, criteriaE, goal, new Score(0)),
    ];
    const expectedMatrix = new ComparisionMatrix(expectedRows);
    expect(result).toEqual(expectedMatrix);
});

it('gets all alternative matrices for all criterias',  () => {
    when(repositoryMock.getCriteria()).thenReturn(criterias);
    when(repositoryMock.getAlternatives()).thenReturn(alternatives);
    const expectedRowsA = [
        new ComparisionItem(alternativeA, alternativeB, criteriaA, new Score(0)),
        new ComparisionItem(alternativeA, alternativeC, criteriaA, new Score(0)),
        new ComparisionItem(alternativeB, alternativeC, criteriaA, new Score(0)),
    ];
    const expectedRowsB = [
        new ComparisionItem(alternativeA, alternativeB, criteriaB, new Score(0)),
        new ComparisionItem(alternativeA, alternativeC, criteriaB, new Score(0)),
        new ComparisionItem(alternativeB, alternativeC, criteriaB, new Score(0)),];
    const expectedRowsC = [
        new ComparisionItem(alternativeA, alternativeB, criteriaC, new Score(0)),
        new ComparisionItem(alternativeA, alternativeC, criteriaC, new Score(0)),
        new ComparisionItem(alternativeB, alternativeC, criteriaC, new Score(0)),
    ];
    const expectedRowsD = [
        new ComparisionItem(alternativeA, alternativeB, criteriaD, new Score(0)),
        new ComparisionItem(alternativeA, alternativeC, criteriaD, new Score(0)),
        new ComparisionItem(alternativeB, alternativeC, criteriaD, new Score(0)),
    ];
    const expectedRowsE = [
        new ComparisionItem(alternativeA, alternativeB, criteriaE, new Score(0)),
        new ComparisionItem(alternativeA, alternativeC, criteriaE, new Score(0)),
        new ComparisionItem(alternativeB, alternativeC, criteriaE, new Score(0)),
    ];

    const expectedMatrixA = new ComparisionMatrix(expectedRowsA);
    const expectedMatrixB = new ComparisionMatrix(expectedRowsB);
    const expectedMatrixC = new ComparisionMatrix(expectedRowsC);
    const expectedMatrixD = new ComparisionMatrix(expectedRowsD);
    const expectedMatrixE = new ComparisionMatrix(expectedRowsE);

    const result = subject.getAllAlternativeMatrix();

    expect(result).toEqual([expectedMatrixA, expectedMatrixB, expectedMatrixC, expectedMatrixD, expectedMatrixE]);

});