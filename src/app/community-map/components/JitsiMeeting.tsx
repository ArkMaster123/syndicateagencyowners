'use client';

import { useEffect, useRef } from 'react';
import { JitsiMeetingRoom } from '../utils/types';

interface JitsiMeetingProps {
  room: JitsiMeetingRoom;
  onClose: () => void;
}

export default function JitsiMeeting({ room, onClose }: JitsiMeetingProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const width = room.jitsiWidth || 40; // Default 40% width

  // Generate room URL - using community Jitsi instance
  const generateRoomUrl = (roomName: string): string => {
    // Slugify the room name
    const slug = roomName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const hash = btoa(window.location.href).substring(0, 8);
    const fullRoomName = `${hash}-${slug}`;
    
    // Using jitsi.riot.im - Element's public Jitsi instance (no auth required)
    // Use URL parameters to skip prejoin and show invite button
    const params = new URLSearchParams({
      'config.prejoinPageEnabled': 'false',
      'config.startWithAudioMuted': 'false',
      'config.startWithVideoMuted': 'false',
      'config.disableDeepLinking': 'true',
      'interfaceConfig.SHOW_JITSI_WATERMARK': 'false',
      'interfaceConfig.TOOLBAR_BUTTONS': JSON.stringify([
        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
        'tileview', 'select-background', 'download', 'help', 'mute-everyone'
      ]),
      'userInfo.displayName': 'Guest'
    });
    
    return `https://jitsi.riot.im/${fullRoomName}#${params.toString()}`;
  };

  const meetingUrl = generateRoomUrl(room.jitsiRoom);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = meetingUrl;
    }
  }, [meetingUrl]);

  return (
    <div className="fixed top-0 right-0 h-full bg-black/90 z-50 flex flex-col" style={{ width: `${width}%` }}>
      {room.jitsiClosable !== false && (
        <div className="flex justify-between items-center p-4 bg-black/80 border-b border-white/20">
          <h3 className="text-white font-semibold">{room.name}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 transition-colors text-xl font-bold"
            aria-label="Close meeting"
          >
            ×
          </button>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="flex-1 w-full border-0"
        allow="camera; microphone; fullscreen; speaker; display-capture"
        title={`Meeting - ${room.name}`}
      />
    </div>
  );
}

