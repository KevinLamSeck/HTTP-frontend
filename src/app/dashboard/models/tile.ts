export class Tile {
    public title: string = '';
    public summary: string = '';
    public action: Array<string> = [];
    public svg?: any;
    public isManager?: boolean;
    public isStudent?: boolean;
    public isConceptor?: boolean;

    constructor(tile: {
        title: string;
        summary: string;
        action: string[];
        svg?: any;
        isManager?: boolean;
        isStudent?: boolean;
        isConceptor?: boolean;
    }) {
        Object.assign(this, tile);
    }
}
