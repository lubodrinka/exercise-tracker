# Exercise Tracker REST API

#### A microservice project, part of Free Code Camp's curriculum

Create a New User
POST /api/exercise/new-user
  
Add exercises
POST /api/exercise/add
     
GET users's exercise log: GET /api/exercise/log?{userId}[&from][&to][&limit]
GET users's exercise log example: /api/exercise/log?userId=5b58365863c3821040f73d51&from=2014-01-08&to=2018-07-24&limit=5
{ } = required, [ ] = optional
from, to = dates (yyyy-mm-dd); limit = number
