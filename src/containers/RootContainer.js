import { Container } from '../lib/unstated-compat'

class RootContainer extends Container {

  state = {
    activePath: '/',
    isFull: false
  };

  activePath = (activePath) => {
    if(activePath !== this.state.activePath){
      this.setState({
        activePath: activePath
      })
    }
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

}

export default RootContainer