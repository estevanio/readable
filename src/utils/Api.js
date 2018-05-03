
const api = "http://localhost:3001"
const uuid = require('uuid/v1');


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': token
}


//Gets all the category types
export const categories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

//Gets all posts
export const posts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

//Gets post by id
export const post = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

//Up|Down votes a post 
//takes id and 'upVote' or 'downVote'
export const vote = (id, vote) =>
  fetch(`${api}/posts/${id}`, 
    { method: 'POST', 
    headers,
    body: JSON.stringify({option:vote})
    })
    .then(res => res.json())
    .then(data => data)
  

//Adds new post in specified category
//args: object title, author, body, category
export const addPost = (post) =>
  fetch(`${api}/posts`, 
    { method: 'POST', 
    headers,
    body: JSON.stringify(
      Object.assign({id: uuid(), timestamp: new Date()}, post)
    ) })
    .then(res => res.json())
    .then(data => data)

//Edits specified post
//args: object with id, title, body
export const editPost = (post) =>
  fetch(`${api}/posts/${post.id}`, 
    { method: 'PUT', 
    headers,
    body: JSON.stringify({title: post.title, body: post.body}) })
    .then(res => res.json())
    .then(data => data)

//Deletes specified post
//args: post id to delte
export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, 
    { method: 'DELETE', 
    headers
    })
    .then(res => res.json())
    .then(data => data)

//Get's comments for specified post
export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

//Gets specified comment details
export const comment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
  .then(data => data)

//Adds comment to specified post
//args: {body, author, parentId}
export const addComment = (comment) =>
  fetch(`${api}/comments`, 
  { method: 'POST', 
  headers,
  body: JSON.stringify(
    Object.assign({id: uuid(), timestamp: new Date()}, comment)
  ) })
  .then(res => res.json())
  .then(data => data)

//up/down vote comment
export const voteComment = (vote) => 
  fetch(`${api}/comments/${vote.id}`,{
    method: 'POST',
    headers,
    body: JSON.stringify({option: vote.vote})
  })
  .then(res => res.json())
  .then(data => data)


//Edits specified comment
//args {id, body}
export const editComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, 
  { method: 'PUT', 
  headers,
  body: JSON.stringify({timestamp: new Date(), body: comment.body})
  })
  .then(res => res.json())
  .then(data => data)

//Deletes specified comment
export const deleteComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, 
  { method: 'DELETE', 
  headers
  })
  .then(res => res.json())
  .then(data => data)


