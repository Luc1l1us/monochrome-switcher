import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"

export default function Dashboard(gdkmonitor: Gdk.Monitor) {
  const {RIGHT} = Astal.WindowAnchor

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
                <box class="Selection">
                  <box class="Selector">
                  </box>
                  <box>
                    <image
                      file="/home/Dizzy/monochrome-switcher/widget/icons/house-icon.png"
                      pixelSize={25}
                      class="house-icon"/>
                    Home
                  </box>
                </box>
                <box class="Selection">
                  <box class="Selector">
                  </box>
                  <box>
                    <image
                      file="/home/Dizzy/monochrome-switcher/widget/icons/profile-selection.png"
                      pixelSize={23}
                      class="house-icon"/>
                    AI Selection
                  </box>
                </box>
                <box class="Selection">
                  <box class="Selector">
                  </box>
                  <box>
                    <image
                      file="/home/Dizzy/monochrome-switcher/widget/icons/history.png"
                      pixelSize={25}
                      class="house-icon"/>
                    History
                  </box>
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
              <box class="Avatar">
                <image
                  file="/home/Dizzy/monochrome-switcher/widget/icons/ProfilePic.png"
                  class="ProfilePic"
                  pixelSize={70}
                />
              </box>
              <box class="NameBoxes"
              orientation={Gtk.Orientation.VERTICAL}>
                <box class="Name">
                  Dizzy
                </box>
                <box>
                  dummyemail@mono.com
                </box>
              </box>
            </box>
            <box class="AdditionalFrames"
              orientation={Gtk.Orientation.VERTICAL}>
              <box class="Logout">
                <image
                  pixelSize={40}
                  file="/home/Dizzy/monochrome-switcher/widget/icons/logout.png"/>
              </box>
              <box class="Add">
                <image
                  pixelSize={40}
                  file="/home/Dizzy/monochrome-switcher/widget/icons/add.png"/>
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
              <box class="FirstCard"
                orientation={Gtk.Orientation.VERTICAL}>
                  <box class="ImageContainer">
                    <image
                      file="/home/Dizzy/monochrome-switcher/widget/icons/ai_agent.png"
                      pixelSize={80}
                    />
                  </box>
                  <box class="TitleContainer">
                      Start a New Multi-Agent
                  </box>
              </box>
              <box class="SecondCard"
                orientation={Gtk.Orientation.VERTICAL}>
                  <box class="ImageContainer">
                    <image
                      file="/home/Dizzy/monochrome-switcher/widget/icons/file_open.png"
                      pixelSize={50}
                    />
                  </box>
                  <box class="TitleContainer">
                      Continue Where I Left Off
                  </box>
              </box>
          </box>

          <box class="SecondCardColumn"
            orientation={Gtk.Orientation.VERTICAL}>
              <box class="ThirdCard"
                orientation={Gtk.Orientation.VERTICAL}>
                  <box class="ImageContainer">
                    <image
                      file="/home/Dizzy/monochrome-switcher/widget/icons/file.png"
                      pixelSize={50}
                    />
                  </box>
                  <box class="TitleContainer">
                      Use a Template
                  </box>
              </box>
          </box>
        </box>
        </box>
      </box>
      </box>
    </window>
  )
}
