import type { Ball } from '../types';
import { resolveWallCollision } from './resolveWallCollision';

export interface WallBounceResult {
  collisions: Array<{ ballId: number }>;
}

export function handleWallBounces(balls: Ball[]): WallBounceResult {
  const result: WallBounceResult = { collisions: [] };
  const activeBalls = balls.filter((b) => !b.pocketed);

  for (const ball of activeBalls) {
    if (resolveWallCollision(ball)) {
      result.collisions.push({ ballId: ball.id });
    }
  }

  return result;
}
