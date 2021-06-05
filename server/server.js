const _ = require('lodash')
const faker = require('faker')
const express = require('express')

const products = []
for (const i of _.range(100)) {
  products.push({
    id: i + 1,
    name: faker.commerce.productName(),
    image: faker.image.image(),
    describe: faker.lorem.lines(),
    price: _.random(10, 1600) * 10,
    tags: _.sampleSize(['toy', 'shirt', 'pant', 'budget', 'special', 'limited'], _.random(1, 3)),
    createdAt: faker.date.past()
  })
}

const app = express()

app.use(require('cors')())
app.use(express.json())         // req.body <-- application/json
// app.use(express.urlencoded())   // req.body <-- <form>
app.use(require('express-session')({ secret: '123', saveUninitialized: false, resave: false }))

app.get('/login', (req, res) => {
  if (req.session.auth) {
    res.send({ auth: req.session.auth })
  } else {
    res.status(401).end()
  }
})

app.post('/login', (req, res) => {
  if (req.body.username == 'admin' && req.body.password == '1234') {
    req.session.auth = {
      username: 'admin',
      displayName: 'Administrator',
      createdAt: new Date('2020-12-25')
    }
    res.send({ auth: req.session.auth })
  } else {
    res.status(400).send({ error: 'incorrect' })
  }
})

app.get('/logout', (req, res) => {
  req.session.auth = undefined
  res.end()
})

app.get('/products', (req, res) => {
  let output = _.cloneDeep(products)
  output = output.splice(0, req.query.limit || 20)
  res.send({ data: output })
})

app.get('/products/:id', (req, res) => {
  const product = _.find(products, { id: Number(req.params.id) })
  if (!product) {
    res.status(404).send({ error: 'ไม่พบสินค้า' })
  } else {
    res.send({ data: product })
  }
})

app.post('/checkout', (req, res) => {
  res.send({ body: req.body })
})

app.listen(3000, () => console.log('Server listening on http://localhost:3000'))
