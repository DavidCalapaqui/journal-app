import { types } from "../types/types";

//ACCIONES PARA ERRORES EN CAMPOS
export const setError = (err) =>({
    type: types.uiSetError,
    payload: err
})

export const removeError = () =>({
    type: types.uiRemoveError,
})

//ACCIONES PARA CARGANDO
export const startLoading = () =>({
    type: types.uiStartLoading,
})

export const finishLoading = () =>({
    type: types.uiFinishLoading,
})