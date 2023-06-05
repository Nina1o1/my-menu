// I want to manage my own status code for front-end display
// TODO: Improve custom error message
const status = {
  "reg-success": "reg-success",
  "reg-exist": "reg-exist",
  "reg-nodata": "reg-nodata",
  "reg-error": "reg-error",

  "login-success": "login-success",
  "login-noexist": "login-noexist",
  // TODO: Missing credentials error
  "Missing credentials": "Missing credentials",
  "login-error": "login-error",

  "logout-success":  "logout-success",
  "logout-error": "logout-error"
}
export default status