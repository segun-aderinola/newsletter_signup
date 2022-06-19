const express = require("express")
const app = express()
const bodyParser = require("body-parser")
// const request = require("request")
const https = require("https")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("assets"))


app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/signup.html")
})


app.post("/", (req, res)=>{
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email


    const url = "https://us10.api.mailchimp.com/3.0/lists/c5df4083a0";

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
            
        ]
    }

    const jsonData = JSON.stringify(data)

    const options = {
        method: 'POST',
        auth: 'lozkey123:bed5a9f886b202867b510d1a1b3270a9-us10'
      };

    const request = https.request(url, options, (response)=>{

        if(response.statusCode === 200){
            res.sendFile(__dirname+ "/success.html")
        }
        else{
            res.sendFile(__dirname+ "/failure.html")
        }


        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    
    })

    
    request.write(jsonData)
    request.end()

})

app.post("/signup", (req, res)=>{
    res.redirect("/")
})

const port = 3000;
app.listen(port, ()=>{
    console.log("App is listening on "+port);
})