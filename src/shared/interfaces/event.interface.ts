import type { User } from "./user.interface";

export interface CalendarEvent {
    _id?: number;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor?: string;
    user?: User;
}