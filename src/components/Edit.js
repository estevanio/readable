import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize'
import {updatePost} from '../actions'
import { connect} from 'react-redux'

class Edit extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		const { id, history } = this.props
		const values = serializeForm(e.target, {hash:true})
		values.id= id;
		//dispatch
		this.props.dispatch(updatePost(values, ()=> {history.push(`/`)}));
	}

	render() {
		console.log(this.props)
	return (
	  	<div>
	  	  <Link to='/'>Close</Link>
	  	  <div>
	  	  	{ this.props.post &&
	  	  	<form  onSubmit={this.handleSubmit}>
	  	  	  <div>
	  	  	    <input type='text' name='title' defaultValue={this.props.post.title}/>
	  	  	    <input type='text' name='body' defaultValue={this.props.post.body}/>
	  	  	    <input type='text' name='body' defaultValue={this.props.post.body}/>
	  	  	    <button>Update Post</button>
	  	  	  </div>
	  	  	</form>}
	  	  </div>

	  	</div>	  )
	}
}

function mapStateToProps (state, ownProps){
	console.log(ownProps);
	console.log(state)
	return {
		...ownProps,
		post: state.posts.posts[ownProps.id]
	}
}
export default connect(mapStateToProps)(Edit);