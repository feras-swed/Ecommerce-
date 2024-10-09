import axiosClint from "./axiosClint";

const gitListProduct = async () => axiosClint.get("/products?populate=*");


export default gitListProduct
