const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET, DELETE, OPTIONS',
  'Content-Type': 'application/json'
}

exports.successHandle = function (res, data) {
  res.writeHead(200, headers)
  res.write(JSON.stringify({
    "status": "success",
    "data": data
  }))
  res.end()
}

exports.errorHandle = function (res) {
  res.writeHead(400, headers)
  res.write(JSON.stringify({
    "status": "false",
    "message": "欄位格式錯誤，或無此 todo id"
  }))
  res.end()
}

exports.optionsHandle = function (res) {
  res.writeHead(200, headers)
  res.end()
}

exports.noPathHandle = function (res) {
  res.writeHead(404, headers)
  res.write(JSON.stringify({
    "status": "false",
    "message": "無此網路路由"
  }))
  res.end()
}