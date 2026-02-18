import React from 'react'
import { Row, Col } from 'reactstrap'
import './kasirOrder.scss'



const kasirOrder = (props) => {
  return (
  <div>
  <div id="invoice-POS">
    
    <div id="top">
      <div class="logo" style={{marginTop: '5%'}} />
      <div class="info" style={{marginTop: '5%'}}> 
        <h6>
        <p align='left'> 
            Jalan Woltermonginsidi<br />
            Kel. Girian Indah | Kec. Girian <br />
            Bitung | Sulawesi Utara<br />
            Telp. 0438 2230652<br />
            Fax. 0821 8749 8746<br />
        </p>
        </h6>
      </div>
    </div>
    
    <div id="midKasir" >
      <div class="buyer">
        <tr>
            <td><p class="itemtext">No Order</p></td>
            <td><p class="itemtext">: TK-1231231</p></td>
        </tr>
        <tr>
            <td><p class="itemtext">Tanggal</p></td>
            <td><p class="itemtext">: 15 Agustus 2109</p></td>
        </tr>
        <tr>
            <td><p class="itemtext">Kasir</p></td>
            <td><p class="itemtext">: Pak Alex</p></td>
        </tr>
      </div>
    </div>
    
    <div id="bot">

					<div id="table">
						<table>
							<tr class="tabletitle">
								<td class="item"><h2>Item</h2></td>
								<td class="Hours"><h2>Qty</h2></td>
								<td class="payment"><h2>Sub Total</h2></td>
							</tr>

							{props.cartStore.state.items.map(item => 
									<tr class="service">
										<td class="tableitem"><p class="itemtext">{item.name}</p></td>
										<td class="tableitem"><p class="itemtext">{item.qty}</p></td>
										<td class="payment"><p class="itemtext">{item.price}</p></td>
									</tr>
							)}
							<tr class="service">
								<td class="tableitem"><p class="itemtext">{props.cartStore.state.items}</p></td>
								<td class="tableitem"><p class="itemtext">5</p></td>
								<td class="payment"><p class="itemtext">$375.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Asset Gathering</p></td>
								<td class="tableitem"><p class="itemtext">3</p></td>
								<td class="payment"><p class="itemtext">$225.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Design Development</p></td>
								<td class="tableitem"><p class="itemtext">5</p></td>
								<td class="payment"><p class="itemtext">$375.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Animation</p></td>
								<td class="tableitem"><p class="itemtext">20</p></td>
								<td class="payment"><p class="itemtext">$1500.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Animation Revisions</p></td>
								<td class="tableitem"><p class="itemtext">10</p></td>
								<td class="payment"><p class="itemtext">$750.00</p></td>
							</tr>


							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2 class="detail">Jumlah</h2></td>
								<td class="payment"><h2 class="detail">$419.25</h2></td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2 class="detail">Diskon</h2></td>
								<td class="payment"><h2 class="detail">$0</h2></td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2 class="detail">Total</h2></td>
								<td class="payment"><h2 class="detail">$3,644.25</h2></td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2 class="detail">Pembayaran</h2></td>
								<td class="payment"><h2 class="detail">$4,000.00</h2></td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2 class="detail">Kembali</h2></td>
								<td class="payment"><h2 class="detail">$365.75</h2></td>
							</tr>

						</table>
					</div>

					<div id="legalcopy">
						<p class="legal"><strong>*** 5 ITEM ***<br /></strong>Terima kasih <br />Atas kunjungan anda</p>
					</div>

				</div>
            </div>
		</div>    
  )
}

export default kasirOrder