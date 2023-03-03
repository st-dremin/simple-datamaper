"use strict";
exports.__esModule = true;
exports.BaseEntity = void 0;
require("reflect-metadata");
var BaseEntity = /** @class */ (function () {
    function BaseEntity(attrs) {
        this.$boot();
        this.$fill(attrs);
    }
    BaseEntity.prototype.$boot = function () { };
    BaseEntity.prototype.$fill = function (attrs) {
        for (var k in attrs) {
            this.setValue(k, attrs[k]);
        }
        return this;
    };
    BaseEntity.prototype.compileRelation = function (name, value) {
        var metaName = "relation:".concat(name);
        if (Reflect.hasMetadata(metaName, this)) {
            var relation = Reflect.getMetadata(metaName, this);
            return new relation(value);
        }
        return value;
    };
    BaseEntity.prototype.compileCollection = function (name, value) {
        var collectMetaName = "collection:".concat(name);
        if (Reflect.hasMetadata(collectMetaName, this)) {
            var relation_1 = Reflect.getMetadata(collectMetaName, this);
            return value.map(function (el) { return new relation_1(el); });
        }
        return value;
    };
    BaseEntity.prototype.compileValue = function (name, value) {
        switch (typeof value) {
            case "object":
                if (value instanceof Array) {
                    return this.compileCollection(name, value);
                }
                else {
                    return this.compileRelation(name, value);
                }
            default:
                if (Reflect.hasMetadata("cast:".concat(name), this)) {
                    var cast = Reflect.getMetadata("cast:".concat(name), this);
                    return (new cast(value)).get();
                }
                return value;
        }
    };
    BaseEntity.prototype.setValue = function (name, value) {
        if (name in this) {
            // @ts-ignore
            this[name] = this.compileValue(name, value);
        }
    };
    return BaseEntity;
}());
exports.BaseEntity = BaseEntity;
