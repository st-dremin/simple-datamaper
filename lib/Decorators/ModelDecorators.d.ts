import { CastAttribute } from "../Casts/CastAttribute";
import { BaseEntityType } from "./index";
import { BaseEntity } from "../BaseEntity";
export declare const ModelDecorator: () => <T extends BaseEntityType<BaseEntity>>(ctr: T) => any;
export declare const Relation: <T extends BaseEntityType<BaseEntity>>(relation: T) => (target: any, memberName: string) => void;
export declare const Collection: <T extends BaseEntityType<BaseEntity>>(relation: T) => (target: any, memberName: string) => void;
export declare const Cast: <T extends BaseEntityType<BaseEntity>>(callback: () => typeof CastAttribute) => (target: any, memberName: string) => void;
