const http = require('http')
const { v4: uuidv4 } = require('uuid')
const resHandle = require('./resHandle')

const todos = []
const requestHandle = (req, res) => {

  let body = ''
  req.on('data', chunk => body += chunk)

  if (req.url === '/todos' && req.method === 'GET') {
    resHandle.successHandle(res, todos)
  } else if (req.url === '/todos' && req.method === 'POST') {
    req.on('end', () => {
      try {
        const title = JSON.parse(body).title

        if (title !== undefined) {
          const todo = {
            "title": title,
            "id": uuidv4()
          }
          todos.push(todo)
          resHandle.successHandle(res, todos)
        } else {
          resHandle.errorHandle(res)
        }
      } catch {
        resHandle.errorHandle(res)
      }
    })
  } else if (req.url === '/todos' && req.method === 'DELETE') {
    todos.length = 0
    resHandle.successHandle(res, todos)
  } else if (req.url.startsWith('/todos/') && req.method === 'DELETE') {
    const id = req.url.split('/').pop()
    const index = todos.findIndex(el => el.id === id)

    if (index !== -1) {
      todos.splice(index, 1)
      resHandle.successHandle(res, todos)
    } else {
      resHandle.errorHandle(res)
    }
  } else if (req.url.startsWith('/todos/') && req.method === 'PATCH') {
    req.on('end', () => {
      try {
        const id = req.url.split('/').pop()
        const index = todos.findIndex(el => el.id === id)
        const title = JSON.parse(body).title

        if (index !== -1 && title !== undefined) {
          todos[index].title = title
          resHandle.successHandle(res, todos)
        } else {
          resHandle.errorHandle(res)
        }

      } catch {
        resHandle.errorHandle(res)
      }
    })
  } else if (req.method === 'options') {
    resHandle.optionsHandle(res)
  } else {
    resHandle.noPathHandle(res)
  }
}
const server = http.createServer(requestHandle)
server.listen(process.env.PORT || 3005)