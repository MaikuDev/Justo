import React, {Component} from 'react'
import Modal from 'react-responsive-modal'

import './styles.css'

class AvatarPreview extends Component {
  constructor(props){
    super(props)

    this.state = {
      visible: false,
      avatar: ''
    }

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
  }

  show(avatar){
    this.setState({
      avatar: avatar,
      visible: true
    })
  }

  hide(){
    this.setState({
      visible: false
    })
  }

  render(){
    const { avatar } = this.state

    return (
      <Modal 
        open={this.state.visible} 
        onClose={this.hide}
        closeIconSize={0}
        styles={{
          modal: {
            backgroundColor: 'transparent'
          }
        }}
        center
      >
        <div>
          <div 
            className="avatar" 
            style={{
              backgroundImage: `url(${avatar})`
            }}
          />
        </div>
      </Modal>
    )
  }
}

export default AvatarPreview
