import { useEffect, useState } from "react"
import ApiService from "../../Utils/ApiService"
import { Link } from "react-router-dom"
import Constant from "../../Utils/Constant"


export default function Product() {

    const [productDetail, setProductDetail] = useState([])
    const [image_upload_path, setimage_upload_path] = useState("")

    useEffect(() => {
        ApiService.getData('all-products').then((res) => {
            if (res.status === "success") {
                // console.log(res);
                setProductDetail(res.data)
                setimage_upload_path(res.image_upload_path)

            }
        })
    }, [])
    // console.log(productDetail)

    function stat(_id) {
        // const dataString = { _id: id }
        ApiService.getData(`product-status-process/${_id}`).then((res) => {
            if (res.status === "success") {
                window.location.reload()
            }
        })
    }

    function deletee(_id) {
        // const dataString = { _id: id }
        if (window.confirm("Are you sure you want to delete this item?")) {
            ApiService.getData(`product-delete-process/${_id}`).then((res) => {
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
                                <h4 className="mb-sm-0">Manage Products</h4>
                                <div className="user-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Products</a></li>
                                        <li className="breadcrumb-item active">Manage Products</li>
                                    </ol>
                                </div>
                            </div>
                            <div>
                                <Link to='/add-product'><button className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal"><i
                                    className="ri-add-line me-2"></i>Add New</button></Link>
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
                                        <h5 className="card-title my-1">All Products</h5>
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
                                                    <th>Preview</th>
                                                    <th>Product Name</th>
                                                    <th>Size (grams)</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productDetail.map((item, index) => (
                                                    <tr key={item._id}>
                                                        <th>{index + 1}</th>
                                                        <td><img src={item?.product_image != ""?image_upload_path + item.product_image : Constant.default_image} alt="img" height='30px' /></td>
                                                        <td>{item.product_name}</td>
                                                        <td>{item.product_quantity_gms}</td>
                                                        {
                                                            item.product_status == 1 ? (<td className="text-center"><button className="btn" onClick={() => stat(item._id)}><span
                                                                className="badge bg-success-subtle text-uppercase" >Active</span></button>
                                                            </td>) : (<td className="text-center"><button className="btn" onClick={() => stat(item._id)}><span
                                                                className="badge bg-danger-subtle text-uppercase" >Inactive</span></button>
                                                            </td>)
                                                        }
                                                        <td className="text-center">
                                                            <a className="btn btn-info btn-sm btnaction" href={`/add-product/${item._id}`}><i
                                                                className="fas fa-pencil-alt"></i></a>
                                                            <a className="btn btn-danger  btn-sm btnaction" onClick={() => deletee(item._id)}><i className="fas fa-trash "></i></a>
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