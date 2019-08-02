import app from "./app";

const port = process.env.PORT || 8000;
    // tslint:disable:no-console
app.listen(port, () => {
    console.log(`Listing on port ${port}`);
}).on("error", (e) => {
    console.error(e);
    process.exit(1);
});
