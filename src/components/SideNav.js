import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  SidebarHeader,
  SidebarFooter,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import Icon from "@mdi/react";
import {
  mdiCog,
  mdiHome,
  mdiViewGrid,
  mdiClipboardTextOutline,
  mdiChartPie,
  mdiChartBar,
  mdiShareVariant,
  mdiMenu,
} from "@mdi/js";
import { Link } from "react-router-dom";
import "./SideNav.css";
import logo from "assets/isgoodai-logo.png";

export default function SideNav() {
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => {
    setCollapsed(!collapsed);
  };
  return (
    
      <ProSidebar collapsed={collapsed}>
        <SidebarHeader>
          <div className="">
            <Icon path={mdiMenu} size={1.5} onClick={handleClick} />
          </div>
        </SidebarHeader>
        <Menu>
          <MenuItem icon={<Icon path={mdiHome} />}>
            Home
            <Link to="/home" />
          </MenuItem>
          <MenuItem icon={<Icon path={mdiViewGrid} />}>
            Organizations <Link to="/home/myorganisations" />
          </MenuItem>
          <MenuItem icon={<Icon path={mdiClipboardTextOutline} />}>
            Projects <Link to="/home/myprojects" />
          </MenuItem>
          <MenuItem icon={<Icon path={mdiChartPie} />}>Dashboards</MenuItem>
          <MenuItem icon={<Icon path={mdiChartBar} />}>Reports</MenuItem>
          <MenuItem icon={<Icon path={mdiShareVariant} />}>
            Sharing Centre
          </MenuItem>
          <MenuItem icon={<Icon path={mdiCog} />}>Settings</MenuItem>
        </Menu>
        <SidebarFooter>
          {collapsed ? null : (
            <div className="d-flex justify-content-center">
              <img src={logo} alt="Logo"></img>
            </div>
          )}
        </SidebarFooter>
      </ProSidebar>
   
  );
}

/*
  Potentially add submenus to link to projects
      <SubMenu title="Components" >
        <MenuItem>Component 1</MenuItem>
        <MenuItem>Component 2</MenuItem>
      </SubMenu>

Add these 3 in future release
 <MenuItem icon={< />}>Dashboards</MenuItem>
 <MenuItem icon={< />}>Reports</MenuItem>
 <MenuItem icon={< />}>Sharing Centre</MenuItem>
*/
