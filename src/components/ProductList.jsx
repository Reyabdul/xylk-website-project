import React, { useEffect, useState } from "react";
import Client from "shopify-buy";
import Product from "./Product";


const SHOPIFY_KEY = process.env.REACT_APP_SHOPIFY_KEY;

const client = Client.buildClient({
    storefrontAccessToken: SHOPIFY_KEY,
    domain: "xylk.myshopify.com"
});

let productObj;

//this is your new "modal" rendering function
const renderData = (product) => {
    productObj = {
        "title": product.title,
        "description": product.description,
    }

    return (
        <div>
            {productObj["title"]}
            {productObj["description"]}
            {/* {console.log(productObj["title"])}
            {console.log(productObj["description"])} */}
        </div>
    )
}

const ProductList = () => {
    
    //Shopify product data
    const [rawData, setRawData] = useState([]);

    //Modal 'open' state
    const [modalOpen, setModalOpen] = useState(false);

    //Shopify product data that will display in the modal
    const [modalData, setModalData] = useState(null);


    const fetchAllProducts = () => {
        client.product.fetchAll().then((res) => {
            console.log(res);
            setRawData(res);
        }).catch((error) => {
            console.log(error);
        })
    };


    useEffect(() => {
        fetchAllProducts();
    }, []);


    //----- MODAL REFERENCE FROM STACK OVERFLOW
        //ref: https://stackoverflow.com/questions/67725086/how-do-i-use-react-modal-with-a-map-function

    return (

        <>
            <div className="container">
                {rawData.map((product, i) => (
                    <div className='item' key={product.id} >
                     {/* {console.log(product)} */}
                        <img 
                            src={product.images[0].src} 
                            alt={product.title} 
                            style={{width: "100px"}} 
                            onClick={()=> {
                                console.log(i);
                                console.log(product);
                                renderData(product);
                                setModalOpen(true);
                                //console.log(renderData(product));

                            }
                          }
                        />
                    </div>
                ))}
                {modalOpen &&
                <Product setOpenModal={setModalOpen} productObj={productObj}/> 
                }
                  
            </div>
        </>

    )    
}


export default ProductList;

    //this is code we will be needing in the future for project 2: it returns the collections that contain all project 2 products
    // const fetchCollections = () => {
    //     client.collection.fetchAllWithProducts().then((res) => {
    //         console.log(res);
    //     })
    // }
