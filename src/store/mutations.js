export default {
  increment (state) {
    state.test.count++
  },
  loadCookies (state, cookies) {
    state.test.count = cookies
  }
};
