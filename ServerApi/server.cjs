const express = require('express')
const app = express()
const port = 5000
const fs = require("fs")
const config = require("./user.json")

const cors = require('cors');
app.use(cors());
app.use(express.json())
//app.use(express.json({limit: '1000mb'}))
//app.use(express.urlencoded({limit: '1000mb'}));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/signUp', (req, res) => {
    const {email, password, apiKey, projectID} = req.body;

    if(apiKey == config.apiKey && projectID == config.projectID){
      for(i in config.users){
        if(config.users[i].email===email){
          return res.send({status:"failure"})
        }
      }
      let index = config.users[config.users.length-1].id

      const user = {
        id:index+1,
        email: email,
        password: password
      }

      config.users[index] = user
      
      fs.writeFileSync('user.json', JSON.stringify(config,null, 4));

      delete user.password
      return res.send(user)
  }
  res.send({status: "Api error"})
})
  

app.post("/signIn", (req, res) => {
  const {email, password, apiKey, projectID} = req.body;

  if(apiKey == config.apiKey && projectID == config.projectID){
    for(i in config.users){
      console.log(i)
      if(config.users[i].email===email){
        if(config.users[i].password===password){
          let user = config.users[i]
          delete user.password
          //console.log(user) 
          return res.send(user)
        }
        return res.send({status:"failure"})
      }
    }
    return res.send({status:"failure"})
  }
  res.send({status: "Api error"})
})