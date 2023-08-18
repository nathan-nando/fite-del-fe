import {useDispatch, useSelector} from "react-redux";
import {Login} from "../../components/Login/Login.jsx";
import {Button, Col, Form, FormControl, Modal, Row, Table} from "react-bootstrap";
import styles from "./style.module.css"
import {useEffect, useState} from "react";
import {fetchLoans, updateLoan} from "../Peminjaman/thunk.js";
import {Loading} from "../../components/Loading/Loading.jsx";
import {changeSelectedLoan} from "../Peminjaman/slice.js";
import dateFormat from "dateformat";
import {handlerFormLab} from "../Inventory/slice.js";
import {optionLab} from "../Inventory/option.js";
import {showModal} from "../Root/slice.js";

export const Laboran = () => {
    const loanState = useSelector((state) => state.loanState);
    const globState = useSelector((state) => state.globalState);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoans())
    }, [dispatch]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const renderLogin = () => {
        const isLogin = localStorage.getItem('token') !== null
        console.log(isLogin)
        if (!isLogin) {
            return <div className={"col-lg-12 mx-auto"}>
                <Login/>
            </div>
        }
    }

    const handlerApprove = async (data) => {
        console.log(data)
        await dispatch(updateLoan({...data, status: "disetujui"}))
    }
    const handlerReject = async (data) => {
        await dispatch(updateLoan({...data, status: "ditolak"}))
    }

    let condition;
    const handlerReturn = async (e)=>{
        e.preventDefault();
        console.log(condition)
        await dispatch(updateLoan({...loanState.selectedLoan, status: "dikembalikan", condition: condition}))
        condition = "";
        handleClose();
    }



    const tableMenunggu = () => {
        return loanState.searchedLoans.map((value, index, array) => {
            if (value.status === "menunggu") {
                return <tr key={index}>
                    <td>{value.personName}</td>
                    <td>{value.description}</td>
                    <td>{value.inventory ? value.inventory.name : ""}</td>
                    <td>{value.total}</td>
                    <td>{dateFormat(value.dateLoan, "dd mmmm yyyy") }</td>
                    <td>{dateFormat(value.dateReturn, "dd mmmm yyyy") }</td>
                    <td>
                        <Col className={"col-lg-6 mx-auto"}>
                            <Row>
                                <Col> <Button className={styles.btnCircle} variant={"outline-success"}
                                              onClick={() => {
                                                  handlerApprove(array[index])
                                              }}><span
                                    className={"bi bi-check-circle-fill"}></span></Button></Col>
                                <Col> <Button className={styles.btnCircle} variant={"outline-danger"}
                                              onClick={() => {
                                                  handlerReject(array[index])
                                              }}><span
                                    className={"bi bi-check-circle-fill"}></span></Button></Col>
                            </Row>
                        </Col>
                    </td>
                </tr>
            }
        })
    }

    const tableSedangDipinjam = () =>{
        return loanState.searchedLoans.map((value, index, array) => {
            if (value.status === "disetujui" && Date.parse(value.dateReturn) > new Date().getTime() ) {
                return <tr key={index}>
                    <td>{value.personName}</td>
                    <td>{value.description}</td>
                    <td>{value.inventory ? value.inventory.name : ""}</td>
                    <td>{value.total}</td>
                    <td>{dateFormat(value.dateLoan, "dd mmmm yyyy") }</td>
                    <td>{dateFormat(value.dateReturn, "dd mmmm yyyy") }</td>
                    <td>
                        <Button className={styles.btnCircle} variant={"outline-success"}
                                onClick={ () => {
                                    dispatch(changeSelectedLoan(array[index]))
                                    handleShow()
                                }}><span
                            className={"bi bi-check-circle-fill"}></span></Button>
                    </td>
                </tr>
            }
        })
    }

    const tableTerlambat = () =>{
        return loanState.searchedLoans.map((value, index, array) => {
            if (value.status === "disetujui" && Date.parse(value.dateReturn) < new Date().getTime() ) {
                return <tr key={index}>
                    <td>{value.personName}</td>
                    <td>{value.description}</td>
                    <td>{value.inventory ? value.inventory.name : ""}</td>
                    <td>{value.total}</td>
                    <td>{dateFormat(value.dateLoan, "dd mmmm yyyy") }</td>
                    <td>{dateFormat(value.dateReturn, "dd mmmm yyyy") }</td>
                    <td>
                        <Button className={styles.btnCircle} variant={"outline-success"}
                                onClick={() => {
                                    dispatch(changeSelectedLoan(array[index]))
                                    handleShow()
                                }}><span
                            className={"bi bi-check-circle-fill"}></span></Button>
                    </td>
                </tr>
            }
        })
    }


    const renderLoanMenunggu = () => {
        return <div style={{display:"block", overflowY:"scroll", height: "70vh"}} className={"shadow-sm border p-4"}>
            <div className={"col-lg-4 p-4 bg-warning rounded"}>
            <h5 className={"text-white"}>Daftar yang akan dipinjam</h5>
            </div>
            {loanState.loading ? <Loading></Loading> : <div className={"mt-5"}>

                <Table bordered>
                    <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Deskripsi</th>
                        <th>Alat</th>
                        <th>Total</th>
                        <th>Tanggal mulai peminjaman</th>
                        <th>Tanggal berakhir peminjaman</th>
                        <th><span className={"bi bi-gear-fill"}></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableMenunggu()}
                    </tbody>
                </Table>

            </div>}</div>
    }
    const renderLoanSedangDipinjam = () => {
        return <div style={{display:"block", overflowY:"scroll", height: "70vh"}} className={"shadow-sm border p-4 mt-5"}>
            <div className={"col-lg-4 p-4 bg-success rounded"}>
                <h5 className={"text-white"}>Daftar sedang dipinjam</h5>
            </div>
            {loanState.loading ? <Loading></Loading> : <div className={"mt-5"}>

                <Table bordered>
                    <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Deskripsi</th>
                        <th>Alat</th>
                        <th>Total</th>
                        <th>Tanggal mulai peminjaman</th>
                        <th>Tanggal berakhir peminjaman</th>
                        <th><span className={"bi bi-gear-fill"}></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableSedangDipinjam()}
                    </tbody>
                </Table>

            </div>}</div>
    }

    const renderLoanTerlambat = () => {
        return <div style={{display:"block", overflowY:"scroll", height: "70vh"}} className={"shadow-sm border p-4 mt-5"}>
            <div className={"col-lg-4 p-4 bg-danger rounded"}>
                <h5 className={"text-white"}>Daftar yang terlambat</h5>
            </div>
            {loanState.loading ? <Loading></Loading> : <div className={"mt-5"}>

                <Table bordered>
                    <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Deskripsi</th>
                        <th>Alat</th>
                        <th>Total</th>
                        <th>Tanggal mulai peminjaman</th>
                        <th>Tanggal berakhir peminjaman</th>
                        <th><span className={"bi bi-gear-fill"}></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableTerlambat()}
                    </tbody>
                </Table>

            </div>}</div>
    }


    return <>

        {renderLogin()}
        {globState.isLogin ? <Col>
            <div className={"shadow-sm p-4 col-lg-3 border mb-5"}>
                <h5><span className={"bi bi-person-fill"}></span> Laboran</h5>
                <p>Nama : {localStorage.getItem("name")}</p>
            </div>
            {renderLoanMenunggu()}
            {renderLoanSedangDipinjam()}
            {renderLoanTerlambat()}
        </Col> : ""}


        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handlerReturn}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Inventory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className={"mb-3 ms-3"}>
                        <Form.Label style={{fontWeight: "bold"}}>
                            Nama Alat
                        </Form.Label>
                        <FormControl type={"text"} placeholder={"Masukkan nama"} onChange={(e) => {
                            condition = e.target.value;
                        }}  required></FormControl>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type={"submit"} variant="primary">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
}