import { Container } from 'unstated'
import axios from 'axios'
// import DefaultIP from './DefaultIP'
import DefaultIP from './DefaultIP'

class ProductsContainer extends Container {

  state = {
    products: [],
    productsFiltered: [],
    filterKeyword: "Semua Item",
    selectedStok: 'Semua Stok',
    searchKeyword: '',
    footerNvaBarHeight: 114,
    windowInnerHeight: 0,
    productItemsHeight: 0,
    activeCatClass: 'cat-0'
  }

  fetchProducts() {
    // if(sessionStorage.getItem('products')){
    //   const products = JSON.parse(sessionStorage.getItem('products'));
    //   this.setState({
    //     products: products
    //   });
    // } else {
      // axios.get(`http://gigit.store/wp-json/wp/v2/product?_embed`)
      axios.get(DefaultIP + `/api/products`)
      .then(res => {
        // console.log(res);
        const products = res.data;
        this.setState({ 
          products: products,
        }, 
          () => {
            this.productsFiltered()
            // sessionStorage.setItem('products', JSON.stringify(products));
          }
        );
      })
    // }
  }

  // CARI PRODUK
  productsSearch() {
    let products = this.state.products
    let searchKeyword = this.state.searchKeyword

    let productsSearch =  products.filter(function(product) {
      return product.name.toString().toLowerCase().search(searchKeyword.toLowerCase()) !== -1;
    });

    this.setState({ 
      productsFiltered: productsSearch,
      activeCatClass: ''
    })
    
  }

  setSearchKeyword(keyword) {
    this.setState({ 
      searchKeyword: keyword
    }, 
      () => {
        this.productsSearch()
      }
    )
  }

  // FILTER KATEGORI
  productsFiltered(){
    let products = this.state.products
    let filterKeyword = this.state.filterKeyword
    let selectedStok = this.state.selectedStok
    let stok = 0

    let productsFiltered =  products.filter(function(product) {
      return product.category_name === filterKeyword;
      
    });

    let stokFiltered =  products.filter(function(product) {
      return product.stock === stok;
    });

    let stokFilteredN =  products.filter(function(product) {
      return product.stock !== stok;
    });

    if(filterKeyword === "Semua Item"){
      if (selectedStok === "Stok Tersedia"){
        this.setState({ 
          productsFiltered: stokFilteredN
        })
      }
      else if (selectedStok === "Stok Habis"){
        this.setState({ 
          productsFiltered: stokFiltered
        })
      }
      else {
      this.setState({ 
        productsFiltered: products
      })
    }
    }
    else{
      this.setState({ 
        productsFiltered: productsFiltered
      }, () => {
        if (selectedStok === "Stok Tersedia"){ 
        let stokFilteredN =  productsFiltered.filter(function(product) {
            return product.stock !== stok;
          });     
          this.setState({ 
          productsFiltered: stokFilteredN
        })
      }
      else if (selectedStok === "Stok Habis"){
        let stokFiltered =  productsFiltered.filter(function(product) {
          return product.stock === stok;
        });  
        this.setState({ 
          productsFiltered: stokFiltered
        })
      }
      else {
      this.setState({ 
        productsFiltered: productsFiltered
      })
    }})
    }
  }

  setFilteredKeyword(keyword) {
    this.setState({ 
      filterKeyword: keyword
    }, 
      () => {
        this.productsFiltered()
      }
    )
  }

  setProductItemsHeight(){
    this.setState({
      windowInnerHeight: window.innerHeight + 140
    },
      () => {
        this.setState({
          productItemsHeight: this.state.windowInnerHeight - this.state.footerNvaBarHeight
        })
      }
    );
  }

  handleStokChange= (event) => {
    if (this.state.selectedStok === 'Semua Stok'){
      this.setState({selectedStok: event.target.value}, () => this.productsFiltered())
    }
    if (this.state.selectedStok === 'Stok Tersedia'){
      this.setState({selectedStok: event.target.value}, () => this.productsFiltered())
    }
    if (this.state.selectedStok === 'Stok Habis'){
      this.setState({selectedStok: event.target.value}, () => this.productsFiltered())
    }
  }

}

export default ProductsContainer;
