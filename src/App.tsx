import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppBottomTabs, AppTopNav } from './features/AppTopNav'
import { FretboardView } from './features/FretboardView'
import { Home } from './features/Home'
import { ScaleRoute } from './features/ScaleRoute'
import { ScalesLayout } from './features/ScalesLayout'
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
import { TooltipProvider } from './components/ui/tooltip'
import { SettingsProvider } from './state/settings'
import { ThemeProvider } from './state/theme'

function AppContent() {
  return (
    <div className="flex h-svh flex-col bg-bg text-text">
      <AppTopNav />
      <div className="min-h-0 flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
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
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
      <AppBottomTabs />
    </div>
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
