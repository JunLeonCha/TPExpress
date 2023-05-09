import axios from "axios";

export const eldenClassController = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://eldenring.fanapis.com/api/classes",
    params: { limit: 10 },
  };

  const result = await axios.request(options);
  res.status(200).render("../Src/Render/Layout.ejs", {
    content: "./Pages/eldenClass.ejs",
    jobs: result.data["data"],
  });
};
