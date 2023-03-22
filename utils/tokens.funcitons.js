const getIdFromToken = (authHeader) => {
  const token = authHeader && authHeader.split(' ')[1];
  const tokenInfo = JSON.parse(atob(token.split('.')[1]));
  const userId = tokenInfo.id;

  return userId
}
module.exports = { getIdFromToken }