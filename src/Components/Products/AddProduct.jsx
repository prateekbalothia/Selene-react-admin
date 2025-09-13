import { useEffect, useState } from "react"
import ApiService from "../../Utils/ApiService"
import { useParams } from "react-router-dom"
import Constant from "../../Utils/Constant"

export default function addProduct() {
    const productDetails = useParams()
    // console.log(productDetails.id)
    const [image_upload_path, setimage_upload_path] = useState("")

    useEffect(() => {
        if (productDetails.id !== undefined) {
            ApiService.getData(`all-products-by-id/${productDetails.id}`).then((res) => {
                if (res.status == "success") {
                    setProductData(res.data)
                    setimage_upload_path(res?.image_upload_path)
                    setProductIamge({ "upload_image": res?.data?.product_image })
                }
            })
        }
    }, [])
    // console.log(productData);



    const [productImage, setProductIamge] = useState({
        upload_image: null,
    })
    // console.log(productImage.upload_image);

    const [productData, setProductData] = useState({
        _id: 0,
        product_name: "",
        product_slug: "",
        product_description: "",
        product_quantity: "",
        product_quantity_gms: "",
        product_selling_price: "",
        product_discount_price: "",
        product_mrp: "",
        meta_description: "",
        meta_title: "",
        meta_keyword: "",
    })

    function createSlug(str) {
        return str
            .toLowerCase() // Convert string to lowercase
            .replace(/[^\w\s-]/g, '') // Remove non-word characters
            .trim() // Trim leading/trailing whitespace
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/--+/g, '-'); // Replace multiple - with single -
    }

    function slugger(event) {
        setProductData((prev) => {
            const name = prev.product_name
            const slug = createSlug(name)
            const title = prev.meta_title
            const keyword = createSlug(title)
            return {
                ...prev,
                product_slug: slug,
                meta_keyword: keyword
            }
        })
    }

    function sellprice(event) {
        if (event.target.name === "product_mrp") {
            const mrp = parseFloat(event.target.value) || 0;

            setProductData({
                ...productData,
                product_mrp: mrp,
                product_selling_price: mrp,
            })
            return false
        }
        if (event.target.name === "product_discount_price") {
            const discount = parseFloat(event.target.value) || 0;
            const mrp = parseFloat(productData.product_mrp) || 0

            if (discount > mrp || discount == mrp) {
                if (discount > mrp) {
                    alert("⚠️ Discount price cannot be greater than MRP!");

                } else if (discount == mrp) {
                    alert("⚠️ Discount price and MRP cannot be same!");

                }
                setProductData({
                    ...productData,
                    product_discount_price: "",
                    product_selling_price: "",
                })
                return false
            } else {
                setProductData({
                    ...productData,
                    product_discount_price: discount,

                    product_selling_price: mrp - discount,
                })
            }

        }

    }

    const allowedMimes = ["png", "jpg", "jpeg"];
    function addProductImage(event) {
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
        setProductIamge({
            ...productImage,
            upload_image: upload_image
        })
    }

    function addProduct(event) {
        const { name, value } = event.target;
        setProductData((productData) => ({
            ...productData,
            [name]: value,
        }))
    }
    // console.log(productData);



    function saveProduct() {
//         console.log(productImage);
// return false
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

            const formData = new FormData();

            // append text fields
            Object.entries(productData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // append file (only if user selected one)
            if (productImage) {
                formData.append("upload_image", productImage?.upload_image);
            }
            ApiService.postFile('product-add-process', formData).then((res) => {
                if (res.status === "success") {
                    console.log(res.data)
                    // window.location.href = "/all-product"
                }
            })
        }
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
                                                    className="form-control required"
                                                    placeholder="Product Title" id="product_name"
                                                    name="product_name"
                                                    value={productData.product_name}
                                                    onChange={(e) => { addProduct(e); slugger(e) }}
                                                    required
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
                                                        value={productData.product_slug}
                                                        name="product_slug"
                                                        onChange={(e) => { addProduct(e) }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 ">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="pd">Product Description:</label>
                                                <textarea type="text"
                                                    className="form-control ckeditor bg-dark"
                                                    placeholder="Product Content"
                                                    name="product_description" id="pd"
                                                    value={productData.product_description}
                                                    onChange={(e) => { addProduct(e) }}>
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="product_quantity_gms">
                                                    Size: <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <select className="form-select required"
                                                    // defaultValue={1}
                                                    style={{ border: "1px solid #434141" }}
                                                    id="product_quantity_gms"
                                                    name="product_quantity_gms"
                                                    value={productData.product_quantity_gms}
                                                    onChange={(e) => { addProduct(e) }}
                                                >
                                                    <option value="">Select Size</option>
                                                    <option value="250gm">250gm</option>
                                                    <option value="500gm">500gm</option>
                                                    <option value="1000gm">1kg</option>
                                                    <option value="2000gm">2kg</option>
                                                    <option value="3000gm">3kg</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="product_quantity">
                                                    Quantity: <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <select className="form-select required"
                                                    // defaultValue={1}
                                                    style={{ border: "1px solid #434141" }}
                                                    id="product_quantity"
                                                    name="product_quantity"
                                                    value={productData.product_quantity}
                                                    onChange={(e) => { addProduct(e) }}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="mrp">MRP:<span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control required"
                                                    type="number"
                                                    name="product_mrp" id="mrp"
                                                    value={productData.product_mrp}
                                                    onChange={(e) => { addProduct(e); sellprice(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="dis">Discount:<span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control required"
                                                    type="number"
                                                    name="product_discount_price" id="dis"
                                                    value={productData.product_discount_price}
                                                    onChange={(e) => { addProduct(e); sellprice(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="sp">Selling Price:<span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control required"
                                                    type="number"
                                                    name="product_selling_price" id="sp"
                                                    value={productData.product_selling_price}
                                                    onChange={(e) => { addProduct(e) }} />

                                            </div>
                                        </div>
                                        <div className="col-lg-12 fileimg d-flex mb-3">
                                            <div className="col-lg-1">
                                                <img className="fileimg-preview logoimage mediaImage mt-2"
                                                    style={{ width: "90%", height: "90%", marginRight: "10px", borderRadius: "5px" }}
                                                    src={productImage.upload_image !=null ? image_upload_path + productImage.upload_image : Constant.default_image} />
                                            </div>
                                            <div className="col-lg-11">
                                                <label className="form-label" htmlFor="upload">Product Image:<span style={{ color: "red" }}>*</span></label>
                                                <input className="form-control "
                                                    type="file"
                                                    name="upload_image" id="upload"
                                                    accept="image/png, image/gif, image/jpeg"
                                                    onChange={(e) => { addProductImage(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="mt">Meta Title: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control required"
                                                    placeholder="Meta Title" id="mt"
                                                    name="meta_title"
                                                    value={productData.meta_title}
                                                    onChange={(e) => { addProduct(e); slugger(e) }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="mk">Meta Keyword: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control required"
                                                    placeholder="Meta keyword" id="mk"
                                                    value={productData.meta_keyword}
                                                    name="meta_keyword"
                                                    onChange={(e) => { addProduct(e) }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="md">Meta Description:</label>
                                                <textarea type="text"
                                                    className="form-control ckeditor bg-dark"
                                                    placeholder="Meta Description"
                                                    name="meta_description" id="md"
                                                    value={productData.meta_description}
                                                    onChange={(e) => { addProduct(e) }}>
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