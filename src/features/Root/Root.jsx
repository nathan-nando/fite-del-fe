import { Container, Nav, Navbar,} from "react-bootstrap";

import styles from "./style.module.css";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkLogin, logout} from "./slice.js";

export const Root = () => {
    const loc = useLocation();
    const state = useSelector((state)=>state.globalState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLogin())
    }, [dispatch]);

    const navigate = useNavigate()

    return <Container fluid className={styles.body}>
        <Navbar expand="lg" className={styles.navbar} variant={"dark"} expanded={"lg"}>
            <Container className={"p-2"}>
                <Navbar.Brand as={Link} to="/"><i className={"bi bi-mask me-2"}></i> Lab Fite Del</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={loc.pathname}>
                        <Nav.Link href="/peminjaman" className={"ms-4"}>Peminjaman</Nav.Link>
                        <Nav.Link href="/laboran" className={"ms-4"}>Laboran</Nav.Link>
                        {state.isLogin ? <Nav.Link onClick={()=>{
                            dispatch(logout());
                            navigate("/laboran")
                        }} className={"ms-4"}><span className={"bi bi-person-fill"}></span> Logout</Nav.Link>  : ""}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container className={styles.pageWrapper}>
            <Outlet/>
        </Container>
    </Container>
}