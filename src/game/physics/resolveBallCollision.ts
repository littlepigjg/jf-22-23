import type { Ball } from '../types';
import { RESTITUTION_BALL } from '../constants';
import { v } from '../../utils/math';

export function resolveBallCollision(a: Ball, b: Ball): boolean {
  const delta = v.sub(b.pos, a.pos);
  const dist = v.len(delta);
  const minDist = a.radius + b.radius;

  if (dist >= minDist || dist === 0) return false;

  const normal = v.div(delta, dist);
  const overlap = minDist - dist;

  const totalMass = 2;
  a.pos.x -= normal.x * overlap * (1 / totalMass);
  a.pos.y -= normal.y * overlap * (1 / totalMass);
  b.pos.x += normal.x * overlap * (1 / totalMass);
  b.pos.y += normal.y * overlap * (1 / totalMass);

  const relVel = v.sub(a.vel, b.vel);
  const velAlongNormal = v.dot(relVel, normal);
  if (velAlongNormal <= 0) return false;

  const impulse = (-(1 + RESTITUTION_BALL) * velAlongNormal) / (1 / 1 + 1 / 1);

  const impulseVec = v.mul(normal, impulse);
  a.vel.x += impulseVec.x;
  a.vel.y += impulseVec.y;
  b.vel.x -= impulseVec.x;
  b.vel.y -= impulseVec.y;

  const tangent = { x: -normal.y, y: normal.x };
  const relVelTan = v.dot(relVel, tangent);
  const frictionImpulse = -relVelTan * 0.08;
  a.vel.x += tangent.x * frictionImpulse;
  a.vel.y += tangent.y * frictionImpulse;
  b.vel.x -= tangent.x * frictionImpulse;
  b.vel.y -= tangent.y * frictionImpulse;

  return true;
}
