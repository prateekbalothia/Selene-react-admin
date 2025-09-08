import { useEffect, useState } from "react"
import ApiService from "../../Utils/ApiService"

export default function Sitesetting() {
    const [sitedata, setSitedata] = useState({
        website_name: null,
        address: null,
        phone: null,
        email: null
    })
    // useEffect(() => {
    //     ApiService.getData('themesetting').then((res) => {
    //         if (res.status == "success") {
    //             // setSitedata(res.data)
    //         }
    //     })
    // }, [])

    function handleform(event) {
        const { name, value } = event.target;
        setSitedata((sitedata) => ({
            ...sitedata,
            [name]: value
        }))
    }

    function send() {
        const dataString = sitedata
        ApiService.postData('site-setting-process', dataString).then((res) => {
            if (res.status=="success") {
                console.log('sent successfully')             
            }
        })
    }

    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="row">
                    <div className="col-lg-12">
                        <h3>Site settings</h3>
                        <form method="post">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Website name:</label>
                                <input className="form-control" type="text" name="website_name" onChange={(event) => handleform(event)} id="name" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="address">Address:</label>
                                <input className="form-control" type="text" name="address" onChange={(event) => handleform(event)} id="address" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="phone">Phone:</label>
                                <input className="form-control" type="number" name="phone" onChange={(event) => handleform(event)} id="phone" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email:</label>
                                <input className="form-control" type="email" name="email" onChange={(event) => handleform(event)} id="email" />
                            </div>
                            <button type="button" onClick={send} className="btn btn-outline-primary">Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}