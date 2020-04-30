const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const getStringSize = (string) => {
  const bytes = Buffer.byteLength(string, 'utf16');
  const kilobytes = bytes / 1000
  const megabytes = kilobytes / 1000

  return megabytes
}

const getTotalArraySize = (arr) => {
  return arr
    .map(getStringSize)
    .reduce((acc, size) => acc + size, 0)
}

app.get('/api/documents', async (req, res) => {
  let document = `This is a long text that`
    + ` is going to be multiplied multiple times.`
  for (let i = 0; i < 13; i++) {
    // it is necessary to create a new copy,
    // otherwise js optimizes with references
    document = JSON.stringify(document + document)
  }

  let documents = [document, document]
  for (let i = 0; i < 1; i++) {
    documents = [...JSON.parse(JSON.stringify(documents)), ...JSON.parse(JSON.stringify(documents))]
  }

  return res.send('Finished operations with RAM')
})

app.post('/api/pictures', upload.single('file'), (req, res, next) => {
  return res.send('Received and saved file')
})

app.get('/api/sorted-lists', (req, res, next) => {
  console.log('sorting')
  const list = Array.from(new Array(1000000))
    .map(() => Math.random())

  const sortAsc = (a, b) => a - b
  const sortedList = list.sort(sortAsc)
  console.log('finished sorting')

  return res.send('Generated and sorted a list')
})

const port = 3000
app.listen(port, () => console.log(`App listening on port ${port}`))
