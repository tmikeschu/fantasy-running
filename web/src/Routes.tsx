// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />

      <Set private unauthenticated="home" wrap={DashboardLayout}>
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        <Route path="/fantasy-events" page={FantasyEventsPage} name="fantasyEvents" />
        <Route path="/my-teams" page={MyTeamsPage} name="myTeams" />
      </Set>

      <Set wrap={AdminLayout} private roles="ADMIN" unauthenticated="home">
        <Route path="/admin/home" page={AdminHomePage} name="adminHome" />

        <Route path="/admin/event-runners" page={AdminEventRunnerEventRunnersPage} name="eventRunners" />
        <Route path="/admin/event-runners/new" page={AdminEventRunnerNewEventRunnerPage} name="newEventRunner" />
        <Route path="/admin/event-runners/{id}" page={AdminEventRunnerEventRunnerPage} name="eventRunner" />
        <Route path="/admin/event-runners/{id}/edit" page={AdminEventRunnerEditEventRunnerPage} name="editEventRunner" />

        <Route path="/admin/events" page={AdminEventEventsPage} name="events" />
        <Route path="/admin/events/new" page={AdminEventNewEventPage} name="newEvent" />
        <Route path="/admin/events/{id}" page={AdminEventEventPage} name="event" />
        <Route path="/admin/events/{id}/edit" page={AdminEventEditEventPage} name="editEvent" />

        <Route path="/admin/fantasy-events" page={AdminFantasyEventFantasyEventsPage} name="adminFantasyEvents" />
        <Route path="/admin/fantasy-events/new" page={AdminFantasyEventNewFantasyEventPage} name="newFantasyEvent" />
        <Route path="/admin/fantasy-events/{id}" page={AdminFantasyEventFantasyEventPage} name="fantasyEvent" />
        <Route path="/admin/fantasy-events/{id}/edit" page={AdminFantasyEventEditFantasyEventPage} name="editFantasyEvent" />
        <Route path="/admin/fantasy-team-rules" page={AdminFantasyTeamRuleFantasyTeamRulesPage} name="fantasyTeamRules" />
        <Route path="/admin/fantasy-team-rules/new" page={AdminFantasyTeamRuleNewFantasyTeamRulePage} name="newFantasyTeamRule" />
        <Route path="/admin/fantasy-team-rules/{id}" page={AdminFantasyTeamRuleFantasyTeamRulePage} name="fantasyTeamRule" />
        <Route path="/admin/fantasy-team-rules/{id}/edit" page={AdminFantasyTeamRuleEditFantasyTeamRulePage} name="editFantasyTeamRule" />
        <Route path="/admin/fantasy-teams" page={AdminFantasyTeamFantasyTeamsPage} name="fantasyTeams" />
        <Route path="/admin/fantasy-teams/new" page={AdminFantasyTeamNewFantasyTeamPage} name="newFantasyTeam" />
        <Route path="/admin/fantasy-teams/{id}" page={AdminFantasyTeamFantasyTeamPage} name="fantasyTeam" />
        <Route path="/admin/fantasy-teams/{id}/edit" page={AdminFantasyTeamEditFantasyTeamPage} name="editFantasyTeam" />

        <Route path="/admin/performances" page={AdminPerformancePerformancesPage} name="performances" />
        <Route path="/admin/performances/new" page={AdminPerformanceNewPerformancePage} name="newPerformance" />
        <Route path="/admin/performances/{id}" page={AdminPerformancePerformancePage} name="performance" />
        <Route path="/admin/performances/{id}/edit" page={AdminPerformanceEditPerformancePage} name="editPerformance" />

        <Route path="/admin/runners" page={AdminRunnerRunnersPage} name="runners" />
        <Route path="/admin/runners/new" page={AdminRunnerNewRunnerPage} name="newRunner" />
        <Route path="/admin/runners/{id}" page={AdminRunnerRunnerPage} name="runner" />
        <Route path="/admin/runners/{id}/edit" page={AdminRunnerEditRunnerPage} name="editRunner" />
      </Set>
    </Router>
  )
}

export default Routes
