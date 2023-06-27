import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLoaderData } from "react-router-dom";

const Layout = () => {
    const accessToken = useLoaderData()
    const isAuthenticated = !!accessToken
    return (
        <div className="min-h-screen flex flex-col">
            <div className='py-4 bg-white sticky top-0 left-0 right-0 shadow z-10'>
                <Navbar isAuthenticated={isAuthenticated} />
            </div>
            <div className="grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout