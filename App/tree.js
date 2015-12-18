import {say} from './model.js';
import {modify, modiMap, readPath, listPop, listLast} from './modify.js';
import {lexicoComp, lexicoSort} from './lexico.js';
import marked from 'marked';

// msg: {type:'msg', path,version,top,data}
// path: [question_id,answer_id,comment_id,data_id]
//   question_id, answer_id, comment_id start with ':'
//   data_id is one of: 'text', 'score'
// :q_id text       ==> title of question
// :q_id score      ==> question score
// :q_id :a_id text ==> question or answer text (question has top)

//+++ problem: chronological order of comments
function randomstring(n) {
  let s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(n).join().split(',').map(()=>s.charAt(Math.floor(Math.random() * s.length))).join('');
}
export function newId() { return ':'+randomstring(8); }
function isId(id) { return id.substring(0,1)===':'}
export function tScore(tree) { return readPath(tree,['score','data'])||0; }
export function tText (tree) { return readPath(tree,['text','data']); }
export function tTime (tree) { return readPath(tree,['text','time'])||1; }
export function tFormatted(tree) { return {__html:marked(tText(tree))}; }
export function tTop  (tree) { return readPath(tree,['text','top']); }
export function tPath (tree) { return listPop(readPath(tree,['text','path'])); }
export function tId   (tree) { return listLast(tPath(tree)); }

export function tChildren(tree) {
  let list=Object.keys(tree).filter(k=>isId(k)).map(k=>tree[k]);
  return lexicoSort(list,ch=>[tTop(ch),tScore(ch),-tTime(ch),ch]).reverse();
}

function tMsg(tree,list) {
  for(let k in tree) {
    if(isId(k)) { tMsg(tree[k],list); }
    else {list.push(tree[k]); }
  }
}
export function tMessages(tree) {
  let list=[]; tMsg(tree,list);
  return lexicoSort(list);
}

export function tSetTextAction(tree,data) {
  let {path,version,top,time}=tree.text||{};
  version=version||0; version++;
  return {type:'msg',path,version,top,data,time};
}
//++ process AddScore on the server.
export function tAddScoreAction(tree,delta) {
  let {path,version,data}=tree.score||{};
  path=path||[...tPath(tree),'score'];
  version=version||0; version++;
  data=data||0; data+=delta;
  return {type:'msg',path,version,data};
}
export function tAddAnswerAction(tree,data) {
  let path=[...tPath(tree),newId(),'text'];
  let time=+new Date();
  return {type:'msg',path,version:0, data, time};
}
export function tEditable (tree) { return readPath(tree,['zeditable','data']); }
export function tToogleEditableAction(tree) {
  let {path,version,data}=tree.zeditable||{};
  path=path||[...tPath(tree),'zeditable'];
  version=version||0; version++;
  data=!data;
  return {type:'msg',path,version,data,local:true};
}

function tSelectTopicAction(tree,id) {
  let qid=(tPath(tree)||[])[0]||id;
  return {type:'selectTopic', qid};
}

export function editTree(tree,action) {
  if(action.type==='msg') {
    let oldMsg=readPath(tree,action.path)||{};
    if(lexicoComp([oldMsg.version,oldMsg],[action.version,action])<0) {
      return modiMap(tree,action.path,()=>action);
    }
  }
  return tree;
}

const viewStyles=[
  {}, // above all questions --- not used
  { // Top QA page
  },
  { // Questions and answers
  },
  { // comments
  }
];
const questionStyle=Object.assign( {}, viewStyles[2], {});

export function tStyle(tree) {
  if(tTop(tree)) { return questionStyle; }
  else { return viewStyles[tPath(tree).length]; }
}

const classNames=['viewAll','viewTopic','viewQA','viewComment'];
export function tClassName(tree) {
  if(tTop(tree)) { return 'viewQA viewQuestion'; }
  else { return classNames[tPath(tree).length]; }
}

function tAddQuestionActions() {
  let qid=newId(); let time=+new Date();
  return [
    {type:'msg',path:[qid,'text'], version:0, data:'Title:', time},
    {type:'msg',path:[qid,':question','text'], version:0, data:'Question:',time, top:true},
    tSelectTopicAction(undefined,qid)
  ];
}
export function tAPI(dispatch) { return {
  editMsg:    (tree,data) =>dispatch(tSetTextAction (tree,data )),
  editScore:  (tree,delta)=>dispatch(tAddScoreAction(tree,delta)),
  toggleEdit: (tree)      =>dispatch(tToogleEditableAction(tree)),
  addAnswer:  (tree,data) =>dispatch(tAddAnswerAction(tree,data)),
  selectTopic:(tree)      =>dispatch(tSelectTopicAction(tree)),
  addQuestion:() => tAddQuestionActions().forEach(a=>dispatch(a))
}}