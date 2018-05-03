import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize'
import {editComment} from '../actions'
import { connect} from 'react-redux'

class Edit extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		const { id, history } = this.props
		const values = serializeForm(e.target, {hash:true})
		values.id= id;
		//dispatch
		this.props.dispatch(editComment(values, ()=> {history.push(`/`)}));
	}

	render() {
	return (
	  	<div>
	  	  <Link to='/'>Close</Link>
	  	  <div>
	  	  	{ this.props.comment &&
	  	  	<form  onSubmit={this.handleSubmit}>
	  	  	  <div>
	  	  	    <input type='text' name='title' defaultValue={this.props.comment.title}/>
	  	  	    <input type='text' name='body' defaultValue={this.props.comment.body}/>
	  	  	    <button>Update Comment</button>
	  	  	  </div>
	  	  	</form>}
	  	  </div>

	  	</div>	  )
	}
}

function mapStateToProps (state, ownProps){
	return {
		...ownProps,
		comment: state.comments.comments[ownProps.id]
	}
}
export default connect(mapStateToProps)(Edit);