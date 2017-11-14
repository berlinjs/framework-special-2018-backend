const jwt = require('jsonwebtoken');

const SECRET =
  process.env.SECRET ||
  Math.random()
    .toString(36)
    .substr(2);

function createToken(username) {
  const payload = { sub: username };

  const token = jwt.sign(payload, SECRET, { expiresIn: '15m' });
  return token;
}

function verifyLoginMiddleware(req, res, next) {
  const authHeader = (req.get('Authorization') || '')
    .replace('Bearer ', '')
    .trim();

  const token = authHeader || req.cookies.token;

  if (!token) {
    res.status(403).send('Missing token');
    return;
  }

  try {
    const { sub } = jwt.verify(token, SECRET, { algorithms: ['HS256'] });
    req.user = sub;
    next();
  } catch (err) {
    res.status(403).send('Invalid token!');
  }
}

module.exports = { createToken, verifyLoginMiddleware };
