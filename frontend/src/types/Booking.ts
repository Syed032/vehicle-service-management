import { User } from "./User";
import { Vehicle } from "./Vehicle";
import { ServiceSlot } from "./ServiceSlot";

export interface Booking {
  id?: number;
  user: User;
  vehicle: Vehicle;
  slot: ServiceSlot;
  status?: string;
}
