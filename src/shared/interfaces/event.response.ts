import type { User } from "./user.interface";

export interface Event {
    id?: number;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    user?: User;
}
