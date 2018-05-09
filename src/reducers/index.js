import {
	RECEIVE_POSTS,
	REQUEST_POSTS,
	POST_UPDATE,
	RECEIVE_CATEGORIES,
	RECEIVE_COMMENTS,
	UPDATE_COMMENT,
	COMMENT_ADDED
} from '../actions'
import {combineReducers} from 'redux'


function posts (state={isLoading: false, posts: {}}, action) {
	switch (action.type) {
		case RECEIVE_POSTS:
			return {...state, 
				isLoading : false, 
				posts : action.payload.reduce((items, item)=>{
					items[item.id]=item
					return items
				}, {})
			}
		case REQUEST_POSTS:
			return {...state, isLoading:true}
		case POST_UPDATE: 
			return {
				...state,
				posts : {
					...state.posts,
					[action.post.id]:action.post
				}
			}
		case 'UPDATE_COUNT':
		return {
				...state,
				posts : {
					...state.posts,
					[action.id]:{
						...state.posts[action.id],
						commentCount: state.posts[action.id].commentCount + action.adjuster
					}
				}
			}
		default: 
			return state
	}
}

function categories (state={categories: []}, action) {
	switch (action.type) {
		case RECEIVE_CATEGORIES:
			return {...state, 
				categories : action.payload.reduce((cats, cat)=>{
					cats.push(cat.name)
					return cats
				}, [])
			}
		default: 
			return state
	}
}

function comments (state={parent:null, comments:[]}, action) {
	switch (action.type) {
		case RECEIVE_COMMENTS:
			return {...state, 
					parent: action.parent,
					comments: action.comments
			}
		case UPDATE_COMMENT:
			return {...state,
				comments: state.comments.map(c=>{
					return c.id==action.comment.id ? action.comment : c;
				})
			}
		case COMMENT_ADDED :
			return {
				...state,
				comments: state.comments.concat(action.comment)
			}
		default: 
			return state
	}
}
export default combineReducers ({
  posts,
  categories,
  comments
})