export interface TeamMember {
  name: string;
  rollNumber: string;
  branch: string; // Computer Science & Engineering (CSE)
}

export interface SlideContent {
  id: number;
  slideNumber: string; // "01", "02", ... "10"
  title: string;
  subtitle: string;
  category: string;
  blueprintTopic: string;
  structuralPoints: {
    heading: string;
    details: string;
  }[];
  specBadges: { label: string; value: string }[];
  technicalCallout?: {
    type: 'code' | 'table' | 'formula' | 'diagram' | 'fsm';
    title: string;
    content?: string;
    data?: any;
  };
  modelFocus: {
    cameraPos: [number, number, number];
    targetPos: [number, number, number];
    rotation: [number, number, number];
    highlightPart?: 'all' | 'antenna' | 'led' | 'camera' | 'chip' | 'gpios' | 'flash';
    activeRFWaves?: boolean;
    activeLEDGlow?: boolean;
  };
}
