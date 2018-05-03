import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize'
import {createPost} from '../actions'
import { connect} from 'react-redux'


class Create extends Component {

	handleSubmit = (e) => {
		e.preventDefault()
		const { history } = this.props
		const values = serializeForm(e.target, {hash:true})
		//dispatch
		this.props.dispatch(createPost(values, ()=> {this.props.onDone()}));
	}

	render() {
	  return (
	  	<div>
	  	  <Link to='/'>Close</Link>
	  	  <form  onSubmit={this.handleSubmit}>
	  	    <div>
	  	      <input type='text' name='title' placeholder='Title'/>
	  	      <input type='text' name='body' placeholder='Body'/>
	  	      <input type='text' name='author' placeholder='Author'/>
	  	      <input type='text' name='category' placeholder='Category'/>
	  	      <button>Create Post</button>
	  	    </div>
	  	  </form>
	  	</div>	  
	)
	}
}

export default connect()(Create);
