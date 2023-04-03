export const hanldeError = (error: any):{code: number, error: string} => {
    if(error.code === "ERR_NETWORK"){
        return {
            code: 0,
            error: 'Error en la petición, fallo en la red'
        }
    }
    if(error.response){
        if(error.response.data){
            if(error.response.data.message){
                if (Array.isArray(error.response.data.message)){
                    return{
                        code: error.response.status,
                        error: error.response.data.message[0]
                    }
                }else{
                    return {
                        code: error.response.status,
                        error: error.response.data.message
                    }
                }
            }
            return{
                error: 'Error en la petición, no se encontro mensaje de error',
                code: error.response.status
            }
        }
        return {
            error: 'Error en la petición, no se encontro información de error',
            code: error.response.status
        }
    }
    return {
        code: 0,
        error: 'Error en la petición'
    }
}