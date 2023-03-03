import { faker } from "@faker-js/faker";
import { Cast, ModelDecorator } from "../Decorators";
import { CastAttribute } from "../Casts/CastAttribute";
import { BaseEntity } from "../BaseEntity";


class DateCast extends CastAttribute {
	set(value: any) {
		if (!value) {
			this.value = null;
		} else {
			this.value = new Date(value);
		}

		return this;
	}
}

@ModelDecorator()
class ModelItem extends BaseEntity {
	id?: number;
	title: string = '';
	author: string = '';
	author_id?: number;
	created_at?: Date;
	updated_at?: Date;

	@Cast(() => DateCast)
	date?: Date;
}

const model = new ModelItem({
	title: faker.name.fullName(),
	name: faker.name.fullName(),
	id: faker.datatype.uuid(),
	author: faker.name.fullName(),
	author_id: parseInt(faker.random.numeric(6)),
	created_at: faker.date.recent(4),
	date: '2023-01-10'
});

test('Instance Model', () => {
	expect(model).toBeInstanceOf(ModelItem);
});
test('Date Cast', () => {
	expect(model.date).toBeInstanceOf(Date);
});
