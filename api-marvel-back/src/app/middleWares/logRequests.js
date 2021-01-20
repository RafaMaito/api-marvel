const arrLog = [];
export default (request, response, next) => {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()} ${url}]`;
  arrLog.push(logLabel);
  console.log(logLabel);

  return next();
};
