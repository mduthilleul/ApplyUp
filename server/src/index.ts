import express from 'express';
import cors from 'cors';

const app = express()

app.use(cors()) // Enable CORS for all routes for dissmissing CORS errors during development
app.use(express.json()) // Enabled to parse JSON request bodies

app.get('/', (request, response) => {
  response.send("Hello, World!")
})

app.listen(3000, () =>  {
    console.log('Server is running on http://localhost:3000')
})