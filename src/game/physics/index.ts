import type { Ball, HitRecord } from '../types';
import { updatePositions } from './updatePositions';
import { applyFriction } from './applyFriction';
import { detectBallCollisions } from './detectBallCollisions';
import { handleWallBounces } from './handleWallBounces';
import { checkPocketing } from './checkPocketing';
import { resolveBallCollision } from './resolveBallCollision';
import { resolveWallCollision } from './resolveWallCollision';

export interface StepResult {
  ballCollisions: Array<{ a: number; b: number }>;
  wallCollisions: Array<{ ballId: number }>;
  pocketedBalls: number[];
}

export {
  updatePositions,
  applyFriction,
  detectBallCollisions,
  handleWallBounces,
  checkPocketing,
  resolveBallCollision,
  resolveWallCollision,
};

export { type BallCollisionResult } from './detectBallCollisions';
export { type WallBounceResult } from './handleWallBounces';

export function stepPhysics(
  balls: Ball[],
  dt: number,
  hitRecords?: HitRecord[],
  timestamp?: number,
): StepResult {
  const result: StepResult = {
    ballCollisions: [],
    wallCollisions: [],
    pocketedBalls: [],
  };

  updatePositions(balls, dt);
  applyFriction(balls, dt);

  const ballCollisionResult = detectBallCollisions(balls, hitRecords, timestamp);
  result.ballCollisions = ballCollisionResult.collisions;

  result.pocketedBalls.push(...checkPocketing(balls, timestamp));

  const wallBounceResult = handleWallBounces(balls);
  result.wallCollisions = wallBounceResult.collisions;

  result.pocketedBalls.push(...checkPocketing(balls, timestamp));

  return result;
}
