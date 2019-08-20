import app from "./app";
import socket from "./socket";

const port = process.env.PORT || 8080;
    // tslint:disable:no-console
const server = app.listen(port, () => {
    console.log(`Listing on port ${port}`);
}).on("error", (e: any) => {
    console.error(e);
    process.exit(1);
});
socket(server);
