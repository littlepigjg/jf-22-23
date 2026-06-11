import type { Ball } from '../types';
import { POCKETS, BALL_RADIUS } from '../constants';
import { v } from '../../utils/math';

export function checkPocketing(balls: Ball[], timestamp?: number): number[] {
  const pocketed: number[] = [];
  const activeBalls = balls.filter((b) => !b.pocketed);

  for (const ball of activeBalls) {
    if (ball.pocketed) continue;
    for (const pocket of POCKETS) {
      const d = v.dist(ball.pos, pocket.pos);
      if (d < pocket.radius - BALL_RADIUS * 0.3) {
        ball.pocketed = true;
        ball.pocketedAt = timestamp || Date.now();
        ball.vel.x = 0;
        ball.vel.y = 0;
        pocketed.push(ball.id);
        break;
      }
    }
  }

  return pocketed;
}
