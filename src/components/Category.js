import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux'
import PostList from './PostList'
import {deletePost, votePost} from '../actions'


class Category extends Component {
	delete = (i) => {this.props.dispatch(deletePost(i))}
	vote = (i, vote) => {this.props.dispatch(votePost(i, vote))}
	render() {
	  return (
		<div>
			<PostList posts={this.props.posts} onDelete={this.delete} vote={this.vote}></PostList>
		</div>
	  )
	}
}
function mapStateToProps(state, ownProps) {
	const posts = Object.keys(state.posts.posts).map(id=>{	
		return {...state.posts.posts[id]}
	}).filter(post=>post.category==ownProps.category)
	return {posts: posts}
}

export default connect(mapStateToProps)(Category);
