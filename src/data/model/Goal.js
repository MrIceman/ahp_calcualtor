import { RatingItem } from "./RatingItem";
export class Goal extends RatingItem {
    constructor(name = '') {
        super();
        this.name = name;
    }
}
