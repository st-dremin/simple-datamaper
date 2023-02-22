import { BaseEntity } from "../BaseEntity";
import { CastAttribute } from "../Casts/CastAttribute";
import { Cast, Collection, ModelDecorator, Relation } from "./ModelDecorators";

type BaseEntityType<T = BaseEntity> = { new(...args: any[]): T };
type BaseCastType<T = CastAttribute> = { new(...args: any[]): T };

export {
    ModelDecorator, Relation, Cast, Collection
};

export type { BaseCastType, BaseEntityType };
