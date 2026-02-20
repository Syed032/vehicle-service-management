import { Booking } from "./Booking";

export interface ServiceHistory {
  id?: number;
  description: string;
  cost: number;
  completedAt: string;
  booking: Booking;
}


