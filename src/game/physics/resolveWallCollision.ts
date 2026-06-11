import type { Ball } from '../types';
import { PLAYFIELD_LEFT, PLAYFIELD_RIGHT, PLAYFIELD_TOP, PLAYFIELD_BOTTOM, RESTITUTION_WALL } from '../constants';

export function resolveWallCollision(ball: Ball): boolean {
  let collided = false;

  if (ball.pos.x - ball.radius < PLAYFIELD_LEFT) {
    ball.pos.x = PLAYFIELD_LEFT + ball.radius;
    ball.vel.x = -ball.vel.x * RESTITUTION_WALL;
    collided = true;
  }
  if (ball.pos.x + ball.radius > PLAYFIELD_RIGHT) {
    ball.pos.x = PLAYFIELD_RIGHT - ball.radius;
    ball.vel.x = -ball.vel.x * RESTITUTION_WALL;
    collided = true;
  }
  if (ball.pos.y - ball.radius < PLAYFIELD_TOP) {
    ball.pos.y = PLAYFIELD_TOP + ball.radius;
    ball.vel.y = -ball.vel.y * RESTITUTION_WALL;
    collided = true;
  }
  if (ball.pos.y + ball.radius > PLAYFIELD_BOTTOM) {
    ball.pos.y = PLAYFIELD_BOTTOM - ball.radius;
    ball.vel.y = -ball.vel.y * RESTITUTION_WALL;
    collided = true;
  }

  return collided;
}
