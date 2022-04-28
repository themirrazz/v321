(async function(fp){
var fakewin={
  toString:function(){},
  util:{},
  ui:{
    get MsgBoxSimple(){return w96.ui.commdlg.msgboxSimple}
  },
  shell: {
    mkShortcut: function(xUNUSED_1,icon,cmd) {
      w96.desktop_shell.addIcon(
        cmd,
        icon,
        20,
        20,
        function(){w96.ui.commdlg.msgboxSimple.error("Error", "You are doing this wrong.", 'wat')}
      )
    }
  }
};
  fakewin.ui.MenuBar=V3MenuBar;
  
  function V3MenuBar(){
    var el=document.createElement('div');
    this.menuElement=el;
  };
  V3MenuBar.prototype.getMenuDiv=function(){return this.menuElement}
  V3MenuBar.prototype.addRoot=function(label,ctx){
    var cm=new V3ContextMenu(ctx);
    var e=document.createElement('span');
    e.innerText=label;
    e.onclick=function(e){
      cm.renderMenu(e.clientX,e.clientY);
    }
    this.menuElement.appendChild(e);
  }
  
var SomeV3App=class {
  constructor(){
    console.log("my app is awesomeyeeeeee");
  }
  async main(argv) {
    console.log("ARRRRRRGH! "+argv);
  }
}

SomeV3App.execAsync=function(a,b){
  eval(`(async function(w96,SomeV3App,argv){
   a.main(argv);
})`)(fakewin,SomeV3App,b);
}
 fakewin.WApplication=SomeV3App;

  
function V3ContextMenu(items) {
  this.$$DEFAULTITEMS$$=items;
  this.menuCounter=0;
}
 
 function mysafeeval(f,argv){
  eval(`(async function(w96,SomeV3App,argv){
   f()
})`)(fakewin,SomeV3App,f,argv||[]);
 };
  
  
V3ContextMenu.prototype.renderMenu=function(x,y,opitems){
  var items=opitems||this.$$DEFAULTITEMS$$;
  var menudiv=document.createElement("div");
  menudiv.style.position="fixed";
  menudiv.style.top=y+"px";
  menudiv.style.left=x+"px";
  menudiv.style.backgroundColor="grey";
  menudiv.style.fontSize='18px';
  menudiv.style.color='black';
  menudiv.style.width="80px";
  menudiv.style.zIndex="99999999999999999999999999999999999999999";
  for(var i=0;i<items.length;i++){
    var itm=items[i];
    var mie=document.createElement("div");
    if(i<items.length-1){mie.style.borderBottom='1px solid black'}
    mie.style.width="100%";
    mie.style.overflow='hidden';
    mie.innerText=items[i].label;
    (function (bruh,e){
    e.onclick=function(){
      mysafeeval(bruh.onclick);
    }
    })(itm,mie);
    menudiv.appendChild(mie);
  }
  document.querySelector('.desktop').appendChild(menudiv);
  var eDer=true;
  setTimeout(function(){
  window.addEventListener('click',function(){
    if(eDer){eDer=false;
             menudiv.parentNode.removeChild(menudiv);
    }
  });
  },100);
  return menudiv
}
  
/*
Todo: convert the V1 fs to V2
*/

fakewin.FS={
  readbin:async function (path){
    var volumeletter=path[0];
    var dev;
    var AllowedVolumes=['a', 'c'];
    var Volumes={"a":'floppy_a',"c":'main'};
    if(AllowedVolumes.indexOf(volumeletter.toLowerCase())==-1){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
    dev=Volumes[path[0]];
    if(!fs[dev].fileExists(path.slice(2))){
       throw {
         name:'FSErrno',
         message:'ENONT: '+path.slice(2)+': No such file'
       };
    }
    if(!fs[dev].isFile(path.slice(2))){
      throw {
        name: 'FSErrno',
        message: 'ENONT: '+path.slice(2)+": Is a directory"
      }
    }
    var str=fs.getFileContents(path.slice(2));
    if(str.indexOf("%:BIN")==0){
      str=str.slice(5);
      str=atob(str);
    }
    var arr=[];
    for(var i=0;i<str.length;i++){
      arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
  },
  readstr:async function (path){
    var blob=new Blob([this.readbin(path).buffer]);
    return fs.main.getFileContents(path.slice(2));
    return await blob.text();
  },
  toBlob:async function (path){
    var blob=new Blob([this.readbin(path).buffer]);
    return blob;
  },
  readdir:async function(path){
    var res=[];
    var volumeletter=path[0];
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev="";
    if(AllowedVolumes.indexOf(volumeletter.toLowerCase())==-1){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    };
    dev=volumes[volumeletter]||"main";
    for(var i=0;i<localStorage.length;i++){
      if(path==fs[dev].getParentPath(localStorage.key(i).slice(2))){
         res.push(localStorage.key(i))
      }
    }
    return res
  },
  exists:async function (path){
    var volumeletter=path[0];
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev="";
    if(AllowedVolumes.indexOf(volumeletter.toLowerCase())==-1){
      return false
    };
    dev=volumes[volumeletter]||"main";
    if(fs[dev].fileExists(path.slice(2))){
       return true;
    };
    if(fs[dev].dirExists(path.slice(2))){
       return true;
    };
    return true
  },
};
fakewin.StandardWindow=function(args){var msw=fakewin.util.Swgen(new StandardWindow(args.title,args.initialWidth,args.initialHeight,args.initialX,args.initialY,args.resizable,args.minHeight,args.minWidth,args.taskbar,"A random v3 app on v1 mwa",false));msw.setHtml(args.body);return msw;}
fakewin.WindowSystem={
  get windows(){ var rws=(function(){}).constructor("return window.w96")().windowSystem.windows;var x=[];for(var i=0;i<rws.length;i++){try{x.push(fakewin.util.Swgen(rws[i]))}catch(e){x.push(null)}};return x},
  closeAllWindows:function(){for(var i=0;i<this.windows.length;i++){try{this.windows[i].close()}catch(e){null}}}
};
fakewin.util.Swgen=function(rsw){
  var sw={
    $sw:rsw,
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
    setHtml:function(bruh){this.$sw.setHtmlContent(bruh)},
    setSize:function(w,h){this.$sw.setSize(w,h);},
    setWindowIcon:function(url){this.$sw.setWindowIcon(url,true);},
    showTitlebarMenu:function(){(function(){}).constructor("return window.w96")().ui.commdlg.msgboxSimple.error('bruh','bruh you should know v1 doesn\'t have titlebar menu', 'wat');},
    params:{title:'a title',body:'bruh do you really need this',get initialHeight(){return rsw.initialHeight},get initialWidth(){return rsw.initialWidth},get initialX(){return rsw.initialX},get initialY(){return rsw.initialY},get taskbar(){return rsw.usesAppbar}}
  };
  return sw;
};
  
  var $$USEWRT$$=confirm('Run as wrt?')
  
  if($$USEWRT$$){
    var $$ARGSSTR$$=prompt("Arguments (split by space)");
    $$ARGSSTR$$=prompt("Command name:")+" "+$$ARGSSTR$$;
    var $$ARGS$$=$$ARGSSTR$$.split(" ");
    var f$=eval(`(async function(w96,WApplication){
${fs.main.getFileContents(fp)}
})`);
f$.call({
  boxedEnv:{args:$$ARGS$$}
},fakewin,fakewin.WApplication).then(console.info).catch(function(e){
  alert(e.name+":"+e.message);
});
  }else{

var f$=eval(`(async function(w96,WApplication){
${fs.main.getFileContents(fp)}
})`);
f$(fakewin).then(console.info).catch(function(e){
  alert(e.name+":"+e.message);
});
  
  }

  

})(prompt("BRUH FILE NAME")).then(console.info).catch(function(e){alert(e.name+":"+e.message)});
