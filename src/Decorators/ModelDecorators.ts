import { CastAttribute } from "../Casts/CastAttribute";
import { BaseCastType, BaseEntityType } from "./index";
import { BaseEntity } from "../BaseEntity";

export const ModelDecorator = () => {
    return <T extends BaseEntityType>(ctr: T) => {
		// @ts-ignore
		const f : any = function (...args) {
			const construct = new ctr(args);
			construct.$fill(args[0]);

			return new Proxy(construct, {
				set(target: BaseEntity, p: string, newValue: any, receiver: any): boolean {
					target.setValue(p, newValue);

					return true;
				},
				get(target: BaseEntity, p: string | symbol, receiver: any): any {
					// @ts-ignore
					let value = target[p];

					if (typeof p === 'string') {
						if (Reflect.hasMetadata(`cast:${p}`, receiver)) {
							const cast: BaseCastType = Reflect.getMetadata(`cast:${p}`, target);
							return (new cast(target, value)).get();
						}
					}

					return value;
				}
			});
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

