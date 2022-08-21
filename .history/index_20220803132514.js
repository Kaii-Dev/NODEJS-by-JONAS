const fs = require("fs"); // fs module cho phép đọc và viết dữ liệu file hệ thống
const http = require("http"); // http module cho phép khởi tạo server gán port, ip
const url = require("url");
//=============================FILE===============================//
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
// fs.readFile("./1-node-farm/starter/txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(
//     `./1-node-farm/starter/txt/${data1}.txt`,
//     "utf-8",
//     (err, data2) => {
//       console.log(data2);
//       fs.readFile(
//         "./1-node-farm/starter/txt/append.txt",
//         "utf-8",
//         (err, data3) => {
//           console.log(data3);

//           fs.writeFile(
//             "./1-node-farm/starter/txt/final.txt",
//             `${data2}\n${data3}`,
//             "utf-8",
//             (err) => {
//               console.log("Your file has been written");
//             }
//           );
//         }
//       );
//     }
//   );
// });
// console.log(
//   "this line will be first appeared be cause of callback function is in Async"
// );

//==================================SERVER=================================//
const server = http.createServer((request, response) => {
  console.log(request.url);
  const pathName = request.url;
  if (pathName === "/" || pathName === "/overview") {
    response.end("This is overview!");
  } else if (pathName === "/product") {
    response.end("This is product");
  } else if(pathName==='/api'){


    
    response.end('API')
  } else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "custome header",
    });
    response.end("<h1>PAGE NOT FOUND</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000");
});
