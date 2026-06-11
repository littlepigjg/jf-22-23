import type { Ball } from '../types';
import { FRICTION, SPIN_FRICTION, MIN_VELOCITY } from '../constants';

export function applyFriction(balls: Ball[], dt: number): void {
  const activeBalls = balls.filter((b) => !b.pocketed);

  for (const ball of activeBalls) {
    ball.vel.x *= Math.pow(FRICTION, dt * 60);
    ball.vel.y *= Math.pow(FRICTION, dt * 60);
    ball.spin.x *= Math.pow(SPIN_FRICTION, dt * 60);
    ball.spin.y *= Math.pow(SPIN_FRICTION, dt * 60);

    if (Math.abs(ball.vel.x) < MIN_VELOCITY) ball.vel.x = 0;
    if (Math.abs(ball.vel.y) < MIN_VELOCITY) ball.vel.y = 0;
  }
}
