import 'reflect-metadata';
import { BaseCastType, BaseEntityType } from "./Decorators";

export class BaseEntity {
    constructor(attrs?: any) {
        this.$boot();
        this.$fill(attrs);
    }

    public $boot() {}

    public $fill(attrs: Record<string, any>) {
        for (let k in attrs) {
            this.setValue(k, attrs[k]);
        }

        return this;
    }

    private compileRelation(name: string, value: any): BaseEntity | any {
        const metaName = `relation:${name}`;
        if (Reflect.hasMetadata(metaName, this)) {
            const relation: BaseEntityType = Reflect.getMetadata(metaName, this);

            return new relation(value);
        }

        return value;
    }

    private compileCollection(name: string, value: any): BaseEntity[] | any[] {
        const collectMetaName = `collection:${name}`;
        if (Reflect.hasMetadata(collectMetaName, this)) {
            const relation: BaseEntityType = Reflect.getMetadata(collectMetaName, this);

            return value.map((el: any) => new relation(el));
        }

        return value;
    }

    protected compileValue(name: string, value: any) {
        switch (typeof value) {
            case "object":
                if (value instanceof Array) {
                    return  this.compileCollection(name, value);
                } else {
                    return  this.compileRelation(name, value);
                }
            default:
                if (Reflect.hasMetadata(`cast:${name}`, this)) {
                    const cast: BaseCastType = Reflect.getMetadata(`cast:${name}`, this);

                    return (new cast(value)).get();
                }

                return value;
        }
    }

    public setValue(name: string, value: any) {
        if (name in this) {
            // @ts-ignore
			this[name] = this.compileValue(name, value);
        }
    }
}
