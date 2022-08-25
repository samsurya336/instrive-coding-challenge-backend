exports.validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
    email
  );
};

exports.api = {
  baseUrl:
    process.env.REACT_APP_STAGING === "development"
      ? "https://dev.ngrokexposedapp.in"
      : process.env.REACT_APP_STAGING === "uat"
      ? "https://uat.ngrokexposedapp.in"
      : process.env.REACT_APP_STAGING === "production"
      ? "https://ngrokexposedapp.in"
      : "http://localhost:3000",
};
