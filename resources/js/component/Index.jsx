import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Card, Select, Icon, Table, Input, Pagination } from './Element.jsx';

export const HomeComponent = function() {
    return (
        <>
            <nav className="navbar navbar-expand navbar-light navbar-bg">
                <Link className="d-flex" to="/">
                    <img src={url('/icon.png')} alt="Admin"/>
                </Link>
                <div className="ml-3 d-none d-sm-inline-block text-xl">
                    IBADAH
                </div>

                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav navbar-align">
                        <li className="nav-item dropdown">
                            <Link to="/login" className="nav-icon" href="#">
                                <div className="position-relative">
                                    <div className="inline-block shadow-lg rounded-full">
                                        <button className="btn btn-primary btn-lg rounded-full text-xl">Masuk</button>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style={{ backgroundImage: `url('img/masjid.jpg')`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPositionY: '-150px' }} className="md:p-5 flex justify-center items-center">
                <div className="text-xl text-center my-20">
                    <div className="mt-2 mb-2 text-white">
                        Selamat Datang di
                        <div className="text-2xl"><strong>APLIKASI PENCARIAN TEMPAT IBADAH</strong></div>
                    </div>
                    <Link className="btn btn-primary btn-lg rounded-full text-2xl p-2 px-4" to="/login">MASUK</Link>
                </div>
            </div>
        </>
    );
}

export const FootComponent = function() {
    return (
        <div className="text-center py-3">
            <a href="https://fopegram.com" target="_blank" className="text-muted"><strong>Fopegram</strong></a> &copy; 2021
        </div>
    );
}

class Index extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            provinsi_id: '',
            limit: 8,
            search: '',
            page: 1,
            tempat: [],
            pagesTotal: 0,
            recordsTotal: 0,
            kecamatan: '',
            kelurahan: '',
            jenis_id: '',
            jenis: [],
            data_kecamatan: [],
            data_kelurahan: []
        }

        this.show = this.show.bind(this);
        this.showJenis = this.showJenis.bind(this);
        this.showKomponen = this.showKomponen.bind(this);
    }

    componentDidMount() {
        this.show();
        this.showJenis();
        this.showKomponen();
    }

    show() {
        http.get('/api/tempat?jenis_id=' + this.state.jenis_id + '&kecamatan=' + this.state.kecamatan + '&kelurahan=' + this.state.kelurahan + '&limit=' + this.state.limit + '&page=' + this.state.page)
        .then(res => this.setState({ tempat: res.data, pagesTotal: res.pagesTotal, recordsTotal: res.recordsTotal }));
    }

    showJenis() {
        http.get('/api/jenis').then(res => this.setState({ jenis: res.data }));
    }

    showKomponen() {
        http.get('/api/tempat/filter/kecamatan').then(res => this.setState({ data_kecamatan: res.data }));
        http.get('/api/tempat/filter/kelurahan').then(res => this.setState({ data_kelurahan: res.data }));
    }

    render() {
        return (
            <>
                <HomeComponent />
                <div className="mt-4 p-2">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-4">
                                    <Card>
                                        <Card.Header>
                                            Rumah Ibadah
                                        </Card.Header>
                                        <Card.Body>
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                this.show();
                                            }}>
                                                <Select size="lg" label="Kecamatan" value={this.state.kecamatan} onChange={(e) => this.setState({ kecamatan: e.target.value })}>
                                                    <option value="">Semua Kecamatan</option>
                                                    {this.state.data_kecamatan.map(item => {
                                                        return <option key={item.kecamatan} value={item.kecamatan}>{item.kecamatan}</option>
                                                    })}
                                                </Select>
                                                <Select size="lg" label="Kelurahan" value={this.state.kelurahan} onChange={(e) => this.setState({ kelurahan: e.target.value })}>
                                                    <option value="">Semua Kelurahan</option>
                                                    {this.state.data_kelurahan.map(item => {
                                                        return <option key={item.kelurahan} value={item.kelurahan}>{item.kelurahan}</option>
                                                    })}
                                                </Select>
                                                <Select size="lg" label="Kategori" value={this.state.jenis_id} onChange={(e) => this.setState({ jenis_id: e.target.value })}>
                                                    <option value="">Semua Kategori</option>
                                                    {this.state.jenis.map(item => {
                                                        return <option key={item.id} value={item.id}>{item.nama}</option>
                                                    })}
                                                </Select>
                                                <div className="text-right mt-3">
                                                    <Button mode="primary" type="submit" size="lg">
                                                        <Icon name="search" /> Cari
                                                    </Button>
                                                </div>
                                            </form>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="col-md-8">
                                    <Card>
                                        <Card.Header action={
                                            <Select value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value, page: 1 }, this.show)}>
                                                <option value={8}>8</option>
                                                <option value={16}>16</option>
                                                <option value={32}>32</option>
                                                <option value={64}>64</option>
                                            </Select>
                                        }>Data Rumah Ibadah</Card.Header>
                                        <Card.Footer>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    Menampilkan {this.state.tempat.length} dari {this.state.recordsTotal} data
                                                </div>
                                                <div className="col-md-6" align="right">
                                                    <Pagination value={this.state.page} total={this.state.pagesTotal} onChange={(result) => this.setState({ page: result }, this.show)} />
                                                </div>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                    <div className="mt-1 mb-1">
                                        <div className="row">
                                            {
                                                this.state.tempat.length > 0
                                                ? this.state.tempat.map(item => {
                                                    return (
                                                        <div className="col-md-3 col-6" key={item.id}>
                                                            <Link to={"/tempat/" + item.id} className="hover:opacity-25 transition text-gray-800" style={{ textDecoration: 'none' }}>
                                                                <Card>
                                                                    <Card.Img url={url('/img/tempat/' + (item.foto ? item.foto : 'default.jpg'))} alt={item.nama} style={{
                                                                        height: '150px',
                                                                        objectFit: 'cover'
                                                                    }} />
                                                                    <Card.Body>
                                                                        <div className="text-center">
                                                                            <div><strong>{item.nama}</strong></div>
                                                                            <div className="text-gray-400"><small>{item.jenis_nama}</small></div>
                                                                        </div>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                                : (
                                                    <div className="col-md-12">
                                                        <Card>
                                                            <Card.Body>
                                                                <div className="text-center">
                                                                    rumah ibadah tidak ditemukan
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <Card>
                                        <Card.Footer>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    Menampilkan {this.state.tempat.length} dari {this.state.recordsTotal} data
                                                </div>
                                                <div className="col-md-6" align="right">
                                                    <Pagination value={this.state.page} total={this.state.pagesTotal} onChange={(result) => this.setState({ page: result }, this.show)} />
                                                </div>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FootComponent />
            </>
        );
    }
}

export default (props) => {
    return <Index {...props} history={useHistory()} />
}