import React, {Component} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import firebase from 'firebase'
import AvatarPreview from '../../components/AvatarPreview'
import styles from './styles.css'

class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      user: {
        id: null,
        avatar: ''
      },
      comments: [],
      disabled: true
    }

    this.database = firebase.database()
    this.commentsdb = this.database.ref('comments')
    this.usersdb = this.database.ref('users')

    this._onSendComment = this._onSendComment.bind(this)
    this._getUser = this._getUser.bind(this)
    this._addComment = this._addComment.bind(this)
    this._onChangeComment = this._onChangeComment.bind(this)
  }

  componentDidMount(){
    this._getUser()
    this.commentsdb.on('child_added', this._addComment)
  }

  _onChangeComment({target}){
    const value = target.value.trim().replace(/\s+/, '')

    this.setState({
      disabled: value == ''
    })
  }

  _addComment(data){
    const { comments } = this.state
    const newComments = [].concat(comments, data.val())

    this.setState({
      comments: newComments
    })
  }

  _onSendComment(){
    const { value } = this.comment
    const { user } = this.state

    const comment = {
      text: value,
      date: new Date().toString(),
      user: user
    }

    this.setState({
      disabled: true
    })
    this.comment.value = ''
    this.commentsdb.push(comment)
  }

  _getUser(){
    let user  = localStorage.getItem('user')

    if(user == null){
      fetch('https://source.unsplash.com/random/500x500/?cat')
      .then(({url})=>{
        const id = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}_${Date.now()}`
        user = {
          id: id,
          avatar: url
        }
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({user})
      })
    }else{
      user = JSON.parse(user)
      this.setState({user}) 
    }    
  }

  render(){
    const { user, comments, disabled} = this.state

    return (
      <div className={styles.main}>
        <Head>
          <meta name='viewport' content='width=device-width, user-scalable=no' />
        </Head>
        <AvatarPreview 
          ref={(preview)=>(this.preview = preview)}
        />
        <div className={styles.post}>
          <div className={styles.postImage}>
            <div />
          </div>
          <div className={styles.comments}>
            <div className={styles.commentsHeader}>
              <div 
                onClick={()=>(this.preview.show(user.avatar))} 
                className={styles.commentAvatar} 
                style={{
                  backgroundImage: `url(${user.avatar})`
                }} 
              />
              <p 
                className={styles.commentUserName}>
                {user.id}
              </p>
            </div>
            <div className={styles.commentsList}>
              <ul>
                {comments.map((comment)=>{
                  return (
                    <li>
                      <div className={styles.comment}>
                        <div
                          onClick={()=>(this.preview.show(comment.user.avatar))} 
                          className={styles.commentAvatar} 
                          style={{
                            backgroundImage: `url(${comment.user.avatar})`
                          }} 
                        />
                        <p className={styles.commentData}>
                          <span
                            className={styles.commentUserName}>
                            {comment.user.id}
                          </span>
                          <span
                            className={styles.commentText}>
                            {comment.text}
                          </span>
                        </p>
                        <p className={styles.commentDate}></p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className={styles.commentsInput}>
              <textarea
                onChange={this._onChangeComment} 
                ref={(comment)=>(this.comment = comment)}
                placeholder='Agregar un comentario' 
              />
              <button
                disabled={disabled}
                onClick={this._onSendComment}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
