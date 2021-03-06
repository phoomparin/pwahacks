import React, {Component} from "react"
import c from "classnames"
import {connect} from "react-redux"
import {withRouter, Route, Redirect, Switch} from "react-router-dom"

import Tabs from "../Tabs"
import Terminal from "../Terminal"

import Create from "../Create"
import Code from "../Code"
import Diagram from "../Diagram"
import Visual from "../Visual"

import {toggleSidebar, setCode} from "../../ducks/app"

import s from "./Workspace.sass"

const NotFound = () => (
  <div className={s.notfound}>
    <h1><b>Uh Oh.</b> How did you get here!?</h1>
  </div>
)

const fabIcon = `
M20.719 7.031l-1.828 1.828-3.75-3.75 1.828-1.828c0.375-0.375 1.031-0.375 1.406 0l2.344 2.344c0.375 0.375 0.375 1.031 0 1.406zM3 17.25l11.063-11.063 3.75 3.75-11.063 11.063h-3.75v-3.75z
`

const save = code => {
  localStorage.setItem("codeEditor", code)
}

const load = set => {
  if (localStorage.getItem("codeEditor")) {
    set(localStorage.getItem("codeEditor"))
  }
}

class AutoLoad extends Component {
  componentDidMount() {
    load(this.props.set)
  }

  render = () => <div />
}

const Workspace = ({sidebar, toggleSidebar: toggle, setCode: set, code}) => (
  <div className={s.root}>
    <div className={s.view}>
      <AutoLoad set={set} />
      <nav className={c(s.sidebar, sidebar && s.toggled)}>
        <div className={s.titlebar}>
          Packtastic
          <div className={s.buttons} />
        </div>
        <div className={s.save} onClick={() => save(code)}>
          Save Changes to LocalStorage
        </div>
        <div className={s.load} onClick={() => load(set)}>
          Load Changes from LocalStorage
        </div>
        <Terminal />
      </nav>
      <main className={s.main}>
        <div className={s.topbar}>
          <h1>Pack=>t<b>ast</b>ic<small>dive deep in JavaScript</small></h1>
        </div>
        <section className={s.workspace}>
          <Tabs />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new" />} />
            <Route path="/new" component={Create} />
            <Route path="/visual" component={Diagram} />
            <Route path="/code" component={Code} />
            <Route path="/play" component={Visual} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </main>
      <svg className={s.fab} viewBox="0 0 24 24" onClick={toggle}>
        <path d={fabIcon} />
      </svg>
    </div>
  </div>
)

const mapStateToProps = state => ({
  code: state.app.code,
  sidebar: state.app.sidebar
})

export default withRouter(connect(mapStateToProps, {toggleSidebar, setCode})(Workspace))
