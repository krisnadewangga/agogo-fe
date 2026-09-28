import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Badge,
  Collapse
} from 'reactstrap';

class TransactionFilter extends Component {
  state = {    
    isFilterOpen: false,
    rangeJam: '',
    namaKasir: '',
    jenisPembayaran: '',
    rangeNominal: ''
  };

  // Memaksa re-render jika data transaksi di cartStore mengalami perubahan
  componentDidUpdate(prevProps) {
    const prevTrx = prevProps.cartStore?.state?.transaction;
    const currentTrx = this.props.cartStore?.state?.transaction;

    if (prevTrx !== currentTrx) {
      this.forceUpdate();
    }
  }

  toggleFilter = () => {
    this.setState(prevState => ({ isFilterOpen: !prevState.isFilterOpen }));
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleReset = () => {
    this.setState({
      rangeJam: '',
      namaKasir: '',
      jenisPembayaran: '',
      rangeNominal: ''
    });
  };

  getJenisPembayaran = (item) => {
    if (item.cash > 0) return 'Cash';
    if (item.qris > 0) return 'QRIS';
    if (item.transfer > 0) return 'Transfer';
    return item.ket_metodepembayaran || 'Toko';
  };

  getActiveFilterCount = () => {
    const { rangeJam, namaKasir, jenisPembayaran, rangeNominal } = this.state;
    let count = 0;
    if (rangeJam) count++;
    if (namaKasir) count++;
    if (jenisPembayaran) count++;
    if (rangeNominal) count++;
    return count;
  };

  handleClick = (selectedTrx) => {
    if (this.props.isPaid) {
      this.props.cartStore.showSelectedTransaction(selectedTrx, this.props.modalStore.toggleModal);
    } else {
      this.props.cartStore.addSelectedTransaction(selectedTrx.id, selectedTrx.invoice);
    }
  };

  renderJamOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      const start = i < 10 ? `0${i}:00` : `${i}:00`;
      const nextHour = i + 1;
      const end = nextHour < 10 ? `0${nextHour}:00` : nextHour === 24 ? '23:59' : `${nextHour}:00`;
      const label = `${start} - ${nextHour === 24 ? '24:00' : end}`;
      const value = `${start}-${end}`;
      options.push(<option key={value} value={value}>{label}</option>);
    }
    return options;
  };

  // Method untuk mengubah string ISO UTC ke jam lokal (Format HH:mm atau HH:mm:ss)
  formatJamLokal = (dateString, withSeconds = false) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';

    // Mengubah waktu ke format lokal Indonesia (WIB/WITA/WIT)
    return date.toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Makassar',
        hour: '2-digit',
        minute: '2-digit',
        ...(withSeconds && { second: '2-digit' }),
        hour12: false
    }).replace(/\./g, ':'); // Pastikan pemisah jam menggunakan titik dua (:)
  };

  render() {
    const transactions = this.props.cartStore?.state?.transaction || [];
    const { isFilterOpen, rangeJam, namaKasir, jenisPembayaran, rangeNominal } = this.state;

    const kasirOptions = [...new Set(transactions.map(t => t.kasir_name).filter(Boolean))];
    const activeFilterCount = this.getActiveFilterCount();

    const filteredTransactions = transactions.filter(item => {
      // 1. Filter Range Jam
      if (rangeJam) {
        const [jamMulai, jamSelesai] = rangeJam.split('-');
        const dateString = item.created_at || item.tgl_bayar || '';
          
        // Gunakan jam yang sudah dikonversi ke lokal
        const jamTrxHHMM = this.formatJamLokal(dateString, false); 

        if (jamTrxHHMM < jamMulai || jamTrxHHMM > jamSelesai) {
          return false;
        }
      }

      // 2. Filter Kasir
      if (namaKasir && item.kasir_name?.toLowerCase() !== namaKasir.toLowerCase()) {
        return false;
      }

      // 3. Filter Jenis Pembayaran
      const paymentType = this.getJenisPembayaran(item);
      if (jenisPembayaran && paymentType.toLowerCase() !== jenisPembayaran.toLowerCase()) {
        return false;
      }

      // 4. Filter Range Nominal
      if (rangeNominal) {
        const totalNilai = item.total_bayar || item.total_transaksi || 0;
        if (rangeNominal === '500000-up') {
          if (totalNilai < 500000) return false;
        } else {
          const [min, max] = rangeNominal.split('-').map(Number);
          if (totalNilai < min || totalNilai > max) return false;
        }
      }

      return true;
    });

    return (
      <Container fluid className="p-3 text-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">
            <i className="fas fa-receipt mr-2"></i>Daftar Transaksi
          </h4>
          
          <Button
            color={activeFilterCount > 0 ? "warning" : "primary"}
            onClick={this.toggleFilter}
            className="d-flex align-items-center"
          >
            <i className="fas fa-filter mr-2"></i>
            {isFilterOpen ? "Sembunyikan Filter" : "Tampilkan Filter"}
            {activeFilterCount > 0 && (
              <Badge color="danger" pill className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
            <i className={`fas fa-chevron-${isFilterOpen ? 'up' : 'down'} ml-2`}></i>
          </Button>
        </div>

        <Collapse isOpen={isFilterOpen}>
          <Card className="bg-dark text-white mb-4 border-secondary">
            <CardBody>
              <Form>
                <Row form>
                  {/* Filter Jam */}
                  <Col md={3} sm={6} className="mb-2">
                    <FormGroup>
                      <Label for="rangeJam">Jam Transaksi</Label>
                      <Input
                        type="select"
                        name="rangeJam"
                        id="rangeJam"
                        style={{ height: 40 }}
                        value={rangeJam}
                        onChange={this.handleInputChange}
                      >
                        <option value="">-- Semua Jam --</option>
                        {this.renderJamOptions()}
                      </Input>
                    </FormGroup>
                  </Col>

                  {/* Kasir */}
                  <Col md={3} sm={6} className="mb-2">
                    <FormGroup>
                      <Label for="namaKasir">Kasir</Label>
                      <Input
                        type="select"
                        name="namaKasir"
                        id="namaKasir"
                        style={{ height: 40 }}
                        value={namaKasir}
                        onChange={this.handleInputChange}
                      >
                        <option value="">-- Semua Kasir --</option>
                        {kasirOptions.map((kasir, idx) => (
                          <option key={idx} value={kasir}>
                            {kasir}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>

                  {/* Jenis Pembayaran */}
                  <Col md={3} sm={6} className="mb-2">
                    <FormGroup>
                      <Label for="jenisPembayaran">Jenis Pembayaran</Label>
                      <Input
                        type="select"
                        name="jenisPembayaran"
                        id="jenisPembayaran"
                        style={{ height: 40 }}
                        value={jenisPembayaran}
                        onChange={this.handleInputChange}
                      >
                        <option value="">-- Semua Jenis --</option>
                        <option value="Cash">Cash</option>
                        <option value="QRIS">QRIS</option>
                        <option value="Transfer">Transfer</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  {/* Range Nominal */}
                  <Col md={3} sm={6} className="mb-2">
                    <FormGroup>
                      <Label for="rangeNominal">Nilai Transaksi</Label>
                      <Input
                        type="select"
                        name="rangeNominal"
                        id="rangeNominal"
                        style={{ height: 40 }}
                        value={rangeNominal}
                        onChange={this.handleInputChange}
                      >
                        <option value="">-- Semua Nilai --</option>
                        <option value="0-10000">Di bawah Rp 10.000</option>
                        <option value="0-25000">Di bawah Rp 25.000</option>
                        <option value="0-50000">Di bawah Rp 50.000</option>
                        <option value="0-100000">Di bawah Rp 100.000</option>
                        <option value="0-250000">Di bawah Rp 250.000</option>
                        <option value="0-500000">Di bawah Rp 500.000</option>
                        <option value="500000-up">Rp 500.000 ke atas</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form className="mt-2">
                  <Col xs={12} className="text-right">
                    <Button
                      color="secondary"
                      onClick={this.handleReset}
                      className="px-4"
                    >
                      <i className="fas fa-undo mr-2"></i>Reset Filter
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Collapse>

        {/* Tabel Data */}
        <div className="table-responsive">
          <Table dark striped hover borderless>
            <thead>
              <tr>
                <th>No. Transaksi</th>
                <th>Waktu / Jam</th>
                <th>Kasir</th>
                <th>Jenis Pembayaran</th>
                <th className="text-right">Total Bayar</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((trx) => (
                  <tr key={trx.id}>
                    <td>
                      <strong 
                        className="text-info" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => this.handleClick(trx)}
                      >
                        {trx.no_transaksi}
                      </strong>
                    </td>
                    <td>
                        {this.formatJamLokal(trx.created_at || trx.tgl_bayar, true)}
                    </td>
                    <td>{trx.kasir_name || '-'}</td>
                    <td>
                      <Badge color="success" pill>
                        {this.getJenisPembayaran(trx)}
                      </Badge>
                    </td>
                    <td className="text-right font-weight-bold">
                      Rp {(trx.total_bayar || trx.total_transaksi || 0).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    Tidak ada transaksi yang sesuai dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}

// Export langsung tanpa observer
export default TransactionFilter;