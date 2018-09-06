export default {
  increment (state) {
    state.test.count++
  },
  loadCookies (state, cookies) {
    state.test.count = cookies
  },
  public_dialogPop (state,value) {
    state.public.overlay.show = value
    if(!state.public.overlay.show){
      state.public.overlay.content=null
    }
  },
  public_dialogContent (state,overlay) {
    state.public.overlay.show = true
    state.public.overlay.content = overlay.content
    state.public.overlay.width = overlay.width
  }
};
