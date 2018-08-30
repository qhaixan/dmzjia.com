export default {
  increment (state) {
    state.test.count++
  },
  loadCookies (state, cookies) {
    state.test.count = cookies
  },
  public_dialogPop (state) {
    state.public.overlay.show = !state.public.overlay.show
    if(!state.public.overlay.show){
      state.public.overlay.content=null
    }
  },
  public_dialogContent (state,content) {
    state.public.overlay.content = content
    state.public.overlay.width = "300"
  }
};
