export default {
  increment (state) {
    state.test.count++
  },
  public_dialogPop (state,value) {
    state.public.overlay.show = value
    if(!state.public.overlay.show){
      state.public.overlay.content=null
      state.public.overlay.action = null
    }
  },
  public_dialogContent (state,overlay) {
    state.public.overlay.show = true
    state.public.overlay.content = overlay.content
    state.public.overlay.width = overlay.width
    state.public.overlay.action = null
  },
  public_dialogAction (state,overlay) {
    state.public.overlay.show = true
    state.public.overlay.content = overlay.content
    state.public.overlay.width = overlay.width
    state.public.overlay.action = overlay.action
  }
};
