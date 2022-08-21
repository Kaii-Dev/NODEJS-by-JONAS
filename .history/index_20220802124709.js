const fs = require("fs"); // fs module cho phép đọc và viết dữ liệu file hệ thống

//blocking code, synchronous
//đọc file
// const textInput = fs.readFileSync(
//   "./1-node-farm/starter/txt/input.txt",
//   "utf-8"
// );
// console.log(textInput);
// //chỉnh sửa file
// const textOutput = `this is rewrite content: ${textInput}.\Create on ${Date.now()}`;
// fs.writeFileSync("./1-node-farm/starter/txt/input.txt", textOutput);
// console.log("file written!");

//Non-blocking, asynchronous => cải thiện tốc độ
fs.readFile("./1-node-farm/starter/txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(
    `./1-node-farm/starter/txt/${data1}.txt`,
    "utf-8",
    (err, data2) => {
      console.log(data2);
      fs.readFile(
        "./1-node-farm/starter/txt/append.txt",
        "utf-8",
        (err, data3) => {
          console.log(data3);

          fs.writeFile(
            "./1-node-farm/starter/txt/final.txt",
            `${data2}\n${data3}`,
            "utf-8",
            (err) => {
              console.log("Your file has been written");
            }
          );
        }
      );
    }
  );
});
console.log(
  "this line will be first appeared be cause of callback function is in Async"
);

function (err, data1){
  
}
