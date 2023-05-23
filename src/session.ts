// INFO: Without the flag outputs:
// error TS6133: 'session' is declared but its value is never read.
// But without the import fails miserably so stays there until I figure it out.

// @ts-ignore
import session from "express-session";

declare module 'express-session' {
  export interface SessionData {
    userId?: string;
  }
}
