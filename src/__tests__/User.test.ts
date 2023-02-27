import { faker } from '@faker-js/faker';
import { ModelDecorator, BaseEntity, Collection, Relation } from '@st-dremin/simple-orm-ts';

faker.locale = 'ru';

@ModelDecorator()
class UserModel extends BaseEntity {
	id?: string;
	email: string = '';
	title: string = '';
	isActive?: boolean = true;
}

@ModelDecorator()
class Remains extends BaseEntity {
	price: number = 0.0;
	remains: number = 0;
}

@ModelDecorator()
class Product extends BaseEntity {
	id: string = '';
	name: string = '';
	section: string = '';

	@Relation(Remains)
	remain: Remains = new Remains();
}

@ModelDecorator()
class ModelItem extends BaseEntity {
	id?: number;
	title: string = '';
	author: string = '';
	author_id?: number;
	created_at?: Date;
	updated_at?: Date;

	date?: string;

	@Relation(UserModel)
	user: UserModel = new UserModel();

	@Collection(Product)
	products: Product[] = [];
}

const products = [];
for (let i = 0; i < 5; i++) {
	products.push({
		id: faker.datatype.uuid(),
		name: faker.animal.insect(),
		section: faker.company.name(),
		remain: {
			price: faker.commerce.price(),
			remains: parseInt(faker.random.numeric()),
		}
	});
}

const model = new ModelItem({
	title: faker.name.fullName(),
	name: faker.name.fullName(),
	id: faker.datatype.uuid(),
	author: faker.name.fullName(),
	author_id: parseInt(faker.random.numeric(6)),
	created_at: faker.date.recent(4),
	user: {
		id: faker.datatype.uuid(),
		email: faker.internet.email(),
		title: faker.name.fullName(),
	},
	products,
});


test('User Model', () => {
	expect(model).toBeInstanceOf(ModelItem);
});
test('Products Model', () => {
	expect(model).toHaveProperty('products');
	model.products.forEach(el => {
		expect(el).toBeInstanceOf(Product);
		expect(el.remain).toBeInstanceOf(Remains);
	});
})
