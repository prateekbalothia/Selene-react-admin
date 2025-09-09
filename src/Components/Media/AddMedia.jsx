import { useState } from "react"
import ApiService from "../../Utils/ApiService"

export default function AddMedia() {
    const [upmedia, setUpmedia] = useState()
    const [preview, setPreview] = useState()

    const allowedMimes = ["png", "jpg", "jpeg"];
    function handleMedia(e) {
        // setUpmedia(event.target.files[0])
        var fileInput = e.target.files[0];
        // console.log(fileInput);
        // return false

        var mime = fileInput.name.split(".").pop();
        var fsize = fileInput.size;
        var file = fsize / 1024;
        var mb = file / 1024; // convert kb to mb
        var maxMb = 2
        if (mb > maxMb) {
            alert("Image size must be less than 2mb");
        } else if (!allowedMimes.includes(mime)) {
            // if allowedMimes array does not have the extension
            alert("Only png, jpg, jpeg alowed");
        } else {
            let reader = new FileReader();
            reader.onload = function (event) {
                // $(".mediaImage").attr("src", event.target.result);
                setPreview(event.target.result)
            };
            reader.readAsDataURL(fileInput);
            // const file = fileInput.files[0];

            setUpmedia(fileInput)
        }
    }
    console.log(upmedia)

    function uploadMedia() {
        const formData = new FormData();
        formData.append("myfile", upmedia);
        formData.append("media_name", upmedia.name);
        ApiService.postFile('upload', formData).then((res) => {
            if (res.status === "success") {
                console.log(res.message);

            }
        })
    }

    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="fileimg d-flex">
                                <img className="fileimg-preview logoimage mediaImage mt-2" style={{ width: "80px", height: "80px", marginRight: "10px", borderRadius: "5px" }} src={preview || "../../../public/assets/img/defaultimage.png"}/>
                                <div style={{ width: "100%" }}>
                                    <form method="post" encType="multipart/form-data">
                                        <label className="form-label" htmlFor="upload">Upload File:</label>
                                        <div className="input-group">
                                            <input className="form-control" type="file" name="myfile" id="upload" accept="image/png, image/gif, image/jpeg" onChange={(e) => handleMedia(e)} />
                                        </div>
                                        <button type="button" onClick={uploadMedia} className="btn btn-outline-primary">Upload</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}