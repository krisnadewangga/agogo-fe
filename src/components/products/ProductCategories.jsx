import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Input } from 'reactstrap';
import axios from 'axios';
// import DefaultIP from '../../containers/DefaultIP';
import DefaultIP from '../../containers/DefaultIP';
import classNames from 'classnames';

import './ProductCategories.scss';


class ProductCategories extends Component {

  state = {
    searchInputText: '',
    categories: [
      {
        'id': 0,
        'name' : 'Semua Item'
      }
    ]
  }

  componentDidMount(){
    this.fetchCategories()
  }

  fetchCategories() {
    axios.get(DefaultIP+`/api/categories`)
    .then(res => {
      const categories = Array.isArray(res.data) ? res.data : [];
      this.setState(prevState => ({
        categories: [...prevState.categories, ...categories]
      }))
    })
  }

  buttonSetFilteredKeyword(keyword, index){
    this.resetSearchKeyword()
    
    this.props.productStore.setFilteredKeyword(keyword)
    let activeCatClass = "cat-"+index
    this.props.productStore.setState({
      activeCatClass: activeCatClass
    })
  }

  buttonSetSearchKeyword(keyword){
    this.props.productStore.setSearchKeyword(keyword)
  }

  handleChange = (e) => {
    this.props.productStore.setState({
      searchKeyword: e.target.value
    }, () => {
      this.buttonSetSearchKeyword(this.props.productStore.state.searchKeyword)
    })
  }

  resetSearchKeyword(){
    this.props.productStore.setState({
      searchKeyword: ''
    })
  }

  render() {
    return (
      <Nav className="product-categories pt-4 pb-4">
        <NavItem>
          <Input type="search" name="search" id="productSearch" placeholder="Cari produk..." 
            value={this.props.productStore.state.searchKeyword}
            onChange={this.handleChange}
            ref={el => this.inputTitle = el}
          />
        </NavItem>
        { this.state.categories.map((cat, index) => 
          <NavItem key={cat.name}>
            <NavLink href="#" 
              onClick={() => this.buttonSetFilteredKeyword(cat.name, index)}
              className={classNames({'active': this.props.productStore.state.activeCatClass === ("cat-"+index)})}
            >
              {cat.name}
            </NavLink>
          </NavItem>
        )}
      </Nav>
      
    );
  }
}

export default ProductCategories;
