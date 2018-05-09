import * as API from '../utils/Api'
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const POST_UPDATE = 'POST_UPDATE'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const COMMENT_ADDED = 'COMMENT_ADDED';

export const  receivePosts  = (data) => {
	return {
		type: RECEIVE_POSTS,
		payload: data
	};
}
export const  requestPosts  = () => {
	return {
		type: REQUEST_POSTS
	};
}
export const fetchPosts = ()=> (dispatch) => {
	dispatch(requestPosts());
	API.posts().then((res)=>dispatch(receivePosts(res)))
}
export const postUpdated = (post)=>{
	return {
		type: POST_UPDATE,
		post: post
	}
}

export const updatePost = (post, cb) => (dispatch)=>{
	API.editPost(post).then((res)=>{dispatch(postUpdated(res)); cb()});
}

export const createPost = (post, cb) => (dispatch) => {
	API.addPost(post).then((res)=>{dispatch(postUpdated(res)); cb()});
}

export const deletePost = (post) => (dispatch) => {
	API.deletePost(post.id).then((res)=>{dispatch(postUpdated(res))})
}

export const votePost = (post, vote) => (dispatch) => {
	API.vote(post.id, vote).then((res)=>{dispatch(postUpdated(res))})
}

export const fetchCategories = ()=> (dispatch) => {
	API.categories().then((res)=>dispatch(receiveCategories(res)))
}
export const updateCount = (id, adj) => {
	return {
		type: 'UPDATE_COUNT',
		id: id,
		adjuster: adj
	}
}

export const receiveCategories = (cats)=> {
	return {
		type : RECEIVE_CATEGORIES,
		payload: cats
	};
}

export const fetchComments = (parent)=> (dispatch) => {
	API.getComments(parent).then((res)=>dispatch(receiveComments(parent, res)))
}
export const receiveComments = (parent, coms)=> {
	return {
		type : RECEIVE_COMMENTS,
		comments: coms,
		parent: parent
	};
}

export const updateComment = (comment) =>{
	return {
		type : UPDATE_COMMENT,
		comment: comment,
	};
}
export const editComment = (comment, cb)=> (dispatch) => {
	API.editComment(comment).then((res)=>{
		dispatch(updateComment(comment))
		cb()
	})
};

export const voteComment = (comment, vote) => (dispatch) => {
	comment.vote=vote
	API.voteComment(comment).then((res)=>{
		console.log(res)
		dispatch(updateComment(res))})
}

export const addComment = (comment) => (dispatch) => {
	API.addComment(comment).then((res)=>{dispatch(commentAdded(res)); dispatch(updateCount(res.parentId, 1));})
}

export const commentAdded = (comment) =>{
	return{
		type: COMMENT_ADDED,
		comment : comment
	}
}

export const deleteComment = (comment) => (dispatch) => {
	API.deleteComment(comment).then((res)=>{dispatch(updateComment(res)); dispatch(updateCount(res.parentId, -1)); })
}

