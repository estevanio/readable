import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux'
import {fetchComments, fetchPosts, voteComment, deleteComment, addComment, votePost, deletePost} from '../actions'
import serializeForm from 'form-serialize'

class Post extends Component {

	componentDidMount(){
	  this.props.dispatch(fetchComments(this.props.postid));
	}
	voteComment = (c,v) =>{
		this.props.dispatch(voteComment(c,v));
	}
	deleteComment = c =>{
		this.props.dispatch(deleteComment(c))
	}

	vote = (vote) => {this.props.dispatch(votePost(this.props.post, vote))}

	delete = ()=>{this.props.dispatch(deletePost(this.props.post))}

	handleSubmit = (e) => {
		e.preventDefault()
		const id  = this.props.postid
		const values = serializeForm(e.target, {hash:true})
		values.parentId= id;
		//dispatch
		this.props.dispatch(addComment(values));
	}

	render() {
		const { post, comments } = this.props

		if ( !post || post.deleted) {
		  return <p>404 Error</p>
		}
	  return (
	  	<div>
	    {post && 
	    	<div>
	    	<h1>{post.title}</h1>
			<p>Body: {post.body}</p>	
			<p>Category : {post.category}</p>
			<p>Author: {post.author}</p>
			<p>Comment Count: {post.commentCount}</p>
			<p>Current Score: {post.voteScore}</p>
			<button onClick={()=>{this.vote('upVote')}}> UpVote </button>
			<button onClick={()=>{this.vote('downVote')}}> DownVote </button><br/>
			<Link to={`/${post.category}/${post.id}/edit`}>
	            Edit
	  		</Link>
	  		<button onClick={()=>{this.delete()}}> Delete Post </button><br/>
	    	</div> 
	    }
		<hr/>
		<div>
		{comments && post &&
			<ul>
				<hr/>
				{comments.map((i) => (
					i.deleted ||
					<li key={i.id}>
					<button onClick={()=>{this.voteComment(i, 'upVote')}}> UpVote </button>
					<button onClick={()=>{this.voteCcomment(i, 'downVote')}}> DownVote </button><br/>
					<b>Body</b>{i.body} <b> Author </b>{i.author} <br/>
					 <b> Score</b>{i.voteScore} <br/>
			  		<Link to={`/${post.category}/${post.id}/${i.id}/edit`}><button>Edit</button></Link>
			  		<button onClick={()=>{this.deleteComment(i)}}> Delete </button>
			  		<hr/>
					</li>

				))}
			</ul>
			}
		</div>
		<div>
			{post &&
			<form  onSubmit={this.handleSubmit}>
			  <div>
			    <input type='text' name='author' placeholder='author'/>
			    <input type='text' name='body' placeholder='body'/>
			    <button>Add Comment</button>
			  </div>
			</form>}
		</div>
	    </div>

	    
	  )
	}
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts.posts[ownProps.postid],
			comments: state.comments.comments
    	 }
}

export default connect(mapStateToProps)(Post);