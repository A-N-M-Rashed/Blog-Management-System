const app= require("./app");
const PORT= process.env.PORT;
app.listen(PORT, function(){
    console.log(`Server is running on ${PORT}`);
});