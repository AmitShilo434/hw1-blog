import { nextCsrf } from "next-csrf";

const secret = process.env.CSRF_SECRET || "no token"; 

const csrf = require('csrf');

const tokens = new csrf();

export function generateCSRFToken() {
  return tokens.create();
}

export function verifyCSRFToken(secret, token) {
  return tokens.verify(secret, token);
}

module.exports = {
  generateCSRFToken,
  verifyCSRFToken,
};