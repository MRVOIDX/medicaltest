import { createApp } from './_handler.mjs';

const app = createApp();

export default async function handler(req, res) {
  return app(req, res);
}
