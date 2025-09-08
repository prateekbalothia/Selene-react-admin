import { useState } from "react"
import ApiService from "../../Utils/ApiService"

export default function Media(){
    const [upmedia,setUpmedia] = useState()

    function handleMedia(event){
        setUpmedia(event.target.files[0])
    }
    
    function uploadMedia(){
        const formData = new FormData();
        formData.append("myfile", upmedia);
        formData.append("media_name", upmedia.name);
        ApiService.postFile('upload', formData).then((res)=>{
            if(res.status==="success"){
                console.log(res.message);
                
            }
        })
    }

    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="row">
                    <div className="col-lg-12">
                        <form method="post" encType="multipart/form-data">
                            <label className="form-label" htmlFor="upload">Upload File:</label>
                            <input className="form-control" type="file" name="myfile" id="upload" onChange={(e)=>handleMedia(e)}/>
                            <button type="button" onClick={uploadMedia} className="btn btn-outline-primary">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}