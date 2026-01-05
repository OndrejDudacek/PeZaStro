import { Location } from "./locationEntity";

export type LocationData = Omit<Location, "id" | "createdAt">;

export interface ILocationRepository {
	findAll(): Promise<Location[]>;
	findById(id: string): Promise<Location | null>;
	create(data: LocationData): Promise<Location>;
	update(id: string, data: Partial<LocationData>): Promise<Location | null>;
	delete(id: string): Promise<boolean>;
}
