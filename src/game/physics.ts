import type { Ball, HitRecord } from './types';
import { MAX_POWER } from './constants';
import { stepPhysics } from './physics/index';

export {
  stepPhysics,
  updatePositions,
  applyFriction,
  detectBallCollisions,
  handleWallBounces,
  checkPocketing,
  resolveBallCollision,
  resolveWallCollision,
} from './physics/index';

export type { StepResult, BallCollisionResult, WallBounceResult } from './physics/index';

export function allBallsStopped(balls: Ball[]): boolean {
  for (const ball of balls) {
    if (ball.pocketed) continue;
    if (Math.abs(ball.vel.x) > 0.001 || Math.abs(ball.vel.y) > 0.001) return false;
  }
  return true;
}

export function applyShot(
  balls: Ball[],
  aimAngle: number,
  power: number,
  maxPower: number,
  spinX = 0,
  spinY = 0,
): void {
  const cueBall = balls.find((b) => b.id === 0);
  if (!cueBall) return;

  const speed = power * maxPower;
  cueBall.vel.x = Math.cos(aimAngle) * speed;
  cueBall.vel.y = Math.sin(aimAngle) * speed;
  cueBall.spin.x = spinX * MAX_POWER * 2;
  cueBall.spin.y = spinY * MAX_POWER * 2;
}

export function runPhysicsUntilStopped(
  balls: Ball[],
  maxSteps = 5000,
): { hitRecords: HitRecord[]; pocketedBalls: number[]; steps: number } {
  const hitRecords: HitRecord[] = [];
  const pocketedBalls: Set<number> = new Set();
  let steps = 0;

  while (steps < maxSteps) {
    const result = stepPhysics(balls, 1 / 60, hitRecords, steps);
    for (const id of result.pocketedBalls) {
      pocketedBalls.add(id);
    }
    steps++;
    if (allBallsStopped(balls)) break;
  }

  return {
    hitRecords,
    pocketedBalls: Array.from(pocketedBalls),
    steps,
  };
}
