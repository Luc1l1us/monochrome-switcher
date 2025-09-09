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
      <box cssName="centerbox">
        <box cssName="ChatHeadFrame">
          {label}
        </box>
        <button>
          <label label="Welcome to AGS!" />
        </button>
        <box $type="center" />
        <menubutton $type="end" hexpand halign={Gtk.Align.CENTER}>
          <label label={label} />
          <popover>
            <Gtk.Calendar />
          </popover>
        </menubutton>
      </box>
    </window>
  )
}
