const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let mails = []; // 全ユーザー共通の受信箱

app.use(express.static("public"));

io.on("connection", socket => {
  // 初期データ送信
  socket.emit("init", mails);

  // メール受信
  socket.on("sendMail", mail => {
    mails.unshift(mail);
    io.emit("newMail", mail); // 全員に配信
  });
});

http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});