(async function(fp,op){
var selfCmd="";
var V3NotifyIcon = class V3NotifyIcon {
  ni;
  onclick;
  ondblclick;
  notifyEl;
  constructor({ tooltip, iconUrl, onclick, ondblclick }) {
    this.onclick = onclick;
    this.ondblclick = ondblclick;
    this.iconUrl = iconUrl;
    const ni = this.ni = new NotifyIcon('v321_ni_' + Date.now(), iconUrl);
    this.notifyEl = ni.notifyElement;
    ni.onclick = (...args) => this.onclick(...args);
    ni.ondblclick = (...args) => this.ondblclick(...args);
  }
  setIcon(url) {
    this.ni.setIcon(url);
  }
};
var fakewin={
  toString:function(){},
    util:{wait:function(ms){return new Promise(function(y,n){setTimeout(function(){y()},ms);})},
         rand:function(a,b){
           var c=b-a;
           var d=Math.floor(Math.random()*c)
           return d-a;
         }},
  FSUtil:{},
  fstype:{},
  sysConf:{},
  state: { processes: [] },
  ui:{
    MsgBoxSimple: {
      error:function(){
        return w96.ui.commdlg.msgboxSimple.error(...arguments);
      },
      info:function(){
        return w96.ui.commdlg.msgboxSimple.info(...arguments);
      },
      warning:function(){
        return w96.ui.commdlg.msgboxSimple.warning(...arguments);
      },
      status:function(){
        return w96.ui.commdlg.msgboxSimple.status(...arguments);
      },
      confirm:function(a,b,c){
        return w96.ui.commdlg.confirm("ask.???",a,c||'question',undefined,function(){b(true);});
      },
      prompt:function(){
        return w96.ui.commdlg.prompt(...arguments);
      },
    },
    Theme:{
      getIconUrl:async function getIconUrl(icon){
        var ico=icon;
        if(ico==="mime/bin-data"){
          ico='binary';
        }
        if(ico==="mime/css"){
          ico='css';
        }
        if(ico==="actions/delete"){
          ico='dynamite';
        }
        if(ico==="apps/discord"){
          ico='discord';
        }
        return w96.desktop_shell.getIconUrl(ico);
      }
    },
    DialogCreator:{alert:V3Alert}
  },
  WindowParams: class WindowParams extends Object{
    constructor(a,b,c,d,e){
      super(a,b,c,d,e)
      this.title="Untitled Window";
      this.body="this is where ur crap goes"
    }
  },
  shell: {
    mkShortcut: function(path,icon,cmd) {
      w96.desktop_shell.createShortcut(
        path,
        icon,
        cmd
       )
    },
    NotifyIcon: V3NotifyIcon,
    Taskbar: {
      /**
       * 
       * @param {V3NotifyIcon} trayIcon
       */
      registerNotifyIcon: trayIcon => {
        w96.desktop_shell.registerNotifyIcon(trayIcon.ni);
      }
    }
  },
  sys:{
    reboot:function(){location.reload()},
    renderBSOD:function(message){
      w96.bsod(message)
    },
    execCmd: async function (cmd,args){
      args=args||[]
      if(selfCmd&&cmd==selfCmd){
    var f$=eval(`(async function(w96,WApplication,StandardWindow,FS,alert,window){
${await fakewin.FS.readstr(fp)}
})`);
f$.call({
  boxedEnv:{args:[cmd,...args]}
},fakewin,fakewin.WApplication,fakewin.StandardWindow,fakewin.FS,V3Alert).then(console.info).catch(function(e){
  alert(e.name+":"+e.message);
},{
get navigator() {return window.navigator},
w96: fakewin
});
      } else if(cmd==="md") {
        w96.apps_builtin.markdownViewer.start(
          args[0].slice(2),
          fs.resolveByPrefix(args[0][0].toLowerCase()+":")
        );
      } else if(cmd=="img") {
        w96.apps_builtin.imageViewer.start(
          args[0].slice(2),
          fs.resolveByPrefix(args[0][0].toLowerCase()+":")
        );
      } else if(cmd=="html"){
        try {
          new URL(args[0]);
          w96.apps_builtin.htmlViewer.start(args[0],"SaulGoodMan.com",true)
        }catch(e){
          w96.apps_builtin.markdownViewer.start(
          args[0].slice(2),
          fs.resolveByPrefix(args[0][0].toLowerCase()+":")
        );
        }
      } else if(cmd=="explorer") {
        w96.apps_builtin.explorer.start(
          args[0].slice(2),
          fs.resolveByPrefix(args[0][0].toLowerCase()+":")
        );
      } else if(fakewin.FS.exists(args[0])){
        w96.execFile(args[0].slice(2),fs.resolveByPrefix(args[0][0].toLowerCase()+":"))
      } else {
        w96.desktop_shell.exec("win96://"+cmd);
      }
    }
  }  
}
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
    this.windows=[]
    console.log("my app is awesomeyeeeeee");
  }
  async main(argv) {
    console.log("ARRRRRRGH! "+argv);
  }
  createWindow(params){
    var sw=new fakewin.StandardWindow(params);
    this.windows.push(sw);
    return sw
  }
  terminate() {
    this.windows.forEach(w => {
      try { w.close() } catch (e) { console.warn(e) }
    });
  }
}


var $BaseFS=function BaseFileSystem(prefix) {
  this.prefix=prefix
  var fs$=new fileSystem(prefix,false);
  this.selfFs=fs$;
  this.driverName="idbfs";
  this.remote=false;
  this.readOnly=false;
  Object.defineProperty(this,'volumeLabel',{
    get:function(){
      return this.selfFS.label
    },
    set:function(bruh){
      this.selfFS.label=bruh
    }
  })
}






var $IdbFS=function IndexedFileSystem(prefix) {
  this.prefix=prefix
  var fs$=new baseFileSystem(prefix,false);
  this.selfFs=fs$;
  this.driverName="idbfs";
  this.remote=false;
  this.readOnly=false;
  Object.defineProperty(this,'volumeLabel',{
    get:function(){
      return this.selfFs.label
    },
    set:function(bruh){
      this.selfFs.label=bruh
    }
  })
}

var $ZipFS=function ZipReadOnlyFileSystem(prefix,path) {
  this.prefix=prefix
  var that=this
  fakewin.FS.readbin(path).then(async function(bin){
    var def=new JSZip();
    var zip=await def.loadAsync(bin);
    var k=Object.keys(zip.files);
    var yT={};
    for(var n=0;n<k.length;n++){
      var p=k[n];
      var f=zip.files[p];
      yT['/'+p]="%:BIN"+btoa(Uint8ToString(await f.async('uint8array')))
    }
  var fs$=new readOnlyFileSystem(prefix,{fs:yT});
  that.selfFs=fs$;})
  this.driverName="idbfs";
  this.remote=false;
  this.readOnly=false;
  Object.defineProperty(this,'volumeLabel',{
    get:function(){
      return this.selfFs.label
    },
    set:function(bruh){
      this.selfFs.label=bruh
    }
  })
}


var $LocalFS=function LocalStorageFileSystem(prefix) {
  this.prefix=prefix
  var fs$=new fileSystem(prefix,false);
  this.selfFs=fs$;
  this.driverName="localfs";
  this.remote=false;
  this.readOnly=false;
  Object.defineProperty(this,'volumeLabel',{
    get:function(){
      return this.selfFs.label
    },
    set:function(bruh){
      this.selfFs.label=bruh
    }
  })
}


var $RamFS=function RamFileSystem(prefix) {
  this.prefix=prefix
  var fs$=new ramFileSystem(prefix,false);
  this.selfFs=fs$;
  this.driverName="ramfs";
  this.remote=false;
  this.readOnly=false;
  Object.defineProperty(this,'volumeLabel',{
    get:function(){
      return this.selfFs.label
    },
    set:function(bruh){
      this.selfFs.label=bruh
    }
  })
}

fakewin.fstype.RamFileSystem=$RamFS
fakewin.fstype.IndexedFileSystem=$IdbFS
  fakewin.fstype.ZipReadOnlyFileSystem=$ZipFS
  fakewin.fstype.LocalStorageFileSystem=$LocalFS
  fakewin.fstype.BaseFileSystem=$BaseFS
SomeV3App.execAsync=function(a,b){
  eval(`(async function(w96,WApplication,argv ,StandardWindow,FS,alert){
   a.main(argv);
})`)(fakewin,SomeV3App,b,fakewin.StandardWindow,fakewin.FS,V3Alert);
}
 fakewin.WApplication=SomeV3App
fakewin.WRT={  
run:async function(a,b){
  eval(`(async function(w96,WApplication,argv ,StandardWindow,FS,alert){
   (function(current,env){
${a}
}).call(argv,argv,argv.boxedEnv)
})`)(fakewin,SomeV3App,b,fakewin.StandardWindow,fakewin.FS,V3Alert);
}
}
  
function V3ContextMenu(items) {
  this.$$DEFAULTITEMS$$=items;
  this.menuCounter=0;
}
 
 function mysafeeval(f,argv){
  eval(`(async function(w96,WApplication,argv){
   f()
})`)(fakewin,SomeV3App,f,argv||[]);
 };
  
  
  function V3Alert(msg,bruh){
    var args={title:'Alert',icon:'info',buttons:[{text:'OK',onclick:function(){mbx.closeDialog()}}]}
    try{args.title=bruh.title||args.title;args.icon=bruh.icon||args.icon;args.buttons=bruh.buttons||args.buttons}
    catch(e){null}
    var mbx=new w96.ui.commdlg.MessageBox(
      args.title,
      msg,
      args.icon,
      "OK",
      null
    );
    var bta=mbx.dlg.window.querySelector('.mbox-buttonsgroup');
    bta.classList.add("buttons");
    bta.innerHTML="";
    var ob={close:function(){mbx.dlg.close()},get wnd(){return w96.util.Swgen(mbx.dlg)},params:args,}
    for(var i=0;i<args.buttons.length;i++){
      var bte=document.createElement('button');
      bte.className='w96-button clicky-thingy ported-v321-butt';
      bte.innerText=args.buttons[i].text;
      (function (y,rg){
      y.onclick=function(){rg.onclick.call(ob)}
      })(bte,args.buttons[i])
      bta.appendChild(bte)
    }
    mbx.dlg.show()
    return ob
  }
  
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
  fakewin.ui.ContextMenu=V3ContextMenu;
  
  
  
var Ini36 = {
  stringify: function(o) {
    var res="\n";
    var k=Object.keys(o);
    for(var i=0;i<k.length;i++){
      var g=k[i];
      var x=o[k];
      res+=("["+g+"]\n");
      var f=Object.keys(x);
      for(var z=0;z<f.length;z++){
        res+=(f[z]+"="+x[f[z]]+"\n")
      }
    }
    return res
  },
  parse:function(f){
    var ini={};
    var wsp=f.split("\n");
    var g='';
    for(var i=0;i<wsp.length;i++){
      var x=wsp[i];
      if(x[0]=='['&&x[x.length-1]==']'){
        g=x.slice(1,x.length-1);
        ini[x.slice(1,x.length-1)]={};
      } else if(x.indexOf('=')>-1){
        ini[g][x.split("=")[0]]=x.split("=")[1]
      }
    }
    return ini
  }
};
 fakewin.util.INI=Ini36;
  
  
/*
Todo: convert the V1 fs to V2
*/

  
 
fakewin.FS={
  mounts:function(){
    var mks=Object.keys(fs);
    var arr=[]
    for(var i=0;i<mks.length;i++){
      var mk=mks[i];
      if(mk!==undefined){
      if(mk!=="resolveByPrefix"){
        var cfs=fs[mk];
        if(cfs instanceof ramFileSystem){
          var bruh=new fakewin.fstype.RamFileSystem(cfs.prefix);
        } else {
          var bruh=new fakewin.fstype.IndexedFileSystem(cfs.prefix);
        }
        bruh.selfFs=cfs;
        arr.push(bruh);
      }
      }else{arr.push(null)}
    }
    return arr
  },
  mount:function(drive){
    if(fs.resolveByPrefix(drive.prefix)){return}
    var fsid=0;
    while(true){
      if(!fs["v3Port-Mounted-FS-"+fsid]) {break}
      fsid++;
    }
    fs['v3Port-Mounted-FS-'+fsid]=drive.selfFs;
  },
  toURL: async function (path) {
    const blob = await this.toBlob(path);
    const url = URL.createObjectURL(blob);
  },
  readbin:async function (path){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
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
    var str=fs[dev].getFileContents(path.slice(2));
    if(this.isBinary(path)){
      str=atob(str);
    }
    var arr=[];
    for(var i=0;i<str.length;i++){
      arr.push(str.charCodeAt(i));
    }
    window.console.log(arr)
    return new Uint8Array(arr);
  },
  isBinary:function path(e){
    return String(fs[fs.resolveByPrefix(e[0].toLowerCase()+":")].storage.getItem(e)).slice(0,5)=="%:BIN"
  },
  readstr:async function (path){
    var blob=new Blob([(await this.readbin(path)).buffer]);
    return await blob.text();
  },
  toBlob:async function (path){
    var blob=new Blob([(await this.readbin(path)).buffer]);
    return blob;
  },
  readdir:async function(path){
    var res=[];
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    };
    for(var i=0;i<localStorage.length;i++){
      if(path==volumeletter+":"+fs[dev].getParentPath(localStorage.key(i).slice(2))){
         res.push(localStorage.key(i))
      }
    }
    return res
  },
  exists:async function (path){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      return false
    };
    if(fs[dev].fileExists(path.slice(2))){
       return true;
    };
    if(fs[dev].dirExists(path.slice(2))){
       return true;
    };
    return false;
  },
  mkdir:async function(path){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
    fs[dev].createNewFolder(path.slice(2))
  },
  writestr: async function(path,data){
    var arr=[];
    for(var i=0;i<data.length;i++){
      arr.push(data.charCodeAt(i));
    }
    this.writebin(path,arr);
  },
  writebin: async function(path,data){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
    if(!this.exists(path)){this.touch(path)}
    fs[dev].writeBinaryFile(path.slice(2),new Uint8Array(data.buffer||data));
  },
  touch: async function(path){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
    fs[dev].createEmptyFile(path);
  },
  cpfile:async function(path,dest){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
    fs[dev].writeFile(
      dev.slice(2),
      fs[dev].storage.getItem(path),
    )
  },
  cpdir:async function(path,dest){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
    fs[dev].copyDir(
      dev.slice(2),
      dest.slice(2),
    )
  },
  mvdir:async function(path,dest){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
    fs[dev].moveDir(
      dev.slice(2),
      dest.slice(2),
    )
  },
  mvfile:async function(path,dest){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
    fs[dev].moveFile(
      dev.slice(2),
      dest.slice(2),
    )
  },
  rm:async function(path,dest){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
    fs[dev].deleteFile(
      dev.slice(2),
      dest.slice(2),
    )
  },
  rmdir:async function(path,dest){
    var volumeletter=path[0].toLowerCase();
    var AllowedVolumes=['a', 'c'];
    var volumes={'a':'floppy_a','c':'main'};
    var dev=fs.resolveByPrefix(volumeletter.toLowerCase()+":");
    if(!dev){
      throw {
        name: 'FSErrno',
        message:'ENODEV: '+path.slice(2)+': No such device'
      }
    }
    fs[dev].deleteDir(
      dev.slice(2),
      dest.slice(2),
    )
  },
  // c:/local/discord/app/discord.js
  umount:function(prefix){
    setTimeout(function(){
    var dev=fs.resolveByPrefix(prefix.toLowerCase());
    if(fs[dev]){fs[dev]=undefined;delete fs[dev]}
    },100);
  }
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
    close:function(){rsw.close()},
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
    params:{title:'a title',body:'bruh do you really need this',get initialHeight(){return rsw.initialHeight},get initialWidth(){return rsw.initialWidth},get initialX(){return rsw.initialX},get initialY(){return rsw.initialY},get taskbar(){return rsw.usesAppbar}},
    getBodyContainer:function(){return this.wndObject.querySelector(".window-html-content");}
  };
  return sw;
};
  
var UiToolbar=function () {
  var gX=this.selfElem=document.createElement("div");
  gX.className="w96-toolbar";
};
  
UiToolbar.prototype.addItem=function(o){
  var name=o.name;var text=o.text;var imageUrl=o.imageUrl;var onclick=o.onclick;
  var gX=this.selfElem;
  var nZ=document.createElement("div");
  nZ.style.display='inline-flex';
  nZ.style.flexDirection="row";
  var iO=document.createElement('img');
  iO.src=imageUrl;
  iO.style.height='24px';
  iO.style.width='24px';
  nZ.appendChild(iO);
  var yP=document.createElement('span');
  yP.innerText=text;
  nZ.appendChild(yP);
  nZ.setAttribute("fgbruh",name||'A');
  nZ.onclick=function(){V3Alert('why')}
  gX.appendChild(nZ);
}
  UiToolbar.prototype.addSeparator=function(){
    var sep=document.createElement('div');
    sep.style.display='inline-block';
    sep.style.border='1px solid black';
    sep.innerText="seperatirrr";
    this.selfElem.appendChild(sep);
}
  
  UiToolbar.prototype.getElement=function(){return this.selfElem}
  
  if(!fakewin.ui.components){fakewin.ui.components={}}
  fakewin.ui.components.ToolBar=UiToolbar;
  

var indexes={};
var data={};



var scmGetIndex=function(idx) {
  for(var i=0;i<indexes.length;i++){
    if(!indexes[i]){continue}
    if(indexes[i].name==idx){
      return indexes[i];
    }
  }
  return null;
};

var scmGet=function(path) {
  var spl=path.split("/");
  var obx=null;
  if(spl.length<1){
    return obx;
  }
  if(!scmGetIndex(spl[0])) {
    return obx
  }
  obx=data[scmGetIndex(spl[0]).id];
  for(var i=1;i<spl.length;i++) {
    if(obx[spl[i]]){
      obx=obx[spl[i]];
    } else {
      return obx
    }
  }
}

var scmLoad=async function(){
  indexes=JSON.parse(await fakewin.FS.readstr("C:/system/config/SCM/index")).indexes;
  for(var i=0;i<indexes.length;i++){
    var idx=indexes[indexes[i]];
    if(!idx){continue}
    if(!idx.id){continue}
    data[idx.id]=JSON.parse(await fakewin.FS.readstr("C:/system/config/SCM/"+idx.id)).data;
  }
}

// The 36-bit system "portal"
var Sys36={
  causeRel1ToBlueScreen:function(bsod_message){
    try {
      return {
        status:'portld',
        massage:w96.bsod(bsod_message)
      }
    }catch(er){
      return {
        status: 'portal_failed',
        massage:er
      }
    }
  }
}

var scmSyncRoot=async function (e) {
  var root=scmGetIndex(e);
  if(!root){return}
  if(root.psuedo){return}
  if(root.name!==e){return}
  await fakewin.FS.writestr("C:/system/config/SCM/"+root.id,JSON.stringify(data[root.id]));
}

var scmSync=async function() {
  await fakewin.FS.writestr("C:/system/config/SCM/index",JSON.stringify({
    ver:1,
    indexes:indexes
  }));
  for(var i=0;i<indexes.length;i++){
    try{
      await scmSycnRoot(indexes.name)
    }catch(e){null}
  }
}

var scmIsKey=function g(y){return typeof y==="object"&&y!==null&&y!==undefined}


var scmLs=function(s){
  var scmx=scmGetIndex(s);
  if(s==""){
    var idxarr=[];
    for(var i=0;i<indexes.length;i++){
      idxarr.push({type:'root',name:indexes[i].name})
    }
    return idxarr;
  }
  if(!scmx){
    return [];
  }
  if(scmIsKey(scmx)) {
    return [];
  }
  var keys=Object.keys(scmx);
  var arr=[];
  for(var i=0;i<keys.length;i++){
    var key=keys[i];
    var idx=scmx[key];
    if(scmIsKey(idx)){
      arr.push({type:'key',name:key});
    } else {
      arr.push({type:'value',name:key});
    }
  }
  return arr;
}

var scmSet=function(e,t){
  var idx=scmGetIndex(e.split("/")[0]);
  if(!idx){return false}
  var spl=e.split("/");
  var k="idx";
  if(spl.length<1){return false}
  for(var i=0;i<spl.length;i++){
    k+="["+JSON.stringify(spl[i])+"]";
  }
  try{
    eval(k+"=t");
  }catch(e){return false}
  scmSync().then(Sys36.Noop).catch(Sys36.Noop);
}

var scmDel=function(e,t){
  var idx=scmGetIndex(e.split("/")[0]);
  if(!idx){return false}
  var spl=e.split("/");
  var k="idx";
  if(spl.length<1){return false}
  for(var i=0;i<spl.length;i++){
    k+="["+JSON.stringify(spl[i])+"]";
  }
  try{
    eval("delete "+k);
  }catch(e){return false}
  scmSync().then(Sys36.Noop).catch(Sys36.Noop);
}

var scmNewRoot=function(e,t){
  var root={name:name,id:Object.keys(indexes).length,description:e||"",pseudo:!1};
  var dat={quota:{maxSize:1048576},data:{}};
  data[root.id]=dat;
  indexes.push(root);
  scmSync().then(Sys36.Noop).catch(Sys36.Noop);
};

fakewin.sysConf={
  createRoot:scmNewRoot,
  syncAll:scmSync,
  syncRoot:scmSyncRoot,
  get:scmGet,
  getIndex:scmGetIndex,
  remove:scmDel,
  removeAndSync:scmDel,
  set:scmSet,
  setAndSync:scmSet,
  ls:scmLs,
  loadAll:scmLoad
}

var fake_gthis = {get navigator(){return window.navigator},w96:fakewin};
var gt_proxy = new Proxy(window, {
  get(k, p) {
    return fake_gthis[p] || window[p]
  },
  set(k, p, v) {
    fake_gthis[p] = v
  }
});


try{
  await scmLoad();
}catch(e){null}

  var $$USEWRT$$=confirm('Run as wrt?')
  if($$USEWRT$$){
    var $$ARGSSTR$$=prompt("Arguments (split by space)");
    selfCmd=prompt("Command name:");
    $$ARGSSTR$$=selfCmd+" "+$$ARGSSTR$$;
    var $$ARGS$$=$$ARGSSTR$$.split(" ");
    var f$=eval(`(async function(w96,WApplication,StandardWindow,FS,alert){
/*let window = {w96:w96, navigator: globalThis.navigator, window: globalThis.window, localStorage: globalThis.localStorage, indexedDb: globalThis.indexedDb, document: globalThis.document, Document: globalThis.document, get fetch() { return globalThis.fetch }, set fetch(an) {return globalThis.fetch = an }, XMLHttpRequest: XMLHttpRequest, Object: Object}*/;
${await fakewin.FS.readstr(fp)}
})`);
f$.call({
  boxedEnv:{args:$$ARGS$$}
},fakewin,fakewin.WApplication,fakewin.StandardWindow,fakewin.FS,V3Alert,gt_proxy).then(console.info).catch(function(e){
  alert(e.name+":"+e.message);
},{get navigator(){return window.navigator},w96:fakewin});
  }else{

var f$=eval(`(async function(w96,alert,WApplication,StandardWindow,FS){
${await fakewin.FS.readstr(fp)}
})`);
f$(fakewin,V3Alert,undefined,undefined,undefined,gt_proxy).then(console.info).catch(function(e){
  alert(e.name+":"+e.message);
});
//c:/local/discord/app/discord.js
  
  }

  

})(prompt("BRUH FILE NAME")).then(console.info).catch(function(e){alert(e.name+":"+e.message)});
