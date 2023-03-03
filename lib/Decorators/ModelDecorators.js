export const ModelDecorator = () => {
    return (ctr) => {
        // @ts-ignore
        const f = function (...args) {
            const construct = new ctr(args);
            construct.$fill(args[0]);
            return new Proxy(construct, {
                set(target, p, newValue, receiver) {
                    target.setValue(p, newValue);
                    return true;
                },
                get(target, p, receiver) {
                    // @ts-ignore
                    let value = target[p];
                    if (typeof p === 'string') {
                        if (Reflect.hasMetadata(`cast:${p}`, receiver)) {
                            const cast = Reflect.getMetadata(`cast:${p}`, target);
                            return (new cast(target, value)).get();
                        }
                    }
                    return value;
                }
            });
        };
        f.prototype = ctr.prototype;
        return f;
    };
};
export const Relation = (relation) => {
    return (target, memberName) => {
        Reflect.defineMetadata(`relation:${memberName}`, relation, target);
    };
};
export const Collection = (relation) => {
    return (target, memberName) => {
        Reflect.defineMetadata(`collection:${memberName}`, relation, target);
    };
};
export const Cast = (callback) => {
    return (target, memberName) => {
        const castInstance = callback();
        Reflect.defineMetadata(`cast:${memberName}`, castInstance, target);
    };
};
