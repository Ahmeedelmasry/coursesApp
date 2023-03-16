//Settings
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Create our express app
const app = express();

//Import Routes
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const postCourse = require("./routes/courseData");
const getCourses = require("./routes/getCourses");
const updateFinance = require("./routes/finance");
const placeOrder = require("./routes/orders");
const wishlist = require("./routes/wishlist");
const lectureStream = require("./routes/lectureStream");

//Handle Cors and Middleware
app.use((req, res, next) => {
  res
    .header("Access-Control-Allow-Origin", "https://mycoursesapp-427fa.web.app")
    .header("Access-Control-Allow-Methods", "GET, POST, HEAD, PUT, DELETE")
    .header(
      "Access-Control-Allow-Headers",
      "auth-token, Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    .header("Access-Control-Allow-Credentials", true);
  next();
});

//Database Stuff
mongoose
  .set("strictQuery", true)
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo Db Connected .."))
  .catch((err) => console.log(err));

//Config
app.use(bodyParser.json());

//Cookie Parser
app.use(cookieParser());

//Public images
app.use(express.static("courseImgs"));

app.get("/", (req, res) => {
  console.log("hello");
  res.send({ message: "Hello" });
});

//Routes
app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/create-course", postCourse);
app.use("/get-courses", getCourses);
app.use("/update-finance", updateFinance);
app.use("/place-order", placeOrder);
app.use("/wishlist", wishlist);
app.use("/lecture-stream", lectureStream);

//Socket io
const http = require("http");
const { Server } = require("socket.io");
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://mycoursesapp-427fa.web.app",
    methods: ["GET", "POST", "HEAD", "PUT", "DELETE"],
  },
});

//Starting server
httpServer.listen(process.env.PORT, () => {
  console.log(`Listining at port ${process.env.PORT || 3000}`);
});

io.sockets.on("connection", (socket) => {
  //Check If User Is Connected
  console.log("socket.io User Connected", socket.id);

  //Join room
  socket.on(`join_lecture_room`, (roomData) => {
    socket.join(roomData.roomId);
    console.log(socket.rooms);

    //Send room info after join room
    socket.emit("my_connection_data", {
      roomId: roomData.roomId,
      userId: socket.id,
      frontId: roomData.userId,
    });

    //Request peer id
    socket.on("req_peer_id", (rId) => {
      console.log("Ask for peer", rId);
      socket.broadcast.to(rId).emit("get_peer_id");
    });
    socket.on("send_peer_id", (data) => {
      socket.broadcast.to(data.roomId).emit("recieve_peer_id", data.userId);
    });
  });
});
io.sockets.on("disconnect", () => {
  console.log("disconnected");
});

io.sockets.on("connection_error", () => {
  console.log("error");
});
