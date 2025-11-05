import { Contact } from "../sources/contact/contactEntity";
import { IContactRepository } from "../sources/contact/contactRepository";
import { InMemoryContactRepository } from "../sources/contact/contactRepository.memory";
import { PgContactRepository } from "../sources/contact/contactRepository.pg";

import { AppDataSource } from "./TypeOrmDataSource";

class Container {
	contactRepository!: IContactRepository;

	async init() {
		const dbType = process.env.DB_TYPE ?? "memory";

		if (dbType === "pg") {
			await AppDataSource.initialize();

			this.contactRepository = new PgContactRepository(
				AppDataSource.getRepository(Contact),
			);

			return;
		} else {
			this.contactRepository = new InMemoryContactRepository();

			return;
		}
	}
}

export const container = new Container();
