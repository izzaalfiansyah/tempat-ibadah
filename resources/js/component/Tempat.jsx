import React from 'react';
import { HomeComponent, FootComponent } from './Index.jsx';
import { useParams } from 'react-router-dom';
import { Card, Alert } from './Element.jsx';

class Tempat extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            tempat: {},
            id: this.props.params.id,
            map: true
        };

        this.show = this.show.bind(this);
    }

    componentDidMount() {
        this.show();
    }

    show() {
        http.get('/api/tempat/' + this.state.id).then(res => this.setState({ tempat: res.data }, this.generateMap.bind(this)));
    }

    generateMap() {
        if (this.state.tempat.longlat.length == 2) {
            const map = L.map(document.getElementById('map-' + this.state.tempat.id), {
                center: this.state.tempat.longlat,
                zoom: 10
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            L.marker(this.state.tempat.longlat).addTo(map)
            .bindPopup(this.state.tempat.lokasi)
            .openPopup();
        } else {
            this.setState({ map: false });
        }
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
                                        <Card.Img url={url('/img/tempat/' + (this.state.tempat.foto ? this.state.tempat.foto : 'default.jpg'))} alt={this.state.tempat.nama} />
                                    </Card>
                                </div>
                                <div className="col-md-8">
                                    <Card>
                                        <Card.Header>{this.state.tempat.nama}</Card.Header>
                                        <Card.Body>
                                            Penanggung Jawab
                                            <h3 className="text-2xl">{this.state.tempat.penanggung_jawab} {this.state.tempat.penanggung_jawab_2 ? (' & ' + this.state.tempat.penanggung_jawab_2) : ''}</h3>
                                            <hr className="mb-2 mt-2" />
                                            Kecamatan
                                            <h3 className="text-2xl">{this.state.tempat.kecamatan}</h3>
                                            <hr className="mb-2 mt-2" />
                                            Kelurahan
                                            <h3 className="text-2xl">{this.state.tempat.kelurahan}</h3>
                                            <hr className="mb-2 mt-2" />
                                            Alamat Lengkap
                                            <h3 className="text-2xl">{this.state.tempat.alamat_lengkap}</h3>
                                            <hr className="mb-2 mt-2" />
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="col-md-12">
                                    <Card>
                                        <Card.Body>
                                            {this.state.map
                                            ? <div id={"map-" + this.state.tempat.id} style={{height: '280px'}}></div>
                                            : <Alert text="map untuk rumah ibadah tidak tersedia" type="info" />}
                                        </Card.Body>
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
    return <Tempat params={useParams()} />
}