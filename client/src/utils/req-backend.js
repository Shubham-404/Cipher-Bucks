export const MakePostRequest = async (route, data) => {
    console.log(data);
    try {
        const response = await fetch(`http://localhost:3000/${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: data
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        console.log("Response", responseData);

    } catch (error) {
        console.log(error.message);
    }
}

export const MakeGetRequest = async (route, data) => {
    try {
        const response = await fetch(`http://localhost:3000/${route}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: JSON.stringify(data)
        });
        const responseData = await response.json();
        console.log("Response", responseData);

    } catch (error) {
        console.log(error.message);
    }
}