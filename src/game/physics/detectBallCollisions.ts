import type { Ball, HitRecord } from '../types';
import { resolveBallCollision } from './resolveBallCollision';

export interface BallCollisionResult {
  collisions: Array<{ a: number; b: number }>;
}

export function detectBallCollisions(
  balls: Ball[],
  hitRecords?: HitRecord[],
  timestamp?: number,
): BallCollisionResult {
  const result: BallCollisionResult = { collisions: [] };
  const activeBalls = balls.filter((b) => !b.pocketed);

  const cueBallFirstHitRecorded = () => hitRecords && hitRecords.length > 0;

  for (let i = 0; i < activeBalls.length; i++) {
    const a = activeBalls[i];
    for (let j = i + 1; j < activeBalls.length; j++) {
      const b = activeBalls[j];
      if (resolveBallCollision(a, b)) {
        result.collisions.push({ a: a.id, b: b.id });
        if (hitRecords && timestamp !== undefined && !cueBallFirstHitRecorded()) {
          if (a.id === 0) {
            hitRecords.push({ ballId: b.id, timestamp });
          } else if (b.id === 0) {
            hitRecords.push({ ballId: a.id, timestamp });
          }
        }
      }
    }
  }

  return result;
}
