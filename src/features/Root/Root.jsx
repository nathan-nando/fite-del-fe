import {Col, Container, Nav, Navbar,} from "react-bootstrap";

import styles from "./style.module.css";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

export const Root = () => {
    const loc = useLocation();
    const state = useSelector((state)=>state.globalState);

    return <Container fluid className={styles.body}>
        <Navbar expand="lg" className={styles.navbar} variant={"dark"} expanded={"lg"}>
            <Container className={"p-2"}>
                <Navbar.Brand as={Link} to="/"><i className={"bi bi-mask me-2"}></i> Lab Fite Del</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={loc.pathname}>
                        <Nav.Link href="/peminjaman" className={"ms-4"}>Peminjaman</Nav.Link>
                        <Nav.Link href="/laboran" className={"ms-4"}>Laboran</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container className={styles.pageWrapper}>
            {/*{state.modeModal}*/}
            <Outlet/>
        </Container>
    </Container>
}