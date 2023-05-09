import axios from "axios";

export const listArmors = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://eldenring.fanapis.com/api/armors",
  };

  const result = await axios.request(options);
  res.render("../Src/Render/Layout.ejs", {
    content: "./Pages/armor.ejs",
    jobs: result.data["data"],
  });
};
