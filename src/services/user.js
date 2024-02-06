


export const loginUser = async (email, password) => {

    const url = 'https://weak-teal-haddock-toga.cyclic.app/user/login';

    try{
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        if(!response.ok){
            throw new Error('Login failed. Please check your credentials.');
        }

        const json = await response.json();
        return json;
    }
    catch(error){
        throw error;
    }

}

export const signupUser = async (email, password) =>{
    const url = 'https://weak-teal-haddock-toga.cyclic.app/user/signup';

    try{
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        if(!response.ok){
            let errorMessage = 'Error signing up';

            if (response.status === 409) {
                errorMessage = 'Account with that email already exists';
            } else if (response.status === 400) {
                errorMessage = 'Bad request. Please check your input data';
            }

            throw new Error(errorMessage);
        }

        const json = await response.json();
        return { ok: true, data: json };
    }
    catch(error){
        console.log(error);
        throw error;
    }
}