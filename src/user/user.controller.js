function create (req, res, next) {
  res.json('OK :: create user')
}

function list (req, res, next) {
  res.json('OK :: user list')
}

module.exports = {
  create,
  list,
}
