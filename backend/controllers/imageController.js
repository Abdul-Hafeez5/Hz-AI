import imagekit from "../configs/imagekit.js";

export const getImageKitAuthParams = (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error generating ImageKit auth parameters");
  }
};
