const baseUrl = "http://localhost:8080"

export const fetchCrarUsuario = async (data) => {
    const url = `${baseUrl}/usuario/nuevo`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if(!response.ok){
        return response.status;
    }

    return await response.text();
}