import { JWTPayload } from "jose";

export interface UserDetails extends JWTPayload { username: string, userId?: string };