import React, { useEffect, useState } from "react"
import Constant from "../../Utils/Constant";
import ApiService from "../../Utils/ApiService";

export default function SliderAndBanner() {
    const [slider, setSlider] = useState({
        slider_name: "",
        slider_description: "",
        upload_image: null
    })
    const [sliderData, setSliderData] = useState([])
    const [image_upload_path, setimage_upload_path] = useState("")

    useEffect(() => {
        ApiService.getData('slider-and-banner').then((res) => {
            if (res.status === "success") {
                setSliderData(res.data)
                setimage_upload_path(res.image_upload_path)
            }
        })
    }, [])


    function handlechange(event) {
        const { name, value } = event.target;

        setSlider((slider) => ({
            ...slider,
            [name]: value,
        }))
    }
    // console.log(slider);

    function handleimg(event) {
        const allowedMimes = ["png", "jpg", "jpeg"];
        const upload_image = event.target.files[0];
        if (!upload_image) return;

        const mime = upload_image.name.split(".").pop().toLowerCase();
        const mb = upload_image.size / (1024 * 1024); // size in MB
        const maxMb = 2;

        if (mb > maxMb) {
            alert("Image size must be less than 2 MB");
            return;
        }

        if (!allowedMimes.includes(mime)) {
            alert("Only png, jpg, jpeg allowed");
            return;
        }
        let reader = new FileReader();
        reader.onload = function (event) {
            $(".mediaImage").attr("src", event.target.result);
        };
        reader.readAsDataURL(upload_image);
        setSlider((slider) => ({
            ...slider,
            upload_image: upload_image
        }))
    }

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
            window.alert("Please Fill Required Field")
            return false
        } else {
            console.log(slider);

            ApiService.postFile('add-slider-process', slider).then((res) => {
                if (res.status === "success") {
                    console.log(res.message);
                }
            })

        }
    }


    function statusChange(id) {
        ApiService.getData(`slider-status-process/${id}`).then((res) => {
            if (res.status === "success") {
                window.location.reload()
            }
        })
    }

    function editSlider(id) {

    }

    function deleteconfirm(id) {

    }


    return (
        <>
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="mb-sm-0">Manage Slider and Banner</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Slider and Banner</a></li>
                                            <li className="breadcrumb-item active">Manage Slider and Banner</li>
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
                                                <h5 className="card-title my-1">Add Slider and Banner</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body justify-content-sm-center">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Slider Name: <span style={{ color: "red" }}>*</span></label>
                                                    <input type="text"
                                                        className="form-control required"
                                                        onChange={(event) => { handlechange(event); }}
                                                        placeholder="Slider Name"
                                                        id='slider_name_id'
                                                        // value={formdata?.cat_name}
                                                        name="slider_name" />

                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Slider Description: <span style={{ color: "red" }}>*</span></label>
                                                    <textarea type="text"
                                                        className="form-control required " placeholder="Slider Description"
                                                        onChange={(event) => { handlechange(event); }}
                                                        id="slider-description-id"
                                                        // value={formdata?.cat_slug}
                                                        name="slider_description" ></textarea>

                                                </div>
                                            </div>
                                            <div className="col-lg-12 fileimg d-flex mb-3">

                                                <div className="col-lg-11">
                                                    <label className="form-label" htmlFor="upload">Product Image:<span style={{ color: "red" }}>*</span></label>
                                                    <input className="form-control"
                                                        type="file"
                                                        name="upload_image" id="upload"
                                                        accept="image/png, image/gif, image/jpeg"
                                                        onChange={(e) => { handleimg(e) }} />
                                                </div>
                                                <div className="col-lg-1">
                                                    <img className="fileimg-preview logoimage mediaImage mt-2"
                                                        style={{ width: "90%", height: "90%", marginRight: "10px", borderRadius: "5px" }}
                                                        src={Constant.default_image}
                                                    // src={productImage.upload_image != null ? image_upload_path + productImage.upload_image : Constant.default_image} 

                                                    />
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
                                                        <th>Slider image</th>
                                                        <th>Slider Name</th>
                                                        <th className="text-center">Status</th>
                                                        <th className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {sliderData && sliderData.length > 0 ?
                                                        sliderData.map((value, index) =>
                                                            <React.Fragment key={index}>
                                                                <tr >
                                                                    <th>{index + 1}</th>
                                                                    <td><img src={value?.slider_image != "" ? image_upload_path + value.slider_image : Constant.default_image} alt="img" height='30px' /></td>
                                                                    <td>{value.slider_name}</td>

                                                                    {value?.slider_status == 1 ? <>
                                                                        <td className="text-center"><button onClick={(e) => statusChange(value?._id)} className="btn"><span className="badge bg-success-subtle text-uppercase">Active</span></button>
                                                                        </td>
                                                                    </> : <>
                                                                        <td className="text-center"><button className="btn" onClick={(e) => statusChange(value?._id)}><span className="badge bg-danger-subtle text-uppercase">Inactive</span></button>
                                                                        </td>
                                                                    </>}
                                                                    <td className="text-center">
                                                                        <a onClick={(e) => editSlider(value?._id)} className="btn btn-info btn-sm btnaction"><i
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