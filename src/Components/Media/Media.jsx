export default function Media(){

    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="row">
                    <div className="col-lg-12">
                        <form method="post">
                            <label className="form-label" htmlFor="upload">Upload File:</label>
                            <input className="form-control" type="file" name="myfile" id="upload" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}