"use strict";
exports.__esModule = true;
exports.CastAttribute = void 0;
var CastAttribute = /** @class */ (function () {
    function CastAttribute(value) {
        if (value === void 0) { value = null; }
        this.set(value);
    }
    CastAttribute.prototype.set = function (value) {
        if (value === void 0) { value = null; }
        this.value = value;
        return this;
    };
    CastAttribute.prototype.get = function () {
        return this.value;
    };
    return CastAttribute;
}());
exports.CastAttribute = CastAttribute;
