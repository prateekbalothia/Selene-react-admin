import { useState } from "react"
import ApiService from "../../Utils/ApiService"

export default function addProduct() {
    const [productImage, setProductIamge] = useState({
        product_image: "",
    })
    const [productData, setProductData] = useState({
        product_name: "",
        product_slug: "",
        product_quantity: "",
        product_selling_price: "",
        product_discount_price: "",
        product_mrp: "",
        meta_description: "",
        meta_title: "",
        meta_keyword: "",
    })

    const allowedMimes = ["png", "jpg", "jpeg"];
    function addProductImage(event) {
        const product_image = event.target.files[0];
        if (!product_image) return;

        const mime = product_image.name.split(".").pop().toLowerCase();
        const mb = product_image.size / (1024 * 1024); // size in MB
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
        reader.readAsDataURL(product_image);
        setProductIamge(product_image)
    }
    // console.log(productImage);

    function addProduct(event) {
        const { name, value } = event.target;
        setProductData((productData) => ({
            ...productData,
            [name]: value,
        }))
    }
    // console.log(productData);
    


    function saveProduct() {
        const dataString = productData;
        ApiService.postData('product-add-process', dataString).then((res) => {
            if (res.status === "success") {
                console.log(res.data)
            }
        })
    }

    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div style={{ width: "100%" }}>
                                <form method="post" encType="multipart/form-data">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="product_name">Product Name: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control require"
                                                    placeholder="Product Title" id="product_name"
                                                    name="product_name" onChange={(e) => { addProduct(e) }}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="product_slug">Product Slug: <span style={{ color: "red" }}>*</span></label>
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control required "
                                                        id="product_slug" aria-describedby="basic-addon3"
                                                        name="product_slug" onChange={(e) => { addProduct(e) }}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="pd">Product Description:</label>
                                                <textarea type="text" className="form-control ckeditor bg-dark" placeholder="Product Content" name="product_description" id="pd" onChange={(e) => { addProduct(e) }}>

                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="product_quantity">
                                                    Quantity: <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="product_quantity"
                                                    name="product_quantity"
                                                    min="1"
                                                    max="10"
                                                    defaultValue="1" onChange={(e) => { addProduct(e) }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="mrp">MRP:<span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control" type="text" name="product_mrp" id="mrp" onChange={(e) => { addProduct(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="dis">Discount:<span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control" type="text" name="product_discount_price" id="dis" onChange={(e) => { addProduct(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="sp">Selling Price:<span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control" type="text" name="product_selling_price" id="sp" onChange={(e) => { addProduct(e) }} />
                                            </div>
                                        </div>
                                        <div className="fileimg d-flex mb-3">
                                            <div className="col-lg-1">
                                                <img className="fileimg-preview logoimage mediaImage mt-2" style={{ width: "80px", height: "80px", marginRight: "10px", borderRadius: "5px" }} src={"../../../public/assets/img/defaultimage.png"} />
                                            </div>
                                            <div className="col-lg-11">
                                                <label className="form-label" htmlFor="upload">Product Image:<span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control" type="file" name="product_image" id="upload" accept="image/png, image/gif, image/jpeg" onChange={(e) => { addProductImage(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="mt">Meta Title: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control require"
                                                    placeholder="Meta Title" id="mt"
                                                    name="meta_title" onChange={(e) => { addProduct(e) }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="mk">Meta Keyword: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control require"
                                                    placeholder="Meta keyword" id="mk"
                                                    name="meta_keyword" onChange={(e) => { addProduct(e) }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="md">Meta Description:</label>
                                                <textarea type="text" className="form-control ckeditor bg-dark" placeholder="Meta Description" name="meta_description" id="md" onChange={(e) => { addProduct(e) }}>

                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <button type="button" onClick={saveProduct} className="btn btn-outline-primary">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}