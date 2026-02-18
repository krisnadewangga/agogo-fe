import { Container } from 'unstated'

class CartsContainer extends Container {

  state = {
    items: []
  };

  onAddToCart = this.onAddToCart.bind(this);
  onAddToCart(p) {
    this.setState({
      items: [...this.state.items, p]
    });
  }

  onRemoveFromCart = this.onRemoveFromCart.bind(this);
  onRemoveFromCart(i) {
    const newArray = [...this.state.items];
    newArray.splice(i, 1);

    this.setState({
      items: newArray
    });
  }

}

export default CartsContainer