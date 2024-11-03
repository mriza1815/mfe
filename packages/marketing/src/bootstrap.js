import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { createMemoryHistory, createBrowserHistory } from "history"

const mount = (el, { defaultHistory, onNavigate, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })
    
    if(onNavigate){
        // remote -> host(child to parent) navigation communication via callback
        history.listen(onNavigate)
    }
        
    ReactDOM.render(
        <App history={history} />,
        el
    )

    return {
        // host -> remote(parent to child) navigation communication via callback
        onParentNavigate({pathname: nextPathname}) {
            const { pathname } = history.location
            if(pathname !== nextPathname) {
                history.push(nextPathname)
            }
        }
    }
}

// MODE 1: Development and Isolation mode: Run mount immediately
if(process.env.NODE_ENV === "development") {
    const devRoot = document.querySelector("#_marketing-dev-root")
    if(devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    }
}

// MODE 2: Production mode. Not Isolation. MFE shows througs to container: : Export mount fn to let container decide whenever it decides to show this MFE
export { mount }