let array = [];
console.log("im a worker");
this.addEventListener("message", (event) => {
    console.log("got message event");
    if (event.data === "download") {
        const blob = new Blob(array);
        this.postMessage(blob);
    } else {
        array.push(event.data);
    }
});