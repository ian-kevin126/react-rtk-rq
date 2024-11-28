const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next();
});


// 这行代码的作用是启用 Express 应用程序的 JSON 解析中间件。具体来说，它允许 Express 应用程序
// 自动解析传入的 JSON 请求体，并将其转换为 JavaScript 对象，以便在处理请求时可以直接访问和操作这些数据。
// express.json(): 这是一个内置的 Express 中间件函数，用于解析 Content-Type 为 application/json 的请求体。
// 它会将请求体中的 JSON 数据解析为一个 JavaScript 对象，并将其附加到 req.body 属性上。
app.use(express.json());
// app.use(): 这是 Express 中用于注册中间件的方法。
// 通过调用 app.use(express.json())，你告诉 Express 在处理每个请求时，先使用 express.json

const dbFilePath = path.join(__dirname, "db.json");

const readData = () => {
  if (!fs.existsSync(dbFilePath)) {
    return { items: [] };
  }
  const data = fs.readFileSync(dbFilePath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

app.get("/items", (req, res) => {
  const data = readData();
  res.json(data.items);
});

app.post("/items", (req, res) => {
  const data = readData();
  const newItem = { id: Date.now(), title: req.body.title };
  data.items.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const data = readData();
  const itemIndex = data.items.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );
  if (itemIndex > -1) {
    data.items[itemIndex] = { ...data.items[itemIndex], title: req.body.title };
    writeData(data);
    res.json(data.items[itemIndex]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Delete an item
app.delete("/items/:id", (req, res) => {
  const data = readData();
  data.items = data.items.filter((item) => item.id !== parseInt(req.params.id));
  writeData(data);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
