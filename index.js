import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL);
        console.log(result.data);

        res.render("index.ejs", { name: JSON.stringify(result.data.drinks[0].strDrink).slice(1, -1),
                                  picture: result.data.drinks[0].strDrinkThumb,
                                  category: JSON.stringify(result.data.drinks[0].strCategory).slice(1, -1),
                                  recipe: JSON.stringify(result.data.drinks[0].strInstructions).slice(1, -1),
                                  content: result.data,
                                   });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    } 
});




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});