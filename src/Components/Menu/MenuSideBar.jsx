import { NavLink, useLocation } from "react-router-dom"

const MenuSideBar = () => {

    return <>
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-secondary navbar-dark">
                {/* <a href="index.html" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>DarkPan</h3>
                    </a> */}
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <a href="/">
                            <img className="rounded-circle" src="/public/assets/img/selene.png" alt="" style={{ width: "40px", height: "40px" }} />
                        </a>
                        <div
                            className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                        </div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">Selene</h6>
                        <span>Admin</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">

                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? "nav-item nav-link scrollto active" : "nav-item nav-link scrollto"
                        }>
                        <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                    </NavLink>
                    <NavLink to="/site-setting" className={({ isActive }) =>
                        isActive ? "nav-item nav-link scrollto active" : "nav-item nav-link scrollto"
                        }>
                    <i className="fa fa-tachometer-alt me-2"></i>Site setting
                    </NavLink>
                    <NavLink to="/menu" className={({ isActive }) =>
                        isActive ? "nav-item nav-link scrollto active" : "nav-item nav-link scrollto"
                        }>
                    <i className="fa fa-tachometer-alt me-2"></i>Menu
                    </NavLink>
                    <NavLink to="/all-media" className={({ isActive }) =>
                        isActive ? "nav-item nav-link scrollto active" : "nav-item nav-link scrollto"
                        }>
                    <i className="fa fa-tachometer-alt me-2"></i>Media
                    </NavLink>
                    <NavLink to="/all-product" className={({ isActive }) =>
                        isActive ? "nav-item nav-link scrollto active" : "nav-item nav-link scrollto"
                        }>
                    <i className="fa fa-tachometer-alt me-2"></i>Products
                    </NavLink>

                    {/* <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i
                            className="fa fa-laptop me-2"></i>Page</a>
      <div className="dropdown-menu bg-transparent border-0 show">
                            <NavLink to="/all-page" className="dropdown-item active">All Page</NavLink>
                            
                        </div>
                    </div> */}



                </div>
            </nav>
        </div>
    </>
}

export default MenuSideBar
