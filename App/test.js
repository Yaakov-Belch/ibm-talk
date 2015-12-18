import {say} from './model.js';
import {modify, modiMap, readPath} from './modify.js';
import {lexicoComp,lexicoSort} from './lexico.js';

let ok=true;
function test_eq(a,b) {
  if(a===b) { say(['ok.']); }
  else { ok=false; say(['not ok.', a, b]); }
}
function test_jq(a,b) { test_eq(JSON.stringify(a),JSON.stringify(b)); }

let b1 =new Buffer('aaa');
let b2 =new Buffer('bbb');
let b22=new Buffer('bbb');
let b3 =new Buffer('bbbb');

test_eq(b2===b22, false);
test_eq(lexicoComp(b2,b22),0);
test_eq(lexicoComp(b1,b2), -1);
test_eq(lexicoComp(b2,b3), -1);
test_eq(lexicoComp(b3,b1),  1);

let d1=new Date('November 24 1973');
let d2=new Date(1973,10,24); // month ++
let d3=new Date;

test_eq(lexicoComp(d1,d2),0);
test_eq(lexicoComp(d1,d3),-1);
test_eq(lexicoComp(d3,d1), 1);
test_eq(lexicoComp(d1,1234),1);
test_eq(lexicoComp(d1,123456789012345),1);

test_eq(lexicoComp(1,2),-1);
test_eq(lexicoComp(2,2), 0);
test_eq(lexicoComp(2,1), 1);
test_eq(lexicoComp(undefined,null),-1);
test_eq(lexicoComp(NaN, NaN), 0);
test_eq(lexicoComp(1,NaN), -1);
test_eq(lexicoComp(NaN,1000), 1);

test_eq(lexicoComp([1,2,3,4],[1,2,3,4]),0);
test_eq(lexicoComp([1,2,3,4],[1,2,3]), 1);
test_eq(lexicoComp([1,2,3,4],[1,1,34,90]),1);

test_jq(lexicoSort([1,9,2,8,3,7,4,6,5]),[1,2,3,4,5,6,7,8,9]);

let state=modify(undefined,'hello','world');
test_jq(state,{hello:'world'});
test_eq(modify(state,'hello',undefined),undefined);
test_jq(modify(state,'yaakov','belch'),{hello:'world',yaakov:'belch'});
test_eq(modify(state,'hello','world'),state);

let s2=modiMap(state,['foo','bar'],x=>'foobar');
test_jq(s2,{hello:'world', foo:{bar:'foobar'}});
test_eq(readPath(s2,[]),s2);
test_jq(readPath(s2,['hello']),'world');
test_jq(readPath(s2,['foo']),{bar:'foobar'});
test_jq(readPath(s2,['foo','bar']),'foobar');
test_eq(readPath(s2,['foo','foo','foo']),undefined);

if(ok) { say('All tests passed.'); } else { say('Some tests failed.'); }
