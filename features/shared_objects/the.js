
// This shared state is used to pass objects between steps, e.g. a step can set
// shared.the.result and future steps can refer to shared.the.result without
// being aware of the step which set it.
module.exports = {
  result: null,
  link: null
};