import React, {useContext, useState} from 'react'

const SidebarContext = React.createContext()

export function SidebarProvider({children}){
    const [sidebarState,setSidebarState] = useState(false)
    
    function openSidebar(){
        // console.log('opending sidebar');
        setSidebarState(prev=>true)
    }
    
    function hideSidebar(){
        // console.log('closing sidebar');
        setSidebarState(prev=>false)
    }
    const value = {
        openSidebar,
        hideSidebar,
        sidebarState,
        setSidebarState
    }
    return(
        <SidebarContext.Provider value={value}>
        {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar(){
    return(useContext(SidebarContext))
}

