const http = require("http");
const { readFile } = require("fs");
const path = require("path");

// Create serever
const server = http.createServer((req, res) => {
	// const filePath = path.join(
	// 	__dirname,
	// 	"public",
	// 	req.url === "/" ? "index.html" : req.url
	// );

	let filePath = __dirname + "\\" + "public" + "\\";
	switch (req.url) {
		case "/":
			filePath += "index.html";
			break;
		case "/index":
			filePath += "index.html";
			break;
		case "/about":
			filePath += "about.html";
			break;
		case "/contact":
			filePath += "contact.html";
			break;
		// case "/style.css":
		// 	filePath += "style.css";
		// 	break;
		default:
			// filePath += "404.html";
			filePath += req.url.slice(1);
	}

	const notFoundPath = path.join(__dirname, "public", "404.html");
	let contentType = getContentType(filePath) || "text/html";
	// read requested file
	readFile(filePath, "utf-8", (err, data) => {
		if (err) {
			if (err.code === "ENOENT") {
				readFile(notFoundPath, "utf-8", (err, data) => {
					if (err) {
						console.log(err);
						res.end();
					} else {
						res.writeHead(200, "The page does not exist", {
							"Content-Type": "text/html",
						});
						res.end(data);
					}
				});
			}
		}

		if (!err) {
			res.writeHead(200, { "Content-Type": contentType });
			res.end(data);
		}
	});
});

// definition of the getContentType function
function getContentType(filePath) {
	let extName = path.extname(filePath);
	if (extName === ".html") {
		return "text/html";
	} else {
		return "text/css";
	}
}

server.listen(5300, () => console.log("server running on port 5300"));
