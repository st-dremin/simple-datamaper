import { BaseEntity } from "../BaseEntity";

export class CastAttribute {
	protected value: any;
	protected model: BaseEntity;

	constructor(model: BaseEntity, value = null) {
		this.model = model;
		this.set(value);
	}

	set(value?: any): CastAttribute {
		this.value = value;

		return this;
	}

	get() {
		return this.value;
	}
}
