import app from "ags/gtk4/app"
import style from "./style.scss"
import AISelection from "./widget/AISelection"
import Dashboard from "./widget/Dashboard"
import test from "./widget/stacktest"

app.start({
  css: style,
  main() {
    //app.get_monitors().map(Dashboard)
    app.get_monitors().map(test)
    //app.get_monitors().map(AISelection)
  },
})
