import express from "express";
import axios, { formToJSON } from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/findvideos", async (req, res) => {
  try {
    console.log(req.body);
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?key=AIzaSyBIQklkPpUdB7euP0Qqu81xOiiJ9lpUJTI&regionCode=GB&chart=mostPopular&maxResults=10&part=snippet`
    );
    // console.log(response.data.items);
    const initialVideoList = response.data.items
    var titles = []
    for (let i = 0; i < initialVideoList.length; i++) {
      const title = initialVideoList[i].snippet.title;
      const videoId = initialVideoList[i].id;
      const urlRoot = "https://www.youtube.com/watch?v=";
      const url = urlRoot.concat(videoId);
      titles.push(title, url);
      
    }
    console.log("titles: ", titles);

    res.render("index.ejs", {
      vids: titles,
    });
  } catch (error) {
    
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
