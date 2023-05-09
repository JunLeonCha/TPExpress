import axios from "axios";

export const itemsController = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://eldenring.fanapis.com/api/items",
    params: { limit: 20 },
  };

  const result = await axios.request(options);
  res.render("../Src/Render/Layout.ejs", {
    content: "./Pages/items.ejs",
    items: result.data["data"],
  });
};
