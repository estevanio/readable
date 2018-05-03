import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux'
import serializeForm from 'form-serialize'
import { editComment,fetchComments } from '../actions'

class CommentEdit extends Component {

	handleSubmit = (e) => {
		e.preventDefault()
		const { history } = this.props
		const values = serializeForm(e.target, {hash:true})
		//dispatch
		values.id= this.props.commentId
		this.props.dispatch(editComment(values, ()=> history.push(`/${this.props.category}/${this.props.parentId}`)));
	}

	componentDidMount(){
	  this.props.dispatch(fetchComments(this.props.parentId));
	}

	render() {
	return (
	  	<div>
	  	  <Link to='/'>Close</Link>
	  	  <div>
	  	  	{ this.props.comment &&
	  	  	<form  onSubmit={this.handleSubmit}>
	  	  	  <div>
	  	  	    <input type='text' name='body' defaultValue={this.props.comment.body}/>
	  	  	    <button>Update Comment</button>
	  	  	  </div>
	  	  	</form>}
	  	  </div>

	  	</div>	  
	  	)
	}

}

function mapStateToProps(state, ownProps) {
	let item = state.comments.comments.filter((c)=> c.id == ownProps.commentId)
    return { 
			comment: item[0]
    	 }
}

export default connect(mapStateToProps)(CommentEdit)