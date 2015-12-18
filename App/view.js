import React, { PropTypes } from 'react';
import {} from './model.js';
import {
  tAPI, tText, tFormatted, tChildren, tId, tTop, tStyle, tScore, tEditable, tClassName, tPath
} from './tree.js';
import {readPath} from './modify.js';
import {connect} from 'react-redux';
// import TextArea from 'react-autosize-textarea';
import TextArea from 'react-textarea-autosize';

function tACount(tree,parent) {
  if(tTop(tree)) {
    let count=tChildren(parent).length-1;
    if(count===0) { count='No Answers.'; }
    else if(count===1) { count='One Answer:'; }
    else { count+=' Answers:'; }
    return <div className='aCount'>{count}</div>; 
  }
  return <span/>; 
}

// React component
class TopView extends React.Component {
  render() {
    const {tree, qid, api} = this.props;
    if(qid) {
      let topic=readPath(tree,[qid]);
      return (
        <div>
          <NavigBar api={api}/>
          <QAView parent={tree} tree={topic} api={api}/> 
          <span className="addAnswer" onClick={()=>api.addAnswer(topic,'Answer:')}>
            Add your answer.
          </span>
        </div>
      );
    } else { 
      return (
        <div>
          <NavigBar api={api}/>
          <ListView tree={tree} api={api}/>
          <span className='addQuestion' onClick={()=>api.addQuestion()}>
            Add your question
            </span>
        </div>
      );
    }
  }
};
// React component
class NavigBar extends React.Component {
  render () {
    const {api} = this.props;
    return (
      <div className='navig' onClick={()=>api.selectTopic()}>
        Simple Questions, Simple Answers
      </div>
    );
  }
}
// React component
class ListView extends React.Component {
  render () {
    const {tree, api} = this.props;
    return (
      <div className='listView'>
      {tChildren(tree).map(child=>
        <div className='listItem' key={tId(child)} onClick={()=>api.selectTopic(child)}>
          <span className='listScore'>{tScore(child)}</span>
          <div className="listFormatted" dangerouslySetInnerHTML={tFormatted(child)}/>
        </div>
      )}
      </div>
    );
  }
}
// React component
class QAView extends React.Component {
  render () {
    const {tree, parent, api } = this.props
    return (
      <div className={tClassName(tree)} style={tStyle(tree)}>
        <div className="header">
          <span className="editButton" onClick={ event=>api.toggleEdit(tree) }>~~</span>
          {(!tTop(tree)) &&
            <div className="score">
              <span className="chgScore" onClick={()=>api.editScore(tree,-1)}>&lt;&lt;</span>
              {tScore(tree)}
              <span className="chgScore" onClick={()=>api.editScore(tree,+1)}>&gt;&gt;</span>
            </div>
          }
          <div className="body">
            {tEditable(tree) && <TextArea value={tText(tree)} 
              onChange={ event=>api.editMsg(tree,event.target.value) }
            />}
            <div className="formatted" dangerouslySetInnerHTML={tFormatted(tree)}/>
          </div>
        </div>
        <div className="children">
          {tChildren(tree).map(child=>
            <QAView parent={tree} tree={child} key={tId(child)} api={api}/>
          )}
          <div>
          { (tPath(tree).length==2) &&
            <span onClick={()=>api.addAnswer(tree,'Comment:')}>...</span>
          }
          </div>
        </div>
        {tACount(tree,parent)}
      </div>
    );
  }
};
// Map Redux state to component props
function mapStateToProps (state) {
  return { tree:state.tree, qid:state.qid };
}

// Map Redux actions to component props
function mapDispatchToProps (dispatch) {
  return { api: tAPI(dispatch) };
};

// Connected Component
export let TreeApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopView);
