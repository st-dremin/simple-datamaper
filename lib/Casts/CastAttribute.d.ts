import { BaseEntity } from "../BaseEntity";
export declare class CastAttribute {
    protected value: any;
    protected model: BaseEntity;
    constructor(model: BaseEntity, value?: null);
    set(value?: any): CastAttribute;
    get(): any;
}
