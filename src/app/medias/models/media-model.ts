export class MediaModel {
    private _id?: number
    private _title: string = ''
    private _summary?: string
    private _duration?: number
    private _totalTime?: number
    private _createdAt?: Date
    private _url?: string
    private _order?: number
    private _typeMedia?: { id: number, title: string }

    // Constructor with a media who take all the field of a media model and Object.assgign(this, media)
    constructor(media: {
        _id?: number,
        _title: string,
        _summary?: string,
        _duration?: number,
        _totalTime?: number,
        _createdAt?: Date,
        _url?: string,
        _order?: number,
        _typeMedia?: { id: number, title: string }
    }) {
        Object.assign(this, media)
    }

    public getId(): number | undefined {
        return this._id;
    }

    public setId(value: number): void {
        this._id = value;
    }

    public getTitle(): string {
        return this._title;
    }

    public setTitle(value: string): void {
        this._title = value;
    }

    public getSummary(): string | undefined {
        return this._summary;
    }

    public setSummary(value: string): void {
        this._summary = value;
    }

    public getDuration(): number | undefined {
        return this._duration;
    }

    public setDuration(value: number): void {
        this._duration = value;
    }

    public getTotalTime(): number | undefined {
        return this._totalTime;
    }

    public setTotalTime(value: number): void {
        this._totalTime = value;
    }

    public getCreatedAt(): Date | undefined {
        return this._createdAt;
    }

    public setCreatedAt(value: Date): void {
        this._createdAt = value;
    }

    public getUrl(): string | undefined {
        return this._url;
    }

    public setUrl(value: string): void {
        this._url = value;
    }

    public getOrder(): number | undefined {
        return this._order;
    }

    public setOrder(value: number): void {
        this._order = value;
    }

    public getTypeMedia(): { id: number, title: string } | undefined {
        return this._typeMedia;
    }

    public setTypeMedia(value: { id: number, title: string }): void {
        this._typeMedia = value;
    }

}
