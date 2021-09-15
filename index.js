const express = require("express")
const ytdl = require("ytdl-core")
const utf8 = require("utf8")

const app = express()

app.use(express.json())
app.use(express.static("public"))


app.get("/videoInfo", async function(req, res){
    let videoURL = req.query.videoURL
    let info = await ytdl.getInfo(videoURL)


    res.status(200).json(info)
})

app.get("/download", function(req, res){
    let videoURL = req.query.videoURL
    let itag = req.query.itag
    let filename = req.query.filename

    
    
    res.setHeader('Content-disposition', 'attachment; filename='+utf8.encode(filename));
    ytdl(videoURL, {
        filter: format => format.itag == itag
    }).pipe(res)
    console.log(res)

})

app.listen(5000)