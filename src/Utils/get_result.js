const BASE_URL = "https://calculator-backend-side.herokuapp.com/?equation=";

const getResult = async (equation) => {
  const urlExtension = equation.replaceAll("+", "%2B").replace(/\s/g, "");
  const current_url = BASE_URL + urlExtension;
  try {
    const response = await fetch(current_url, {
      mode: "cors",
      withCredentials: "false",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export default getResult;
