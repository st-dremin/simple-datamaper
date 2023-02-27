import 'reflect-metadata';
export class BaseEntity {
    constructor(attrs) {
        this.$boot();
        this.$fill(attrs);
    }
    $boot() { }
    $fill(attrs) {
        for (let k in attrs) {
            this.setValue(k, attrs[k]);
        }
        return this;
    }
    compileRelation(name, value) {
        const metaName = `relation:${name}`;
        if (Reflect.hasMetadata(metaName, this)) {
            const relation = Reflect.getMetadata(metaName, this);
            return new relation(value);
        }
        return value;
    }
    compileCollection(name, value) {
        const collectMetaName = `collection:${name}`;
        if (Reflect.hasMetadata(collectMetaName, this)) {
            const relation = Reflect.getMetadata(collectMetaName, this);
            return value.map((el) => new relation(el));
        }
        return value;
    }
    compileValue(name, value) {
        switch (typeof value) {
            case "object":
                if (value instanceof Array) {
                    return this.compileCollection(name, value);
                }
                else {
                    return this.compileRelation(name, value);
                }
            default:
                if (Reflect.hasMetadata(`cast:${name}`, this)) {
                    const cast = Reflect.getMetadata(`cast:${name}`, this);
                    return (new cast(value)).get();
                }
                return value;
        }
    }
    setValue(name, value) {
        if (name in this) {
            // @ts-ignore
            this[name] = this.compileValue(name, value);
        }
    }
}
