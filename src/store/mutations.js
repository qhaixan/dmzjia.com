export default {
  increment (state) {
    state.test.count++
  },
  loadCookies (state, cookies) {
    state.test.count = cookies
  },
  public_dialogPop (state) {
    state.public.overlay.show = !state.public.overlay.show
  }
};
