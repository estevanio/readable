import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class PostList extends Component {

	constructor(props) {
	  super(props);
	  this.sortByDate = this.sortByDate.bind(this);
	  this.sortByScore = this.sortByScore.bind(this);
	}

	componentWillReceiveProps(nextProps){
	 this.setState(nextProps);
	}

	componentDidMount(){
		this.setState(this.props);
	}
    dateCompare(a,b) {
		if(a.timestamp > b.timestamp){
			return -1;
		} else {
			return 1
		}
	}
	scoreCompare(a,b) {
			if(a.voteScore > b.voteScore){
				return -1;
			} else{
				return 1
			} 
			
	}
	 sortByDate() {
		this.setState((prevState, props) => {
		  return {posts: prevState.posts.sort(this.dateCompare)};
		});
	}
	sortByScore(){
		this.setState((prev, props)=>{
			return {posts: prev.posts.sort(this.scoreCompare)};
		});
	}


  render() {
  	const posts =  this.state ? this.state.posts : [];
  	return(<ul>
  		<button onClick={this.sortByDate}>Sort By Date</button>
  		<button onClick={this.sortByScore}>Sort By Score</button><br/>
  		<hr/>
  		{posts.map((i) => (
  			i.deleted ||
  			<li key={i.id}>
  			<button onClick={()=>{this.props.vote(i, 'upVote')}}> UpVote </button>
  			<button onClick={()=>{this.props.vote(i, 'downVote')}}> DownVote </button><br/>
  			<Link to={`/${i.category}/${i.id}`}>
  			<b> Title </b>{i.title} <b> Author </b>{i.author} <br/>
  			</Link>
  			<b>Comments </b> {i.commentCount} <b> Score</b>{i.voteScore} <br/>
  	  		<Link to={`/${i.category}/${i.id}/edit`}><button>Edit</button></Link>
  	  		<button onClick={()=>{this.props.onDelete(i)}}> Delete </button>
  	  		<hr/>
  			</li>

  		))}
  	</ul>);
  }
}

export default PostList
