import { Contact } from "../sources/contact/contactEntity";
import { IContactRepository } from "../sources/contact/contactRepository";
import { InMemoryContactRepository } from "../sources/contact/contactRepository.memory";
import { PgContactRepository } from "../sources/contact/contactRepository.pg";

import { Contract } from "../sources/contract/contractEntity";
import { IContractRepository } from "../sources/contract/contractRepository";
import { InMemoryContractRepository } from "../sources/contract/contractRepository.memory";
import { PgContractRepository } from "../sources/contract/contractRepository.pg";

import { Customer } from "../sources/customer/customerEntity";
import { ICustomerRepository } from "../sources/customer/customerRepository";
import { InMemoryCustomerRepository } from "../sources/customer/customerRepository.memory";
import { PgCustomerRepository } from "../sources/customer/customerRepository.pg";

import { Job } from "../sources/job/jobEntity";
import { IJobRepository } from "../sources/job/jobRepository";
import { InMemoryJobRepository } from "../sources/job/jobRepository.memory";
import { PgJobRepository } from "../sources/job/jobRepository.pg";

import { AppDataSource } from "./TypeOrmDataSource";

class Container {
	contactRepository!: IContactRepository;
	contractRepository!: IContractRepository;
	customerRepository!: ICustomerRepository;
	jobRepository!: IJobRepository;

	async init() {
		const dbType = process.env.DB_TYPE ?? "memory";

		if (dbType === "pg") {
			await AppDataSource.initialize();

			this.contactRepository = new PgContactRepository(
				AppDataSource.getRepository(Contact),
			);
			this.contractRepository = new PgContractRepository(
				AppDataSource.getRepository(Contract),
			);
			this.customerRepository = new PgCustomerRepository(
				AppDataSource.getRepository(Customer),
			);

			return;
		} else {
			this.contactRepository = new InMemoryContactRepository();
			this.contractRepository = new InMemoryContractRepository();
			this.customerRepository = new InMemoryCustomerRepository();

			return;
		}
	}
}

export const container = new Container();
