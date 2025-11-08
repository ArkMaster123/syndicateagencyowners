# WorkAdventure Chat Messaging

A quick-start reference for integrating chat interactions in WorkAdventure maps. Links below point to the official scripting docs so you can dive deeper when needed.

## Sending Messages
- Use [`WA.chat.sendChatMessage`](https://github.com/workadventure/workadventure/blob/develop/docs/developer/map-scripting/references/api-chat.md#send-chat-message) to post chat content.
  - `scope` decides visibility: `"local"` keeps the message private to the current player, `"bubble"` shares it with everyone in the same proximity bubble.
  - When using `scope: "local"`, you can add an `author` label for the chat line.

```typescript
// local-only system message with a custom author label
WA.chat.sendChatMessage('Door unlocked.', {
  scope: 'local',
  author: 'Security Bot'
});

// broadcast to the whole proximity bubble
WA.chat.sendChatMessage('Welcome to the briefing room!', {
  scope: 'bubble'
});
```

## Receiving Messages
- Attach listeners with [`WA.chat.onChatMessage`](https://github.com/workadventure/workadventure/blob/develop/docs/developer/map-scripting/references/api-chat.md#listen-to-chat-messages).
  - Defaults to local scope; pass `{ scope: 'bubble' }` to watch remote players.
  - Enable player tracking before subscribing if you need author metadata.

```typescript
// listen to the local player's outbound messages
WA.chat.onChatMessage((message) => {
  console.log('Local user typed:', message);
});

// surface bubble messages with author info
await WA.players.configureTracking({ players: true, movement: false });
WA.chat.onChatMessage((message, event) => {
  const author = event?.author?.name ?? 'Unknown';
  console.log(`[Bubble] ${author}: ${message}`);
}, { scope: 'bubble' });
```

## Typing Indicators
- [`WA.chat.startTyping`](https://github.com/workadventure/workadventure/blob/develop/docs/developer/map-scripting/references/api-chat.md#emulate-typing-indicator) and `WA.chat.stopTyping` let you show the "typing" animation for scripted interactions.

```typescript
WA.chat.startTyping({ scope: 'bubble' });
setTimeout(() => {
  WA.chat.sendChatMessage('Hold tight, task force arriving in 2 minutes.', {
    scope: 'bubble'
  });
  WA.chat.stopTyping({ scope: 'bubble' });
}, 2000);
```

## Chat Window Control
- [`WA.chat.open`](https://github.com/workadventure/workadventure/blob/develop/docs/developer/map-scripting/references/api-chat.md#open-chat-window) and [`WA.chat.close`](https://github.com/workadventure/workadventure/blob/develop/docs/developer/map-scripting/references/api-chat.md#close-chat-window) allow you to manage the UI.

```typescript
WA.room.onEnterLayer('briefing-zone').subscribe(() => {
  WA.chat.open();
});

WA.room.onLeaveLayer('briefing-zone').subscribe(() => {
  WA.chat.close();
});
```

## Deprecations
- The older globals [`WA.sendChatMessage`](https://github.com/workadventure/workadventure/blob/develop/docs/developer/map-scripting/references/api-deprecated.md#chat-functions) and `WA.onChatMessage` are deprecated—always use the `WA.chat.*` namespace to avoid breakage.

## Under the Hood
- The scripting bridge posts chat payloads to the main client frame via `sendToWorkadventure({ type: 'chat', data: { message, author } })` before WorkAdventure renders the message. See the [contributing guide](https://github.com/workadventure/workadventure/blob/develop/docs/others/contributing/contributing-to-scripting-api.md#sending-a-chat-message) for the exact implementation.

## Matrix Service Flow (Advanced)
- In Matrix-backed deployments without an admin service, Matrix IDs propagate from the Matrix server → front-end → Pusher → admin service to keep bubble chat identities in sync. The sequence is documented [here](https://github.com/workadventure/workadventure/blob/develop/docs/others/contributing/matrix-dev.md#matrix-id-handling-flow-no-admin).
