import { mount } from "auth/AuthApp"
import React, { useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"

export default ({onSignIn}) => {
    const ref = useRef(null)
    const history = useHistory() // Browser History object

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            // remote -> host(child to parent) navigation communication via callback
            onNavigate: ({pathname: nextPathname}) => {
                const { pathname } = history.location
                
                if(pathname !== nextPathname){
                    console.log("remote navigated", nextPathname)
                    history.push(nextPathname)
                }
            },
            onSignIn
        })

        // host -> remote(parent to child) navigation communication via callback
        history.listen(onParentNavigate)
    }, [])

    return <div ref={ref} ></div>
}