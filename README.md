# Простая ORM на TS
Преобразователь объектов в классы, заранее описанные с типами.

Примеры:
```typescript
import { Collection, ModelDecorator, Relation, BaseEntity } from "@stdremin/simple-ts-datamaper";
import { faker } from '@faker-js/faker';
faker.locale = 'ru';

/**
 * Сущность должна быть отнаследована от BaseEntity и иметь декоратор @ModelDecorator()
 */
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

	/**
	 * Устанавливаем связь с другой моделью, которая тоже должна иметь @ModelDecorator() и отнаследована от BaseEntity
	 */
	@Relation(Remains) // <-- в параметр декоратора передаем класс сущности, в которую преобразовать св-во
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

	/**
	 * Коллекция будет массивом, где каждый элемент будет иметь класс Product.
	 * Product - должна быть сущность отнаследованная от BaseEntity и с декоратором @ModelDecorator()
	 */
	@Collection(Product) // <-- в параметр декоратора передаём класс сущности, который будет иметь каждый элмент массива
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
	testProperty1: '123',
	testProperty2: '321'
});
```
Теперь model будет иметь класс ModelItem, model.user - класс UserModel,
а список товаров model.products будет массивом классов типа Product.
Св-ва testProperty2 и testProperty1 будут автоматически удалены из обектов.

### Альтернативный способ:
```typescript
const model = new ModelItem();
model.$fill({
	title: faker.name.fullName(),
	name: faker.name.fullName(),
	id: faker.datatype.uuid(),
	author: faker.name.fullName(),
	author_id: parseInt(faker.random.numeric(6)),
	created_at: faker.date.recent(4),
});
```
## Мутаторы или касты
Даннные можно автоматически приводить в нужный формат, указывая класс перобразователь.
```typescript
import { CastAttribute } from "@stdremin/simple-ts-datamaper";

class DateCast extends CastAttribute {
	set(value: string | null) {
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

	@Cast(() => DateCast) // <-- декоратор преобразования
	date?: Date;
}

const model = new ModelItem({
	title: faker.name.fullName(),
	name: faker.name.fullName(),
	date: '2023-01-10'
});
```
Данный каст преобразует model.date из строки '2023-01-10' в объект Date.
