export function copyObj(obj) {return Object.assign({}, obj);}
export function emptyObj(obj) {
  for(let key in obj) { return false; }
  return true;
}

export function modify(obj={},key,val,inplace){
  if(val !== undefined) {
    if(obj[key]===val) { return obj; }
    if(!inplace) { obj=copyObj(obj); }
    obj[key]=val;
    return obj;
  } else { // delete key from obj
    if(key in obj) {
      if(!inplace) { obj=copyObj(obj); }
      delete obj[key];
    }
    if(emptyObj(obj)) { return undefined; }
    return obj;
  }
}

export function modiMap(obj={},path,fn,inplace,i=0) {
  if(i>=path.length) { return fn(obj); }
  let key=path[i];
  return modify(obj,key,modiMap(obj[key],path,fn,inplace,i+1),inplace);
}

export function readPath(obj,path,i=0) {
  if(i>=path.length) { return obj; }
  return readPath((obj||{})[path[i]],path,i+1);
}

export function listPop(list=[]) { return list.slice(0,-1); }
export function listLast(list=[]) { return list[list.length-1]; }