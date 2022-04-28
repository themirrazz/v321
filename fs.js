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
    return await blob.text();
  },
  toBlob:async function (path){
    var blob=new Blob([this.readbin(path).buffer]);
    return blob;
  },
  exists:async function (path){
    var volumeletter=path[0];
    var AllowedVolumes=['a', 'c'];
    if(AllowedVolumes.indexOf(volumeletter.toLowerCase())==-1){
      return false
    }
    if(!fs[dev].fileExists(path.slice(2))){
       return false
    }
    return true
  },
}
