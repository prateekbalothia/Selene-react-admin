import { useState } from "react"
import ApiService from "../../Utils/ApiService";

export default function Addnav() {

    const [newMenu,setNewMenu] = useState({
        navbar_name:null,
        navbar_slug:null
    })

    function addMenu(event){
        const {name,value} = event.target ;
        setNewMenu((newMenu)=>({
            ...newMenu,
            [name]:value
        }))
    }

    function saveMenu(){
        const dataString = newMenu;
        ApiService.postData('navbar-add-process',dataString).then((res)=>{
            if (res.status=="success") {
                window.location.href='/menu'
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
                        <form method="POST" encType="multipart/form-data"
                        >
                            <input type="hidden" name="page_id"/>
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
                                                <input type="text"
                                                    className="form-control require"
                                                    placeholder="Site Title" id="page_name_id"
                                                    name="navbar_name" 
                                                    onChange={(event)=>addMenu(event)}

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
                                                        type="text"
                                                        className="form-control required "
                                                        id="page_url_id" aria-describedby="basic-addon3" 
                                                        name="navbar_slug"
                                                        onChange={(event)=>addMenu(event)}
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
                                {/* <div className="card-header">
                                    <div className="row align-items-center gy-3">
                                        <div className="col-sm">
                                            <h5 className="card-title my-1">SEO - Meta Tags</h5>
                                            <p>Define page meta title, meta keywords and meta description to list your page in
                                                search engines

                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body justify-content-sm-center">
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">Page Meta Title: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text"
                                                className="form-control required "
                                                placeholder="Page Meta Title" id="page_meta_title_id" name="page_meta_title"
                                            />

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">Page Meta Keyword: </label>
                                            <input type="text" className="form-control" placeholder="Page Meta Keyword"
                                                name="page_meta_keyword" id="page_meta_keyword_id" 
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">Page Meta Description:</label>
                                            <input type="text" className="form-control" placeholder="Page Meta Desc"

                                                name="page_meta_description" id="page_meta_description_id" />
                                        </div>
                                    </div>
                                </div> */}

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