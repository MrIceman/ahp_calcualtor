export class Score {
    public score: number;

    constructor(score: number) {
        if (score >= 0 && score <= 16)
            this.score = score;
        else
            this.score = 1;
    }
}