import "reflect-metadata";
import * as clack from "@clack/prompts";
import "dotenv/config";
import { container } from "../db/diDbContainer";
import { UserService } from "../sources/user/userService";

const dialogue = async (service: UserService, intro: string) => {
	clack.intro(intro);

	const username = String(
		await clack.text({
			message: "Enter the USERNAME",
			placeholder: "newUser123",
			validate(value) {
				if (value.length === 0) return "Username is required!";
				if (value.length < 3) return "Username length must be larger than 3!";
			},
		}),
	);

	const password = String(
		await clack.text({
			message: "Enter the PASSWORD",
			placeholder: "P3zaStr0",
			validate(value) {
				if (value.length === 0) return "Password is required!";
				if (value.length < 8) return "Password length must be larger than 8!";
				if (!/^(?=.*[A-Z])(?=.*\d).+$/.test(value))
					return "Password must contain at least one uppercase letter and one number!";
			},
		}),
	);

	try {
		const newUser = await service.create({ username, password });
		clack.log.success("This is the crated user: " + newUser);
	} catch (error) {
		clack.log.error(String(error));
	}
};

const main = async () => {
	await container.init();
	const service = new UserService(container.userRepository);

	await dialogue(service, "Create new user");
	process.exit();
};

main();
