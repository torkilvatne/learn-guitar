import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppSidebar } from './features/AppSidebar'
import { FretboardView } from './features/FretboardView'
import { ScaleRoute } from './features/ScaleRoute'
import { ScalesLayout } from './features/ScalesLayout'
import { TopBar } from './features/TopBar'
import { CompleteChordSession } from './features/practice/CompleteChordSession'
import { GuessChordSession } from './features/practice/GuessChordSession'
import { GuessIntervalSession } from './features/practice/GuessIntervalSession'
import { GuessModePositionSession } from './features/practice/GuessModePositionSession'
import { GuessNoteSession } from './features/practice/GuessNoteSession'
import { GuessScaleSession } from './features/practice/GuessScaleSession'
import { PracticeHub } from './features/practice/PracticeHub'
import { WriteChordsLoopSession } from './features/practice/WriteChordsLoopSession'
import { WriteScaleRoute } from './features/practice/WriteScaleRoute'
import { WriteScalesLoopSession } from './features/practice/WriteScalesLoopSession'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import { TooltipProvider } from './components/ui/tooltip'
import { SettingsProvider } from './state/settings'
import { ThemeProvider } from './state/theme'

function AppContent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-svh bg-bg text-text">
        <TopBar />
        <div className="min-h-0 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/scales" replace />} />
            <Route path="/scales" element={<ScalesLayout />}>
              <Route path=":id" element={<ScaleRoute />} />
            </Route>
            <Route path="/fretboard" element={<FretboardView />} />
            <Route path="/practice" element={<PracticeHub />} />
            <Route path="/practice/guess-scale" element={<GuessScaleSession />} />
            <Route path="/practice/write-scale/:scaleId" element={<WriteScaleRoute />} />
            <Route path="/practice/write-scales" element={<WriteScalesLoopSession />} />
            <Route path="/practice/write-chords" element={<WriteChordsLoopSession />} />
            <Route path="/practice/complete-chord" element={<CompleteChordSession />} />
            <Route path="/practice/guess-interval" element={<GuessIntervalSession />} />
            <Route path="/practice/guess-note" element={<GuessNoteSession />} />
            <Route path="/practice/guess-chord" element={<GuessChordSession />} />
            <Route
              path="/practice/guess-mode-position"
              element={<GuessModePositionSession />}
            />
            <Route path="*" element={<Navigate to="/scales" replace />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SettingsProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </SettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
