import React from "react";
import Footer from "../Footer/Footer";
import Routing from "../../RoutingArea/Routing";
import PrimarySearchAppBar from "../Header/PrimarySearchAppBar";
import css from "./Layout.module.css";
import DrawerList from "../Menu/DrawerList";

export function Layout(): JSX.Element {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <div className={css.Layout}>
            <header>
                <PrimarySearchAppBar />
            </header>
            <aside>
                <DrawerList open={drawerOpen} toggleDrawer={toggleDrawer} />
            </aside>
            <main>
                <Routing />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
