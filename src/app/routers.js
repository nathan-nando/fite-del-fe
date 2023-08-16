import {createBrowserRouter} from "react-router-dom";
import {Root} from "../features/Root/Root.jsx";
import {Inventory} from "../features/Inventory/Inventory.jsx";
import {Peminjaman} from "../features/Peminjaman/Peminjaman.jsx";
import {Pengadaan} from "../features/PengadaanAlatBaru/Pengadaan.jsx";

export const routers = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                path: "/",
                Component: Inventory,
            },
            {
                path: "/peminjaman",
                Component: Peminjaman,
            },
            {
                path: "/pengadaan-alat-baru",
                Component: Pengadaan,
            }
        ]
    }
])