import crypto from "crypto";
import jwt from "jsonwebtoken";
import ms from "ms";
import { ConfigurationService } from "./config";

export class JWTService {
    private static instance: JWTService;

    private configuratinService = ConfigurationService.getInstance();

    private readonly expiresIn = "1h";

    private readonly JWT_SECRET_KEY = "jwt:secret";
    private readonly ORIGIN_KEY = "origin";
    
    private jwtSecret = this.configuratinService.get(this.JWT_SECRET_KEY) as string;
    private origin = this.configuratinService.get(this.ORIGIN_KEY) as string;

    private constructor() {
        if (!this.jwtSecret) this.jwtSecret = this.generateJwtSecret();
    }

    static getInstance(): JWTService {
        return this.instance || (this.instance = new this());
    }

    sign(payload: Record<string, unknown>, sub: string): string {
        return jwt.sign(payload, this.jwtSecret, {
            expiresIn: this.expiresIn,
            notBefore: "0",
            audience: [this.origin],
            issuer: this.origin,
            subject: sub,
        });
    }

    decode(token: string): Record<string, unknown> {
        return jwt.verify(token, this.jwtSecret, {
            audience: this.origin,
            issuer: this.origin,
        }) as Record<string, unknown>;
    }

    getExpiresIn(): number {
        return ms(this.expiresIn) / 1000;
    }

    private generateJwtSecret() {
        const secret = crypto.randomBytes(256).toString("base64");
        this.configuratinService.setAndSave(this.JWT_SECRET_KEY, secret);
        return secret;
    }
}