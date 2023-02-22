export class CastAttribute {
    value;
    constructor(value) {
        this.set(value);
    }
    set(value) {
        this.value = value;
        return this;
    }
    get() {
        return this.value;
    }
}
