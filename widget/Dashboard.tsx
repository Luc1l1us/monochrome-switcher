import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"

export default function Dashboard(gdkmonitor: Gdk.Monitor) {
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
        <box class="ChatHeadFrame"
          orientation={Gtk.Orientation.VERTICAL}>
          <box class="ChatHead"
              orientation={Gtk.Orientation.VERTICAL}>
            <box class="ChatHeadTitle">
              MonoSwitch
            </box>
            <box class="ChatHeadSelection"
                orientation={Gtk.Orientation.VERTICAL}>
              <box class="UpperSelection"
                orientation={Gtk.Orientation.VERTICAL}>
                <box>
                  Home
                </box>
                <box>
                  AI Selection
                </box>
                <box>
                  History
                </box>
              </box>
              
              <box class="LowerSelection"
              orientation={Gtk.Orientation.VERTICAL}>
                <box>
                  Settings
                </box>
                <box>
                  About
                </box>
                <box>
                  FAQ
                </box>
              </box>
            </box>
          </box>
          <box class="AvatarPlaceholder">
            <box class="AvatarFrame">
              AvatarFrame
            </box>
            <box class="AdditionalFrames"
              orientation={Gtk.Orientation.VERTICAL}>
              <box class="Logout">
                Logout
              </box>
              <box class="Add">
                Add
              </box>
            </box>
          </box>
        </box>
      <box
          orientation={Gtk.Orientation.VERTICAL}
          class="MainChatFrame">
        <box class="TitleFrame">
          Dashboard
        </box>
        <box class="ChatFrame"
            orientation={Gtk.Orientation.VERTICAL}>
          <box class="TitleSub"
            orientation={Gtk.Orientation.VERTICAL}>
            <box class="Title">
              What would you like to do today?
            </box>
            <box class="SubTitle">
              Select one of the cards below to continue.
            </box>
          </box>
          
        <box class="Columns">
          <box class="FirstCardColumn"
            orientation={Gtk.Orientation.VERTICAL}>
              <box class="FirstCard">
                Start a New Multi-Agent
              </box>
              <box class="SecondCard">
                Continue Where I left off
              </box>
          </box>

          <box class="SecondCardColumn"
            orientation={Gtk.Orientation.VERTICAL}>
              <box class="ThirdCard">
                Use a Template
              </box>
          </box>
        </box>
        </box>
      </box>
      </box>
    </window>
  )
}
