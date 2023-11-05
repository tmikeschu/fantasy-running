// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import AdminLayout from './layouts/AdminLayout/AdminLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={AdminLayout}>
        <Route path="/admin/home" page={AdminHomePage} name="adminHome" />

        <Route path="/admin/event-runners" page={AdminEventRunnerEventRunnersPage} name="eventRunners" />
        <Route path="/admin/event-runners/new" page={AdminEventRunnerNewEventRunnerPage} name="newEventRunner" />
        <Route path="/admin/event-runners/{id}" page={AdminEventRunnerEventRunnerPage} name="eventRunner" />
        <Route path="/admin/event-runners/{id}/edit" page={AdminEventRunnerEditEventRunnerPage} name="editEventRunner" />

        <Route path="/admin/events" page={AdminEventEventsPage} name="events" />
        <Route path="/admin/events/new" page={AdminEventNewEventPage} name="newEvent" />
        <Route path="/admin/events/{id}" page={AdminEventEventPage} name="event" />
        <Route path="/admin/events/{id}/edit" page={AdminEventEditEventPage} name="editEvent" />

        <Route path="/fantasy-events" page={AdminFantasyEventFantasyEventsPage} name="fantasyEvents" />
        <Route path="/fantasy-events/new" page={AdminFantasyEventNewFantasyEventPage} name="newFantasyEvent" />
        <Route path="/fantasy-events/{id}" page={AdminFantasyEventFantasyEventPage} name="fantasyEvent" />
        <Route path="/fantasy-events/{id}/edit" page={AdminFantasyEventEditFantasyEventPage} name="editFantasyEvent" />
        <Route path="/fantasy-team-rules" page={AdminFantasyTeamRuleFantasyTeamRulesPage} name="fantasyTeamRules" />
        <Route path="/fantasy-team-rules/new" page={AdminFantasyTeamRuleNewFantasyTeamRulePage} name="newFantasyTeamRule" />
        <Route path="/fantasy-team-rules/{id}" page={AdminFantasyTeamRuleFantasyTeamRulePage} name="fantasyTeamRule" />
        <Route path="/fantasy-team-rules/{id}/edit" page={AdminFantasyTeamRuleEditFantasyTeamRulePage} name="editFantasyTeamRule" />
        <Route path="/fantasy-teams" page={AdminFantasyTeamFantasyTeamsPage} name="fantasyTeams" />
        <Route path="/fantasy-teams/new" page={AdminFantasyTeamNewFantasyTeamPage} name="newFantasyTeam" />
        <Route path="/fantasy-teams/{id}" page={AdminFantasyTeamFantasyTeamPage} name="fantasyTeam" />
        <Route path="/fantasy-teams/{id}/edit" page={AdminFantasyTeamEditFantasyTeamPage} name="editFantasyTeam" />

        <Route path="/performances" page={AdminPerformancePerformancesPage} name="performances" />
        <Route path="/performances/new" page={AdminPerformanceNewPerformancePage} name="newPerformance" />
        <Route path="/performances/{id}" page={AdminPerformancePerformancePage} name="performance" />
        <Route path="/performances/{id}/edit" page={AdminPerformanceEditPerformancePage} name="editPerformance" />

        <Route path="/runners" page={AdminRunnerRunnersPage} name="runners" />
        <Route path="/runners/new" page={AdminRunnerNewRunnerPage} name="newRunner" />
        <Route path="/runners/{id}" page={AdminRunnerRunnerPage} name="runner" />
        <Route path="/runners/{id}/edit" page={AdminRunnerEditRunnerPage} name="editRunner" />
      </Set>

      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
