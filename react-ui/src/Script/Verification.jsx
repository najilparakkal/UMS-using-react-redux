import store,{setError,setAdminError,setAdminState,setUserDetails} from "../redux";
export const verifyUser=async ()=>{
    console.log(process.env.REACT_APP_BASIC_URL);
    const payload=localStorage.getItem('payload')
    const response=await fetch(process.env.REACT_APP_BASIC_URL+ process.env.REACT_APP_VERIFY,{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({payload:payload})
    })

    if(response.status===200){
        const data=await response.json()
        store.dispatch(setUserDetails(data.user))
        return true
    }

    if(response.status===202){
        store.dispatch(setError('Session Expired'))
    }

    if(response.status===203){
        store.dispatch(setError('Internal Server Error'))
    }
    if(response.status===204){
        store.dispatch(setError('No User Found'))
    }

    if(response.status===205){
        store.dispatch(setError("Sorry User Bloacked"))
    }

    localStorage.removeItem(payload)
    return false
}


export const verifyAdmin = async () => {

    const payload = localStorage.getItem('Admin')
    const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_VERIFY_ADMIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: payload })
    })
    if (response.status === 200) {
        const data = await response.json()
        store.dispatch(setAdminState(data.admin))
        return true
    }
    if (response.status === 202) {
        store.dispatch(setAdminError('Session Expired'))
    }
    if (response.status === 403) {
        store.dispatch(setAdminError('Internal server error'))
    }
    if (response.status === 201) {
        store.dispatch(setAdminError('No admin found'))
    }
    localStorage.removeItem('Admin')
    return false
}