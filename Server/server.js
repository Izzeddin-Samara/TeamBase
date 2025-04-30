const express = require('express');
const cors = require('cors');


const app = express();


app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Allows JSON parsing




// Start the server
app.listen(8000, () => {
    console.log("Listening at Port 8000");
});
