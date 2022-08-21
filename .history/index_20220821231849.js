const fs = require("fs"); // fs module cho phép đọc và viết dữ liệu file hệ thống
const http = require("http"); // http module cho phép khởi tạo server gán port, ip
const url = require("url"); //
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

//các hàm đọc file lúc này không gây ra hiện tượng blocking vì hàm đọc này được đưa lên xử lý trên cùng nên chỉ xử lý 1 lần rồi thôi
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); // sử dụng regular
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
//đọc file
const tempOverview = fs.readFileSync(
  "./1-node-farm/starter/templates/overview.html",
  "utf-8"
);
const tempCard = fs.readFileSync(
  "./1-node-farm/starter/templates/card.html",
  "utf-8"
);
const tempProduct = fs.readFileSync(
  "./1-node-farm/starter/templates/product.html",
  "utf-8"
);
const data = fs.readFileSync(
  "./1-node-farm/starter/dev-data/data.json",
  "utf-8"
);

const dataObj = JSON.parse(data); // lúc này là array chứa chuỗi dữ liệu

//TẠO SERVER
const server = http.createServer((request, response) => {
  console.log(request.url);
  console.log(url.parse(request.url));
  const pathName = request.url;

  //OVERVIEW PAGE
  if (pathName === "/" || pathName === "/overview") {
    response.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHTML = dataObj
      .map((ele) => replaceTemplate(tempCard, ele)) // tempCard = temp, ele = current product
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
    response.end(output);
  }

  //PRODUCT
  else if (pathName === "/product") {
    response.end("This is product");
  }

  //API
  else if (pathName === "/api") {
    response.writeHead(200, {
      "Content-type": "application/json", //thông báo cho browser biết đang gửi lên chuỗi json
    });
    response.end(data);
  }

  //NOT FOUND
  else {
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

console.log("test");
