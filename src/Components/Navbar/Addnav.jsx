import { useEffect, useRef, useState } from "react"
import ApiService from "../../Utils/ApiService";
import { useParams } from "react-router-dom";

export default function Addnav() {
    const slug = useParams()
    const didmountref = useRef(true)

    const [newMenu, setNewMenu] = useState({
        _id:0,
        navbar_name: "",
        navbar_slug: ""
    })
    
    useEffect(() => {
        if (didmountref.current) {

            if(slug.id !== undefined){
            ApiService.getData(`navbar-by-id/${slug.id}`).then((res) => {
                if (res.status === "success") {
                    setNewMenu(res.data)
                }
            })
        }
        }
        didmountref.current = false

    }, [])



    function addMenu(event) {
        const { name, value } = event.target;
        setNewMenu((newMenu) => ({
            ...newMenu,
            [name]: value
        }))
    }

    function saveMenu() {
        const dataString = newMenu;
        ApiService.postData('navbar-add-process', dataString).then((res) => {
            if (res?.status == "success") {
                window.location.href = '/menu'
                console.log("Added successfully")
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
                                    <h4 className="mb-sm-0">Add Menu</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Menu</a></li>
                                            <li className="breadcrumb-item active">Add Menu</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <form method="POST" encType="multipart/form-data">
                            <input type="hidden" name={newMenu._id} value="0"/>
                            <div className="card bg-secondary rounded p-2">
                                <div className="card-header">
                                    <div className="row align-items-center gy-3">
                                        <div className="col-sm">
                                            <h5 className="card-title my-1">Add Menu </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body justify-content-sm-center">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Menu Name: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" value={newMenu?.navbar_name}
                                                    className="form-control require"
                                                    placeholder="Site Title" id="page_name_id"
                                                    name="navbar_name"
                                                    onChange={(event) => addMenu(event)}

                                                />


                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Menu Url: <span style={{ color: "red" }}>*</span></label>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text page_urls"
                                                        id="basic-addon3">http://selene.com</span>
                                                    <input
                                                        type="text" value={newMenu?.navbar_slug}
                                                        className="form-control required "
                                                        id="page_url_id" aria-describedby="basic-addon3"
                                                        name="navbar_slug"
                                                        onChange={(event) => addMenu(event)}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Page Content</label>
                                                <textarea type="email" className="form-control ckeditor bg-dark" placeholder="Page Content" name="page_content">

                                                </textarea>
                                            </div>
                                        </div> */}

                                    </div>
                                </div>

                            </div>
                            <div className="card bg-secondary rounded p-2">
                                <div className="card-footer  d-flex justify-content-between">
                                    <button type="button" onClick={saveMenu} id='button' className="btn btn-outline-success"
                                    >Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}