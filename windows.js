fakewin.StandardWindow=function(...args){return w96.util.Swgen(new (function(){}).constructor("return window.StandardWindow")()(...args));}
fakewin.WindowSystem={
  get windows(){ var rws=(function(){}).constructor("return window.w96")().windowSystem.windows;var x=[];for(var i=0;i<rws.length;i++){try{x.push(fakewin.util.Swgen(rws[i]))}catch(e){x.push(null)}};return x},
}
fakewin.util.Swgen=function(rsw){
  var sw={
    sw:rsw,
    toString: function (){return "[object StandardWindow]"},
    setTitle: function(t){this.$sw.setTitle(t)},
    close:function(){this.$sw.close()},
    toggleMaximize:function(){this.$sw.toggleMaximize()},
    toggleMinimize:function(){this.$sw.toggleMinimize()},
    show:function(){this.$sw.show()},
    setControlBoxStyle:function(cbx){this.$sw.setControlBoxStyle(cbx)},
    get wndObject(){return this.$sw.window},
    get id(){return "wnd_"+(this.$sw.windowId.slice('desktop_window_'.length))},
    get maximized(){return this.$sw.maximized},
    get minimized(){return this.$sw.minimized},
    get shown(){return this.$sw.shown},
    registerAppBar:function(){(function(){}).constructor("return window.w96")().ui.commdlg.msgboxSimple.error('bruh','you cant do this', 'wat');},
    registerWindow:function(){(function(){}).constructor("return window.w96")().ui.commdlg.msgboxSimple.error('bruh','you cant do this', 'wat');},
    setPosition:function(x,y){this.$sw.setPosition(x,y);},
    setHtml:function(bruh){this.wndObject.querySelector('.window-html-content').innerHTML=bruh},
    setSize:function(w,h){this.$sw.setSize(w,h);},
    setWindowIcon:function(url){this.$sw.setWindowIcon(url,true);},
    showTitlebarMenu:function(){(function(){}).constructor("return window.w96")().ui.commdlg.msgboxSimple.error('bruh','bruh you should know v1 doesn\'t have titlebar menu', 'wat');},
    params:{title:'a title',body:'bruh do you really need this',get initialHeight(){return rsw.initialHeight},get initialWidth(){return rsw.initialWidth},get initialX(){return rsw.initialX},get initialY(){return rsw.initialY},get taskbar(){return rsw.usesAppbar}}
  }
  return sw
}
