import React from 'react';
import { Switch, Route, NavLink, useHistory, Link } from 'react-router-dom';

import Profile from './admin/Profile.jsx';
import Tempat from './admin/Tempat.jsx';
import Jenis from './admin/Jenis.jsx';
import { Icon, Modal, Button } from './Element.jsx';

function Main() {
    const history = useHistory();
    history.replace('/admin/profil');

    return (<div>Main</div>);
}

function Sidebarlink(props) {
    return (
        <li className="sidebar-item">
            <NavLink className="sidebar-link" activeClassName="text-white" to={props.to}>
                <div className="inline-block w-1/6 text-center">
                    <i className={"fa fa-" + props.icon + ""}></i>
                </div>
                <span className="align-middle">{props.name}</span>
            </NavLink>
        </li>
    );
}

class Admin extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            sidebarShow: false
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('id')) {
            this.props.history.replace('/login');
        }
    }

    logout() {
        localStorage.removeItem('id');
        this.props.history.replace('/');
        notif('berhasil logout', 'success');
    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <nav id="sidebar" className={"sidebar " + (this.state.sidebarShow ? 'collapsed' : '')}>
                        <div className="sidebar-content js-simplebar">
                            <Link className="sidebar-brand" to="/">
                                <img src={url('/icon.png')} alt="Admin" className="inline mr-2"/>
                                <span className="align-middle">IBADAH</span>
                            </Link>
                            <ul className="sidebar-nav">
                                <li className="sidebar-header">
                                    MAIN MENU
                                </li>
                                <Sidebarlink name="Profil" icon="user" to="/admin/profil" />
                                <Sidebarlink name="Tempat" icon="book-open" to="/admin/tempat" />
                                <Sidebarlink name="Kategori" icon="star" to="/admin/kategori" />
                            </ul>
                        </div>
                    </nav>

                    <div className="main">
                        <nav className="navbar navbar-expand navbar-light navbar-bg">
                            <a className="sidebar-toggle d-flex" onClick={() => this.setState({ sidebarShow: !this.state.sidebarShow })}>
                                <i className="hamburger align-self-center"></i>
                            </a>
                            <form className="d-none d-sm-inline-block">
                                <div className="input-group input-group-navbar">
                                    <input type="text" className="form-control" placeholder="Search…" aria-label="Search" />
                                    <button className="btn" type="button">
                                    <i className="align-middle" data-feather="search"></i>
                                    </button>
                                </div>
                            </form>

                            <div className="navbar-collapse collapse">
                                <ul className="navbar-nav navbar-align">
                                    <li className="nav-item dropdown">
                                        <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                                            <i className="align-middle" data-feather="settings"></i>
                                        </a>
                                        <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                                            <span className="text-dark">Admin</span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <Link className="dropdown-item" to="/admin/profil"><Icon name="user" /> Profile</Link>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#logout">Log out</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <main className="content">
                            <div className="container-fluid p-0">
                                <Switch>
                                    <Route path="/admin" exact={true}>
                                        <Main/>
                                    </Route>
                                    <Route path="/admin/profil">
                                        <Profile/>
                                    </Route>
                                    <Route path="/admin/tempat">
                                        <Tempat/>
                                    </Route>
                                    <Route path="/admin/kategori">
                                        <Jenis/>
                                    </Route>
                                </Switch>
                            </div>
                        </main>

                        <footer className="footer">
                            <div className="container-fluid">
                                <div className="row text-muted">
                                    <div className="col-6 text-start">
                                        <p className="mb-0">
                                            <a href="https://fopegram.com" target="_blank" className="text-muted"><strong>Fopegram</strong></a> &copy; 2021
                                        </p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <a className="text-muted" href="#">Support</a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a className="text-muted" href="#">Privacy</a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a className="text-muted" href="#">Terms</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
                <Modal id="logout">
                    <Modal.Header>Logout</Modal.Header>
                    <Modal.Body>
                        <p>anda yakin akan logout?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button mode="default" data-bs-dismiss="modal">Batal</Button>
                        <Button mode="danger" data-bs-dismiss="modal" onClick={this.logout.bind(this)}>Keluar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default (props) => {
    return <Admin {...props} history={useHistory()} />
}