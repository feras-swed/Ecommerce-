import axiosClint from "./axiosClint";

class git { 
    static async gitListProduct() {
        return axiosClint.get("/products?populate=*");
    }

    static async gitProductById(id) { 
        return axiosClint.get(`/products/${id}?populate=*`);
    }

    static async gitProductByCategory(category){
    //    var category = "MARKETING"
        return axiosClint.get(`/products?filters[category][$eq]=${category}&populate=*`)
    }
}

export default git;
