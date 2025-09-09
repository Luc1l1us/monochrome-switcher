import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"

export default function Panel(gdkmonitor: Gdk.Monitor) {
  const {RIGHT} = Astal.WindowAnchor
  const label = "TEST"

  return (
  <window
      visible
      name="panel"
      class="Box"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={RIGHT}
      application={app}
    >
      <box>
      <box class="ChatHeadFrame">
        CHFrame
      </box>
      <box
          orientation={Gtk.Orientation.VERTICAL}
          class="MainChatFrame">
        <box class="TitleFrame">
          ChatTitleFrame
        </box>
        <box class="ChatFrame">
          ChatFrame
        </box>
      </box>
      </box>
    </window>
  )
}
