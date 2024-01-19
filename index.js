const express = require('express')
var cors = require('cors')
const axios = require('axios')

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('The Insight News backend')
})
app.post('/api/proxy-server', async (req, res) => {
    const { url } = req.body
    if (!url) {
        res.status(400).send('URL is required')
    }
    try {
        const response = await axios.get(url);

        // Modify the response to fit the structure expected by fetchMoreData
        const modifiedResponse = {
            data: {
                code: response.data.status, // You can customize the code based on the actual response
                articles: response.data.articles, // Assuming response.data contains the articles
                totalResults: response.data.totalResults, // Modify accordingly based on the actual data structure
            }
        };

        res.json(modifiedResponse);
    } catch (error) {
        // Handle errors and send an appropriate response
        res.status(400).json({
            data: {
                code: 'error',
                message: error.message,
            }
        });
    }
})

app.listen(port, () => {
    console.log(`The Insight News listening on port ${port}`)
})