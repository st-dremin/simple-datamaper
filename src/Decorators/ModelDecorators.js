"use strict";
exports.__esModule = true;
exports.Cast = exports.Collection = exports.Relation = exports.ModelDecorator = void 0;
var ModelDecorator = function () {
    return function (ctr) {
        var f = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var construct = new ctr(args);
            construct.$fill(args[0]);
            return construct;
        };
        f.prototype = ctr.prototype;
        return f;
    };
};
exports.ModelDecorator = ModelDecorator;
var Relation = function (relation) {
    return function (target, memberName) {
        Reflect.defineMetadata("relation:".concat(memberName), relation, target);
    };
};
exports.Relation = Relation;
var Collection = function (relation) {
    return function (target, memberName) {
        Reflect.defineMetadata("collection:".concat(memberName), relation, target);
    };
};
exports.Collection = Collection;
var Cast = function (callback) {
    return function (target, memberName) {
        var castInstance = callback();
        Reflect.defineMetadata("cast:".concat(memberName), castInstance, target);
    };
};
exports.Cast = Cast;
