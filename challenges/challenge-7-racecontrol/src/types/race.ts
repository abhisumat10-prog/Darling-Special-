export type TyreCompound = 'SOFT' | 'MEDIUM' | 'HARD' | 'INTERMEDIATE' | 'WET';

export interface DriverRadarStats {
  speed: number;          // 0 - 100
  consistency: number;    // 0 - 100
  tyreManagement: number; // 0 - 100
  racecraft: number;      // 0 - 100
  qualifying: number;     // 0 - 100
}

export interface Driver {
  id: string;
  number: number;
  code: string;
  name: string;
  teamId: string;
  teamName: string;
  teamColor: string;
  country: string;
  flag: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  avgFinish: number;
  form: ('P1' | 'P2' | 'P3' | 'P4' | 'TOP5' | 'PTS' | 'DNF')[];
  radarStats: DriverRadarStats;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  secondaryColor: string;
  powerUnit: string;
  principal: string;
  points: number;
  wins: number;
  driverIds: string[];
}

export interface LeaderboardEntry {
  position: number;
  previousPosition: number;
  driverId: string;
  driverCode: string;
  driverName: string;
  teamName: string;
  teamColor: string;
  gapToLeader: string; // "LEADER" or "+1.428s" or "+1 LAP"
  interval: string;    // "-" or "+0.542s"
  tyreCompound: TyreCompound;
  tyreLaps: number;
  inPit: boolean;
  pitCount: number;
  fastestLap: boolean;
  lastLapTime: string;
  sector1Time: string;
  sector2Time: string;
  sector3Time: string;
}

export type SessionType = 'PRACTICE_1' | 'PRACTICE_2' | 'QUALIFYING' | 'SPRINT' | 'GRAND_PRIX';

export interface WeekendSession {
  id: string;
  name: string;
  type: SessionType;
  startTimeUTC: string; // ISO 8601 UTC
  durationMinutes: number;
  status: 'COMPLETED' | 'LIVE' | 'UPCOMING';
  sessionHighlights?: string;
}

export interface SectorInfo {
  sectorNumber: 1 | 2 | 3;
  title: string;
  lengthMeters: number;
  drsZone: boolean;
  speedTrapKmh: number;
  bestSectorTime: string;
  bestSectorHolder: string;
  description: string;
}

export interface CircuitInfo {
  id: string;
  name: string;
  city: string;
  country: string;
  trackLengthKm: number;
  totalLaps: number;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
  turns: number;
  elevationChangeMeters: number;
  sectors: [SectorInfo, SectorInfo, SectorInfo];
}

export type FlagStatus = 'GREEN' | 'YELLOW' | 'VSC' | 'SAFETY_CAR' | 'RED';

export interface RaceTelemetryStatus {
  currentLap: number;
  totalLaps: number;
  flagStatus: FlagStatus;
  trackTempC: number;
  airTempC: number;
  rainProbability: number;
  fastestLapHolder: {
    driverCode: string;
    time: string;
    lap: number;
  };
}
