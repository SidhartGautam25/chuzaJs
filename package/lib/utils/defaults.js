export function nothingMatches(req, res) {
    res.status(404).send("Not Found");
}

export function errorOccured(err, req, res) {
    console.error("BachaJS: Request failed with error:", err);
    if (!res.writableEnded) {
        res.status(500).send("Internal Server Error");
    }
}
