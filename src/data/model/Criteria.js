import { RatingItem } from "./RatingItem";
export class Criteria extends RatingItem {
    constructor(name = '') {
        super();
        this.name = name;
    }
}
