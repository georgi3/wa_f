import MyNavbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
    return (
        <div>
            <MyNavbar/>
            { children }
            <Footer />
        </div>
    )
}

export { MainLayout }