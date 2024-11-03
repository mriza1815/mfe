import {createApp} from "vue"
import Dashboard from "./components/Dashboard.vue"

const mount = (el) => {
    const app = createApp(Dashboard)
    app.mount(el)
}

// MODE 1: Development and Isolation mode: Run mount immediately
if(process.env.NODE_ENV === "development") {
    const devRoot = document.querySelector("#_dashboard-dev-root")
    if(devRoot) {
        mount(devRoot)
    }
}

// MODE 2: Production mode. Not Isolation. MFE shows througs to container: : Export mount fn to let container decide whenever it decides to show this MFE
export { mount }