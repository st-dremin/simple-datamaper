export class CastAttribute {
    value;
    model;
    constructor(model, value = null) {
        this.model = model;
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
