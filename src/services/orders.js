

export const createOrder = async (user, cart) => {
    const orderData = {
        user:user ? user : null,
        products:  cart.map(item => ({ product: item._id, quantity: item.quantity })),
        totalAmount: 0.00,
    }

    try{
        const response = await fetch('https://weak-teal-haddock-toga.cyclic.app/orders',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user && user.token ? `Bearer ${user.token}` : '',
            },
            body: JSON.stringify(orderData),
        });

        const json = await response.json();
        if(response.ok && json.success){
            return {success: true, order: json.order}
        }
        else{
            return {success: false, order: json.error}
        }
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const fetchUserOrders = async (user) => {
    const url = 'https://weak-teal-haddock-toga.cyclic.app/orders/user/' + user.userId;

    try{

        const response = await fetch(url, {
            method: 'GET',
            headers:{
                'Authorization': user && user.token ? `Bearer ${user.token}`: ''
            },
        });
        const json = await response.json();
        return json;
    }
    catch(error){
        console.log(error);
    }
}