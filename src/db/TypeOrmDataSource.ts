import { DataSource } from "typeorm";
import { Contact } from "../sources/contact/contactEntity";
import { Contract } from "../sources/contract/contractEntity";
import { Job } from "../sources/job/jobEntity";
import { Customer } from "../sources/customer/customerEntity";
import { JobDescription } from "../sources/jobDescription/jobDescriptionEntity";
import { Location } from "../sources/location/locationEntity";
import { User } from "../sources/user/userEntity";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT),
	database: process.env.PG_DB,
	synchronize: true,
	entities: [Contact, Contract, Customer, Job, JobDescription, Location, User],
});
