import { Container } from '../lib/unstated-compat'
import axios from 'axios'
import DefaultIP from './DefaultIP' 

const initialState = {
  dataNyoba: [],
  nyoBa: [],
  data: [],
  dataTrx: [],
  dataRefund: {},
  dataRefundPS: {},
  dataRefundTK: {},
  items: [],
  refundItems: [],
  cobaItem: [],
  cobaItemPs: [],
  selectedItems: [],
  selectedProduct: {},
  selectedTransaction: {},
  showSelectedTransaction: {},
  dataReservation : {},
  clearProduction: [],
  production: [],
  product: {},
  postData: {},
  refund: [],
  trxRefund: [],
  transaction: [],
  doneTransaction: [],
  reservation: [],
  products: [],
  produksi: {total: 0, rusak: 0, lain: 0, catatan: ""},
  isAdded: false,
  isCalcNumericCartOpen: false,
  inputQtyCartItem: '',
  searchCode: '',
  selectedQtyID: '',
  layoutName: "default",
  onReset: false,
  activeItem: -1,
  totalRefund: 0,
  totalAmount: 0,
  //totalTax: 0,
  totalBulat: 0,
//  persenTax: 10,
  discountAmount: 0,
  discountPercentage: 0, 
  expenseAmount: 0,
  grandTotalAmount: 0,
  grandTotalAmountDiscount: 0,
  bookingAmount:0,
  isCashierOverlayShow: false,
  isPaymentCheckoutShow: false,
  isReservationCheckoutShow: false,
  isOrderBookingShow: false,
  isOrderBookingDeleteShow: false,
  isOrderBookingEditShow: false,
  isOrderBookingTakeShow: false,
  isBookingDeleteShow: false,
  isBookingEditShow: false,
  isBookingTakeShow: false,
  isDeleteBookingShow: false,
  isEditBookingShow: false,
  isTakeBookingShow: false,
  isRefundTKShow: true,
  isRefundPSShow: false,
  onRefund: false,
  activeInputPayment: '',
  valueInputPayment: {
    paymentTotal: 0,
  },
  activeInputBooking: '',
  valueInputBooking: '',
  activeInputEditBooking: '',
  valueInputEditBooking: '',
  isTransactionListShow: false,
  isDoneTransactionListShow: false,
  isReservationListShow: false,
  isRefundShow: false,
  isRefundItem: false,
  isInOrder: false,
  inOrder: false,
  valueInputRefund: '',
  activeInputRefund: '',
  valueInputApproval: '',
  activeInputApproval: '',
  discountType: 'Rp',
  changePayment: 0,
  payment: 0,
  selectedRefund: 'TK',
  whatRefund: 'TK',
  whatBooking: '',
  dpReservationAmount: 0,
  leftToPay: 0,
  date: '',
  tgl_trx: '',
  startDate: new Date(),
  time: '00:00',
  today: '',
  nama: '',
  userPencatat: '',
  currentTrx: '',
  currentIDTrx: '',
  popStatus: false,
  isDisabled: true,
  isDisabledRefund: true,
  disabledOrder: true,
  disabledOther: false,
  disabledProduction: "disabled",
  disabledProductionNote: true,
  productNote: "",
  payRefundTK: true,
  prevDate : '',
  lastDate: '',
  formatDate: '',
  days: [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Saturday"
  ],
  approveOK: false,
  Tcode : '',
  jalur : 1,
  TempInvoice : '',
  paymentMethod: {
    cash: false,
    transfer: false,
    qris: false,
    value: ''
  },
  keyboardRef : null,
  prosesBayar: false,
};

class CartsContainer extends Container {

  constructor(props) {
    super(props)
    this.state = initialState;
    // this.getTax()

 
  }

  fetchProducts() {
    // axios.get(`http://gigit.store/wp-json/wp/v2/product?_embed`)
    axios.get(DefaultIP + `/api/products`)
    .then(res => {
      const products = res.data;
  
      this.setState({ 
        products: products,
        }
      );
    })
  }


  // getTax(){

    
  //   axios.get(DefaultIP + '/api/cek_tax/2')
  //   .then(res => {
       
       
  //       this.setState({ 
  //         persenTax: res.data.msg.tax,
  //         }
  //       );
      
  //   })

  // }
  




  setSearchCode(code) {
    this.setState({ 
      searchCode: code
    }, 
      () => {
        this.codeSearch()
      }
    )
  }

  // setTransaksiMobile
  searchTransaksiMCode(code){

    this.setState({
      items : [],
      Tcode : code,
    });

    let Tcode = this.state.Tcode;
    axios.get(DefaultIP+'/api/get_transaksi/'+Tcode).then((result) => {
      
      if(result.data.success === "1"){
          let transaksi = result.data.message;
          let items = result.data.message.item_transaksi;
          console.log(transaksi);
          
          if(transaksi.jenis === '1'){
            this.setState({
              items : items,
              currentTrx: transaksi.no_transaksi, 
              isDisabled: false,
            },() => {
            
              this.sumTotalAmount();
                  this.setState({
                    isAdded: true,
                    jalur : 2
                    // selectedProduct: {}
                  },
                    () => {
                      this.sumGrandTotalAmount()
      
                      setTimeout(() => {
                        this.setState({
                          isAdded: false
                        });
                      }, 3500);
                    }
                  );
            });
          }else{
            this.addSelectedReservation(transaksi.id,transaksi.no_transaksi);
            this.reservationCheckout();
          }
          
      }
      // else{
      //   alert(result.data.message);

      //   this.setState({
      //     Tcode: '',
      //     jalur : 1 
      //   });

      // }
      
    });

  }

  

  codeSearch() {
    let products = JSON.parse(sessionStorage.getItem('products'))
    let searchCode = this.state.searchCode

    let productsCode =  products.filter(function(product) {
      // return product.title.rendered === searchKeyword;
      return product.code === searchCode;
    });
    console.log('ProductsCode : '+productsCode);

    if(productsCode.length === 1){
      this.setState({searchCode: ''})
      axios.get(DefaultIP + `/api/cekInvoice`).then(res => {
        console.log(res.data);
        const trx = res.data;
        this.setState({ currentTrx: trx.current_invoice, isDisabled: false});
       //sessionStorage.setItem('transaction', JSON.stringify(transaction));
      })
      this.setState(
        {
          selectedProduct: {
            // idx: idx,
            id: productsCode[0].id,
            name: productsCode[0].name,
            qty: 1,
            price: productsCode[0].price
          }
        },
        () => {
          this.onAddToCart(this.state.selectedProduct);
        })
    }else{
      console.log("productsCode")
    }
  }


  clearCart = () => {
    this.setState(initialState);
    this.setState({dataReservation: {}, trxRefund: []});
    this.getDateTrx()
    // this.getTax()
  }

  resetProduct = () => {
    this.setState({valueInputRefund: '',
                  activeInputRefund: '',});
  }


    


  componentWillMount(){

     

    this.setState({
      windowInnerHeight: window.innerHeight
    },
      () => {
        this.setState({
          productItemsHeight: this.state.windowInnerHeight - 114
        })
      }
    );
  }

  //Tampil list simpan transaksi
  fetchDoneTransaction() {
    axios.get(DefaultIP + `/api/PaidOrders`)
    .then(res => {
      // console.log(res); 
      const transaction = res.data;
      this.setState({ transaction: transaction});
    })
  }

 fetchTransaction() {
    axios.get(DefaultIP + `/api/orders`)
    .then(res => {
      // console.log(res);
      const transaction = res.data;
      this.setState({ transaction: transaction});
    })
  }


  fetchReservation() {

    
    axios.get(DefaultIP + `/api/preorders`)
    .then(res => {
      const transaction = res.data;
      this.setState({ reservation: transaction });
    })

    
  }


  // ===============
  // CART ACTION
  // ===============
  onAddToCart(selectedProduct, jml) {
    
    // let aa = JSON.stringify(selectedProduct);
    // console.log('ini selectedProduct'+ aa);

    let id = selectedProduct.id
    let index = this.state.items.findIndex( x => x.id === id);



    // if (index === -1 || id === index){
      if (index === -1){
        this.setState({
          items: [...this.state.items, selectedProduct]
        },
          () => {
           

            this.sumTotalAmount()

            this.setState({
              isAdded: true,
              selectedProduct: {}
            },
              () => {
                this.sumGrandTotalAmount()

                setTimeout(() => {
                  this.setState({
                    isAdded: false
                  });
                }, 3500);
              }
            );
          }
      );
    }else{
      let currentQty = this.state.items[index].qty
      this.onUpdateItem(id, Number(currentQty) + 1)
    }
  }


  addSelectedProduct(idx, id, name, qty, price, active_path, modal) {
    if(active_path === '/cashier' || active_path === '/booking'){
      if(active_path === '/cashier' && this.state.items.length === 0){
      axios.get(DefaultIP + `/api/cekInvoice`).then(res => {
      const trx = res.data;
      this.setState({ currentTrx: `${trx.current_invoice}${window.appConfig.RECEIPT_CODE || ''}`, isDisabled: false});
      })
      }
      else if(active_path === '/booking'){
        axios.get(DefaultIP + `/api/cekPOInvoice`).then(res => {
        const trx = res.data;
        // console.log(this.state.persenTax)
        
        // axios.get(DefaultIP + '/api/cek_tax/2')
        // .then(res => {
           
        //     this.setState({persenTax : res.data.msg.tax});
          
        // })


        this.setState({ currentTrx: `${trx.current_invoice}${window.appConfig.RECEIPT_CODE || ''}`, disabledOrder: false, disabledOther: true});
        })

       
      }
      this.setState(
        {
          selectedProduct: {
            idx: idx,
            id: id,
            name: name,
            qty: qty,
            price: price
          },
          onRefund: false
        },
        () => {
          this.onAddToCart(this.state.selectedProduct);
        }
      );
    }
    else if (active_path === '/production'){
      this.setState({valueInputBooking: ""})
      axios.get(DefaultIP + '/api/product/' + id).then(res => {
        const product = res.data;
        this.setState({selectedProduct: product})
        let index = this.state.production.findIndex( x => String(x.id) === String(id) || String(x.product_id) === String(id));
        if(index === -1){
          const reset = {
            product_id: id,
            produksi1: 0,
            produksi2: 0,
            produksi3: 0,
            total_produksi: 0,
            ket_rusak: 0,
            ket_lain: 0,
            total_lain: 0,
            catatan: "tidak ada catatan",
          }
          const productKosong = Object.assign({}, product, reset)
          this.state.production.push(productKosong)
          this.state.clearProduction.push(productKosong)
          this.setState({disabledProductionNote: false})
        } else {
          axios.get(DefaultIP + '/api/product/' + id)
        }

        this.doProduction(id, modal, product)

      })
      axios.get(DefaultIP + `/api/TrxByProduct/` + id).then(res => {
      const pesan = res.data;

      console.log(pesan)

  
      
      let index = this.state.production.findIndex( x => x.id === id)
      if(pesan.production === null){
        this.state.produksi[this.state.selectedProduct.name + "produksi1"] = 0
        this.state.produksi[this.state.selectedProduct.name + "produksi2"] = 0
        this.state.produksi[this.state.selectedProduct.name + "produksi3"] = 0
        this.state.produksi[this.state.selectedProduct.name + "rusak"] = 0
        this.state.produksi[this.state.selectedProduct.name + "lain"] = 0
        this.state.produksi["note" + this.state.selectedProduct.name] = "tidak ada catatan"
        this.state.produksi["total_penjualan"+this.state.selectedProduct.name] = pesan.count_order + pesan.count_preorder
        this.state.produksi["stok_kemarin"+this.state.selectedProduct.name] = 0
        this.state.produksi["total"+this.state.selectedProduct.name] = pesan.count_order
        this.state.produksi["pemesanan"+this.state.selectedProduct.name] = pesan.count_preorder
        this.state.produksi["order"+this.state.selectedProduct.name] = pesan.count_order
        this.state.produksi["pesanan"+this.state.selectedProduct.name] = pesan.count_preorder
        this.setState({
          production: [
             ...this.state.production.slice(0,index),
             Object.assign({}, this.state.production[index], {penjualan_toko: pesan.count_order},
                                                             {penjualan_pemesanan: pesan.count_preorder},
                                                             {total_penjualan: parseInt(pesan.count_preorder) + parseInt(pesan.count_order)},
                                                             {stock_awal: pesan.stok_awal},
                                                             {sisa_stock: pesan.sisa_stock},
                                                             {product_id: id},
                                                             {catatan: "tidak ada catatan"},
                                                             {produksi1: 0},
                                                             {produksi2: 0},
                                                             {produksi3: 0},
                                                             {total_produksi: 0},
                                                             {ket_rusak: 0},
                                                             {ket_lain: 0},
                                                             {total_lain: 0},
                                                             {ubah_tanggal: "no"}),
             ...this.state.production.slice(index+1)
          ],
          clearProduction: [
            ...this.state.clearProduction.slice(0,index),
            Object.assign({}, this.state.clearProduction[index], {penjualan_toko: ""},
                                                                 {penjualan_pemesanan: ""},
                                                                 {total_penjualan: ""},
                                                                 {total_lain: 0},
                                                                 {ubah_tanggal: "no"},
                                                                 {stock_awal: parseInt(pesan.sisa_stock)},
                                                                 {sisa_stock: 1}),
            ...this.state.clearProduction.slice(index+1)
          ]
        })
      } else {
      this.state.produksi[this.state.selectedProduct.name + "produksi1"] = pesan.production.produksi1
      this.state.produksi[this.state.selectedProduct.name + "produksi2"] = pesan.production.produksi2
      this.state.produksi[this.state.selectedProduct.name + "produksi3"] = pesan.production.produksi3
      this.state.produksi[this.state.selectedProduct.name + "rusak"] = pesan.production.ket_rusak
      this.state.produksi[this.state.selectedProduct.name + "lain"] = pesan.production.ket_lain

      this.state.produksi["note" + this.state.selectedProduct.name] = pesan.production.catatan
      this.state.produksi["total"+this.state.selectedProduct.name] = pesan.production.penjualan_toko
      
      this.state.produksi["pemesanan"+this.state.selectedProduct.name] = pesan.production.penjualan_pemesanan
      this.state.produksi["total_penjualan"+this.state.selectedProduct.name] = pesan.production.total_penjualan
      this.state.produksi["stok_kemarin"+this.state.selectedProduct.name] = pesan.production.stock_awal
      this.state.produksi["order"+this.state.selectedProduct.name] = pesan.production.penjualan_toko
      this.state.produksi["pesanan"+this.state.selectedProduct.name] =pesan.production.penjualan_pemesanan
      this.setState({
        production: [
           ...this.state.production.slice(0,index),
           Object.assign({}, this.state.production[index], {penjualan_toko: pesan.count_order},
                                                           {penjualan_pemesanan: pesan.count_preorder},
                                                           {total_penjualan: parseInt(pesan.production.penjualan_toko) + parseInt(pesan.production.penjualan_pemesanan)},
                                                           {stock_awal: pesan.production.stock_awal},
                                                           {sisa_stock: 
                                                              parseInt(pesan.production.sisa_stock || 0) },
                                                           {product_id: id},
                                                           {catatan: pesan.production.catatan || "tidak ada catatan"},
                                                           {produksi1: parseInt(pesan.production.produksi1 || 0)},
                                                           {produksi2: parseInt(pesan.production.produksi2 || 0)},
                                                           {produksi3: parseInt(pesan.production.produksi3 || 0)},
                                                          
                                                           {total_produksi: parseInt(pesan.production.produksi1 || 0) + parseInt(pesan.production.produksi2 || 0) + parseInt(pesan.production.produksi3 || 0)},
                                                           {ket_rusak: parseInt(pesan.production.ket_rusak || 0)},
                                                           {ket_lain: parseInt(pesan.production.ket_lain || 0)},
                                                           {total_lain: parseInt(pesan.production.ket_rusak || 0) + parseInt(pesan.production.ket_lain || 0)},
                                                           {ubah_tanggal: "no"}),
           ...this.state.production.slice(index+1)
        ],
        clearProduction: [
          ...this.state.clearProduction.slice(0,index),
          Object.assign({}, this.state.clearProduction[index], {penjualan_toko: ""},
                                                               {penjualan_pemesanan: ""},
                                                               {total_penjualan: ""},
                                                               {total_lain: 0},
                                                               {ubah_tanggal: "no"},
                                                               {stock_awal: parseInt(pesan.sisa_stock)},
                                                               {sisa_stock: parseInt(this.state.selectedProduct.stock)}),
          ...this.state.clearProduction.slice(index+1)
        ]
      })
      }
      })    
    }
  }

  productionButton1(){
    if(this.state.produksi[this.state.selectedProduct.name + "produksi1"] !== 0){
      return "enabled"
    } else{
      return "enabled"
    }
  }
  productionButton2(){
    if(this.state.produksi[this.state.selectedProduct.name + "produksi2"] !== 0){
      return "disabled"
    } else{
      return "enabled"
    }
  }
  productionButton3(){
    if(this.state.produksi[this.state.selectedProduct.name + "produksi3"] !== 0){
      return "disabled"
    } else{
      return "enabled"
    }
  }
  productionButton4(){
    if(this.state.produksi[this.state.selectedProduct.name + "rusak"] !== 0){
      return "enabled"
    } else{
      return "enabled"
    }
  }
  productionButton5(){
    if(this.state.produksi[this.state.selectedProduct.name + "lain"] !== 0){
      return "enabled"
    } else{
      return "enabled"
    }
  }

  showSelectedTransaction(transactionDetail, modal){
     axios.get(DefaultIP + `/api/PaidOrdersItem/${transactionDetail.id}`).then(result => {
        transactionDetail.carts = result.data;
        console.log(transactionDetail);
        this.setState({showSelectedTransaction: transactionDetail})
      })
    modal('showTransaction','','','');
  }

  // tampil detail transaksi
addSelectedTransaction(id, current, idx) {
  // console.log('is transaction list show '+this.state.isTransactionListShow);
  // console.log("ini buka dari simpan transaksi");

  axios.get(DefaultIP + '/api/order/' + id).then(res => {
    console.log(res);
    this.setState({cobaItem: res})
    this.setState({isDisabled: false})
    const transaction = res.data;
    transaction.forEach((trx, i) =>
      this.state.selectedItems.push({
        idx: i,
        id_trx: id,
        id: trx.product_id,
        name: trx.product.name,
        qty: trx.qty,
        price: trx.product.price
      })
    )

    this.setState({items: this.state.selectedItems, selectedItems:[]}, 
      () => {this.sumTotalAmount() 
            this.setState({
              isAdded: true,
              selectedItems: []
            }, 
                () => {
                  this.sumGrandTotalAmount()
                  setTimeout(() => {
                  this.setState({
                    isAdded: false,
                    selectedItems: []
                });
              }, 3500);
            }
          )
        }
      )
    })
    this.setState({
      refund: [id, current],
      currentTrx: current, 
      currentIDTrx: id,
      isTransactionListShow: false,
      selectedItems: []})
  }

  getToday() {
    const year = new Date().getFullYear(); 
    var month = new Date().getMonth() + 1; //Current Month
    var date = new Date().getDate(); 
    if (date < 10) {
      date = '0' + date;
    } 
    if (month < 10) {
      month = '0' + month;
    } 
    var today = year + '-' + month + '-' + date;
    return today;
  }

  getCurrentTime() {
    const date = new Date();
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    if (hours < 10) {
      hours = '0' + hours;
    } 
    if (minutes < 10) {
      minutes = '0' + minutes;
    } 
    if (seconds < 10) {
      seconds = '0' + seconds;
    } 

    let currentTime = hours + ":" + minutes + ":" + seconds;

    return currentTime;
  }

  getDateTime(){
    const year = new Date().getFullYear(); 
    let month = new Date().getMonth() + 1; //Current Month
    let date = new Date().getDate();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    if (date < 10) {
      date = '0' + date;
    } 
    if (month < 10) {
      month = '0' + month;
    } 
    if (hours < 10) {
      hours = '0' + hours;
    } 
    if (minutes < 10) {
      minutes = '0' + minutes;
    } 
    if (seconds < 10) {
      seconds = '0' + seconds;
    } 

    let today = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    return today;

  }

  // detailPesanan di kasir
  addSelectedReservation(id, current, user_id, total) {

 


    this.setState({isDisabled: false, isRefundPSShow: true, isInOrder:!this.state.isInOrder, inOrder:!this.state.inOrder, selectedItems: [], onRefund: true})
    let reservationCode = id



    axios.get(DefaultIP + `/api/preorders`)
    .then(res => {
      const transaction = res.data;
      let reservationData = transaction.filter(function(data) {
        return data.id === reservationCode
      });
      if(reservationData.length === 0){
        console.log("GAGAL")
      } else {
      const dateTrx = reservationData[0].created_at
      const split = dateTrx.split(" ")
      const takeDate = split[0].toString()
      const splitDate = takeDate.split('-')
      const formatedDate = splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2]



      this.setState({dpReservationAmount: reservationData[0].uang_muka,  
                    changePayment: reservationData[0].subtotal - reservationData[0].uang_muka,
                    expenseAmount: reservationData[0].add_fee,
                    discountAmount: reservationData[0].discount, 
                    tgl_trx: reservationData[0].tgl_selesai,
                    nama: reservationData[0].nama}, 
                    () => axios.get(DefaultIP + '/api/preorder/' + id).then(res => {
                      const transaction = res.data;
                      let sameDate
                      if(formatedDate === this.getToday()){
                        sameDate = 'sameday'
                      }else{
                        sameDate = 'notsameday'
                      }


                      transaction.forEach((trx, i) => 
                        this.state.selectedItems.push({
                          idx: i,
                          id: trx.item_id,
                          invoice: current,
                          name: trx.item.nama_item,
                          qty: trx.jumlah,
                          price: trx.item.harga,
                          product_id: trx.item_id,
                          pencatat: reservationData[0].user.name,
                          total: reservationData[0].subtotal + reservationData[0].add_fee - reservationData[0].discount,
                          preorder_id: id,
                          nama: reservationData[0].nama,
                          alamat: reservationData[0].alamat,
                          tgl_selesai: reservationData[0].tgl_selesai,
                          tgl_pesan: reservationData[0].tgl_pesan,
                          telepon: reservationData[0].telepon,
                          catatan: reservationData[0].catatan,
                          add_fee: reservationData[0].add_fee,
                          uang_muka: reservationData[0].uang_muka,
                          waktu_selesai: reservationData[0].waktu_selesai,
                          sisa_harus_bayar: this.state.leftToPay,
                          hari_pelunasan: sameDate,
                        })
                      )
                      this.setState({items: this.state.selectedItems, currentTrx: reservationData[0].no_transaksi}, 
                        () => {this.sumTotalAmount() 
                              this.setState({
                                isAdded: true,
                                  }, 
                                  () => {
                                    this.sumGrandTotalAmount()
                                    setTimeout(() => {
                                    this.setState({
                                      isAdded: false,
                                  });
                                }, 3500);
                              }
                            )
                          }
                        )
                      }))
      }
    })
    }

    // simpan transaksi
    addTransaction(user_id, modal) {
      const items = this.state.items
      this.setState({data: []}, () => {
        items.forEach((x) => 
        this.state.data.push({
            invoice: this.state.currentTrx,
            order_id: this.state.currentIDTrx,
            user_id: user_id,
            product_id: x.id,
            qty: x.qty,
            price: x.price,
            subtotal: this.state.totalAmount,
            diskon: "",
            total: this.state.totalAmount,
            dibayar: "",
            kembali: "",
            status: "UNPAID",
          })
      )
      
      // console.log(this.state.data);

      axios.post(DefaultIP + `/api/keepOrders`, this.state.data)
      .then(res => {
        console.log(res);
        modal('simpan')
        this.setState({data: []})
      })
      .catch(res => {
        modal('alert', '', '', res.response.data.message)
        this.setState({data: []})
      })
      })
    }


  takeReservation(what_id, modal) {
    let data = this.state.dataReservation
    let item = this.state.selectedItems
    let ref = item.map(trx => ({
      ...trx,
      subtotal: data.subtotal,
      diskon: data.discount,
      user_id: what_id,
      invoice: data.invoice,
      uang_dibayar: this.state.leftToPay,
      uang_kembali: 0,
    //  tax: this.state.totalTax,
      tax: 0,
      status: 'PAID',
      username_approval: this.state.dataReservation["user"],
      pin_approval: this.state.dataReservation["code"]
    }))

    if(ref[0].username_approval === undefined){
      modal('alert','','','Mohon lakukan approval terlebih dahulu!')
    } else if (ref[0].pin_approval === undefined){
      modal('alert','','','Mohon lakukan approval terlebih dahulu!')
    } else {
      axios.post(DefaultIP + `/api/editPreorders`, ref)
      .then(res => {
        modal('bayar')
        this.setState({selectedItems: []})
      })
      .catch(res => {
        this.setState({selectedItems: []})
        modal('alert','','',res.response.data.message)
      })
    this.setState({selectedItems: [], dataReservation: {}}, () => this.state.dataReservation.tgl_selesai = data.tgl_selesai)
    }


  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

 //submit pesanan
  addReservation(user_now, modal, where) {



    
    const trx = this.state.items
    const data = this.state.dataReservation
    let date = this.getToday()
    let time = this.getCurrentTime()
    // console.log(this.state.currentTrx);

    this.setState({selectedItems: []}, () => {
      trx.forEach((trx) => this.state.selectedItems.push({
        preorder_id: data.id,
        nama		: data.nama,
        invoice	: this.state.currentTrx,
        tgl_selesai	: data.tgl_selesai || this.formatDate(this.state.startDate),
        tgl_pesan: date + ' ' + time,
        alamat	: data.alamat,
        waktu_selesai	: data.waktu_selesai,
        telepon	: data.telepon,
        catatan	: data.catatan || "",
        user_id	: user_now.id,
        qty		: trx.qty,
        product_id: trx.id,
        price 	: trx.price,
        subtotal	: this.state.totalAmount,
        diskon	: this.state.discountAmount,
        add_fee	: this.state.expenseAmount,
        uang_muka	: this.state.dpReservationAmount,
        uang_dibayar	: 0,
        uang_kembali	: 0,
      //  tax: this.state.totalTax,
        tax : 0,
        total		: this.state.grandTotalAmountDiscount,
        sisa_harus_bayar	: this.state.leftToPay,
        // dibayar	: "",
        // kembali	: "",
        status	: "UNPAID",
        username_approval: this.state.dataReservation["user"],
        pin_approval: this.state.dataReservation["code"]
        }
        ))
        if(where === 'doOrder'){
          if(this.state.selectedItems[0].username_approval === undefined){
            modal('alert','','','Mohon lakukan approval terlebih dahulu!')
          } else if (this.state.selectedItems[0].pin_approval === undefined){
            modal('alert','','','Mohon lakukan approval terlebih dahulu!')
          }else{
          axios.post(DefaultIP + `/api/editPreorders`, this.state.selectedItems)
          .then(res => {
            modal('bayarPesanan','','pesananOrder')
         
            // if(this.state.totalTax > 0){
            //   this.selectedPrint('pesananOrderTax')
            // }else{
            //   this.selectedPrint('pesananOrder')
            // }

          
              this.selectedPrint('pesananOrderTax')
            
            
            
            this.setState({selectedItems: []})
         
          })
          .catch(res => {
            this.setState({selectedItems: []})
            modal('alert','','',res.response.data.message)
          })
          }
        } else {
          if(this.state.selectedItems[0].username_approval === undefined){
            modal('alert','','','Mohon lakukan approval terlebih dahulu!')
          } else if (this.state.selectedItems[0].pin_approval === undefined){
            modal('alert','','','Mohon lakukan approval terlebih dahulu!')
          }else{
          // console.log('sebelum post => ', this.state.selectedItems);
          // console.log('fata post => ', trx);
          
          axios.post(DefaultIP + `/api/preorders`, this.state.selectedItems)
          .then(res => {
            
            if(res.data.status === 'success'){

              sessionStorage.removeItem('current_invoice');
              sessionStorage.setItem('current_invoice', JSON.stringify(res.data.message));
              
              modal('bayarPesanan','','pesananOrder')
             
              // if(this.state.totalTax > 0){
              //   this.selectedPrint('pesananOrderTax')
              // }else{
              //   this.selectedPrint('pesananOrder')
              // }
              this.selectedPrint('pesananOrderTax')
             this.setState({selectedItems: []})
             
             this.setState({ currentTrx: 40});
         
              
            }
      
          })
          .catch(res => {
            this.setState({selectedItems: []})
            modal('alert','','',res.response.data.message)
          })


        }
        }
    })
    console.log(this.state.selectedItems)
  }

  doRefund(modal) {
    this.setState({onRefund: true})
    let refundCode = this.state.whatRefund + '-' + (this.state.valueInputRefund["refundCode"])

   
    if(this.state.whatRefund === 'PS'){

    
      
    axios.get(DefaultIP + `/api/paid_preorders`)
    .then(res => {
      const transaction = res.data;
      let refundData = transaction.filter(function(data) {
        return data.no_transaksi === refundCode
      });
      if(refundData.length === 0){
        modal.toggleModal('alert','','','Nomor order tidak ditemukan')
      } else {
      this.setState({dataRefund: refundData, isRefundItem: true}, () => this.addSelectedRefund())
      }
    })
    }
    else if(this.state.whatRefund === 'TK'){
      axios.get(DefaultIP + `/api/PaidOrders`)
      .then(res => {
        const transaction = res.data;
        let refundData = transaction.filter(function(data) {
          return data.no_transaksi === refundCode
        });
        if(refundData.length === 0){
          modal.toggleModal('alert','','','Nomor order tidak ditemukan')
        } else {
        this.setState({dataRefund: refundData, isRefundItem: true}, () => this.addSelectedRefund())
        }
      })
      }
  }

  doNextRefund(modal) {

    const user = JSON.parse(sessionStorage.getItem('usernow'))
    this.setState({trxRefund: []})
   
    if(this.state.whatRefund === "PS"){
    let dataReservation = this.state.refundItems
     let jumDataAsli = this.state.cobaItemPs.data.length
     console.log(jumDataAsli)
    // console.log(this.state.selectedItems)
    dataReservation.forEach(data => 
    this.state.trxRefund.push({
      qty: data.qty,
      price: data.price,
      transaksi_id: data.id_trx,
      user_id: user.id,
      jum: jumDataAsli - dataReservation.length,
      product_id: data.product_id,
      preorder_id: data.preorder_id,
      total: parseInt(data.qty) * parseInt(data.price),
      username_approval: this.state.dataReservation["user"],
      pin_approval: this.state.dataReservation["code"] || this.state.valueInputRefund["approvalCode"]}))
    this.doRefundPost(modal)
    }else if (this.state.whatRefund === "TK"){
      let jumDataAsli = this.state.cobaItem.data.length
      let dataReservation = this.state.refundItems
       console.log(jumDataAsli)
      dataReservation.forEach(data => 
        this.state.trxRefund.push({
          qty: data.qty,
          price: data.price,
          transaksi_id: data.id_trx,
          preorder_id: "",
          user_id: user.id,
          jum: jumDataAsli - dataReservation.length,
          order_id: data.id,
          product_id: data.id,
          total: parseInt(data.qty) * parseInt(data.price),
          username_approval: this.state.dataReservation["user"],
          pin_approval: this.state.dataReservation["code"] || this.state.valueInputRefund["approvalCode"]}))
      this.doRefundPost(modal)


    }

  }

  doPostKas(transaction, uang_fisik, modal){
    const idKas = JSON.parse(sessionStorage.getItem('idKas'))
    const saldo_akhir = transaction.total_transaksi + transaction.saldo_awal - parseInt(transaction.total_refund)
    let postData = {
        tgl_hitung: this.getToday() + ' ' + this.getCurrentTime(),
        refund: parseInt(transaction.total_refund),
        diskon: transaction.diskon,
        transaksi: transaction.total_transaksi,
        saldo_akhir: saldo_akhir,
        uang_fisik_diterima: uang_fisik,
       // tax: transaction.tax,
       tax: 0,
        username_approval: this.state.dataReservation["user"],
        pin_approval: this.state.dataReservation["code"] || this.state.valueInputRefund["approvalCode"]
      }
    if(!postData.username_approval){
      modal.clearModal()
      modal.toggleModal('alert','','','Mohon lakukan approval terlebih dahulu!')
    } else if (!postData.pin_approval) {
      modal.clearModal()
      modal.toggleModal('alert','','','Mohon lakukan approval terlebih dahulu!')
    } else {
      // console.log({postData})
      axios.put(DefaultIP + '/api/updateKas/' + idKas.id, [postData])

      .then(res => {
      document.location.href = '/logout'
      })
      .catch(res => {
        modal.clearModal()
        modal.toggleModal('alert','','',res.response.data.message)
      })
    }
  }

  doRefundPost(modal){
    if(this.state.dataReservation["user"] === null){
      this.setState({trxRefund: []})
      modal('alert','','','Mohon lakukan approval terlebih dahulu!')
    } else if(isNaN(this.state.valueInputRefund["approvalCode"] || this.state.dataReservation["code"])){
      this.setState({trxRefund: []})
      modal('alert','','','Mohon lakukan approval terlebih dahulu!')
    } else {
    axios.post(DefaultIP + `/api/refunds`, this.state.trxRefund)
    .then(res => {
      if(this.state.whatRefund === "TK"){
        modal('bayarRefund','','kasirRefund')
        // if(this.state.totalTax > 0){
        //   this.selectedPrint('kasirRefundTax')
        // }else{
        //   this.selectedPrint('kasirRefund')
        // }
        this.selectedPrint('kasirRefundTax')
      }
      if(this.state.whatRefund === "PS"){
        modal('bayarRefund','','pesananRefund')
        // if(this.state.totalTax > 0){
        //   this.selectedPrint('pesananRefundTax')
        // }else{
        //   this.selectedPrint('pesananRefund')
        // }

        this.selectedPrint('pesananRefundTax')

      }
      this.setState({trxRefund: []})
      })
    .catch(res => {
      modal('alert','','',res.response.data.message)
      this.setState({trxRefund: [], selectedItems: []})
    })
   }
  }

  addSelectedRefund() {
    if(this.state.whatRefund === "TK"){
      let dataRefund = this.state.dataRefund[0]
      this.addSelectedTransaction(dataRefund.id, dataRefund.invoice)
    }
    else if(this.state.whatRefund === "PS"){
      let dataRefund = this.state.dataRefund[0]
        
      this.doPSRefund(dataRefund.id, dataRefund.invoice, dataRefund.user_id, "refund")  
    }
  }

 // detail tampilan refund
  doPSRefund(id, current, user_id){


    this.setState({isDisabled: false, selectedItems: []})
    let reservationCode = id
    axios.get(DefaultIP + `/api/paid_preorders`)
    .then(res => {
      const transaction = res.data;
      let reservationData = transaction.filter(function(data) {
        return data.id === reservationCode

      });
      
      console.log(reservationData)
      if(reservationData.length === 0){
        console.log("GAGAL")
      } 
      else {
      this.setState({dpReservationAmount: reservationData[0].uang_muka,  
                    changePayment: reservationData[0].subtotal - reservationData[0].uang_muka,
                    expenseAmount: reservationData[0].add_fee,
                    discountAmount: reservationData[0].discount},
                    () => axios.get(DefaultIP + '/api/preorder/' + id).then(res => {
                      const transaction = res.data;
                      this.setState({cobaItemPs: res})

                      
                      transaction.forEach((trx, i) => 
                        this.state.selectedItems.push({
                          idx: i,
                          id: trx.id,
                          id_trx: id,
                          invoice: reservationData[0].no_transaksi,
                          name: trx.item.nama_item,
                          qty: trx.jumlah,
                          price: trx.item.harga,
                          product_id: trx.item.id,
                          user_id: user_id,
                          total: reservationData[0].subtotal + reservationData[0].add_fee - reservationData[0].discount,
                          preorder_id: id,
                          nama: reservationData[0].nama,
                          alamat: reservationData[0].alamat,
                          tgl_selesai: reservationData[0].tgl_selesai,
                          telepon: reservationData[0].telepon,
                          catatan: reservationData[0].catatan,
                          add_fee: reservationData[0].add_fee,
                          uang_muka: reservationData[0].uang_muka,
                          waktu_selesai: reservationData[0].waktu_selesai,
                          sisa_harus_bayar: this.state.leftToPay,
                          tgl_pesan: reservationData[0].tgl_pesan,
                          pencatat: reservationData[0].name,
                        })
                      )
                      this.setState({items: this.state.selectedItems, currentTrx: reservationData[0].invoice}, 
                        () => {this.sumTotalAmount() 
                              this.setState({
                                isAdded: true,
                                  }, 
                                  () => {
                                    this.sumGrandTotalAmount()
                                    setTimeout(() => {
                                    this.setState({
                                      isAdded: false,
                                  });
                                }, 3500);
                              }
                            )
                          }
                        )
                      }))
      }
    })
    }

  setSelectedQtyID = (idx, id, currentQty) => {
    this.setState({
      selectedQtyID: id,
      inputQtyCartItem: currentQty,
      isCalcNumericCartOpen: true,
      onReset: true,
      activeItem: idx,
      isCashierOverlayShow: true
    });
  }

  onUpdateItem(id, newQty) {
    let index = this.state.items.findIndex( x => x.id === id);
    if (index === -1){
      console.log("ERROR")
    }else{
      this.setState({
        items: [
           ...this.state.items.slice(0,index),
           Object.assign({}, this.state.items[index], {qty: newQty}),
           ...this.state.items.slice(index+1)
        ]
      },
        () => {
          this.sumTotalAmount()
          setTimeout(() => {
            this.sumGrandTotalAmount()
          }, 1);
          this.onCloseCalc()
        } 
      );
    }
  }

  onRemoveFromCart(item) {
    console.log('ini hapus item dari list cart : onRemoveFromCart');
    const newArray = [...this.state.items];
    newArray.splice(item, 1);

    this.setState({
      items: newArray
    },
      () => {
        if(this.state.currentTrx !==null && this.state.items.length === 0){
          this.setState({isDisabled: true})
          this.sumTotalAmount()
          setTimeout(() => {
          this.sumGrandTotalAmount()
        }, 10);
        }else{
        this.sumTotalAmount()
        setTimeout(() => {
          this.sumGrandTotalAmount()
        }, 10);
      }
    }
    );
  }

  onRemoveToRefund(item) {
    // console.log('ini ?');
    this.setState({isDisabledRefund: false})
    const newArray = [...this.state.items];
    const selected = newArray.splice(item, 1);
    const newRefund = [...this.state.refundItems, selected[0]];

    this.setState({
      items: newArray,
      refundItems: newRefund
    },
      () => {
        this.sumTotalAmount()
        setTimeout(() => {
          this.sumGrandTotalAmount()
        }, 10);
      }
    );
  }
  sumTotalAmountPerRefund(idx) {
    let total = 0;
    let item = this.state.refundItems[idx];
    total = item.price * parseInt(item.qty);
    return total
  }


  sumTotalAmountPerItem(idx) {
    let total = 0;
    let item = this.state.items[idx];
    total = item.price * parseInt(item.qty);
    return total
  }
  sumTotalAmount() {
    let total = 0;
    let totalRefund = 0;
    let items = this.state.items;
    let refundItems = this.state.refundItems;
    for (var i = 0; i < items.length; i++) {
      total += items[i].price * parseInt(items[i].qty);
    }
    for (var j = 0; j < refundItems.length; j++) {
      totalRefund += refundItems[j].price * parseInt(refundItems[j].qty);
    }
    this.setState({
      totalAmount: total,
      totalRefund: totalRefund
    });
  }
  sumGrandTotalAmount() {
    let sumTotalAmount = this.state.totalAmount
    let otherExpenses = parseInt( this.state.expenseAmount )
    let grandTotalAmount = parseInt( sumTotalAmount - otherExpenses)
    // let grandPajak = parseInt((sumTotalAmount + otherExpenses)* this.state.persenTax /100)
   // let totalBulat = parseInt(Math.floor(grandPajak / 1000) * 1000 )
    //let rounding = parseInt(totalBulat - (sumTotalAmount * this.state.persenTax /100) )
     
    
    let discountAmount;
    if(this.state.discountType === '%'){
      discountAmount = parseInt( sumTotalAmount * (this.discountPercentage()/100) )
    }
    if(this.state.discountType === 'Rp'){
      discountAmount = parseInt( this.discountPrice() )
    }

    this.setState({
      discountAmount: discountAmount,
      grandTotalAmount: grandTotalAmount,
      //totalTax: totalBulat,
      

      // Math.ceil(
    },
      () => {
        // let grandTotalAmountDiscount = parseInt( sumTotalAmount + otherExpenses  - discountAmount + totalBulat)
        let grandTotalAmountDiscount = parseInt( sumTotalAmount + otherExpenses  - discountAmount)
        let leftToPay = parseInt (grandTotalAmountDiscount  - this.dpPrice())
       
        this.setState({
          grandTotalAmountDiscount: grandTotalAmountDiscount,
          leftToPay: leftToPay
        },
          () => {
            this.sumChangePayment()
          }
        )
      }
    )
  }

  discountPercentage(){
    let discount = this.state.valueInputPayment["paymentDiscount"] || this.state.discountPercentage
    if(discount === undefined || discount === ''){
      discount = 0;
    }
    if(discount > 100){
      discount = 100;
    }
    this.setState({
      discountPercentage: discount
    })
    return discount
  }

  discountPrice(){
    let discount = this.state.valueInputPayment["paymentDiscount"] || this.state.valueInputBooking["paymentDiscount"] || this.state.discountAmount
    let sumTotalAmount = parseInt( this.state.totalAmount)
    if(discount === undefined || discount === ''){
      discount = 0;
    }
    if(discount >= sumTotalAmount){
      discount = sumTotalAmount;
    }
    return discount
  }

  dpPrice(){
    let dp = this.state.valueInputBooking["bookingPayment"] || this.state.dpReservationAmount
    let otherExpenses = parseInt( this.state.expenseAmount )
    let discountAmount = parseInt( this.state.discountAmount )
   // let totalTax = parseInt(this.state.totalTax)
    // let sumTotalAmount = parseInt( this.state.totalAmount + otherExpenses - discountAmount  + totalTax)
    let sumTotalAmount = parseInt( this.state.totalAmount + otherExpenses - discountAmount )
    
    if(dp === undefined || dp === ''){
      dp = 0;
    }
    if(dp >= sumTotalAmount){
      dp = sumTotalAmount;
    }
    return dp
  }

  getTotalPayment(){
    let cashPayment = parseInt(this.state.paymentMethod.value["cash"]) || 0
    let transferPayment = parseInt(this.state.paymentMethod.value["transfer"]) || 0
    let qrisPayment = parseInt(this.state.paymentMethod.value["qris"]) || 0
    let valuePaymentBooking = parseInt(this.state.valueInputPayment["paymentTotal"]) || 0
    let grandPayment = cashPayment+transferPayment+qrisPayment+valuePaymentBooking;
    return grandPayment
  }

  sumChangePayment() {
    // let totalPayment = parseInt( this.state.valueInputPayment["paymentTotal"] || this.state.valueInputBooking["bookingAddition"])
    let grandPayment = this.getTotalPayment();
    let totalPayment = parseInt( grandPayment || this.state.valueInputBooking["bookingAddition"])
    
    this.setState({payment: totalPayment})
    if(isNaN(totalPayment)){
      totalPayment = 0
    }

    let grandTotalAmountDiscount =  parseInt( this.state.grandTotalAmountDiscount )
    let dpReservationAmount = this.state.dpReservationAmount
    let changePayment = parseInt( totalPayment - grandTotalAmountDiscount + dpReservationAmount )
    
    this.setState({
      changePayment: changePayment
    })
  }

  onEnterRefund = (modal) => {
    this.doRefund(modal)
  };



  // ===============
  // KEYBOARD ACTION
  // ===============
  onChange = inputQtyCartItem => {
    console.log(inputQtyCartItem, 'ini')
    this.setState({
      inputQtyCartItem: inputQtyCartItem
    });
  };

  onKeyPress = (button) => {
    if (button === "{enter}") {
      this.onEnter(this.state.selectedQtyID, this.state.inputQtyCartItem);
    }
  };

  onEnter = (id, newQty) => {
    this.onUpdateItem(id, newQty)
  };

  onOpenCalc = () =>{
    this.setState({
      isCalcNumericCartOpen: true
    })
  }

  onCloseCalc = () =>{
    this.setState({
      isCalcNumericCartOpen: false,
      activeItem: -1,
      isCashierOverlayShow: false
    })
  }
  
  // /END KEYBOARD ACTION
  toggleCashierOverlayShow = () => {
    this.setState({
      isCashierOverlayShow: !this.state.isCashierOverlayShow
    })
  }


  isRefundTK = () => {
    this.toggleRefundTK()
  }

  toggleRefundTK = () => {
    this.setState({
      isRefundPSShow: false,
      isRefundTKShow: !this.state.isRefundTKShow
    })
  }
  isRefundPS = () => {
    this.toggleRefundPS()
  }

  toggleRefundPS = () => {
    this.setState({
      isRefundTKShow: false,
      isRefundPSShow: !this.state.isRefundPSShow
    })
  }



  // ===============
  // PAYMENT ACTIONS
  // ===============
  paymentCheckout = () => {
    this.togglePaymentCheckoutShow()
  }

  togglePaymentCheckoutShow = () => {
    this.setState({
      isReservationListShow: false,
      isTransactionListShow: false,
      isDoneTransactionListShow: false,
      isRefundShow: false,
      isReservationCheckoutShow: false,
      isPaymentCheckoutShow: !this.state.isPaymentCheckoutShow
    })
  }

  reservationCheckout = () => {
    this.toggleReservationCheckoutShow()
  }

  toggleReservationCheckoutShow = () => {
    this.setState({
      isReservationListShow: false, 
      isTransactionListShow: false,
      isDoneTransactionListShow: false,
      isRefundShow: false,
      isPaymentCheckoutShow: false,
      isReservationCheckoutShow: !this.state.isReservationCheckoutShow
    })
  }

  // =============
  // ORDER ACTIONS
  // =============
  orderBooking = () => {
    this.toggleOrderBookingShow()
  }

  toggleOrderBookingShow = () => {
    this.setState({
      isOrderBookingDeleteShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: false,
      isBookingDeleteShow: false,
      isBookingEditShow: false,
      isBookingTakeShow: false,
      isOrderBookingShow: !this.state.isOrderBookingShow
    })
  }

  orderBookingDelete = () => {
    this.setState({whatBooking: 'deleteBooking'})
    this.toggleOrderBookingDeleteShow()
  }

  toggleOrderBookingDeleteShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: false,
      isBookingDeleteShow: false,
      isBookingEditShow: false,
      isBookingTakeShow: false,
      isOrderBookingDeleteShow: !this.state.isOrderBookingDeleteShow,
    })
  }

  orderBookingEdit = () => {
    this.setState({whatBooking: 'editBooking'})
    this.toggleOrderBookingEditShow()
  }

  toggleOrderBookingEditShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingDeleteShow: false,
      isOrderBookingTakeShow: false,
      isBookingDeleteShow: false,
      isBookingEditShow: false,
      isBookingTakeShow: false,
      isOrderBookingEditShow: !this.state.isOrderBookingEditShow,
    })
  }
  orderBookingTake = () => {
    this.setState({whatBooking: 'takeBooking'})
    this.toggleOrderBookingTakeShow()
  }

  toggleOrderBookingTakeShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingDeleteShow: false,
      isOrderBookingEditShow: false,
      isBookingDeleteShow: false,
      isBookingEditShow: false,
      isBookingTakeShow: false,
      isOrderBookingTakeShow: !this.state.isOrderBookingTakeShow,
    })
  }

  bookingDelete = () => {
    this.toggleBookingDeleteShow()
  }

  toggleBookingDeleteShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingDeleteShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: false,
      isBookingEditShow: false,
      isBookingTakeShow: false,
      isBookingDeleteShow: !this.state.isBookingDeleteShow,
    })
  }

  bookingEdit = () => {
    this.toggleBookingEditShow()
  }

  toggleBookingEditShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingDeleteShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: false,
      isBookingDeleteShow: false,
      isBookingTakeShow: false,
      isBookingEditShow: !this.state.isBookingEditShow,
    })
  }

  bookingTake = () => {
    this.toggleBookingTakeShow()
  }

  toggleBookingTakeShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingDeleteShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: false,
      isBookingEditShow: false,
      isBookingDeleteShow: false,
      isBookingTakeShow: !this.state.isBookingTakeShow,
    })
  }

  moveCaretAtEnd(e) {
    let temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  setActiveInputPayment = (event) => {
    console.log(event.target.id, 'ini id')
    document.getElementById(event.target.id).focus();
    this.setState({
      activeInputPayment: event.target.id,
      activeInputRefund: ""
    });
  }

  onChangePayment = valueInputPayment => {
    console.log(this.state, 'xx')
    if(this.state.activeInputPayment === "approvalUser" || this.state.activeInputPayment === "approvalCode"){
      this.setState({
        valueInputRefund: valueInputPayment,
      });
    } else if(this.state.activeInputPayment === "cash"){
      this.setState(prevState => ({
        paymentMethod: {
          ...prevState.paymentMethod,
          value: valueInputPayment,
        }
      }),
        () =>{
          this.sumGrandTotalAmount()
        }
      )
    } else if(this.state.activeInputPayment === "transfer"){
      this.setState(prevState => ({
        paymentMethod: {
          ...prevState.paymentMethod,
          value: valueInputPayment,
        }
      }),
        () =>{
          this.sumGrandTotalAmount()
        }
      )
    } else if(this.state.activeInputPayment === "qris"){
      this.setState(prevState => ({
        paymentMethod: {
          ...prevState.paymentMethod,
          value: valueInputPayment,
        }
      }),
        () =>{
          this.sumGrandTotalAmount()
        }
      )
    } else {
      this.setState({
        valueInputPayment: valueInputPayment,
      },
        () =>{
          this.sumGrandTotalAmount()
        }
      );
    };
    // console.log(valueInputPayment, "INI VALUE", this.state.paymentMethod.value)
  }
  onChangeValuePayment = valueInputPayment => {
    console.log(valueInputPayment);
    // this.setState({
    //   valueInputPayment: {paymentTotal: valueInputPayment.value},
    // },
    //   () =>{
    //     this.sumGrandTotalAmount()
    //   }
    // );
  };

  setActiveInputBooking = (event) => {
    document.getElementById(event.target.id).focus();
    this.setState({
      activeInputBooking: event.target.id,
      // expenseAmount: event.target.value
    })
  }

  // changeBook = event => {

  // }

  onChangeBooking = valueInputBooking => {
    if(this.state.activeInputBooking === "bookingAddition"){
      const add_fee = valueInputBooking.value
      this.setState({expenseAmount: add_fee || 0}, () => this.sumGrandTotalAmount(), this.state.dataReservation["add_fee"] = this.state.expenseAmount)
    }
    else if(this.state.activeInputBooking === "paymentDiscount"){
      const discount = valueInputBooking.value
      if(this.state.discountType === 'Rp'){
        this.setState({discountAmount: discount || 0}, () => this.sumGrandTotalAmount(), this.state.dataReservation["diskon"] = this.state.discountAmount)
      }
      else if(this.state.discountType === '%'){
        this.setState({discountPercentage: discount || 0}, () => this.sumGrandTotalAmount(), this.state.dataReservation["diskon"] = this.state.discountAmount)
      }
    }
    else if(this.state.activeInputBooking === "bookingPayment"){
      const dp = valueInputBooking.value
      this.state.dataReservation["status"] = "UNPAID";
      this.setState({dpReservationAmount: dp || 0}, () => this.sumGrandTotalAmount(), this.state.dataReservation["dibayar"] = this.state.dpReservationAmount)
    } 
    else if (this.state.activeInputBooking === 'bookingName'){
      const name = valueInputBooking.target.value
      this.state.dataReservation["nama"] = name;
    }
    else if (this.state.activeInputBooking === 'bookingAddress'){
      const address = valueInputBooking.target.value
      this.state.dataReservation["alamat"] = address;
    }
    else if (this.state.activeInputBooking === 'bookingPhone'){
      const phone = valueInputBooking.target.value
      this.state.dataReservation["telepon"] = phone;
    }
    else if (this.state.activeInputBooking === 'bookingNote'){
      const note = valueInputBooking.target.value
      this.state.dataReservation["catatan"] = note;
    }
    else if (this.state.activeInputBooking === 'note'+this.state.selectedProduct.name){
      const note = valueInputBooking.target.value
      this.state.produksi["note"+this.state.selectedProduct.name] = note;
      let index = this.state.production.findIndex( x => x.id === this.state.selectedProduct.id)
      this.setState({
        production: [
           ...this.state.production.slice(0,index),
           Object.assign({}, this.state.production[index], {catatan: note || ""}),
           ...this.state.production.slice(index+1)
        ]
      })
    }
  }

  onChangeUserApprove = event => {
      const user = event.target.value
      this.state.dataReservation["user"] = user;
  }
  onChangePinApprove = event => {
      const code = event.target.value
      this.state.dataReservation["code"] = code;
  }

  onChangeTime = (time) => this.setState({ time }, 
    () => this.state.dataReservation["waktu_selesai"] = time)

  handleDateChange = (date) => this.setState({startDate: date, whatDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}, 
    () => this.state.dataReservation["tgl_selesai"] = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());

  setActiveInputEditBooking = (event) => {
    document.getElementById(event.target.id).focus();
    this.setState({
      activeInputEditBooking: event.target.id,
    })
  }

  onChangeEditBooking = (valueInputEditBooking) => {
    this.setState({
      valueInputEditBooking: valueInputEditBooking.target.value
    })
  }

  onKeyPressPayment = (button) => {
    console.log(button, 'ini button')
    if (button === "{rp}") {
      this.setState({
        discountType: 'Rp'
      })
    }
    if (button === "{percentage}") {
      this.setState({
        discountType: '%'
      })
    }
    if (button === "{enter}") {
      this.onEnterPayment();
    }
  };

  onResetPayment = () => {
    this.setState({
      grandTotalAmountDiscount: this.state.totalAmount,
      discountAmount: 0
    })
  }

  onEnterPayment = () => {
    this.sumChangePayment()
  };

  // ===============
  // SHOW TRX ACTIONS
  // ===============
  openTransaction = () => {
    // alert("ini");
    this.clearCart()
    this.toggleOpenTransactionShow()
  }

   openDoneTransaction = () => {
    // alert("ini");
    this.clearCart()
    this.toggleOpenDoneTransactionShow()
  }

  toggleOpenTransactionShow = () => {
    this.setState({
      isReservationListShow: false,
      isRefundShow: false,
      isPaymentCheckoutShow: false,
      isReservationCheckoutShow: false,
      isDoneTransactionListShow: false,
      isTransactionListShow: !this.state.isTransactionListShow,
    })
  };

  toggleOpenDoneTransactionShow = () => {
    this.setState({
      isReservationListShow: false,
      isRefundShow: false,
      isPaymentCheckoutShow: false,
      isReservationCheckoutShow: false,
      isDoneTransactionListShow: !this.state.isDoneTransactionListShow,
      isTransactionListShow: false,
    })
  };

  // ===============
  // SHOW TRX ACTIONS
  // ===============
  openReservation = () => {
    this.clearCart()
    this.toggleOpenReservationShow()
  }

  toggleOpenReservationShow = () => {
    this.setState({
      isTransactionListShow: false,
      isDoneTransactionListShow: false,
      isRefundShow: false,
      isPaymentCheckoutShow: false,
      isReservationCheckoutShow: false,
      isReservationListShow: !this.state.isReservationListShow
    })
  };

  // ===============
  // SHOW TRX ACTIONS
  // ===============
  openRefund = () => {
    this.clearCart()
    this.toggleOpenRefundShow()
    this.setState({payRefundTK : false})
  }

  toggleOpenRefundShow = () => {
    this.setState({
      isReservationListShow: false,
      isTransactionListShow: false,
      isReservationCheckoutShow: false,
      isPaymentCheckoutShow: false,
      isRefundShow: !this.state.isRefundShow
    })
  }

  resetActiveInputRefund = () => {
    this.setState({
      activeInputRefund: "",
      valueInputRefund : ""
    });
  }
  setActiveInputRefund = (event) => {
    document.getElementById(event.target.id).focus();
    this.setState({
      activeInputRefund: event.target.id,
      activeInputPayment: ""
    });
  }
  onChangeRefund = valueInputRefund => {
    this.setState({
      valueInputRefund: valueInputRefund || 0
    });
  };

  productNote = () => {
    return "A"
  }

  setRefund = (code) => {
    if(code === "TK"){
      this.setState({selectedRefund: 'TK'})
    }else if(code === "PS"){
      this.setState({selectedRefund: 'PS'})
    }else{
      console.log("SALAH !")
    }
  }

  handleRefundChange = (event) => {
    if (this.state.selectedRefund === 'PS'){
      this.setState({selectedRefund: event.target.value, whatRefund: event.target.value, refundItems: [] })
    }
    if (this.state.selectedRefund === 'TK'){
      this.setState({selectedRefund: event.target.value, whatRefund: event.target.value, refundItems: [] })
    }
  }

  handleDiscountChange= (event) => {
    if (this.state.discountType === 'Rp'){
      this.setState({discountType: event.target.value})
    }
    if (this.state.discountType === '%'){
      this.setState({discountType: event.target.value})
    }
  }

  //bayar transaksi kasir
  doTransaction(user_id, modal) {
    // alert("ini dia");
    let whatBooking = this.state.refund
    let items = this.state.items
    let cash = parseInt(this.state.paymentMethod.value["cash"]) || 0
    let transfer = parseInt(this.state.paymentMethod.value["transfer"]) || 0
    let qris = parseInt(this.state.paymentMethod.value["qris"]) || 0
    if((cash + transfer + qris) > this.state.leftToPay){
      cash = this.state.leftToPay - transfer - qris;
    }
            
    this.setState({data: []}, () => {
    if(whatBooking.length === 0){
      items.forEach((x) => 
      this.state.data.push({
            no_transaksi : this.state.Tcode,
            r_code: this.state.currentTrx,
            user_id: user_id,
            product_id: x.id,
            qty: x.qty,
            price: x.price * x.qty,
            subtotal: this.state.totalAmount,
            diskon: this.state.discountAmount,
            total: this.state.grandTotalAmountDiscount,
            dibayar: this.state.payment,
            kembali: this.state.changePayment,
            // tax: this.state.totalTax,
            tax: 0,
            cash: cash,
            transfer: transfer,
            qris: qris,
            status: "PAID",
          })
      )
      this.doPayment(modal)
    }else{
      this.deleteSelectedOrder(whatBooking[0])
      items.forEach((x) => 
      this.state.data.push({
            invoice: whatBooking[1],
            user_id: user_id,
            r_code: this.state.currentTrx,
            product_id: x.id,
            id: x.id_trx,
            qty: x.qty,
            price: x.price * x.qty,
            subtotal: this.state.totalAmount,
            diskon: this.state.discountAmount,
            total: this.state.grandTotalAmountDiscount,
            dibayar: this.state.payment,
            kembali: this.state.changePayment,
           // tax: this.state.totalTax,
            tax: 0,
            cash: cash,
            transfer: transfer,
            qris: qris,
            status: "PAID",
        })
      )
      this.doPayment(modal)
    }
  })
  }

  doPayment(modal){
    // let totalPayment = parseInt( this.state.valueInputPayment["paymentTotal"])
    let totalPayment = this.getTotalPayment();
    if(isNaN(totalPayment)){
      modal('alert','','','Harap masukkan uang pembayaran')
    }
    else if(totalPayment < this.state.leftToPay){
      modal('alert','','','Uang pembayaran anda kurang')
    }else{
      let Tcode = this.state.Tcode;
      console.log(this.state.Tcode);
      if(Tcode === ""){
        console.log(this.state.data);
        this.setState({prosesBayar: true});
        axios.post(DefaultIP + `/api/orders`, this.state.data)
          .then(res => {
            console.log(res.data.status);
            this.setState({prosesBayar: false});

            if(res.data.status === 'success'){
              modal('bayarAmbil','','kasir')

                this.selectedPrint('kasirTax')
                this.setState({prosesBayar: false, refund: [], data: []})
            
            }
            
          })
            .catch(res => {
            
              modal('alert', '' , '', res.response.data.message)
              this.setState({prosesBayar: false, refund: [], data: []})}
        )
      }else{
        axios.post(DefaultIP+`/api/bayar_transaksi`, this.state.data)
          .then(res => {
            // console.log(res);
            if(res.data.status === 'success'){
              modal('bayarAmbil','','kasir')
           
            // if(this.state.totalTax > 0){
            //   this.selectedPrint('kasirTax')
            // }else{
            //   this.selectedPrint('kasir')
            // }

            this.selectedPrint('kasirTax')
            this.setState({prosesBayar: false, refund: [], data: []});
            this.setState({
              Tcode: '',
              
            })
            }

            
          }).catch(res => {
           // modal('alert', '' , '', res.response.data.message)
            this.setState({prosesBayar: false, refund: [], data: []})
          });
      }


     
      
    }
  }

// bayarPreorder/pesanan
  doReservation(user_id, modal) {


    
    let items = this.state.selectedItems
    let totalPayment = parseInt( this.state.valueInputPayment["paymentTotal"])
    let user = this.state.dataReservation["user"];
    let pass = this.state.dataReservation["code"] || this.state.valueInputRefund["approvalCode"];
    if(isNaN(totalPayment)){
      modal('alert','','','Harap masukkan uang pembayaran')
    }
    else if(totalPayment < this.state.leftToPay){
      modal('alert','','','Uang pembayaran anda kurang')
    }
    else if(user === undefined){
      modal('alert','','','Mohon lakukan approval terlebih dahulu!')
    }
    else if(pass === undefined){
      modal('alert','','','Mohon lakukan approval terlebih dahulu!')
    }
    else{

      let myData = [];
      items.forEach(item => {
        myData.push({
          add_fee: item.add_fee,
          alamat: item.alamat,
          catatan: item.catatan,
          id: item.id,
          idx: item.idx,
          invoice: item.invoice,
          nama: item.nama,
          name: item.name,
          preorder_id: item.preorder_id,
          price: item.price,
          product_id: item.product_id,
          qty: item.qty,
          sisa_harus_bayar: item.sisa_harus_bayar,
          telepon: item.telepon,
          tgl_selesai: item.tgl_selesai,
          tgl_pesan: item.tgl_pesan,
          total: item.total,
          uang_muka: item.uang_muka,
          waktu_selesai: item.waktu_selesai,
          uang_dibayar: this.state.valueInputPayment["paymentTotal"],
          uang_kembali: this.state.changePayment,
          diskon: this.state.discountAmount,
          subtotal: this.state.totalAmount,
          status: "1",
          user_id: user_id,
          hari_pelunasan: item.hari_pelunasan,
          username_approval: this.state.dataReservation["user"],
          pin_approval: this.state.dataReservation["code"] || this.state.valueInputRefund["approvalCode"],
        })
      });

      console.log(myData)
      axios.post(DefaultIP + `/api/bayarPreorder`, myData)
      .then(res => {

        if(res.data.status === 'success'){
          modal('pesananAmbil','','pesanan')
          
          // if(this.state.totalTax > 0){
          //   this.selectedPrint('pesananTax')
          // }else{
          //   this.selectedPrint('pesanan')
          // }
          this.selectedPrint('pesananTax')
          this.setState({refund: []}) 
        }

       

      })
      .catch(res => {
        modal('alert','','',res.response.data.message)
        this.setState({refund: []})
      })
    }
  }
  
  doOrder = (id) => {
    this.setState({isRefundPSShow: true, disabledOrder: true, disabledOther: true, isInOrder:!this.state.isInOrder, inOrder:!this.state.inOrder})
    let orderCode = id

    
    axios.get(DefaultIP + `/api/preorders`)
    .then(res => {
      const transaction = res.data;
      let orderData = transaction.filter(function(data) {
        return data.id === orderCode
      });
      if(orderData.length === 0){
        console.log("GAGAL")
      } else {
      this.setState({dataReservation: orderData[0], startDate: new Date(orderData[0].tgl_selesai), time: orderData[0].waktu_selesai}, 
        () => {if(this.state.whatBooking === 'deleteBooking'){
                this.deleteOrder(id)
                this.setState({onRefund: true})
              }
              if(this.state.whatBooking === 'editBooking') {
                this.editOrder(id)
                this.setState({popStatus: !this.state.popStatus})
              }
              if(this.state.whatBooking === 'takeBooking') {
                this.takeOrder(id)
                this.setState({onRefund: true})
              }})
      }
    })
  }

  deleteOrder = (id) => {
    this.bookingDelete()
    this.addSelectedReservation(id)
  }

  editOrder = (id) => {
    this.bookingEdit()
    this.addSelectedReservation(id)
  }
  takeOrder = (id) => {
    this.bookingTake()
    this.addSelectedReservation(id)
  }

  deleteSelectedOrder(id, idx) {
    axios.delete(DefaultIP + `/api/order/` + id)
    const newTrx = [...this.state.transaction];
    newTrx.splice(idx, 1);
    this.setState({transaction: newTrx})
  }

  deleteReservationModal(modal) {
    let id = this.state.dataReservation.id
    axios.put(DefaultIP + `/api/cancelPreorder/` + id, [{username_approval: this.state.dataReservation["user"],
                                                                      pin_approval: this.state.dataReservation["code"]}])
    .then(res => {
      modal('hapus')
    })
    .catch(res => {
      modal('alert', '', '',res.response.data.message)
    })
  }


  doProduction = (id, modal, baseProduct) => {
    let qty1 = this.state.valueInputRefund["refundCode1"] || 0
    let qty4 = this.state.valueInputRefund["refundCode4"] || 0
    let qty5 = this.state.valueInputRefund["refundCode5"] || 0
    let user = this.state.dataReservation['user']
    let pin = this.state.dataReservation['code'] || this.state.valueInputRefund["approvalCode"]
    let index = this.state.production.findIndex(x => String(x.id) === String(id) || String(x.product_id) === String(id));
    const sourceProduct = baseProduct || this.state.production[index] || this.state.selectedProduct
    const safeIndex = index === -1 ? this.state.production.length : index;

    if(this.state.activeInputRefund === "approvalCode" ||
      this.state.activeInputRefund === "approvalUser" ||
      this.state.activeInputRefund === "refundCode1" ||
      this.state.activeInputRefund === "refundCode2" ||
      this.state.activeInputRefund === "refundCode3" ||
      this.state.activeInputRefund === "refundCode4" ||
      this.state.activeInputRefund === "refundCode5"){
      
        if(qty1 !== 0){
          if(user === undefined ){
            modal.clearModal()
            modal.toggleModal('alert','','','Mohon lakukan approval terlebih dahulu!')
          }
          else if (pin === undefined){
            modal.clearModal()
            modal.toggleModal('alert','','','Mohon lakukan approval terlebih dahulu!')
          } else if (this.state.production === ""){
            modal.clearModal()
            modal.toggleModal('alert','','',index)
          }else{
            console.log("produksi1")
            this.setState({production:[  
              {lain: 0},
              {rusak: 0},          
              {produksi1: 0},
            ]})
         // this.state.produksi[this.state.selectedProduct.name+"produksi1"] = parseInt(this.state.production[index].produksi1 || 0 ) + parseInt(qty1 || 0)

          const updatedProduction = Object.assign({}, sourceProduct, 
               {produksi1: parseInt(qty1)},
               {total_produksi: 0},
               {sisa_stock: 0},       
               {ket_rusak: 0},
               {lain: 0},
              {rusak: 0}, 
               {catatan: sourceProduct.catatan || "tidak ada catatan"},
               {username_approval: user},
               {pin_approval: pin})

          this.setState({
            production : [
               ...this.state.production.slice(0,safeIndex),
               updatedProduction,
               ...this.state.production.slice(safeIndex+1)
            ]
          }, () => this.changeDate(updatedProduction, modal))
          }
        }
          
            
              else if(qty4 !== 0){
                if(user === undefined ){
                  modal.clearModal()
                  modal.toggleModal('alert','','','Mohon lakukan approval terlebih dahulu!')
                }
                else if (pin === undefined){
                  modal.clearModal()
                  modal.toggleModal('alert','','','Mohon lakukan approval terlebih dahulu!')
                }
                else{
                   console.log("rusak")
                   this.setState({production:[  
                    {lain: 0},
                    {rusak: 0},          
                     {produksi1: 0},
                  ]})
              //  this.state.produksi[this.state.selectedProduct.name+"rusak"] = parseInt(this.state.production[index].ket_rusak || 0 ) + parseInt(qty4 || 0)

                 const updatedProduction = Object.assign({}, sourceProduct, 
                     {ket_rusak: parseInt(qty4)}, 
                     {rusak: parseInt(qty4)}, 
                     {lain: 0}, 
                     {total_lain: 0},
                     {sisa_stock: 0},           
                     {produksi1: 0},
                     {total_produksi: 0},
                   {catatan: sourceProduct.catatan || "tidak ada catatan"},
                     {username_approval: user},
                     {pin_approval: pin})

                this.setState({
                  production: [
                   ...this.state.production.slice(0,safeIndex),
                     updatedProduction,
                   ...this.state.production.slice(safeIndex+1)
                  ]
                }, () => this.changeDate(updatedProduction, modal))
              }
            }
              else if(qty5 !== 0){
                if(user === undefined ){
                  modal.clearModal()
                  modal.toggleModal('alert','','','Mohon lakukan approval terlebih dahulu!')
                }
                else if (pin === undefined){
                  modal.clearModal()
                  modal.toggleModal('alert','','','Mohon lakukan approval terlebih dahulu!')
                }
                else{
                console.log("dan lain lain")
                this.setState({production:[  
                  {lain: 0},
                  {rusak: 0},          
                   {produksi1: 0},
                ]})
                //this.state.produksi[this.state.selectedProduct.name+"lain"] = parseInt(this.state.production[index].ket_lain || 0 ) + parseInt(qty5 || 0)
                console.log(qty5)
                const updatedProduction = Object.assign({}, sourceProduct, 
                      {ket_lain: parseInt(qty5)},
                      {rusak: 0}, 
                      {lain: parseInt(qty5)}, 
                     {sisa_stock: 0},           
                     {produksi1: 0},
                     {total_produksi: 0},
                     {catatan: sourceProduct.catatan || "tidak ada catatan"},
                     {username_approval: user},
                     {pin_approval: pin})
                this.setState({
                  production: [
                     ...this.state.production.slice(0,safeIndex),
                     updatedProduction,
                     ...this.state.production.slice(safeIndex+1)
                  ]
                }, () => this.changeDate(updatedProduction, modal))
              }
            }
              else {
                modal.clearModal()
                modal.toggleModal('alert','','','Input data tidak sesuai')
              }
          }
  }

  getStokNow = () => {
    let total = 0
    let data = this.state.production
    let whatId = this.state.selectedProduct.id
    let filterData = data.filter(function(data){
      return data.id === whatId
    })
    if(filterData.length !== 0){
      // total = stok+produksi1+produksi2+produksi3-total_penjualan-total_lain
    
      total = parseInt(filterData[0].sisa_stock || 0)
      return total
    } else {
      return total
    }
    
  }

  getStokAwal(){
    let total = 0
    let data = this.state.production
    let whatId = this.state.selectedProduct.id
    let filterData = data.filter(function(data){
      return data.id === whatId
    })
    if(filterData.length === 0){
      return total
    } else {
    return parseInt(filterData[0].stock_awal)
    }
  }

  changeDate = (productionItem, modal) => {




    const dataFiltered = Array.isArray(productionItem) ? productionItem : [productionItem]
   
    
  

    axios.post(DefaultIP + `/api/postProduction`, dataFiltered)
    .then(res => {
      if(res.data.status === 'success'){
        
          this.clearCart()
          modal.clearModal() 
        

      }else{
        modal.clearModal()
      }
    })
    .catch(res => {modal.clearModal() 
                   modal.toggleModal('alertProduksi','','',res.response.data.message)
  })

  // window.location.reload(false);

    
}

  changeAllDate(modal, close){
    axios.get(DefaultIP + `/api/products`)
    .then(res => {
      const allProduct = res.data;
      var result = allProduct.map(function(el) {
        var o = Object.assign({}, el);
        o.product_id= o.id
        o.produksi1= 0;
        o.produksi2= 0
        o.produksi3= 0;
        o.total_produksi= 0;
        o.ket_rusak= 0;
        o.ket_lain= 0;
        o.total_lain= 0;
        o.catatan= "tidak ada catatan";
        o.sisa_stock = o.stock;
        o.stock_awal = o.stock;
        o.penjualan_pemesanan = 0;
        o.penjualan_toko = 0;
        o.total_penjualan = 0;
        o.ubah_tanggal = "yes"
        return o;
      })

      console.log(result)
      axios.post(DefaultIP + `/api/ubahTanggal`, result)
    .then(res => {
      this.clearCart()
      this.getDateTrx()
      close()
    })
    .catch(res => {
      modal('alert')
    })
    })
  }

  getDateTrx(){
    axios({timeout: 4000, method: 'get', url:DefaultIP + `/api/GetLastDate`})
    .then(res => {
      this.setState({date: res.data}, () => {
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); 
        var date = this.state.date.date
        if(date === 'no production') {
          this.setState({date: "TimeOut"})
        }else{
        var splitDate = date.created_at.split(" ")
        var takeDate = splitDate[0]
        var takeDate2 = splitDate[0].toString()
        var split = takeDate2.split('-')
        var tanggal = new Date(takeDate).getDate()
        const formatedDate = split[2] + '/' + split[1] + '/' + split[0]

        this.setState({lastDate: takeDate, formatDate: formatedDate, prevDate: (tanggal - 1) + '/' + month + '/' + year})
        }
      })
    })
  }

  doPrint(id){
    var content = document.getElementById(id);

    var pri = document.getElementById("printArea").contentWindow;
    pri.document.open();
    // pri.document.write(String.fromCharCode(0x1B, 0x70, 0x30, 0x37, 0x79));
    pri.document.write(content.innerHTML);
    // pri.document.write(String.fromCharCode(0x0A, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A, 0x0A));
    pri.document.close();
    pri.focus();
    pri.print();
  }

  selectedPrint(type) {
    switch(type) {
      // case 'abc':
      //   return (
      //     this.doPrint("abc")
      //   );
      case 'kasir':
        return (
          this.doPrint("kasirBayar")
        );
      case 'kasirRefund':
        return (
          this.doPrint("kasirRefund")
      );
      case 'pesananOrder':
        return (
          this.doPrint("pesananOrder")
        );
      case 'pesanan':
        return (
          this.doPrint("pesananBayar")
        );
      case 'pesananRefund':
        return (
          this.doPrint("pesananRefund")
        );
        case 'kasirTax':
        return (
          this.doPrint("kasirBayarTax")
        );
      case 'kasirRefundTax':
        return (
          this.doPrint("kasirRefundTax")
      );
      case 'pesananOrderTax':
        return (
          this.doPrint("pesananOrderTax")
        );
      case 'pesananTax':
        return (
          this.doPrint("pesananBayarTax")
        );
      case 'pesananRefundTax':
        return (
          this.doPrint("pesananRefundTax")
        );
      default:
        return (
          console.log("C")
        );
    }
  }

  checkApproval = (modal) =>{
    let data = [{
      username_approval: this.state.dataReservation["user"],
      pin_approval: this.state.dataReservation["code"] || this.state.valueInputRefund["approvalCode"]
    }]

    axios.post(DefaultIP + `/api/CheckApproval`, data)
    .then(res => {
      if(res.data.status === 'success'){
        this.setState({approveOK: true})
      }else{
        modal.clearModal()
        modal.toggleModal('alert', '', '', 'Anda Bukan Approval')
      }
    })
    .catch(res => {
      modal.clearModal()
      modal.toggleModal('alert', '', '', 'Mohon lakukan approval terlebih dahulu!')
    })
  }
}

export default CartsContainer