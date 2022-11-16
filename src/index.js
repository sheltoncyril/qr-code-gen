const qr = require("qr-image");

const landing = `
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet">
<style>
* {
	font-family: "Roboto";
}
</style>
</head>
<body>
<center>
<h1>QR Generator</h1>
<div>
<h3>URL: 
<input type="text" id="url" value="https://sheltoncyril.io"></input></h3>
</div>
<div>
<h3>margin: 
<input type="text" id="margin" value="1"></input></h3>
</div>
<div>
<h3>size: 
<input type="text" id="size" value="5"></input></h3>
</div>
<button onclick="redirect()">Generate QR Code</button>
</center>
<script>
  function redirect() {
	window.location.href = window.location.pathname+"?url="+document.querySelector("#url").value+"&margin="+document.querySelector("#margin").value+"&size="+document.querySelector("#size").value
  }
</script>
`

async function generate(request) {
  let options = {};
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (url === null) {
	return new Response(landing, {
		headers: {
			"Content-Type": "text/html"
		  }
	})
  }
 const ec =  searchParams.get("ec")
  if (ec !== null) {
    options.ec_level = ec
  }
 const size =  searchParams.get("size")
  if (size !== null) {
    options.size = parseInt(size)
  }
 const margin =  searchParams.get("margin")
  if (margin !== null) {
    options.margin = parseInt(margin)
  }
  const headers = { "Content-Type": "image/png" };
  console.log(size, options.size)
  const qr_png = qr.imageSync(url || "https://sheltoncyril.io", options);
  return new Response(qr_png, { headers });
}

function handleRequest(request) {
  return generate(request);
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
