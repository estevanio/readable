import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import All from './All';
import Category from './Category';
import Post from './Post';
import { BrowserRouter } from 'react-router-dom'
import Edit from './Edit';
import { connect} from 'react-redux'
import {fetchPosts, fetchCategories} from '../actions'
import Modal from 'react-modal'
import Create from './Create'
import { Link } from 'react-router-dom';
import CommentEdit from './CommentEdit'

class App extends Component {
  state ={
    createModalOpen: false
  }
  componentDidMount(){
    this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchCategories());
  }


  openCreateModal = () => this.setState(() => ({ createModalOpen: true }))
  closeCreateModal = () => this.setState(() => ({ createModalOpen: false }))

  render() {
      const { createModalOpen } = this.state

      return (
        <div>
        <button onClick={this.openCreateModal}>New Post</button>
        <BrowserRouter>
        <div>
        <nav>
          <Link to='/'>All </Link>
          { this.props.categories.map((c)=>(
             <Link key={c} to={`/${c}`}>{c} </Link> 
          ))}
        </nav>
        <Route exact path="/" render={ () => (           
         <All/>
        )}/>
        <Route exact path='/:category' render={({ history, match }) => (
          <Category category={match.params.category} />
        )}/>
        <Route exact path='/:category/:post' render={({ history, match }) => (
          <Post category={match.params.category} history={history} postid={match.params.post}
          />
        )}/>
        <Route exact path='/:category/:post/edit' render={({ history, match }) => (
          <Edit category={match.params.category} id={match.params.post} history={history}
          />
        )}/>
        <Route exact path='/:category/:post/:comment/edit' render={({ history, match }) => (
          <CommentEdit history={history} category={match.params.category} commentId={match.params.comment} parentId={match.params.post}
          />
        )}/>
        <Modal
          isOpen={createModalOpen}
          onRequestClose={this.closeCreateModal}
          contentLabel='Modal'
          ariaHideApp={false}
        >
        <Create onDone={this.closeCreateModal}/>
        </Modal>
        </div>
        </BrowserRouter>

        </div>
      );
  }
}

function mapStateToProps (state) {
  return {
    posts: state.posts.posts,
    categories: state.categories.categories
  }
}

export default connect(mapStateToProps)(App);