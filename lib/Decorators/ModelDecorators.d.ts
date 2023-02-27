import { CastAttribute } from "../Casts/CastAttribute";
import { BaseEntityType } from "./index";
export declare const ModelDecorator: () => <T extends BaseEntityType<import("..").BaseEntity>>(ctr: T) => any;
export declare const Relation: <T extends BaseEntityType<import("..").BaseEntity>>(relation: T) => (target: any, memberName: string) => void;
export declare const Collection: <T extends BaseEntityType<import("..").BaseEntity>>(relation: T) => (target: any, memberName: string) => void;
export declare const Cast: <T extends BaseEntityType<import("..").BaseEntity>>(callback: () => typeof CastAttribute) => (target: any, memberName: string) => void;
