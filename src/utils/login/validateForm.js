const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("密码不能小于6位"))
  }
  if (value.length > 10) {
    callback(new Error("密码不能大于10位"))
  } else {
    callback()
  }
}
export default validatePassword
