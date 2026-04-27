import React from 'react'
import { NumericFormat as NumberFormat } from 'react-number-format'
// import "./PrintArea.css"

const headContent = () =>{
  return (<div>
          < br />
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '80%'}} align='center'>Agogo Cake & Bakery</p>
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif' ,fontSize: '60%'}} align='center'> 
              Jalan Woltermonginsidi<br />
              Kel. Girian Indah - Kec. Girian<br />
              Bitung | Sulawesi Utara<br />
              Telp. 0438 2230652<br />
              Fax. 0821 8749 8746<br />
          </p>
          </div>
  )
}

const paperFeed = () => {
  return (<div>
    <br />
    <br />
    <br />
    <br />
    <p align='center'>-</p>
  </div>)
}

const PrintArea = (props) => {
return (
<div>
  <iframe id="printArea" title="coba" style={{display: 'none', width: '70mm', height: '50mm'}} media="print" />

  <div id="abc"></div>
  {/* KASIR BAYAR*/}
  <div id="kasirBayar" style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
  {headContent()}
    ------------------------------
      <table>
       <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}>Jenis</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: Pembelian</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}>No orderz</td>
          <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {`${props.cartStore.state.currentTrx}${window.appConfig.VITE_RECEIPT_CODE || ''}`}</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>Tanggal</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.cartStore.getDateTime()}</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>Kasir</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.namaKasir}</td>
        </tr>
        </table>
        ------------------------------
        {/* <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>PEMBELIAN </p> */}
        <table>
          {/* <thead>
            <tr>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Jumlah</th>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Item</th>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Sub Total</th>
            </tr>
          </thead> */}
          {props.cartStore.state.items.map((item,index) => 
              <tr class="service">
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif',  fontSize: '50%'}}align="center">{index + 1}.</td>
                {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left"><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}align="left"> {item.name} {item.qty} x {item.price}</td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}align="right"><NumberFormat value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>
          )}
          </table>
          ------------------------------
          <table>

          <tr class="tabletitle">
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Subtotal </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%', float:'right'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>

  
           
          </table>

          ------------------------------
          <table>
          <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Grand Total </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
         
          <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Pembayaran </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.getTotalPayment()} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
          <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Kembali </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
          {/* <p>---------------------------------------</p> */}
        </table>
      <p style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '65%'}} align='center'>
        *** {props.cartStore.state.items.length} ITEM ***<br />
        Terima kasih<br />
        Atas kunjungan anda<br />
      </p>
      {/* {headContent()} */}
      {/* {paperFeed()} */}
    </div>

    

    































  <div id="kasirRefund" style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
  {headContent()}
    ------------------------------
      <table>
       <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}>Jenis</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: Refund Pembelian</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}>No order</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.cartStore.state.currentTrx}</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>Tanggal</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.cartStore.getDateTime()}</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>Kasir</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.namaKasir}</td>
        </tr>
        </table>
        ------------------------------
        {/* <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>PEMBELIAN </p> */}
        <table>
          {/* <thead>
            <tr>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Jumlah</th>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Item</th>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Sub Total</th>
            </tr>
          </thead> */}
          {props.cartStore.state.items.map((item,index) => 
              <tr class="service">
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif',  fontSize: '50%'}}align="center">{index + 1}.</td>
                {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left"><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}align="left"> {item.name} {item.qty} x {item.price}</td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}align="right"><NumberFormat value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>
          )}
          </table>
          ------------------------------
          <table>

          <tr class="tabletitle">
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Subtotal </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%', float:'right'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>

  
           
          </table>

          ------------------------------
          <table>
          
          <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Total </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Dibayarkan </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Kembali </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
          {/* <p>---------------------------------------</p> */}
        </table>
      <p style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '65%'}} align='center'>
        *** {props.cartStore.state.items.length} ITEM ***<br />
        Terima kasih<br />
        Atas kunjungan anda<br />
      </p>
      {/* {headContent()} */}
      {/* {paperFeed()} */}
    </div>

    



    



















    

























    {/* KASIR REFUND */}
    <div id="kasirRefund">
      {/* {headContent()} */}
      --------------------------------------------
        <table>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>No order</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.currentTrx}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Tanggal</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Kasir</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.namaKasir} </td>
          </tr>
          </table>
          --------------------------------------------
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>REFUND PEMBELIAN</p>
          <table>
            <thead>
              <tr>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Jumlah</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Item</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Sub Total</th>
              </tr>
            </thead>
            {props.cartStore.state.refundItems.map(item => 
                <tr class="service">
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">{item.qty} </td>
                  {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">{item.name} </td>
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}
            </table>
            --------------------------------------------
            <table>


            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Total </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Dibayarkan </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Kembali </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            
          </table>
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}} align='center'>
            *** {props.cartStore.state.refundItems.length} ITEM ***<br />
            Terima kasih<br />
            Atas kunjungan anda<br />
          </p>
          {/* {paperFeed()} */}
          {headContent()}
    </div>


    {/* PEMESANAN ORDER */}
    <div id="pesananOrder">
      {/* {headContent()} */}
      --------------------------------------------
        <table>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Pemesan</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.dataReservation["nama"]}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Alamat</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.dataReservation["alamat"]}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Telepon</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.dataReservation["telepon"]}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>No. Order</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.currentTrx}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Tanggal</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Selesai</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {(props.cartStore.state.whatDate || props.cartStore.getToday())} {props.cartStore.state.time + ':00'}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Pencatat</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.namaKasir}</td>
          </tr>
          </table>
          --------------------------------------------
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>PESANAN</p>
          <table>
            <thead>
              <tr>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Jumlah</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Item</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Sub Total</th>
              </tr>
            </thead>
            {props.cartStore.state.items.map(item => 
                <tr class="service">
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">{item.qty} </td>
                  {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">{item.name} </td>
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}
            </table>
            --------------------------------------------
            <table>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Total </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
   


            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Biaya Tambahan </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.expenseAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Diskon </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.discountAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Uang Muka </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.dpReservationAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Sisa Pembayaran </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {/* <p>---------------------------------------</p> */}
          </table>
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}} align='center'>
            *** {props.cartStore.state.items.length} ITEM ***<br />
            Terima kasih<br />
            Atas kunjungan anda<br />
          </p>
          {/* {paperFeed()} */}
          {headContent()}
    </div>


    {/* PEMESANAN BAYAR */}
    <div id="pesananBayar">
      {/* {headContent()} */}
        --------------------------------------------
        <table>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Pemesan</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].nama : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Alamat</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].alamat : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Telepon</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].telepon : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>No. Order</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].invoice : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Tanggal</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].tgl_pesan : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Selesai</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Kasir</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.namaKasir}</td>
          </tr>
          </table>
          --------------------------------------------
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>PESANAN</p>
          <table>
            <thead>
              <tr>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Jumlah</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Item</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Sub Total</th>
              </tr>
            </thead>
            {props.cartStore.state.items.map(item => 
                <tr class="service">
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">{item.qty} </td>
                  {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">{item.name} </td>
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}
            </table>
            --------------------------------------------
            <table>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Sub Total </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

        
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Biaya Tambahan </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.expenseAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Diskon </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.discountAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Total </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Uang Muka </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.dpReservationAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Sisa Pembayaran </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Pembayaran </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.valueInputPayment["paymentTotal"]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Kembali </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
          </table>
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}} align='center'>
            *** {props.cartStore.state.items.length} ITEM ***<br />
            Terima kasih<br />
            Atas kunjungan anda<br />
          </p>
          {/* {paperFeed()} */}
          {headContent()}
    </div>

    {/* PEMESANAN REFUND */}
    <div id="pesananRefund">
      {/* {headContent()} */}
      --------------------------------------------
        <table>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Pemesan</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].nama : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Alamat</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].alamat : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Telepon</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].telepon : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>No. Order</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].invoice : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Tanggal</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].tgl_pesan : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Selesai</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Kasir</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].pencatat : ''}</td>
          </tr>
          </table>
          --------------------------------------------
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>REFUND PESANAN</p>
          <table>
            <thead>
              <tr>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Jumlah</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Item</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Sub Total</th>
              </tr>
            </thead>
            {props.cartStore.state.refundItems.map(item => 
                <tr class="service">
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">{item.qty} </td>
                  {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">{item.name} </td>
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}
            </table>
            --------------------------------------------
            <table>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Total </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>


            {`<br />`}

            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Dibayarkan </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Kembali </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            </table>
            <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}} align='center'>
            *** {props.cartStore.state.refundItems.length} ITEM ***<br />
            Terima kasih<br />
            Atas kunjungan anda<br />
          </p>
          {/* {paperFeed()} */}
          {headContent()}
    </div>




      {/* KASIR BAYAR*/}
  <div id="kasirBayarTax" style={{fontFamily: 'Arial, Helvetica, sans-serif', height: "50mm"}}>
    {headContent()}
    ------------------------------
      <table>
       <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}>Jenis</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: Pembelian</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}>No order</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.cartStore.state.currentTrx}</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>Tanggal</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.cartStore.getDateTime()}</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>Kasir</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.namaKasir}</td>
        </tr>
        </table>
        ------------------------------
        {/* <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>PEMBELIAN </p> */}
        <table>
          {/* <thead>
            <tr>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Jumlah</th>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Item</th>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Sub Total</th>
            </tr>
          </thead> */}
          {props.cartStore.state.items.map((item,index) => 
              <tr class="service">
               
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif',  fontSize: '50%'}}align="center">{index + 1}.</td>
                {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left"><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}align="left"> {item.name}</td>
                <tr>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}align="left">{item.qty} x {item.price}</td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}align="right"><NumberFormat value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            </tr>
              
           

              
              
          )}
           <tr>
                  
                  </tr>
          </table>
          ------------------------------
          <table>

          <tr class="tabletitle">
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Subtotal </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%', float:'right'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>

  
               <tr class="tabletitle">
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Pajak Pemda </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%', float:'right'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalTax} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>
          </table>

          ------------------------------
          <table>
          <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Grand Total </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
         
          <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Pembayaran </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.valueInputPayment["paymentTotal"]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
          <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Kembali </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
          {/* <p>---------------------------------------</p> */}
        </table>
      <p style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '65%'}} align='center'>
        *** {props.cartStore.state.items.length} ITEM ***<br />
        Terima kasih<br />
        Atas kunjungan anda<br />
      </p>
      {/* {headContent()} */}
      {/* {paperFeed()} */}
    </div>
    

    {/* KASIR REFUND */}
    <div id="kasirRefundTax">
    {headContent()}
    ------------------------------
      <table>
       <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}>Jenis</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: Refund Pembelian</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}>No order</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.cartStore.state.currentTrx}</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>Tanggal</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.cartStore.getDateTime()}</td>
        </tr>
        <tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>Kasir</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '50%'}}>: {props.namaKasir}</td>
        </tr>
        </table>
        ------------------------------
        {/* <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>PEMBELIAN </p> */}
        <table>
          {/* <thead>
            <tr>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Jumlah</th>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Item</th>
              <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}>Sub Total</th>
            </tr>
          </thead> */}
          {props.cartStore.state.items.map((item,index) => 
              <tr class="service">
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif',  fontSize: '50%'}}align="center">{index + 1}.</td>
                {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left"><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}align="left"> {item.name} {item.qty} x {item.price}</td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '50%'}}align="right"><NumberFormat value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>
          )}
          </table>
          ------------------------------
          <table>

          <tr class="tabletitle">
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Subtotal </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%', float:'right'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>

  
               <tr class="tabletitle">
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Pajak Pemda </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%', float:'right'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalTax} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>
          </table>

          ------------------------------
          <table>
          <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Grand Total </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
         
          <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Pembayaran </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.valueInputPayment["paymentTotal"]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
          <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="left">Kembali </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '60%'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
          {/* <p>---------------------------------------</p> */}
        </table>
      <p style={{fontFamily: 'Arial, Helvetica, sans-serif',fontSize: '65%'}} align='center'>
        *** {props.cartStore.state.items.length} ITEM ***<br />
        Terima kasih<br />
        Atas kunjungan anda<br />
      </p>
      {/* {headContent()} */}
      {/* {paperFeed()} */}
    </div>


    {/* PEMESANAN ORDER */}
    <div id="pesananOrderTax">
      {/* {headContent()} */}
      --------------------------------------------
        <table>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Pemesan</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.dataReservation["nama"]}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Alamat</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.dataReservation["alamat"]}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Telepon</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.dataReservation["telepon"]}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>No. Order</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.currentTrx}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Tanggal</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Selesai</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {(props.cartStore.state.whatDate || props.cartStore.getToday())} {props.cartStore.state.time + ':00'}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Pencatat</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.namaKasir}</td>
          </tr>
          </table>
          --------------------------------------------
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>PESANAN</p>
          <table>
            <thead>
              <tr>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Jumlah</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Item</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Sub Total</th>
              </tr>
            </thead>
            {props.cartStore.state.items.map(item => 
                <tr class="service">
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">{item.qty} </td>
                  {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">{item.name} </td>
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}
            </table>
            --------------------------------------------
            <table>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Total </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Pajak Pemda </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalTax} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Biaya Tambahan </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.expenseAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Diskon </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.discountAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Uang Muka </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.dpReservationAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Sisa Pembayaran </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {/* <p>---------------------------------------</p> */}
          </table>
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}} align='center'>
            *** {props.cartStore.state.items.length} ITEM ***<br />
            Terima kasih<br />
            Atas kunjungan anda<br />
          </p>
          {/* {paperFeed()} */}
          {headContent()}
    </div>


    {/* PEMESANAN BAYAR */}
    <div id="pesananBayarTax">
      {/* {headContent()} */}
        --------------------------------------------
        <table>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Pemesan</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].nama : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Alamat</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].alamat : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Telepon</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].telepon : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>No. Order</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].invoice : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Tanggal</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].tgl_pesan : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Selesai</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Kasir</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.namaKasir}</td>
          </tr>
          </table>
          --------------------------------------------
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>PESANAN</p>
          <table>
            <thead>
              <tr>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Jumlah</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Item</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Sub Total</th>
              </tr>
            </thead>
            {props.cartStore.state.items.map(item => 
                <tr class="service">
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">{item.qty} </td>
                  {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">{item.name} </td>
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}
            </table>
            --------------------------------------------
            <table>
            <tr class="tabletitle">
              
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Sub Total </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Pajak Pemda</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalTax} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Biaya Tambahan </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.expenseAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Diskon </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.discountAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Total </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Uang Muka </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.dpReservationAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Sisa Pembayaran </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Pembayaran </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.valueInputPayment["paymentTotal"]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Kembali </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
          </table>
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}} align='center'>
            *** {props.cartStore.state.items.length} ITEM ***<br />
            Terima kasih<br />
            Atas kunjungan anda<br />
          </p>
          {/* {paperFeed()} */}
          {headContent()}
    </div>

    {/* PEMESANAN REFUND */}
    <div id="pesananRefundTax">
      {/* {headContent()} */}
      --------------------------------------------
        <table>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Pemesan</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].nama : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Alamat</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].alamat : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Telepon</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].telepon : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>No. Order</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].invoice : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Tanggal</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].tgl_pesan : ''}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Selesai</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Kasir</td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].pencatat : ''}</td>
          </tr>
          </table>
          --------------------------------------------
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>REFUND PESANAN</p>
          <table>
            <thead>
              <tr>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Jumlah</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Item</th>
                <th style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '110%'}}>Sub Total</th>
              </tr>
            </thead>
            {props.cartStore.state.refundItems.map(item => 
                <tr class="service">
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">{item.qty} </td>
                  {/* <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">{item.name} </td>
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}
            </table>
            --------------------------------------------
            <table>
            <tr class="tabletitle">
              
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Total </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Pajak Pemda</td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalTax} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
          </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Dibayarkan </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Kembali </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
              <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={'Rp '} value={0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            </table>
            <p style={{fontFamily: 'Arial, Helvetica, sans-serif'}} align='center'>
            *** {props.cartStore.state.refundItems.length} ITEM ***<br />
            Terima kasih<br />
            Atas kunjungan anda<br />
          </p>
          {/* {paperFeed()} */}
          {headContent()}
    </div>


</div>
)}

export default PrintArea