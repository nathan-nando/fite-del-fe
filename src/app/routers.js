import {createBrowserRouter} from "react-router-dom";
import {Root} from "../features/Root/Root.jsx";
import {Inventory} from "../features/Inventory/Inventory.jsx";
import {Peminjaman} from "../features/Peminjaman/Peminjaman.jsx";
import {Laboran} from "../features/Laboran/Laboran.jsx";

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
                path: "/laboran",
                Component: Laboran,
            }
        ]
    }
])