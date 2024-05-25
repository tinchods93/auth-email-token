export default function requestLogger(req, res, next) {
  console.log({
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
    session: req.session,
  });
  next();
}
