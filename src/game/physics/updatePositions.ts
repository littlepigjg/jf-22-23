import type { Ball } from '../types';
import { v } from '../../utils/math';

export function updatePositions(balls: Ball[], dt: number): void {
  const activeBalls = balls.filter((b) => !b.pocketed);

  for (const ball of activeBalls) {
    ball.vel.x += ball.acc.x * dt;
    ball.vel.y += ball.acc.y * dt;

    if (v.len(ball.spin) > 0.01) {
      ball.vel.x += ball.spin.x * 0.002;
      ball.vel.y += ball.spin.y * 0.002;
    }

    ball.pos.x += ball.vel.x;
    ball.pos.y += ball.vel.y;
  }
}
