import { create } from "zustand";
import axios from "axios"
import { toast } from "react-toastify";


//const BASE_URL = "http://localhost:3000"
export const useProductStore = create((set, get) => ({
    products:[],
    loading : false,
    error:null,
    currentProduct: null,

    formData:{
        name: "",
        price:"",
        image:""
    },

    setFormData:(formData)=>set({formData}),
    resetFormData: ()=>set({formData:{name:"", price:"", image:""}}),

    addProduct:async(event)=>{
        event.preventDefault()
        try{
            const {formData}=get()
            await axios.post(`/api/products/`, formData)
            await get().fetchProducts()
            get().resetFormData()
            
        }catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }finally{
            set({loading:false})
        }
    },

    fetchProducts: async()=>{
        try{
            set({loading: true})
            const res = await axios.get("/api/products")
            console.log("API Response:", res.data)
            set({products: res.data.data, error:null})
        }catch(error){
            console.log("Error fetching products:", error)
            if(error.status === 429) set({error:"Rate limit exceeded", products: []})
            else set({error:"Something went wrong", products:[]})
            
        }finally{
            set({loading:false})
        }
    },
    
    deleteProduct: async(id)=>{
        set({loading:true})
        try{
            await axios.delete(`/api/products/${id}`)
            set(prev=>  ({
                products: prev.products.filter((product)=> product.id !== id),
                error:null
            }))
            toast.success("Deletion successful")
        }catch(error){
            console.log("Error deleting the product", error)
            toast.error("Error deleting the product")
        }finally{
            set({loading:false})
        }
    },
    fetchProduct:async(id)=>{
        set({loading:true})
        try{
            const response = await axios.get(`/api/products/${id}`)
            console.log("Product response:", response.data.data)
            set({
                currentProduct: response.data.data,
                formData: response.data.data,
                error:null
            })
        }catch(error){
            console.log(error)
            toast.error("Error fetching the product")
        }finally{
            set({loading:false})
        }
    },
    updateProduct:async(id)=>{
        try{
            const {formData} = get()
            const response = await axios.put(`/api/products/${id}`, formData)
            set({currentProduct:response.data.data})
            toast.success("Product updated successfully")
        }catch(error){
            console.log(error)
        }
    }
}));
