
export const fetchAllProducts = async () => {

    const url = 'https://weak-teal-haddock-toga.cyclic.app/products'
    //const url = 'http://localhost:3000/products';

    try{
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
    catch(error){
        console.log(error);
    }

}

export const fetchProductById = async (id) => {

    const url = 'https://weak-teal-haddock-toga.cyclic.app/products' + id;
    //const url = 'http://localhost:3000/products/' + id;

    try{
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
    catch(error){
        console.log(error);
    }
    
}