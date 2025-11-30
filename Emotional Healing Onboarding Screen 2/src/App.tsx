import React, { useState, useEffect } from 'react';
import EmotionSourceScreen from './components/EmotionSourceScreen';
import BirthInfoScreen from './components/BirthInfoScreen';
import CalculatingScreen from './components/CalculatingScreen';
import EmotionalReportScreen from './components/EmotionalReportScreen';
import ReturningUserScreen from './components/ReturningUserScreen';
import EmotionSelectionScreen from './components/EmotionSelectionScreen';
import ReturningUserEmotionSelectionScreen from './components/ReturningUserEmotionSelectionScreen';
import HistoryScreen from './components/HistoryScreen';
import ProfileScreen from './components/ProfileScreen';
import ContentScreen from './components/ContentScreen';
import WallpaperPreviewScreen from './components/WallpaperPreviewScreen';
import AudioPlayerScreen from './components/AudioPlayerScreen';
import VIPModal from './components/VIPModal';

export type Screen = 
  | 'emotionSource' 
  | 'birthInfo' 
  | 'calculating' 
  | 'report' 
  | 'returningUser' 
  | 'emotionSelection'
  | 'returningUserEmotionSelection'
  | 'history' 
  | 'profile'
  | 'content'
  | 'wallpaperPreview'
  | 'audioPlayer';

export type Emotion = '焦虑' | '疲惫' | '压抑' | '烦躁' | '委屈' | '一般' | '平静' | '还好';

interface MediaData {
  wallpaperUrl?: string;
  title: string;
  isVideo?: boolean;
  duration?: string;
}

export default function App() {
  // Check if user is returning (has completed birth info before)
  const [isReturningUser, setIsReturningUser] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hasCompletedBirthInfo') === 'true';
    }
    return false;
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    // Returning users start with their emotion selection screen
    // New users start with the regular emotion selection screen
    return isReturningUser ? 'returningUserEmotionSelection' : 'emotionSelection';
  });
  
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('焦虑');
  const [showVIPModal, setShowVIPModal] = useState(false);
  const [mediaData, setMediaData] = useState<MediaData>({ title: '' });

  const navigateTo = (screen: Screen, data?: MediaData) => {
    if (data) {
      setMediaData(data);
    }
    setCurrentScreen(screen);
  };

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
  };

  const markUserAsReturning = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasCompletedBirthInfo', 'true');
      setIsReturningUser(true);
    }
  };

  // Home screen based on user status
  const homeScreen: Screen = isReturningUser ? 'returningUserEmotionSelection' : 'emotionSelection';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '700ms' }}></div>
      
      {/* Screen Router */}
      {currentScreen === 'returningUser' && (
        <ReturningUserScreen 
          onNavigate={navigateTo}
          onEmotionSelect={handleEmotionSelect}
        />
      )}
      {currentScreen === 'emotionSelection' && (
        <EmotionSelectionScreen 
          onNavigate={navigateTo}
          onEmotionSelect={handleEmotionSelect}
          homeScreen={homeScreen}
        />
      )}
      {currentScreen === 'returningUserEmotionSelection' && (
        <ReturningUserEmotionSelectionScreen 
          onNavigate={navigateTo}
          onEmotionSelect={handleEmotionSelect}
          homeScreen={homeScreen}
        />
      )}
      {currentScreen === 'emotionSource' && (
        <EmotionSourceScreen 
          emotion={selectedEmotion}
          onNavigate={navigateTo}
          homeScreen={homeScreen}
        />
      )}
      {currentScreen === 'birthInfo' && (
        <BirthInfoScreen 
          onNavigate={navigateTo}
          onBirthInfoComplete={markUserAsReturning}
        />
      )}
      {currentScreen === 'calculating' && (
        <CalculatingScreen onNavigate={navigateTo} />
      )}
      {currentScreen === 'report' && (
        <EmotionalReportScreen 
          onNavigate={navigateTo}
          onShowVIP={() => setShowVIPModal(true)}
        />
      )}
      {currentScreen === 'history' && (
        <HistoryScreen onNavigate={navigateTo} homeScreen={homeScreen} />
      )}
      {currentScreen === 'profile' && (
        <ProfileScreen onNavigate={navigateTo} onShowVIP={() => setShowVIPModal(true)} homeScreen={homeScreen} />
      )}
      {currentScreen === 'content' && (
        <ContentScreen 
          onNavigate={navigateTo}
          onShowVIP={() => setShowVIPModal(true)}
          homeScreen={homeScreen}
        />
      )}
      {currentScreen === 'wallpaperPreview' && (
        <WallpaperPreviewScreen 
          wallpaperUrl={mediaData.wallpaperUrl || ''}
          title={mediaData.title}
          isVideo={mediaData.isVideo}
          onNavigate={navigateTo}
          onShowVIP={() => setShowVIPModal(true)}
        />
      )}
      {currentScreen === 'audioPlayer' && (
        <AudioPlayerScreen 
          title={mediaData.title}
          duration={mediaData.duration || '5:32'}
          onNavigate={navigateTo}
          onShowVIP={() => setShowVIPModal(true)}
        />
      )}

      {/* VIP Modal */}
      <VIPModal 
        isOpen={showVIPModal}
        onClose={() => setShowVIPModal(false)}
      />
    </div>
  );
}
