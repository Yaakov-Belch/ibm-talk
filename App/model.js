import {editTree} from './tree.js';
export function say(x) {console.log(x); return x;}
const type='msg'; const version=1; const top=1;
const initialState={
  qid1:':q1',
  tree:{
    ':q1':{
      text: {type,version,path:[':q1','text'], data:'Question *title*'},
      score:{type,version,path:[':q1','score'],data:2},
      ':q1q':{
        text:{type,version,path:[':q1',':q1q','text'],top,data:'This is the *first* question'},
        ':q1qc1':{
          text:{type,version,path:[':q1',':q1q',':q1qc1','text'],data:'comment1'}
        },
        ':q1qc2':{
          text:{type,version,path:[':q1',':q1q',':q1qc2','text'],data:'comment2'}
        }
      },
      ':q1a1':{
        text:{type,version,path:[':q1',':q1a1','text'],data:'This is the first answer'},
        ':q1a1c1':{
          text:{type,version,path:[':q1',':q1a1',':q1a1c1','text'],data:'comment1'}
        },
        score:{type,version,path:[':q1',':q1a1','score'],data:2}
      },
      ':q1a2':{
        text:{type,version,path:[':q1',':q1a2','text'],data:'This is the second answer'},
        ':q1a2c1':{
          text:{type,version,path:[':q1',':q1a2',':q1a2c1','text'],data:'comment2'}
        }
      }
    },
    ':q2':{
      text: {type,version,path:[':q2','text'], data:'Question 2 *title*'},
      score:{type,version,path:[':q2','score'],data:1}
    },
    ':q3':{
      text: {type,version,path:[':q3','text'], data:'Question 3 *title*'},
      score:{type,version,path:[':q4','score'],data:3}
    }
    
  }
};

export function topReducer(state=initialState,action) {
  return {tree:editTree(state.tree,action), qid:editQid(state.qid,action)};
}

function editQid(qid,action) {
  if(action.type==='selectTopic') { return action.qid; }
  return qid;
}
