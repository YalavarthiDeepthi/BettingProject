export const EventsReducer=(state, action)=>{
    switch(action.type){
        case "EVENTS": return {...state,Events:action.payload}
        case "sideNavData": return {...state,sideNavData:action.payload}
         default:return {...state}
    }
}