const express = require('express');
const app = express();
app.use(express.json());

// Server static files
app.listen(process.env.PORT || 3000, () => {
    app.use(express.static('public'));
});

