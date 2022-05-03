import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ProjectPage from '../pages/ProjectPage'
import TodayPage from '../pages/TodayPage'
import UpcomingPage from '../pages/UpcomingPage'
import FiltersLabelsPage from '../pages/FiltersLabelsPage'
import FilterLabelItemPage from '../pages/FilterLabelItemPage'
import SearchPage from '../pages/SearchPage'


export default function AppRoutes() {

    let location = useLocation()

    return (
        <Routes location={location.state || location}>
            <Route path="*" element={<Navigate to="/project/inbox" />} />
            <Route path="/project/:id" element={<ProjectPage />} />
            <Route path="/today" element={<TodayPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/filters-labels" element={<FiltersLabelsPage />} />
            <Route path="/filter/:id" element={<FilterLabelItemPage pageItem='filter' />} />
            <Route path="/label/:id" element={<FilterLabelItemPage pageItem='label' />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="/settings" element={<Navigate to="/settings/account" />} />
            <Route path="/settings/*" element={<TodayPage />} />
        </Routes>
    )
}