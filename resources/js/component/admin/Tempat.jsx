import React from 'react';
import { Card, Table, Header, Button, Icon, Input, Select, Modal, Pagination, Textarea } from '../Element.jsx';
import { Link, Switch, Route, useHistory, useParams } from 'react-router-dom';

class Tempat extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            tempat: [],
            limit: 10,
            search: '',
            page: 1,
            delete: {},
            recordsTotal: 0,
            pagesTotal: 0
        }

        this.show = this.show.bind(this);
    }

    componentDidMount() {
        this.show();
    }

    show() {
        http.get('/api/tempat?limit=' + this.state.limit + '&page=' + this.state.page + '&search=' + this.state.search).then(res => this.setState({ tempat: res.data, pagesTotal: res.pagesTotal, recordsTotal: res.recordsTotal }));
    }

    delete() {
        http.delete('/api/tempat/' + this.state.delete.id).then(res => {
            if (res.error) {
                notif(res.message, 'warning', true);
            } else {
                notif(res.message, 'success');
                this.show();
                modalHide('#delete');
            }
        })
    }

    render() {
        return (
            <>
                <Header>Tempat</Header>
                <Card>
                    <Card.Header action={
                        <Link to="/admin/tempat/add">
                            <Button mode="primary">
                                <Icon name="plus" /> Tambah
                            </Button>
                        </Link>
                    }>Data Rumah Ibadah</Card.Header>
                    <Card.Body>
                        <div className="row mb-1">
                            <div className="col-md-2">
                                <Select value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value, page: 1 }, this.show)}>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </Select>
                            </div>
                            <div className="col-md-6"></div>
                            <div className="col-md-4">
                                <Input placeholder="Cari" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value, page: 1 }, this.show)} />
                            </div>
                        </div>
                        <Table mode="hover" head={['#', 'Nama', 'Kategori', 'Penanggung Jawab', 'Opsi']}>
                            {
                                this.state.tempat.length > 0
                                ? this.state.tempat.map((item, i) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{ (parseInt(i) + 1) + (this.state.page * this.state.limit - this.state.limit) }</td>
                                            <td>{ item.nama }</td>
                                            <td>{ item.jenis_nama }</td>
                                            <td>{ item.penanggung_jawab }</td>
                                            <td className="text-center">
                                                <Link to={"/admin/tempat/" + item.id}><Button mode="primary" size="sm"><Icon name="pen" /></Button></Link>
                                                <Button mode="danger" size="sm" data-bs-toggle="modal" data-bs-target="#delete" onClick={() => this.setState({
                                                    delete: {
                                                        id: item.id,
                                                        nama: item.nama
                                                    }
                                                })}><Icon name="trash" /></Button>
                                            </td>
                                        </tr>
                                    )
                                })
                                : (
                                    <tr>
                                        <td colSpan="5" align="center">rumah ibadah tidak tersedia</td>
                                    </tr>
                                )
                            }
                        </Table>
                    </Card.Body>
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
                <Modal id="delete">
                    <Modal.Header>
                        Hapus Rumah Ibadah
                    </Modal.Header>
                    <Modal.Body>
                        <p>anda yakin menghapus <strong>{this.state.delete.nama}</strong>?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button mode="default" data-bs-dismiss="modal">Batal</Button>
                        <Button mode="danger" onClick={this.delete.bind(this)}>Hapus</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

class TempatAdd extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            penanggung_jawab: '',
            penanggung_jawab_2: '',
            kecamatan: '',
            kelurahan: '',
            jenis_id: '',
            lokasi: '',
            foto: '',
            alamat_lengkap: '',
            fotoSrc: url('/img/tempat/default.jpg'),
            jenis: []
        };

        this.showJenis = this.showJenis.bind(this);
    }

    componentDidMount() {
        this.showJenis()
    }

    showJenis() {
        http.get('/api/jenis').then(res => this.setState({ jenis: res.data }));
    }

    create(e) {
        e.preventDefault();
        http.post('/api/tempat', {
            nama: this.state.nama,
            penanggung_jawab: this.state.penanggung_jawab,
            penanggung_jawab_2: this.state.penanggung_jawab_2,
            kecamatan: this.state.kecamatan,
            kelurahan: this.state.kelurahan,
            lokasi: this.state.lokasi,
            foto: this.state.foto,
            jenis_id: this.state.jenis_id,
            alamat_lengkap: this.state.alamat_lengkap
        }).then(res => {
            if (res.error) {
                notif(res.message, 'warning', true);
            } else {
                notif(res.message, 'success');
                this.props.history.push('/admin/tempat');
            }
        })
    }

    render() {
        return (
            <>
                <Header>Tempat</Header>
                <Card>
                    <form onSubmit={this.create.bind(this)}>
                        <Card.Header>
                            Tambah Tempat
                        </Card.Header>
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-7">
                                    <Input label="Nama" required={true} maxLength="50" placeholder="Masukkan Nama Rumah Ibadah" value={this.state.nama} onChange={(e) => this.setState({ nama: e.target.value })} />
                                    <Select label="Kategori" required={true} value={this.state.jenis_id} onChange={(e) => this.setState({ jenis_id: e.target.value })}>
                                        <option value="">- Pilih Jenis -</option>
                                        {this.state.jenis.map(item => {
                                            return <option key={item.id} value={item.id}>{item.nama}</option>
                                        })}
                                    </Select>
                                    <Input label="Kecamatan" required={true} placeholder="Masukkan Kecamatan" value={this.state.kecamatan} onChange={(e) => this.setState({ kecamatan: e.target.value })} />
                                    <Input label="Kelurahan" required={true} placeholder="Masukkan Kelurahan" value={this.state.kelurahan} onChange={(e) => this.setState({ kelurahan: e.target.value })} />
                                    <Input label="Lokasi" required={true} placeholder="Masukkan Lokasi" value={this.state.lokasi} onChange={(e) => this.setState({ lokasi: e.target.value })} />
                                    <Textarea size="3" label="Alamat Lengkap" required={true} placeholder="Masukkan Alamat Lengkap" value={this.state.alamat_lengkap} onChange={(e) => this.setState({ alamat_lengkap: e.target.value })} />                                </div>
                                <div className="col-md-5">
                                    <Input type="file" label="Foto" title="Pilih Foto" accept="image/*" value="" onChange={(e) => read(e.target.files[0], (result) => this.setState({ foto: result, fotoSrc: result }))} />
                                    <div className="bg-gray-100 mt-2 mb-2 rounded shadow p-3" style={{ height: '200px' }}>
                                        <img src={this.state.fotoSrc} alt="Foto" style={{ height: '100%', width: '100%', objectFit: 'cover' }} className="shadow" />
                                    </div>
                                    <Input label="Penanggung Jawab" required={true} maxLength="50" placeholder="Masukkan Nama Penanggung Jawab" value={this.state.penanggung_jawab} onChange={(e) => this.setState({ penanggung_jawab: e.target.value })} />
                                    <Input label="Penanggung Jawab 2 (opsional)" maxLength="50" placeholder="Masukkan Nama Penanggung Jawab 2" value={this.state.penanggung_jawab_2} onChange={(e) => this.setState({ penanggung_jawab_2: e.target.value })} />
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <Link to="/admin/tempat"><Button mode="default">Batal</Button></Link>
                            <Button type="submit" mode="primary">Simpan</Button>
                        </Card.Footer>
                    </form>
                </Card>
            </>
        );
    }
}

class TempatEdit extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nama: '',
            penanggung_jawab: '',
            penanggung_jawab_2: '',
            kecamatan: '',
            kelurahan: '',
            jenis_id: '',
            lokasi: '',
            foto: '',
            alamat_lengkap: '',
            fotoSrc: url('/img/tempat/default.jpg'),
            jenis: []
        };

        this.show = this.show.bind(this);
        this.showJenis = this.showJenis.bind(this);
    }

    componentDidMount() {
        this.show();
        this.showJenis();
    }

    show() {
        http.get('/api/tempat/' + this.props.params.id).then(res => this.setState({
            id: res.data.id,
            nama: res.data.nama,
            penanggung_jawab: res.data.penanggung_jawab,
            penanggung_jawab_2: res.data.penanggung_jawab_2,
            kecamatan: res.data.kecamatan,
            kelurahan: res.data.kelurahan,
            lokasi: res.data.lokasi,
            jenis_id: res.data.jenis_id,
            alamat_lengkap: res.data.alamat_lengkap,
            fotoSrc: res.data.foto ? url('/img/tempat/' + res.data.foto) : url('/img/tempat/default.jpg'),
        }))
    }

    showJenis() {
        http.get('/api/jenis').then(res => this.setState({ jenis: res.data }));
    }

    update(e) {
        e.preventDefault();
        http.put('/api/tempat/' + this.state.id, {
            nama: this.state.nama,
            penanggung_jawab: this.state.penanggung_jawab,
            penanggung_jawab_2: this.state.penanggung_jawab_2,
            kelurahan: this.state.kelurahan,
            kecamatan: this.state.kecamatan,
            lokasi: this.state.lokasi,
            foto: this.state.foto,
            jenis_id: this.state.jenis_id,
            alamat_lengkap: this.state.alamat_lengkap
        }).then(res => {
            if (res.error) {
                notif(res.message, 'warning', true);
            } else {
                notif(res.message, 'success');
                this.show();
                this.setState({ foto: '' });
            }
        })
    }

    render() {
        return (
            <>
                <Header>Tempat</Header>
                <Card>
                    <form onSubmit={this.update.bind(this)}>
                        <Card.Header>
                            Edit Tempat
                        </Card.Header>
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-7">
                                    <Input label="Nama" required={true} maxLength="50" placeholder="Masukkan Nama Rumah Ibadah" value={this.state.nama} onChange={(e) => this.setState({ nama: e.target.value })} />
                                    <Select label="Kategori" required={true} value={this.state.jenis_id} onChange={(e) => this.setState({ jenis_id: e.target.value })}>
                                        <option value="">- Pilih Jenis -</option>
                                        {this.state.jenis.map(item => {
                                            return <option key={item.id} value={item.id}>{item.nama}</option>
                                        })}
                                    </Select>
                                    <Input label="Kecamatan" required={true} placeholder="Masukkan Kecamatan" value={this.state.kecamatan} onChange={(e) => this.setState({ kecamatan: e.target.value })} />
                                    <Input label="Kelurahan" required={true} placeholder="Masukkan Kelurahan" value={this.state.kelurahan} onChange={(e) => this.setState({ kelurahan: e.target.value })} />
                                    <Input label="Lokasi" required={true} placeholder="Masukkan Lokasi" value={this.state.lokasi} onChange={(e) => this.setState({ lokasi: e.target.value })} />
                                    <Textarea size="3" label="Alamat Lengkap" required={true} placeholder="Masukkan Alamat Lengkap" value={this.state.alamat_lengkap} onChange={(e) => this.setState({ alamat_lengkap: e.target.value })} />
                                </div>
                                <div className="col-md-5">
                                    <Input type="file" label="Foto" title="Pilih Foto" accept="image/*" value="" onChange={(e) => read(e.target.files[0], (result) => this.setState({ foto: result, fotoSrc: result }))} />
                                    <div className="bg-gray-100 mt-2 mb-2 rounded shadow p-3" style={{ height: '200px' }}>
                                        <img src={this.state.fotoSrc} alt="Foto" style={{ height: '100%', width: '100%', objectFit: 'cover' }} className="shadow" />
                                    </div>
                                    <Input label="Penanggung Jawab" required={true} maxLength="50" placeholder="Masukkan Nama Penanggung Jawab" value={this.state.penanggung_jawab} onChange={(e) => this.setState({ penanggung_jawab: e.target.value })} />
                                    <Input label="Penanggung Jawab 2 (opsional)" maxLength="50" placeholder="Masukkan Nama Penanggung Jawab 2" value={this.state.penanggung_jawab_2} onChange={(e) => this.setState({ penanggung_jawab_2: e.target.value })} />
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <Link to="/admin/tempat"><Button mode="default">Batal</Button></Link>
                            <Button type="submit" mode="primary">Simpan</Button>
                        </Card.Footer>
                    </form>
                </Card>
            </>
        );
    }
}

function TempatDetails(props) {
    return <TempatEdit {...props} params={useParams()} />
}

export default (props) => {
    return (
        <Switch>
            <Route path="/admin/tempat" exact={true}>
                <Tempat />
            </Route>
            <Route path="/admin/tempat/add">
                <TempatAdd history={useHistory()} />
            </Route>
            <Route path="/admin/tempat/:id">
                <TempatDetails />
            </Route>
        </Switch>
    );
}