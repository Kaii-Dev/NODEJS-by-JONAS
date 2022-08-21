const fs = require("fs"); // fs module cho phép đọc và viết dữ liệu file hệ thống

//blocking code, synchronous
//đọc file
const textInput = fs.readFileSync(
  "./1-node-farm/starter/txt/input.txt",
  "utf-8"
);
console.log(textInput);

//chỉnh sửa file
const textOutput = `this is rewrite content: ${textInput}.\Create on ${Date.now()}`;
fs.writeFileSync("./1-node-farm/starter/txt/input.txt", textOutput);
console.log("file written!");

//Non-blocking, asynchronous => cải thiện tốc độ
fs.readFile("./1-node-farm/starter/txt/start.txt", )
