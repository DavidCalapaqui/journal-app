import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";



describe('´Pruebas en el authReducer', ()=>{

    test('Debe realizar el login', () => { 
        const initState = {};
        
        const action = {
            type: types.login,
            payload: {
                uid: 'asfasf',
                displayName : 'David'
            }
        }

        const state = authReducer(initState, action);

        expect(state).toEqual({
            uid: 'asfasf',
            name: 'David'
        })

    })

    test('Debe realizar el logout', () => { 
        const initState = {
            uid: 'asfasf',
            name: 'David'
        };
        
        const action = {
            type: types.logout, 
        }

        const state = authReducer(initState, action);

        expect(state).toEqual({});
    })

    test('Debe retornar el mismo estado', () => { 
        const initState = {
            uid: 'asfasf',
            name: 'David'
        };
        
        const action = {
            type: 'afsdfas', 
        }

        const state = authReducer(initState, action);

        expect(state).toEqual(initState);
    })


})