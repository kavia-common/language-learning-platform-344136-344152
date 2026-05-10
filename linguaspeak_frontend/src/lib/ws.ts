type WsMessageHandler = (data: unknown) => void;

function getWsBaseUrl() {
  return process.env.NEXT_PUBLIC_WS_BASE_URL ?? "ws://localhost:3001";
}

/**
 * PUBLIC_INTERFACE
 * Lightweight WebSocket client with auto-reconnect.
 *
 * The backend WS routes may evolve; this client is prepared for:
 * - JSON messages
 * - simple text messages
 */
export class WsClient {
  private ws: WebSocket | null = null;
  private handlers = new Set<WsMessageHandler>();
  private reconnectMs = 1200;
  private closedByUser = false;

  connect(path = "/ws") {
    this.closedByUser = false;

    const base = getWsBaseUrl().replace(/\/$/, "");
    const url = `${base}${path}`;
    this.ws = new WebSocket(url);

    this.ws.onmessage = (evt) => {
      const raw = evt.data;
      let parsed: unknown = raw;
      if (typeof raw === "string") {
        try {
          parsed = JSON.parse(raw);
        } catch {
          parsed = raw;
        }
      }
      for (const h of this.handlers) h(parsed);
    };

    this.ws.onclose = () => {
      if (this.closedByUser) return;
      window.setTimeout(() => this.connect(path), this.reconnectMs);
    };

    this.ws.onerror = () => {
      // Let onclose handle retries.
    };
  }

  disconnect() {
    this.closedByUser = true;
    this.ws?.close();
    this.ws = null;
  }

  onMessage(handler: WsMessageHandler) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  send(payload: unknown) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    const body = typeof payload === "string" ? payload : JSON.stringify(payload);
    this.ws.send(body);
  }
}
