import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Define the interface to avoid "any"
interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY', // Use env variable in production
    });
  }

  // Remove 'async' if you don't use 'await' inside
  validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
