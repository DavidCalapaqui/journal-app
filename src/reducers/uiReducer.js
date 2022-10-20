import { types } from "../types/types";



const initialState = {
    loading: false,
    msgError: null
}
export const uiReducer = (state = initialState, action )=>{
    switch (action.type) {
        //colocar error
        case types.uiSetError:
            return{
                ...state,
                msgError: action.payload
            }
        
        //remover error
        case types.uiRemoveError:
            return{
                ...state,
                msgError: null
            }

        //activar cargando
        case types.uiStartLoading:
            return {
                
                ...state,
                loading: true            
                
            }    
        
        //desactivar cargando
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false     
            }    

        default:
            return state;
    }
}