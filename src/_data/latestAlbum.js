import EleventyFetch from "@11ty/eleventy-fetch";

/**
 * Grabs the remote data for studio images and returns back
 * an array of objects
 *
 * @returns {Array} Empty or array of objects
 */
export default async () => {
  try {
    let url = "https://sacred-candy-33d6634475.strapiapp.com/api/latest-album?&populate=*";
    const response = await EleventyFetch(url, {
      duration: "1d",
      type: "json",
    });
    console.log('Latest Album Data:', response.data);
    return response.data ;
  } catch (err) {
    console.log(err);
    return [];
  }
};
