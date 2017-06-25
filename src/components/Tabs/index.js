import React from "react"
import {withRouter, NavLink} from "react-router-dom"

import s from "./Tab.sass"

const Tabs = () => (
  <div className={s.tabs}>
    {["new", "diagram", "code", "visual"].map(route => (
      <NavLink to={route} key={route} className={s.tab} isActive={console.log}>
        {route}
      </NavLink>
    ))}
  </div>
)

export default Tabs
