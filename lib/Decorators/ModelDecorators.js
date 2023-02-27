export const ModelDecorator = () => {
    return (ctr) => {
        const f = function (...args) {
            const construct = new ctr(args);
            construct.$fill(args[0]);
            return construct;
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
