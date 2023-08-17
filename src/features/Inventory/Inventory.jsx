import styles from "./index.module.css"
import {listLab} from "./data.js";
import {Button, Col, Form, FormControl, InputGroup, Modal, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    changeSelectedInventory,
    changeSelectedLab,
    clearFormLab,
    handlerForm,
    handlerFormLab,
    search, setFormUpdate
} from "./slice.js";
import {useEffect, useState} from "react";
import {createInventory, deleteInventory, fetchInventories, updateInventory} from "./thunk.js";
import {Loading} from "../../components/Loading/Loading.jsx";
import dateFormat from "dateformat";
import {ModalCustom} from "../../components/ModalCustom/ModalCustom.jsx";
import {hideModal, showModal} from "../Root/slice.js";
import {createLoan} from "../Peminjaman/thunk.js";
import {useNavigate} from "react-router-dom";
import {optionLab} from "./option.js";

export const Inventory = () => {
    const state = useSelector((state) => state.inventoryState);
    const globalState = useSelector((state) => state.globalState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchInventories())
    }, [dispatch]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [modeFormLab, setModeFormLab] = useState("create")

    const changeModeToCreate = () => setModeFormLab("create")
    const changeModeToUpdate = () => setModeFormLab("update")
    const tableByMode = () => {
        return state.searchedInventory.map((value, index, array) => {
            if (value.lab === listLab[state.selectedLab]) {
                return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.name}</td>
                    <td>{dateFormat(value.dateIn, "yyyy")}</td>
                    <td>{value.total}</td>
                    <td>{value.frequency}</td>
                    <td><Row>

                        {globalState.isLogin ? <>
                                <Col><Button><span
                                    className={"bi bi-pen-fill"} onClick={async () => {
                                    handleShow()
                                    changeModeToUpdate();
                                    dispatch(clearFormLab())
                                    dispatch(setFormUpdate(array[index]))
                                }}></span></Button></Col><Col>
                                <Button variant={"danger"} onClick={async () => {
                                    await dispatch(deleteInventory(value._id))
                                }}><span className={"bi bi-trash-fill"}></span></Button></Col></> :
                            <Col>
                                <Button variant={"light"} style={{fontWeight: "bold"}} onClick={async () => {
                                    await dispatch(changeSelectedInventory(array[index]))
                                    dispatch(showModal())
                                }}><span className={"bi bi-bookmark-fill me-2"}></span> Meminjam</Button>
                            </Col>}

                    </Row></td>

                </tr>
            }
        })


    }

    const handlerSubmitLab = async (e) => {
        e.preventDefault();


        if (modeFormLab === "create") {
            await dispatch(createInventory({
                ...state.formLab, frequency: 0,
            }))
        } else if (modeFormLab === "update") {
            const payload = state.formLab
            await dispatch(updateInventory(payload))
        }
        handleClose();
        changeModeToCreate();
        dispatch(clearFormLab())
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (globalState.modeModal === "create") {
            await dispatch(createLoan({
                personName: state.form.personName || "",
                personID: state.form.personID || "",
                borrowedFrom: state.form.borrowedFrom,
                description: state.form.description,
                dateLoan: state.form.dateLoan,
                dateReturn: state.form.dateReturn,
                total: Number(state.form.total),
                status: "menunggu",
                inventory: state.selectedInventory._id,
            })).then(() => {
                dispatch(hideModal())
                navigate("/peminjaman")
            });
        }

    }

    return <>
        <div className={"col-lg-8 text-center p-3 mx-auto"}>
            <Row>
                {listLab.map((value, index) => {

                    return <div onClick={() => {
                        dispatch(changeSelectedLab(index))
                    }} key={index}
                                className={`ms-5 shadow-sm border p-3 col ${styles.hoverLab} ${state.selectedLab === index ? styles.activeLab : ""}`}>Lab {value}</div>
                })}
            </Row>
        </div>
        <h5 className={"mt-5"}>Daftar Peralatan pada Laboratorium {listLab[state.selectedLab]}</h5>
        <Button onClick={() => {
            dispatch(clearFormLab())
            handleShow();
            changeModeToCreate();
        }} className={"mt-2"} variant={"outline-primary"}><span className={"bi bi-plus-circle-fill me-2"}></span> Tambah
            Peralatan</Button>
        <div className={"text-center"}>
            {state.loading || globalState.loading ? <Loading/> :
                <>
                    <div className={"col-lg-3"}>
                        <InputGroup className="mb-3 mt-5">
                            <InputGroup.Text><i className={"bi bi-search"}></i></InputGroup.Text>
                            <FormControl
                                placeholder="Cari nama peralatan"
                                onChange={(e) => {
                                    dispatch(search(e.target.value))
                                }}
                            />
                        </InputGroup>
                    </div>
                    <Table bordered className={"mt-4"}>
                        <thead>
                        <tr>
                            <th>Nomor</th>
                            <th>Nama Alat</th>
                            <th>Tahun Pengadaan</th>
                            <th>Jumlah</th>
                            <th>Banyak Peminjaman</th>
                            <th><span className={"bi bi-gear-fill"}></span></th>
                        </tr>
                        </thead>

                        <tbody>
                        {tableByMode()}
                        </tbody>
                    </Table>
                </>

            }

        </div>
        <ModalCustom modalTitle={`Peminjaman ${state.selectedInventory.name || ""}`} modalSize={"lg"}
                     onSubmit={handleSubmit}>
            <div className={"col-lg-12 mx-auto"}>
                <Form.Group className={"mb-3 ms-3"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        Nama Peminjam
                    </Form.Label>
                    <FormControl type={"text"} placeholder={"Masukkan nama"} onChange={(e) => {
                        dispatch(handlerForm({personName: e.target.value}));
                    }} value={state.form.personName}></FormControl>
                </Form.Group>
                <Form.Group className={"mb-3 ms-3"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        NIM / NIK
                    </Form.Label>
                    <FormControl type={"text"} placeholder={"Masukkan NIM / NIK"} onChange={(e) => {
                        dispatch(handlerForm({personID: e.target.value}))
                    }} value={state.form.personID}></FormControl>
                </Form.Group>
                <Form.Group className={"mb-3 ms-3"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        Deskripsi peminjaman
                    </Form.Label>
                    <FormControl type={"text"} placeholder={"Masukkan deskripsi"} onChange={(e) => {
                        dispatch(handlerForm({description: e.target.value}))
                    }} value={state.form.description} required={true}></FormControl>
                </Form.Group>
                <Form.Group className={"mb-3 ms-3"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        Dipinjam dari
                    </Form.Label>
                    <FormControl type={"text"} required={true} placeholder={"Masukkan nama"} onChange={(e) => {
                        dispatch(handlerForm({borrowedFrom: e.target.value}))
                    }} value={state.form.borrowedFrom}></FormControl>
                </Form.Group>

                <Form.Group className={"mb-3 ms-3"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        Tanggal dipinjam
                    </Form.Label>
                    <FormControl type={"date"} onChange={(e) => {
                        dispatch(handlerForm({dateLoan: e.target.value}))
                    }} value={state.form.dateLoan}></FormControl>
                </Form.Group>

                <Form.Group className={"mb-3 ms-3"}>

                    <Form.Label style={{fontWeight: "bold"}}>
                        Tanggal dikembalikan
                    </Form.Label>
                    <FormControl type={"date"} onChange={(e) => {
                        dispatch(handlerForm({dateReturn: e.target.value}))
                    }} value={state.form.dateReturn}></FormControl>
                </Form.Group>

                <Form.Group className={"mt-4 mb-3 ms-3 col-lg-4"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        Jumlah alat
                    </Form.Label>
                    <FormControl min={1} max={state.selectedInventory.total} type={"number"} onChange={(e) => {
                        dispatch(handlerForm({total: e.target.value}))
                    }} value={state.form.total} placeholder={"Masukkan jumlah"}></FormControl>
                </Form.Group>
            </div>
        </ModalCustom>

        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handlerSubmitLab}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Inventory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className={"mb-3 ms-3"}>
                        <Form.Label style={{fontWeight: "bold"}}>
                            Nama Alat
                        </Form.Label>
                        <FormControl type={"text"} placeholder={"Masukkan nama"} onChange={(e) => {
                            dispatch(handlerFormLab({name: e.target.value}));
                        }} value={state.formLab.name} required></FormControl>
                    </Form.Group>
                    <Form.Group className={"mb-3 ms-3"}>
                        <Form.Label style={{fontWeight: "bold"}}>
                            Total
                        </Form.Label>
                        <FormControl type={"number"} placeholder={"Masukkan total alat"} onChange={(e) => {
                            dispatch(handlerFormLab({total: e.target.value}))
                        }} value={state.formLab.total} required={true}></FormControl>
                    </Form.Group>
                    <Form.Group className={"mb-3 ms-3"}>
                        <Form.Label style={{fontWeight: "bold"}}>
                            Code
                        </Form.Label>
                        <FormControl type={"text"} placeholder={"Masukkan code alat"} onChange={(e) => {
                            dispatch(handlerFormLab({code: e.target.value}))
                        }} value={state.formLab.code} required={true}></FormControl>
                    </Form.Group>

                    <Form.Group className={"mb-3 ms-3"}>
                        <Form.Label style={{fontWeight: "bold"}}>Lab</Form.Label>
                        <Form.Select required value={state.formLab.lab} onChange={(e) => {
                            dispatch(handlerFormLab({lab: e.target.value}))
                        }}>
                            {optionLab.map((o, index) => {
                                return <option value={o.value} disabled={o.disabled}
                                               selected={o.selected}>{o.text}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className={"mb-3 ms-3"}>
                        <Form.Label style={{fontWeight: "bold"}}>
                            Tanggal pengadaan
                        </Form.Label>
                        <FormControl type={"date"} onChange={(e) => {
                            dispatch(handlerFormLab({dateIn: e.target.value}))
                        }}
                                     value={state.formLab.dateIn ? dateFormat(state.formLab.dateIn, "yyyy-mm-dd") : ""}></FormControl>
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