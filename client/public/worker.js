let array = [];
console.log("im a worker");
this.addEventListener("message", (event) => {
    if (event.data === "download") {
        const blob = new Blob(array);
        this.postMessage(blob);
        console.log("downloading file");
        array = [];
    } else {
        console.log("got a chunk");
        array.push(event.data);
    }
});