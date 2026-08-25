const fs = require("fs");
const path = require("path");

function test(name, condition) {
    if (condition) {
        console.log(`✓ PASS: ${name}`);
    } else {
        console.error(`✗ FAIL: ${name}`);
        process.exitCode = 1;
    }
}

console.log("Running Todo Application Tests...\n");

// Test 1: index.html exists
const htmlPath = path.join(__dirname, "..", "SRC", "index.html");

test(
    "index.html exists",
    fs.existsSync(htmlPath)
);

// Test 2: style.css exists
const cssPath = path.join(__dirname, "..", "SRC", "style.css");

test(
    "style.css exists",
    fs.existsSync(cssPath)
);

// Test 3: app.js exists
const jsPath = path.join(
    __dirname,
    "..",
    "SRC",
    "scripts",
    "app.js"
);

test(
    "app.js exists",
    fs.existsSync(jsPath)
);

// Test 4: HTML contains Todo application
if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, "utf8");

    test(
        "HTML file contains Todo application content",
        html.toLowerCase().includes("todo")
    );
}

// Test 5: JavaScript is not empty
if (fs.existsSync(jsPath)) {
    const javascript = fs.readFileSync(jsPath, "utf8");

    test(
        "JavaScript file contains code",
        javascript.trim().length > 0
    );
}

console.log("\nTodo application tests completed.");