import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Card, Button } from './Element.jsx';
import { FootComponent } from './Index.jsx';

class Login extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password_type: 'password'
        }
    }

    componentDidMount() {
        if (localStorage.getItem('id')) {
            this.props.history.replace('/admin/profil');
        }
    }

    login(e) {
        e.preventDefault();
        http.post('/api/user/login', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if (res.error) {
                notif(res.message, 'warning', true);
            } else {
                notif(res.message, 'success');
                localStorage.setItem('id', res.data.id);
                this.props.history.replace('/admin/profil');
            }
        })
    }

    render() {
        return (
            <main className="d-flex w-100">
                <div className="container d-flex flex-column">
                    <div className="row vh-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">

                                <div className="text-center mt-3 mb-2">
                                    <h1 className="h2">Selamat datang</h1>
                                    <p className="lead">
                                        Masukkan data anda
                                    </p>
                                </div>

                                <Card>
                                    <Card.Body>
                                        <div className="m-sm-4">
                                            <form onSubmit={this.login.bind(this)}>
                                                <Input placeholder="Masukkan Username" autoFocus={true} label="Username" size="lg" required={true} value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                                                <Input type={this.state.password_type} placeholder="Masukkan Password" label="Password" size="lg" required={true} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                                                <div>
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="remember-me" onClick={(e) => this.setState({
                                                            password_type: e.target.checked ? 'text' : 'password'
                                                        })} name="remember-me" />
                                                        <span className="form-check-label">
                                                            Tampilkan Password
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="text-center mt-3">
                                                    <Button type="submit" mode="primary" size="lg">Masuk</Button>
                                                </div>
                                            </form>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <FootComponent />

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default (props) => {
    return <Login {...props} history={useHistory()} />
}