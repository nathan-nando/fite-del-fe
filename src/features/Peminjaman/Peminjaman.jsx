import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchLoans} from "./thunk.js";
import {Loading} from "../../components/Loading/Loading.jsx";
import {Badge, Button, Col, Dropdown, DropdownButton, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import {changeSelectedLoan, changeSelectedStatus, search} from "./slice.js";
import {ModalCustom} from "../../components/ModalCustom/ModalCustom.jsx";
import {showModal} from "../Root/slice.js";
import dateFormat from "dateformat";

export const Peminjaman = () => {
    const state = useSelector((state) => state.loanState);
    const globalState = useSelector((state) => state.globalState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoans())
    }, [dispatch]);

    const tableLoan = () => {
        return state.searchedLoans.map((value, index, array) => {
            if (value.status === state.statusLoan) {
                return <tr key={index}>
                    <td>{value.personName}</td>
                    <td>{value.personID}</td>
                    <td>{value.borrowedFrom}</td>
                    <td><Badge bg={"success"}
                               className={"pb-2 pt-2 ps-4 pe-4 me-2"}>{value.inventory ? value.inventory.name : ""}</Badge>
                    </td>
                    <td><Button variant={"light"} style={{fontWeight: "bold"}} onClick={async () => {
                        await dispatch(changeSelectedLoan(array[index]))
                        dispatch(showModal())
                    }}>Detail</Button></td>
                </tr>
            }

        })
    }


    return <>
        <h5>Daftar Riwayat Peminjam</h5>

        <div>
            {state.loading || globalState.loading ? <Loading/> :
                <>
                    <div className={"col-lg-3"}>
                        <InputGroup className="mb-3 mt-5">
                            <InputGroup.Text><i className={"bi bi-search"}></i></InputGroup.Text>
                            <FormControl
                                placeholder="Cari nama peminjam"
                                onChange={(e) => {
                                    dispatch(search(e.target.value))
                                }}
                            />

                        </InputGroup>
                    </div>
                    <Col lg={2}>
                        <Row>
                            <Col lg={3} className={"mt-2"}><p style={{fontWeight: "bold"}}>Status</p></Col>
                            <Col><DropdownButton
                                variant={state.statusLoan === "menunggu" ? "warning" : state.statusLoan === "disetujui" ? "success" : state.statusLoan === "dikembalikan" ? "primary" : "danger"}
                                title={state.statusLoan}>
                                <Dropdown.Item onClick={() => {
                                    dispatch(changeSelectedStatus("menunggu"))
                                }}>Menunggu</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    dispatch(changeSelectedStatus("ditolak"))
                                }}>Ditolak</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    dispatch(changeSelectedStatus("disetujui"))
                                }}>Disetujui</Dropdown.Item>

                                <Dropdown.Item onClick={() => {
                                    dispatch(changeSelectedStatus("dikembalikan"))
                                }}>Dikembalikan</Dropdown.Item>
                            </DropdownButton>
                            </Col>
                        </Row>
                    </Col>

                    <Table bordered className={"mt-4"}>
                        <thead>
                        <tr>
                            <th>Nama Peminjam</th>
                            <th>NIM/NIK</th>
                            <th>Dipinjam dari</th>
                            <th>Alat yang dipinjam</th>
                            <th><span className={"bi bi-gear-fill"}></span></th>
                        </tr>
                        </thead>

                        <tbody>
                        {tableLoan()}
                        </tbody>
                    </Table>
                </>

            }
        </div>
        {state.selectedLoan.inventory ? <ModalCustom modalTitle={`Detail Peminjaman`} modalSize={"lg"} withFooter={false}>
            <div className={"col-lg-12 mx-auto p-3"}>
                <Row>
                    <Col lg={3}>
                        Nama Peminjam
                    </Col>
                    <Col>
                        {state.selectedLoan.personName}
                    </Col>
                </Row>
                <Row className={"mt-4"}>
                    <Col lg={3}>
                        NIM / NIK
                    </Col>
                    <Col>
                        {state.selectedLoan.personID}
                    </Col>
                </Row>
                <Row className={"mt-4"}>
                    <Col lg={3}>
                        Dipinjam dari
                    </Col>
                    <Col>
                        {state.selectedLoan.borrowedFrom}
                    </Col>
                </Row>
                <Row className={"mt-4"}>
                    <Col lg={3}>
                        Alat yang dipinjam
                    </Col>
                    <Col>
                        {state.selectedLoan.personName}
                    </Col>
                </Row>
                <Row className={"mt-4"}>
                    <Col lg={3}>
                        Jumlah alat yang dipinjam
                    </Col>
                    <Col>
                        {state.selectedLoan.total || 0}
                    </Col>
                </Row>
                <Row className={"mt-4"}>
                    <Col lg={3}>
                        Tanggal peminjaman
                    </Col>
                    <Col>
                        {dateFormat(state.selectedLoan.dateLoan, "dd mmmm yyyy")}
                    </Col>
                </Row>

                <Row className={"mt-4"}>
                    <Col lg={3}>
                        Tanggal kembalian
                    </Col>
                    <Col>
                        {dateFormat(state.selectedLoan.dateReturn, "dd mmmm yyyy")}
                    </Col>
                </Row>

                {/*{Date.parse(state.selectedLoan.dateReturn) < new Date().getTime() ? "terlambat" : "ga"}*/}
                {/*<Badge className={"mt-3"}>Terlambat</Badge>*/}

                <Row className={"mt-4"}>
                    <Col lg={3}>
                        Deskripsi
                    </Col>
                    <Col>
                        {state.selectedLoan.description}
                    </Col>
                </Row>

                {state.selectedLoan.condition ? <Row className={"mt-4"}>
                    <Col lg={3}>
                        Kondisi peminjaman
                    </Col>
                    <Col>
                        {state.selectedLoan.condition}
                    </Col>
                </Row> : ""}


                <Badge className={"mt-5 p-3 "} style={{fontSize: 16}}
                       bg={state.selectedLoan.status === "menunggu" ? "warning" : state.selectedLoan.status === "disetujui" ? "success" : state.selectedLoan.status === "dikembalikan" ? "primary" : "danger"}>{state.selectedLoan.status}</Badge>

                {state.selectedLoan.status === "disetujui" ?  <Badge className={"ms-3 mt-5 p-3"} style={{fontSize: 16}} bg={"secondary"}>Sedang dipinjam</Badge> : ""}

                {(state.selectedLoan.status === "disetujui" || state.selectedLoan.status === "dikembalikan") &&  Date.parse(state.selectedLoan.dateReturn) < new Date().getTime() ?  <Badge className={"ms-3 mt-5 p-3"} style={{fontSize: 16}} bg={"danger"}>Terlambat</Badge> : ""}
                {(state.selectedLoan.status === "disetujui" || state.selectedLoan.status === "dikembalikan") &&  Date.parse(state.selectedLoan.dateReturn) > new Date().getTime() ?  <Badge className={"ms-3 mt-5 p-3"} style={{fontSize: 16}} bg={"primary"}>Tidak terlambat</Badge> : ""}
            </div>
        </ModalCustom> : ""}

    </>
}