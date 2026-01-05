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

import { JobDescription } from "../sources/jobDescription/jobDescriptionEntity";
import { IJobDescriptionRepository } from "../sources/jobDescription/jobDescriptionRepository";
import { InMemoryJobDescriptionRepository } from "../sources/jobDescription/jobDescriptionRepository.memory";
import { PgJobDescriptionRepository } from "../sources/jobDescription/jobDescriptionRepository.pg";

import { Location } from "../sources/location/locationEntity";
import { ILocationRepository } from "../sources/location/locationRepository";
import { InMemoryLocationRepository } from "../sources/location/locationRepository.memory";
import { PgLocationRepository } from "../sources/location/locationRepository.pg";

import { User } from "../sources/user/userEntity";
import { IUserRepository } from "../sources/user/userRepository";
import { InMemoryUserRepository } from "../sources/user/userRepository.memory";
import { PgUserRepository } from "../sources/user/userRepository.pg";

import { AppDataSource } from "./TypeOrmDataSource";

class Container {
	contactRepository!: IContactRepository;
	contractRepository!: IContractRepository;
	customerRepository!: ICustomerRepository;
	jobRepository!: IJobRepository;
	jobDescriptionRepository!: IJobDescriptionRepository;
	locationRepository!: ILocationRepository;
	userRepository!: IUserRepository;

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
			this.jobRepository = new PgJobRepository(AppDataSource.getRepository(Job));
			this.jobDescriptionRepository = new PgJobDescriptionRepository(
				AppDataSource.getRepository(JobDescription),
			);
			this.locationRepository = new PgLocationRepository(
				AppDataSource.getRepository(Location),
			);
			this.userRepository = new PgUserRepository(AppDataSource.getRepository(User));

			console.log(this);

			return;
		} else {
			this.contactRepository = new InMemoryContactRepository();
			this.contractRepository = new InMemoryContractRepository();
			this.customerRepository = new InMemoryCustomerRepository();
			this.jobRepository = new InMemoryJobRepository();
			this.jobDescriptionRepository = new InMemoryJobDescriptionRepository();
			this.locationRepository = new InMemoryLocationRepository();
			this.userRepository = new InMemoryUserRepository();

			console.log("memory");

			return;
		}
	}
}

export const container = new Container();
