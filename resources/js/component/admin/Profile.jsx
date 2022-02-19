import React from 'react';
import { Card, Header, Input, Button, Modal } from '../Element.jsx';

export default class Dashboard extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            telepon: '',
            password_lama: '',
            password_baru: '',
            password_baru_konfirmasi: ''
        }

        this.show = this.show.bind(this);
    }

    componentDidMount() {
        this.show();
    }

    show() {
        http.get('/api/user').then(res => this.setState({
            username: res.data.username,
            email: res.data.email,
            telepon: res.data.telepon
        }));
    }

    save(e) {
        e.preventDefault();
        http.post('/api/user', {
            username: this.state.username,
            email: this.state.email,
            telepon: this.state.telepon
        }).then(res => {
            if (res.error) {
                notif(res.message, 'warning', true);
            } else {
                notif(res.message, 'success');
                this.show();
            }
        })
    }

    password(e) {
        e.preventDefault();
        
        if (this.state.password_baru !== this.state.password_baru_konfirmasi) {
            return notif('password konfirmasi harus sama', 'info');
        }

        http.post('/api/user/password', {
            password_lama: this.state.password_lama,
            password_baru: this.state.password_baru
        }).then(res => {
            if (res.error) {
                notif(res.message, 'warning', true);
            } else {
                notif(res.message, 'success');
                modalHide('#change-password');
            }
        })
    }

    render() {
        return (
            <>
                <Header>Profil</Header>
                <Card>
                    <form onSubmit={this.save.bind(this)}>
                        <Card.Header>Detail Profil</Card.Header>
                        <Card.Body>
                            <Input label="Username" required={true} maxLength="20" minLength="5" placeholder="Masukkan Username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                            <Input label="Email" type="email" required={true} placeholder="Masukkan Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                            <Input label="Telepon" required={true} placeholder="Masukkan Telepon" value={this.state.telepon} onChange={(e) => this.setState({ telepon: numeric(e.target.value) })} />
                            <div className="text-right">
                                <small className="text-blue">
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#change-password">ganti password</a>
                                </small>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <Button mode="primary" type="submit">Simpan</Button>
                        </Card.Footer>
                    </form>
                </Card>
                <Modal id="change-password">
                    <form onSubmit={this.password.bind(this)}>
                        <Modal.Header>Ganti Password</Modal.Header>
                        <Modal.Body>
                            <Input type="password" label="Password Lama" required={true} placeholder="Masukkan Password Lama" value={this.state.password_lama} onChange={(e) => this.setState({ password_lama: e.target.value })} />
                            <Input type="password" label="Password Baru" required={true} minLength="8" maxLength="16" placeholder="Masukkan Password Baru" value={this.state.password_baru} onChange={(e) => this.setState({ password_baru: e.target.value })} />
                            <Input type="password" label="Password Baru (Konfirmasi)" required={true} minLength="8" maxLength="16" placeholder="Masukkan Password Baru (Konfirmasi)" value={this.state.password_baru_konfirmasi} onChange={(e) => this.setState({ password_baru_konfirmasi: e.target.value })} />
                            {this.state.password_baru !== this.state.password_baru_konfirmasi ? <small className="text-danger">password konfirmasi tidak sama</small> : '' }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button mode="default" data-bs-dismiss="modal">Batal</Button>
                            <Button type="submit" mode="primary">Simpan</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }
}