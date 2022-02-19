import React from 'react';

function CardComponent(props) {
    return <div className="card">{props.children}</div>
}

CardComponent.Header = function (props) {
    return <div className="card-header">
        <div className="row">
            <div className="col-7">
                <h5 className="card-title mb-0">{props.children}</h5>
            </div>
            <div className="col-5 text-right">
                {props.action}
            </div>
        </div>
    </div>
};

CardComponent.Body = function (props) {
    return <div className="card-body">{props.children}</div>
};

CardComponent.Footer = function (props) {
    return <div className="card-footer">{props.children}</div>
};

CardComponent.Img = function ({url, alt, style}) {
    return <img src={url} alt={alt} className="card-img" style={style} />
};

export const Card = CardComponent;

function TableComponent(props) {
    return (
        <div className="table-responsive">
            <table className={"table table-" + props.mode}>
                <thead>
                    <tr>
                        {props.head.map(item => {
                            return <th key={item}>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    );
}

export const Table = TableComponent;

function HeaderComponent(props) {
    return <h1 className="h3 mb-3">{props.children}</h1>
}

export const Header = HeaderComponent;

function ButtonComponent(props) {
    return <button type={props.type ? props.type : 'button'} className={"btn btn-" + props.mode + " btn-" + props.size} {...props}>{props.children}</button>
}

export const Button = ButtonComponent;

function ModalComponent(props) {
    return (
        <div className="modal fade" id={props.id}>
            <div className={"modal-dialog modal-" + props.size}>
                <div className="modal-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

ModalComponent.Header = function(props) {
    return <div className="modal-header"><div className="modal-title">{props.children}</div> <button className="close" type="button" data-bs-dismiss="modal">x</button></div>
}

ModalComponent.Body = function(props) {
    return <div className="modal-body">{props.children}</div>
}

ModalComponent.Footer = function(props) {
    return <div className="modal-footer">{props.children}</div>
}

export const Modal = ModalComponent;

function InputComponent(props) {
    return (
        <div className="form-group mb-2">
            {props.label ? <label className="form-label">{props.label}</label> : ''}
            <input type={props.type} className={"form-control form-control-" + props.size} {...props} />
        </div>
    );
}

export const Input = InputComponent;

function TextareaComponent(props) {
    return (
        <div className="form-group mb-2">
            {props.label ? <label className="form-label">{props.label}</label> : ''}
            <textarea rows={props.size} className={"form-control form-control-" + props.size} {...props}></textarea>
        </div>
    );
}

export const Textarea = TextareaComponent;

function SelectComponent(props) {
    return (
        <div className="form-group mb-2">
            {props.label ? <label className="form-label">{props.label}</label> : ''}
            <select className={"form-control form-control-" + props.size} {...props}>
                {props.children}
            </select>
        </div>
    );
}

export const Select = SelectComponent;

function IconComponent(props) {
    return <i className={"fa fa-" + props.name} {...props}></i>
}

export const Icon = IconComponent;

function PaginationComponent({total, value, onChange}) {
    return (
        <ul className="pagination float-right">
            <li className="page-item">
                <a className="page-link" style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => onChange(1)}>
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li className="page-item">
                <a className={"page-link " + (value <= 1 ? 'bg-gray-100' : '')} style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => value <= 1 ? null : onChange(value - 1)}>
                    <span aria-hidden="true">&lsaquo;</span>
                </a>
            </li>
            <li className="page-item">
                <a className={"page-link " + (value >= total ? 'bg-gray-100' : '')} style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => value >= total ? null : onChange(value + 1)}>
                    <span aria-hidden="true">&rsaquo;</span>
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => onChange(total)}>
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    );
}

export const Pagination = PaginationComponent;

function AlertComponent({text, type}) {
    return (
        <div className={"p-3 alert alert-" + type}>
            {text}
        </div>
    );
}

export const Alert = AlertComponent;