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

    static async addToCarde(data) {
        //    var category = "MARKETING"
            return axiosClint.post(`/carts`,data)
        }

    static async getCart(email) {
        return axiosClint.get(`/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`)
    }
    static async deleteCart(id) {
        return axiosClint.delete(`/carts/${id}`)
    }
}

export default git;
