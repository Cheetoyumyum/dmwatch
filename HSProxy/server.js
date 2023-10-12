const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.get('/highscores/:player', async (req, res) => {
  const player = req.params.player
  const url = `http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${player}`

  try {
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.text()
      console.log(data)
      res.send(data)
    } else {
      res.status(500).json({ error: 'Failed to fetch data' })
    }
  } catch (error) {
    console.error('Error fetching highscores data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
