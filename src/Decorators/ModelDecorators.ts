import { CastAttribute } from "../Casts/CastAttribute";
import { BaseEntityType } from "./index";

export const ModelDecorator = () => {
    return <T extends BaseEntityType>(ctr: T) => {
        const f : any = function (...args: Record<string, any>[]) {
            const construct = new ctr(args);
            construct.$fill(args[0]);

            return construct;
        }
        f.prototype = ctr.prototype;

        return f;
    }
}

export const Relation = <T extends BaseEntityType>(relation: T) => {
    return (target: any, memberName: string) => {
        Reflect.defineMetadata(`relation:${memberName}`, relation, target);
    }
}

export const Collection = <T extends BaseEntityType>(relation: T) => {
    return (target: any, memberName: string) => {
        Reflect.defineMetadata(`collection:${memberName}`, relation, target);
    }
}

export const Cast = <T extends BaseEntityType>(callback: () => typeof CastAttribute ) => {
    return (target: any, memberName: string) => {
        const castInstance = callback();
        Reflect.defineMetadata(`cast:${memberName}`, castInstance, target);
    }
}

