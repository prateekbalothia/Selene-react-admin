import { useEffect, useState } from "react"
import ApiService from "../../Utils/ApiService"
import { Link } from "react-router-dom"

export default function Navbar() {
    const [navitem, setNavitem] = useState([])
    useEffect(() => {
        ApiService.getData('navbar').then((res) => {
            if (res.status == "success") {
                setNavitem(res.data)
            }
        })
    },[])
    function stat(id){
        const dataString = {_id:id}
        ApiService.postData('navbar-update-process',dataString).then((res)=>{
            if(res.status==="success"){
                window.location.reload()
            }
        })
        // setNavitem((prev)=>
        //     prev.map((item)=>
        //         item._id == id ? {...item, navbar_status: item.navbar_status === 1?0:1}:item
        //     )
        // )
    }

    function deletee(id)
    {
        const dataString = {_id:id}
        if (window.confirm("Are you sure you want to delete this item?")) {
            ApiService.postData('navbar-delete-process',dataString).then((res)=>{
                if (res.status === "success") {
                    window.location.reload()                
                }
            })
            
        }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-sm-0">Manage Menu</h4>
                                <div className="user-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Manu</a></li>
                                        <li className="breadcrumb-item active">Manage Menu</li>
                                    </ol>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal"><i
                                    className="ri-add-line me-2"></i><Link to='/add-navitem'>Add New</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card bg-secondary rounded h-100 p-4">
                            <div className="card-header">
                                <div className="row align-items-center gy-3">
                                    <div className="col-sm">
                                        <h5 className="card-title my-1">Menu</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body justify-content-sm-center">
                                <div className="row align-items-center gy-3">
                                    <div className="col-lg-12">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>S.no.</th>
                                                    <th>Menu Name</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {navitem.map((item, index) => (
                                                    <tr key={item._id}>
                                                        <th>{index+1}</th>
                                                        <td>{item.navbar_name}</td>
                                                        {
                                                            item.navbar_status == 1 ? (<td className="text-center"><button className="btn"><span
                                                                className="badge bg-success-subtle text-uppercase" onClick={() => stat(item._id)}>Active</span></button>
                                                            </td>) : (<td className="text-center"><button className="btn"><span
                                                                className="badge bg-danger-subtle text-uppercase" onClick={() => stat(item._id)}>Inactive</span></button>
                                                            </td>)
                                                        }
                                                        <td className="text-center">
                                                            <button className="btn btn-info btn-sm btnaction"><i
                                                                className="fas fa-pencil-alt"></i></button>
                                                            <button className="btn btn-danger  btn-sm btnaction" onClick={()=>deletee(item._id)}><i
                                                                className="fas fa-trash "></i></button>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}