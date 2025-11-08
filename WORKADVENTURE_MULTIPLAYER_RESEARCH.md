# WorkAdventure Multiplayer Architecture Research

**Research Date**: October 2, 2025  
**Source**: Context7 Documentation + Web Research  
**Library**: `/workadventure/workadventure` (Trust Score: 9.8)

---

## Executive Summary

WorkAdventure uses **WebSocket technology** (not Socket.IO) for real-time multiplayer communication. The architecture includes a backend server that manages WebSocket connections through a **Pusher service**, handles player presence, synchronizes game state, and broadcasts events to all connected clients.

---

## Core Architecture Components

### 1. **WebSocket Communication Layer**

**Technology**: Native WebSocket (not Socket.IO)

- WorkAdventure employs **WebSocket technology** to facilitate real-time communication between clients and the backend
- Ensures seamless multiplayer interactions with low latency
- Handles bidirectional communication for player movements, events, and state updates

**Key Finding**: While Socket.IO is commonly used for multiplayer games, WorkAdventure uses native WebSocket connections managed through their Pusher service.

---

### 2. **Pusher Service (Backend Server)**

**Purpose**: Central WebSocket connection manager

The Pusher service within WorkAdventure is pivotal in managing:

- **WebSocket Connections**: Establishes and maintains connections with all clients
- **User Presence**: Tracks which players are online and in which rooms/spaces
- **State Synchronization**: Keeps game state consistent across all clients
- **Event Broadcasting**: Distributes events to all players in a room or specific players

**Architecture Pattern**: 
```
Client → WebSocket → Pusher Service → Broadcast to All Clients
```

---

### 3. **Client-Side Event System**

**Scripting API**: WorkAdventure provides a comprehensive scripting API for real-time interactions

#### Broadcasting Events to All Players
```typescript
// Broadcast event to all players in the room
WA.event.broadcast("event-name", { data: "value" });
```

#### Targeting Specific Players
```typescript
// Send event to a specific player
remotePlayer.sendEvent("event-name", { data: "value" });
```

#### Listening for Events
```typescript
// Listen for events from other players
WA.event.on("event-name").subscribe((event) => {
  console.log("Received event:", event);
});
```

---

### 4. **Player Synchronization Flow**

**How Player Positions Are Synchronized**:

1. **Client Movement**: Player moves locally on their client
2. **Event Emission**: Client sends movement event via WebSocket
3. **Pusher Processing**: Backend receives event and updates server state
4. **Broadcast**: Pusher broadcasts updated position to all connected clients
5. **Client Rendering**: Each client receives broadcast and renders other players

**Data Flow**:
```
Player A moves → WebSocket → Pusher → Broadcast → Player B, C, D receive → Render
```

---

## Comparison: WorkAdventure vs. Socket.IO Approach

### WorkAdventure's Approach
- ✅ Native WebSocket connections
- ✅ Custom Pusher service for connection management
- ✅ Built-in scripting API for events
- ✅ Integrated with WorkAdventure's room/space system
- ✅ Handles presence, state sync, and broadcasting automatically

### Socket.IO Approach (Alternative)
- ✅ Higher-level abstraction over WebSocket
- ✅ Automatic fallback to polling if WebSocket unavailable
- ✅ Built-in rooms and namespaces
- ✅ Event-based communication model
- ⚠️ Requires custom implementation for presence and state sync

---

## Key Differences from Static NPCs

### Current Implementation (Static NPCs)
```typescript
// Static NPCs defined in code
const npcs = [
  { id: 'james', name: 'James Mitchell', x: 5, y: 3, available: true },
  // ... more static NPCs
];
```

**Characteristics**:
- ❌ Same for all users
- ❌ No real-time updates
- ❌ Not actual online players
- ❌ Position doesn't change dynamically

### WorkAdventure Multiplayer (Real Players)
```typescript
// Real-time player synchronization
WA.event.on("player-moved").subscribe((event) => {
  const { playerId, x, y } = event.data;
  updatePlayerPosition(playerId, x, y);
});
```

**Characteristics**:
- ✅ Unique per user session
- ✅ Real-time position updates
- ✅ Actual online players
- ✅ Dynamic position changes broadcasted instantly

---

## Implementation Requirements for Real Multiplayer

### Backend Server Components Needed

1. **WebSocket Server** (Next.js API Route or separate server)
   - Handle WebSocket connections
   - Manage player sessions
   - Broadcast player movements

2. **Player State Management**
   - Track all connected players
   - Store player positions
   - Handle player join/leave events

3. **Event Broadcasting System**
   - Broadcast player movements to all clients
   - Handle custom events (chat, interactions, etc.)
   - Manage room/space boundaries

### Client-Side Components Needed

1. **WebSocket Client Connection**
   ```typescript
   const socket = new WebSocket('ws://your-server/ws');
   ```

2. **Event Listeners**
   ```typescript
   socket.onmessage = (event) => {
     const data = JSON.parse(event.data);
     if (data.type === 'player-moved') {
       updateOtherPlayer(data.playerId, data.x, data.y);
     }
   };
   ```

3. **Event Emitters**
   ```typescript
   // When player moves locally
   socket.send(JSON.stringify({
     type: 'player-moved',
     x: player.x,
     y: player.y
   }));
   ```

---

## Recommended Implementation Path

### Option 1: Socket.IO (Easier Integration)
**Pros**:
- Simple API for rooms and events
- Automatic reconnection handling
- Works well with Next.js API routes
- Large community and documentation

**Implementation**:
```typescript
// Server: app/api/socket/route.ts
import { Server } from 'socket.io';

// Client: components/Game.tsx
import { io } from 'socket.io-client';
```

### Option 2: Native WebSocket (WorkAdventure Style)
**Pros**:
- More lightweight
- Direct control over connection
- No additional dependencies

**Cons**:
- More manual implementation needed
- Must handle reconnection yourself
- More code to write

---

## Verification Summary

### ✅ Confirmed Facts

1. **WebSocket Technology**: ✅ Confirmed
   - WorkAdventure uses WebSocket (not Socket.IO specifically)
   - Native WebSocket connections managed by Pusher service

2. **Backend Server Broadcasting**: ✅ Confirmed
   - Pusher service broadcasts player positions to all connected clients
   - Handles user presence and state synchronization

3. **Client-Side Listening**: ✅ Confirmed
   - Clients listen for other players' movements via WebSocket
   - Scripting API provides `WA.event.on()` for event listening
   - Clients render other players based on received broadcasts

### ⚠️ Clarifications

1. **Socket.IO vs WebSocket**: 
   - WorkAdventure uses **native WebSocket**, not Socket.IO
   - However, Socket.IO is a valid alternative that provides similar functionality

2. **Current NPCs**:
   - ✅ Confirmed: Current NPCs are static and defined in code
   - ✅ Not real online players
   - ✅ Need WebSocket implementation to make them dynamic

---

## Next Steps for Implementation

### Phase 1: Backend Setup
1. Create WebSocket server (Next.js API route or separate server)
2. Implement player session management
3. Set up event broadcasting system

### Phase 2: Client Integration
1. Add WebSocket client to Game component
2. Implement event listeners for other players
3. Update rendering to show real players instead of static NPCs

### Phase 3: Real-Time Features
1. Player movement synchronization
2. Player join/leave handling
3. Chat system (optional)
4. Custom event system for interactions

---

## References

- **WorkAdventure Documentation**: `/workadventure/workadventure` (Context7)
- **WebSocket API**: [MDN WebSocket Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- **Socket.IO Documentation**: [Socket.IO Docs](https://socket.io/docs/v4/)
- **WorkAdventure Scripting API**: [WorkAdventure Events API](https://docs.workadventu.re/developer/map-scripting/events/)

---

## Conclusion

WorkAdventure's multiplayer architecture is built on **native WebSocket technology** with a custom **Pusher service** managing connections, presence, and state synchronization. While Socket.IO is not used by WorkAdventure itself, it remains a viable alternative for implementing similar multiplayer functionality in your project.

The key difference between static NPCs and real multiplayer is the **real-time synchronization** of player positions and states through WebSocket connections, allowing all clients to see and interact with actual online players rather than predefined static entities.

