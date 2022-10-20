/**

* @jest-environment node

*/
import createMockStore from 'redux-mock-store';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from '../../types/types';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {}

//simulacion del store
let store = mockStore(initState);


describe('PRUEBAS EN las acciones de auth.js', ()=>{

    beforeEach(()=>{
        store = mockStore(initState);
    })


    test('login y logout deben crear las acciones respectivas', () => { 
        
        const uid = 'lLawYw8tZKaV0jaROMWI';
        const displayName = 'David Calapaqui';

        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        })

        expect(logoutAction). toEqual({
            type: types.logout
        })
        
    })

    test('debe de realizar el startLogout ', async () => { 

        await store.dispatch(startLogout());

        const actions = store.getActions()

        //console.log(actions)

        expect(actions[0]).toEqual({
            type: types.logout
        })

        
        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        })
    })

    test('debe de iniciar el startLoginWithEmaylAndPassword',async () => { 
        
        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));
        const actions = store.getActions();
        //console.log(actions)
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'LGC7rpI5B7YKX2UZEYRrQCPrQs32',
                displayName: null
            }
        })
    
    })


})