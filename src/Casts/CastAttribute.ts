export class CastAttribute {
    protected value: any;

    constructor(value: any) {
        this.set(value);
    }

    set(value: any): CastAttribute {
        this.value = value;

        return this;
    }

    get() {
        return this.value;
    }
}
