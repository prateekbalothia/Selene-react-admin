import React, { useEffect, useState } from "react"
import ApiService from "../../Utils/ApiService";

export default function Catagory() {
    const [catagory, setCatagory] = useState([])

    const [formdata, setFormdata] = useState({
        _id: 0,
        cat_name: "",
        cat_slug: ""
    })

    useEffect(() => {
        ApiService.getData('all-catagory').then((res) => {
            if (res.status === "success") {
                // console.log(res);

                setCatagory(res.data)
            }
        })
    }, [])
    // console.log(catagory);



    function createSlug(str) {
        return str
            .toLowerCase() // Convert string to lowercase
            .replace(/[^\w\s-]/g, '') // Remove non-word characters
            .trim() // Trim leading/trailing whitespace
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/--+/g, '-'); // Replace multiple - with single -
    }

    function slugger(event) {
        setFormdata((formdata) => {
            const name = formdata.cat_name;
            const slug = createSlug(name)
            return {
                ...formdata,
                cat_slug: slug
            }
        })
    }

    function handlechange(event) {
        const { name, value } = event.target;
        setFormdata((formdata) => ({
            ...formdata,
            [name]: value
        }))
    }
    // console.log(formdata);

    function submitForm() {
        let required = document.getElementsByClassName("required");
                let counter = 0
                for (let i = 0; i < required.length; i++) {
                    if (required[i].value === "") {
                        required[i].style.border = "1px solid red";
                        counter++
                    }
                }
                if (counter > 0) {
                    window.alert("⚠️ Please Fill Required Field")
                    return false
                }else{
                    const dataString = formdata;
                    ApiService.postData('catagory-add-process', dataString).then((res) => {
                        if (res?.status == "success") {
                            window.location.href = '/product-category'
                            console.log("Added successfully")
                        }else{
                            window.alert(res.message)
                        }
                    })
                }
            }

    function statusChange(id) {
        ApiService.getData(`catagory-status-update/${id}`).then((res) => {
            if (res.status === "success") {
                console.log(res.status)
                window.location.reload()
            }
        })
    }

    function editCat(id){
        ApiService.getData(`catagory-by-id/${id}`).then((res)=>{
            if (res.status === "success") {
                // console.log(res.data)
                setFormdata(res.data)
            }
        })
    }

return (
    <>
        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-sm-0">Manage Category</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Category</a></li>
                                        <li className="breadcrumb-item active">Manage Category</li>
                                    </ol>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div id="formsubmit">
                            <input type="hidden" name="_id"
                            // value={formData._id} 

                            />
                            <div className="card bg-secondary rounded p-3">
                                <div className="card-header">
                                    <div className="row align-items-center gy-3">
                                        <div className="col-sm">
                                            <h5 className="card-title my-1">Add Category</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body justify-content-sm-center">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Category Name: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control required"
                                                    onChange={(event) => { handlechange(event); slugger(event) }}
                                                    placeholder="Menu Name"
                                                    // onBlur={namechangemetaupdate} 
                                                    id='cat_name_id'
                                                    value={formdata?.cat_name}
                                                    name="cat_name" />

                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Category Slug: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control required " placeholder="slug"
                                                    id="cat_slug_id" readOnly
                                                    value={formdata?.cat_slug}
                                                    name="cat_slug" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer  d-flex justify-content-between">
                                    <button type="submit" id='button' className="btn btn-outline-success"
                                        onClick={submitForm}
                                    >Save

                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card bg-secondary rounded p-2">
                            <div className="card-header">
                                <div className="row align-items-center gy-3">
                                    <div className="col-sm">
                                        <h5 className="card-title my-1">Category</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body justify-content-sm-center">
                                <div className="row align-items-center gy-3">
                                    <div className="col-lg-12">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "60px" }}>S.no.</th>
                                                    <th>Category Name</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {catagory && catagory.length > 0 ?
                                                    catagory.map((value, index) =>
                                                        <React.Fragment key={index}>
                                                            <tr >
                                                                <th>{index + 1}</th>
                                                                <td>{value.cat_name}</td>

                                                                {value?.cat_status == 1 ? <>
                                                                    <td className="text-center"><button onClick={(e) => statusChange(value?._id)} className="btn"><span className="badge bg-success-subtle text-uppercase">Active</span></button>
                                                                    </td>
                                                                </> : <>
                                                                    <td className="text-center"><button className="btn" onClick={(e) => statusChange(value?._id)}><span className="badge bg-danger-subtle text-uppercase">Inactive</span></button>
                                                                    </td>
                                                                </>}
                                                                <td className="text-center">
                                                                    <a onClick={(e) => editCat(value?._id)} className="btn btn-info btn-sm btnaction"><i
                                                                        className="fas fa-pencil-alt"></i></a>
                                                                    <a onClick={(e) => deleteconfirm(value?._id)}
                                                                        className="btn btn-danger  btn-sm btnaction"><i
                                                                            className="fas fa-trash "></i></a>
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    )
                                                    :
                                                    <tr>
                                                        <td className="text-center" colSpan="5">No Data Found</td>
                                                    </tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer listing justify-content-sm-center">
                                <p>Sowing 1 of 1</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
)
}