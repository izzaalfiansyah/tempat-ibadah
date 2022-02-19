import React from 'react';
import { Header, Card, Button, Icon, Table, Modal, Input } from '../Element.jsx';

class Jenis extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            jenis: [],
            id: '',
            nama: ''
        };

        this.show = this.show.bind(this);
        this.nullable = () => this.setState({
            id: '',
            nama: ''
        })
    }

    componentDidMount() {
        this.show();
    }

    show() {
        http.get('/api/jenis').then(res => this.setState({ jenis: res.data }));
    }

    add(e) {
        e.preventDefault();
        http.post('/api/jenis', {
            nama: this.state.nama
        }).then(res => {
            if (res.error) {
                notif(res.message, 'warning', true);
            } else {
                notif(res.message, 'success');
                this.nullable();
                this.show();
                modalHide('#add')
            }
        })
    }

    update(e) {
        e.preventDefault();
        http.put('/api/jenis/' + this.state.id, {
            nama: this.state.nama
        }).then(res => {
            if (res.error) {
                notif(res.message, 'warning', true);
            } else {
                notif(res.message, 'success');
                this.nullable();
                this.show();
                modalHide('#update')
            }
        })
    }

    delete(e) {
        e.preventDefault();
        http.delete('/api/jenis/' + this.state.id).then(res => {
            if (res.error) {
                notif(res.message, 'warning', true);
            } else {
                notif(res.message, 'success');
                this.nullable();
                this.show();
                modalHide('#delete')
            }
        })
    }

    render() {
        return (
            <>
                <Header>Kategori</Header>
                <Card>
                    <Card.Header action={
                        <Button mode="primary" data-bs-toggle="modal" data-bs-target="#add">
                            <Icon name="plus" /> Tambah
                        </Button>
                    }>Data Kategori</Card.Header>
                    <Card.Body>
                        <Table mode="hover" head={['#', 'Nama', 'Opsi']}>
                            {
                                this.state.jenis.length > 0
                                ? this.state.jenis.map((item, i) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{ (parseInt(i) + 1) }</td>
                                            <td>{ item.nama }</td>
                                            <td className="text-center">
                                                <Button mode="primary" size="sm" data-bs-toggle="modal" data-bs-target="#update" onClick={() => this.setState({
                                                    id: item.id,
                                                    nama: item.nama
                                                })}><Icon name="pen" /></Button>
                                                <Button mode="danger" size="sm" data-bs-toggle="modal" data-bs-target="#delete" onClick={() => this.setState({
                                                    id: item.id,
                                                    nama: item.nama
                                                })}><Icon name="trash" /></Button>
                                            </td>
                                        </tr>
                                    )
                                })
                                : (
                                    <tr>
                                        <td colSpan="3" align="center">kategori tidak tersedia</td>
                                    </tr>
                                )
                            }
                        </Table>
                    </Card.Body>
                </Card>
                <Modal id="add">
                    <form onSubmit={this.add.bind(this)}>
                        <Modal.Header>
                            Tambah Kategori
                        </Modal.Header>
                        <Modal.Body>
                            <Input label="Nama" value={this.state.nama} onChange={(e) => this.setState({ nama: e.target.value })} required={true} placeholder="Masukkan Nama" maxLength="20" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button mode="default" type="button" data-bs-dismiss="modal">Batal</Button>
                            <Button mode="primary" type="submit">Simpan</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <Modal id="update">
                    <form onSubmit={this.update.bind(this)}>
                        <Modal.Header>
                            Edit Kategori
                        </Modal.Header>
                        <Modal.Body>
                            <Input label="Nama" value={this.state.nama} onChange={(e) => this.setState({ nama: e.target.value })} required={true} placeholder="Masukkan Nama" maxLength="20" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button mode="default" type="button" data-bs-dismiss="modal">Batal</Button>
                            <Button mode="primary" type="submit">Simpan</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <Modal id="delete">
                    <Modal.Header>
                        Hapus Kategori
                    </Modal.Header>
                    <Modal.Body>
                        <p>anda yakin menghapus kategori <strong>{this.state.nama}</strong>?</p>
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

export default Jenis;