const axios = require('axios')

const AMOUNT_OF_REQUESTS = 25
const REQUEST_URL = 'https://olraaajt.azurewebsites.net/HttpTrigger1?code=8aScdapoMJsaQGtatJVY7MjJL7aYRMWdjqz9W8wKukZmvuqBQBqiNA=='

const measureRequestTime = async (request, i) => {
  const start = new Date()
  console.log('starting request', i)

  try {
    await request()
  } catch (error) {
    console.log('request errored', error)
    return 0
  }

  const end = new Date()
  const ms = (end.getTime() - start.getTime())

  console.log('request returning', i)
  return ms
}

const requests = Array.from(new Array(AMOUNT_OF_REQUESTS))
  .map(() => {
    return () => axios.get(REQUEST_URL)
  })

const runTests = async () => {
  const results = await Promise.all(requests.map(measureRequestTime))
  const avg = results.reduce((acc, el) => acc + el, 0);
  for (const result of results) {
    console.log(result);
  }
  console.log(avg/results.length);
}

runTests()


/*

Dla 50: 
*/
