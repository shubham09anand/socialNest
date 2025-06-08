const express = require("express");

const app = express();

app.get("/:name/:stID", (req, res)=>{
    res.status(200).json({
        message:`Route Working for ${req.params.name} and ${req.params.stID}`,
        success:true,
    })
})

app.listen(3000, () => {
    console.log("Server Running");
});
