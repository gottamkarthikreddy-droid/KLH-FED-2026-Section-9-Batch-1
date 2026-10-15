import { TeamMember, SlideContent } from '../types/slide';

export const PROJECT_MEMBERS: TeamMember[] = [
  { name: 'Rithvika Thota', rollNumber: '2620030013', branch: 'CSE' },
  { name: 'Lokesh Kumar', rollNumber: '2620030048', branch: 'CSE' },
  { name: 'Karthik Reddy', rollNumber: '2620030056', branch: 'CSE' },
  { name: 'Sriramaneni Manideep', rollNumber: '2620030089', branch: 'CSE' },
  { name: 'Jalla Sai Bhargav', rollNumber: '2620030109', branch: 'CSE' },
];

export const INSTRUCTOR_NAME = 'Dayanab Baidya';
export const COURSE_TITLE = 'Digital Design and Computer Architecture (DDCA)';

export const SLIDES_DATA: SlideContent[] = [
  {
    id: 1,
    slideNumber: '01',
    title: 'Wireless Access Controller',
    subtitle: 'From Basic Logic Gates to a Synchronous State Machine',
    category: 'The Big Picture',
    blueprintTopic: 'Title & System Overview: Computer Foundations & The Machine Cycle',
    structuralPoints: [
      {
        heading: 'What is a Digital Controller?',
        details: 'At the highest level, every computer performs four jobs: Input, Process, Store, and Output. Our controller senses wireless signals, processes them with logic gates, and unlocks a door.'
      },
      {
        heading: 'Hardware vs Software',
        details: 'Hardware consists of physical silicon gates, wires, and flip-flops that switch electrical voltages. Software is the sequence of instructions that tells the hardware what states to cycle through.'
      },
      {
        heading: 'Our North Star Goal',
        details: 'We build a working digital access controller by combining the basic alphabet of logic gates (Module 1), combinational comparators (Module 2), and sequential state memory (Module 3).'
      }
    ],
    specBadges: [
      { label: 'Architecture', value: 'Input · Process · Store · Output' },
      { label: 'Signals', value: 'Binary Logic (0 & 1)' },
      { label: 'Control', value: 'Synchronous State Loop' },
      { label: 'Target', value: 'Physical Hardware Demonstration' }
    ],
    technicalCallout: {
      type: 'diagram',
      title: 'Digital Controller Information Flow',
      content: '1. INPUT: Wireless Beacon SSID ──► 2. PROCESS: Logic Gates & Comparators ──► 3. STORE: Flip-Flop State Registers ──► 4. OUTPUT: LED / Relay Unlock'
    },
    modelFocus: {
      cameraPos: [0, 2.2, 4.2],
      targetPos: [0, 0, 0],
      rotation: [0.35, 0.45, 0],
      highlightPart: 'all'
    }
  },
  {
    id: 2,
    slideNumber: '02',
    title: 'The Digital Abstraction',
    subtitle: 'Representing Bits, Hex Shorthand & Tracking Wireless SSIDs',
    category: 'Language of the Machine',
    blueprintTopic: 'Digital Abstraction: High/Low Voltages, Binary & Hexadecimal Numbers',
    structuralPoints: [
      {
        heading: 'Why Digital? (Noise Immunity)',
        details: 'Analog signals are vulnerable to electrical noise and drift. The digital abstraction groups all voltages into two clear states: Logic 0 (0.0V to 0.8V) and Logic 1 (2.0V to 3.3V).'
      },
      {
        heading: 'Hexadecimal Shorthand',
        details: 'Binary strings get long and hard for humans to read. Hexadecimal uses base-16 (0–9, A–F) where every hex digit cleanly represents exactly 4 binary bits (e.g. 1010b = 0xA).'
      },
      {
        heading: 'How a Wireless SSID is Tracked',
        details: 'A wireless network broadcast name (SSID) is simply a string of characters. Each letter converts to ASCII binary bytes (e.g. "KEY" = 0x4B 0x45 0x59 = 01001011 01000101 01011001b).'
      }
    ],
    specBadges: [
      { label: 'Binary States', value: '0 (LOW) & 1 (HIGH)' },
      { label: 'Hex Shorthand', value: '1 Hex Digit = 4 Bits' },
      { label: 'SSID Stream', value: '8-Bit ASCII Character Array' },
      { label: 'Noise Margin', value: 'Clear Voltage Thresholds' }
    ],
    technicalCallout: {
      type: 'formula',
      title: 'Tracking an SSID into Binary Bits',
      content: 'Character \'K\' ──► ASCII 75  ──► Hex 0x4B ──► Binary 0100 1011\nCharacter \'E\' ──► ASCII 69  ──► Hex 0x45 ──► Binary 0100 0101\nCharacter \'Y\' ──► ASCII 89  ──► Hex 0x59 ──► Binary 0101 1001\nFull Stream: 24 Bits fed into the circuit input bus'
    },
    modelFocus: {
      cameraPos: [1.2, 1.4, 2.5],
      targetPos: [0, 0.2, 0],
      rotation: [0.2, -0.6, 0.1],
      highlightPart: 'chip'
    }
  },
  {
    id: 3,
    slideNumber: '03',
    title: 'Basic Logic Gates',
    subtitle: 'The Machine\'s Alphabet & Truth Tables',
    category: 'Gate Foundations',
    blueprintTopic: 'Fundamental Gates: AND, OR, NOT, XOR and Boolean Expressions',
    structuralPoints: [
      {
        heading: 'The Basic Alphabet: AND, OR, NOT',
        details: 'AND produces 1 only when all inputs are 1. OR produces 1 if any input is 1. NOT simply inverts the signal. These three operations can describe any computer decision.'
      },
      {
        heading: 'XOR & Identity Checking',
        details: 'Exclusive-OR (XOR) outputs 1 when inputs differ, and 0 when they are identical. Inverting XOR gives XNOR, which outputs 1 when bits match—the secret to password checking.'
      },
      {
        heading: 'From Truth Table to Circuit',
        details: 'Any desired behavior written in a truth table can be converted into a Sum-of-Products Boolean expression, directly giving the blueprint for gates and wires.'
      }
    ],
    specBadges: [
      { label: 'Conjunction', value: 'AND Gate (A · B)' },
      { label: 'Disjunction', value: 'OR Gate (A + B)' },
      { label: 'Inversion', value: 'NOT Gate (A\')' },
      { label: 'Equality Check', value: 'XNOR Gate (A ⊙ B)' }
    ],
    technicalCallout: {
      type: 'table',
      title: 'Elementary Logic Gate Truth Table',
      data: [
        { A: 0, B: 0, 'AND (A·B)': 0, 'OR (A+B)': 0, 'XOR (A⊕B)': 0, 'XNOR (Match)': 1 },
        { A: 0, B: 1, 'AND (A·B)': 0, 'OR (A+B)': 1, 'XOR (A⊕B)': 1, 'XNOR (Match)': 0 },
        { A: 1, B: 0, 'AND (A·B)': 0, 'OR (A+B)': 1, 'XOR (A⊕B)': 1, 'XNOR (Match)': 0 },
        { A: 1, B: 1, 'AND (A·B)': 1, 'OR (A+B)': 1, 'XOR (A⊕B)': 0, 'XNOR (Match)': 1 }
      ]
    },
    modelFocus: {
      cameraPos: [-1.8, 1.6, 2.2],
      targetPos: [-0.3, 0, 0],
      rotation: [0.3, 0.7, -0.1],
      highlightPart: 'gpios'
    }
  },
  {
    id: 4,
    slideNumber: '04',
    title: 'NAND Universality: The "Aha!" Moment',
    subtitle: 'Building Any Digital Circuit from a Single Primitive Cell',
    category: 'Universal Logic',
    blueprintTopic: 'NAND Gate Universality & De Morgan\'s Theorem',
    structuralPoints: [
      {
        heading: 'The Power of One Gate',
        details: 'A NAND gate is an AND gate followed by an inverter: Y = (A · B)\'. Surprisingly, NAND alone is universal: connecting NAND gates together can create NOT, AND, OR, and XOR.'
      },
      {
        heading: 'De Morgan\'s Laws in Action',
        details: 'De Morgan proved that inverted inputs to an OR gate equal a NAND gate: (A · B)\' = A\' + B\'. This allows chip designers to build complex microprocessors using only one type of cell.'
      },
      {
        heading: 'Why Chips Love Universal Cells',
        details: 'Manufacturing millions of identical NAND transistors is cheaper, faster, and more reliable than etching many different types of custom gates onto silicon.'
      }
    ],
    specBadges: [
      { label: 'Universal Gate', value: 'NAND Gate (A · B)\'' },
      { label: 'NOT from NAND', value: 'Connect inputs (A · A)\'' },
      { label: 'AND from NAND', value: 'NAND followed by NOT' },
      { label: 'OR from NAND', value: 'Inverted inputs to NAND' }
    ],
    technicalCallout: {
      type: 'formula',
      title: 'Synthesizing All Gates from Pure NAND',
      content: 'NOT Gate:  Y = (A · A)\' = A\'\nAND Gate:  Y = ((A · B)\' · (A · B)\')\' = A · B\nOR Gate:   Y = (A\' · B\')\' = A + B   [De Morgan\'s Law]\nXOR Gate:  Built from exactly 4 interconnected NAND gates'
    },
    modelFocus: {
      cameraPos: [0, 3.2, 1.2],
      targetPos: [0, 0, 0],
      rotation: [1.2, 0, 0],
      highlightPart: 'chip'
    }
  },
  {
    id: 5,
    slideNumber: '05',
    title: 'Combinational Logic & Comparators',
    subtitle: 'Circuits Without Memory: Testing Equality of SSID Tokens',
    category: 'Combinational Subsystems',
    blueprintTopic: 'Combinational Circuits, Arithmetic Adders & Bitwise Comparators',
    structuralPoints: [
      {
        heading: 'What is Combinational Logic?',
        details: 'A combinational circuit has no memory. Its output at any moment depends strictly on the current inputs. If the input changes, the output updates after a tiny gate delay.'
      },
      {
        heading: 'The Bitwise Comparator',
        details: 'To test if an incoming wireless token matches the authorized key, we compare each bit using XNOR gates. If bit 0 matches, bit 1 matches, ..., and all bits match, an AND gate fires.'
      },
      {
        heading: 'Simplifying with K-Maps',
        details: 'Karnaugh maps (K-maps) group adjacent 1s in a truth table to eliminate redundant terms, giving circuits with fewer gates, less heat, and faster execution.'
      }
    ],
    specBadges: [
      { label: 'Memory', value: 'None (Y depends only on X)' },
      { label: 'Comparator', value: 'Parallel XNOR Array' },
      { label: 'Optimization', value: 'K-Map Gate Reduction' },
      { label: 'Decision Flag', value: 'Match = 1 (Authorized)' }
    ],
    technicalCallout: {
      type: 'diagram',
      title: 'Bitwise Token Comparator Architecture',
      content: 'Incoming Bit 0 ──[ XNOR ]──► Match_0 ──┐\nStored Key Bit 0 ──┘                    │\nIncoming Bit 1 ──[ XNOR ]──► Match_1 ──┼──► [ 4-Input AND ] ──► TOKEN_VALID (1/0)\nStored Key Bit 1 ──┘                    │\nIncoming Bit 2 ──[ XNOR ]──► Match_2 ──┤\nIncoming Bit 3 ──[ XNOR ]──► Match_3 ──┘'
    },
    modelFocus: {
      cameraPos: [1.8, 1.2, 2.2],
      targetPos: [0.2, 0, 0],
      rotation: [0.2, -0.7, 0.1],
      highlightPart: 'camera'
    }
  },
  {
    id: 6,
    slideNumber: '06',
    title: 'Data Routing: Multiplexers & Decoders',
    subtitle: 'Steering Information & Activating Circuit Pathways',
    category: 'Routing Blocks',
    blueprintTopic: 'Data-Routing Blocks: Multiplexers (Data Selectors) and Decoders',
    structuralPoints: [
      {
        heading: 'Multiplexer (MUX): The Data Selector',
        details: 'A multiplexer acts like a digital train switch. It has multiple data inputs (D0, D1, D2, D3) but only one output wire. Address selection bits decide which input passes through.'
      },
      {
        heading: 'Decoder: Address to Action',
        details: 'A decoder takes a binary code and turns on one specific output wire. For example, a 2-to-4 decoder takes 2 state bits and activates exactly one of 4 control lines.'
      },
      {
        heading: 'Role in Access Control',
        details: 'A decoder reads the controller\'s state code and turns on the green LED line, the red lockout line, or the door relay trigger.'
      }
    ],
    specBadges: [
      { label: 'MUX Role', value: '4:1 Input Data Selector' },
      { label: 'Decoder Role', value: '2:4 Line Pathway Activator' },
      { label: 'Select Lines', value: '2 Bits choose 1 of 4 Lines' },
      { label: 'CPU Usage', value: 'Essential for ALU & Registers' }
    ],
    technicalCallout: {
      type: 'table',
      title: '2-to-4 Line Decoder Functionality',
      data: [
        { 'State Bit S1': 0, 'State Bit S0': 0, 'Y0 (LOCKED)': 1, 'Y1 (CHECKING)': 0, 'Y2 (UNLOCKED)': 0, 'Y3 (ALARM)': 0 },
        { 'State Bit S1': 0, 'State Bit S0': 1, 'Y0 (LOCKED)': 0, 'Y1 (CHECKING)': 1, 'Y2 (UNLOCKED)': 0, 'Y3 (ALARM)': 0 },
        { 'State Bit S1': 1, 'State Bit S0': 0, 'Y0 (LOCKED)': 0, 'Y1 (CHECKING)': 0, 'Y2 (UNLOCKED)': 1, 'Y3 (ALARM)': 0 },
        { 'State Bit S1': 1, 'State Bit S0': 1, 'Y0 (LOCKED)': 0, 'Y1 (CHECKING)': 0, 'Y2 (UNLOCKED)': 0, 'Y3 (ALARM)': 1 }
      ]
    },
    modelFocus: {
      cameraPos: [-2.1, 1.3, 2.4],
      targetPos: [-0.4, 0, 0],
      rotation: [0.25, 0.6, 0],
      highlightPart: 'gpios'
    }
  },
  {
    id: 7,
    slideNumber: '07',
    title: 'Why We Need Memory: Sequential Logic',
    subtitle: 'Latches, D-Flip-Flops & The System Clock Heartbeat',
    category: 'Sequential Logic',
    blueprintTopic: 'Sequential Circuits: State, Feedback, Latches vs Flip-Flops & The Clock',
    structuralPoints: [
      {
        heading: 'Why Combinational Logic Alone Fails',
        details: 'When a user walks past with an authorized wireless token, the radio packet lasts only milliseconds. Without memory, the door would immediately re-lock the instant the packet finishes.'
      },
      {
        heading: 'The D-Flip-Flop: Storing a Bit',
        details: 'A D-Flip-Flop is the fundamental memory cell. Whatever bit is on the D input gets captured into the register Q strictly when the clock ticks.'
      },
      {
        heading: 'The Clock & Edge-Triggering',
        details: 'The clock signal is the heartbeat of digital electronics. By sampling data only on the rising edge (0 to 1), we prevent race conditions and make complex machines completely predictable.'
      }
    ],
    specBadges: [
      { label: 'Memory Cell', value: 'D-Flip-Flop (1 Bit)' },
      { label: 'Clocking', value: 'Positive Edge-Triggered (↑)' },
      { label: 'Register', value: 'Row of Flip-Flops' },
      { label: 'Safety', value: 'Setup & Hold Time' }
    ],
    technicalCallout: {
      type: 'formula',
      title: 'Edge-Triggered Flip-Flop Operation',
      content: 'Clock Steady LOW  (0): Output Q holds stored value (D is ignored)\nClock Steady HIGH (1): Output Q holds stored value (D is ignored)\nClock RISING EDGE (↑): Q captures D instantaneously: Q(next) = D'
    },
    modelFocus: {
      cameraPos: [0.4, 1.8, 2.6],
      targetPos: [0, 0.1, 0],
      rotation: [0.3, -0.3, 0],
      highlightPart: 'chip'
    }
  },
  {
    id: 8,
    slideNumber: '08',
    title: 'Finite State Machines (FSM)',
    subtitle: 'The Brain: Defining States, Transitions & Wireless Decisions',
    category: 'State Machine Design',
    blueprintTopic: 'Finite State Machines: State Diagrams, Transitions & Control Units',
    structuralPoints: [
      {
        heading: 'What is a Finite State Machine?',
        details: 'An FSM describes a machine that can only be in one of a finite number of states at a time. It changes from one state to another in response to inputs and clock ticks.'
      },
      {
        heading: 'Our Controller\'s 4 States',
        details: '• S0 [LOCKED]: Waiting for nearby wireless signals\n• S1 [VERIFYING]: Comparator checking SSID bits\n• S2 [UNLOCKED]: Relay engaged, door open\n• S3 [LOCKOUT]: Wrong key detected, security pause'
      },
      {
        heading: 'FSM as the CPU\'s Control Unit',
        details: 'In a real processor (like RISC-V), this exact FSM pattern runs the fetch-decode-execute cycle and issues control signals to steer the datapath.'
      }
    ],
    specBadges: [
      { label: 'FSM Type', value: 'Moore Machine (Output = f(State))' },
      { label: 'State Memory', value: '2 Flip-Flops [Q1, Q0]' },
      { label: 'Total States', value: '4 States (S0 to S3)' },
      { label: 'Safe Transitions', value: 'Deterministic' }
    ],
    technicalCallout: {
      type: 'fsm',
      title: 'State Transition Decision Matrix',
      data: [
        { present: 'S0 (00): LOCKED', input: 'Signal Detected', next: 'S1 (01): VERIFYING', output: 'Lock=1 (Latched), LED=OFF' },
        { present: 'S1 (01): VERIFYING', input: 'Bits Match & Close By', next: 'S2 (10): UNLOCKED', output: 'Lock=0 (Free), LED=ON' },
        { present: 'S1 (01): VERIFYING', input: 'Bits Mismatch (Rogue)', next: 'S3 (11): LOCKOUT', output: 'Lock=1 (Latched), LED=Blink' },
        { present: 'S2 (10): UNLOCKED', input: 'Timer Expired', next: 'S0 (00): LOCKED', output: 'Lock=1 (Latched), LED=OFF' },
        { present: 'S3 (11): LOCKOUT', input: 'Penalty Timer Done', next: 'S0 (00): LOCKED', output: 'Lock=1 (Latched), LED=OFF' }
      ]
    },
    modelFocus: {
      cameraPos: [0.8, 2.4, 3.2],
      targetPos: [0, 0.4, 0],
      rotation: [0.45, -0.2, 0],
      highlightPart: 'antenna',
      activeRFWaves: true
    }
  },
  {
    id: 9,
    slideNumber: '09',
    title: 'Testing & Output Verification',
    subtitle: 'From Wireless Input to Physical Actuation & LED Telemetry',
    category: 'Verification & Output',
    blueprintTopic: 'Hardware Testing, Timing Waveforms & Output Actuation',
    structuralPoints: [
      {
        heading: 'Clock-by-Clock Verification',
        details: 'By tracing the clock ticks in a simulator, we verify that the state machine advances predictably from S0 to S1 to S2 without timing glitches or invalid states.'
      },
      {
        heading: 'Physical Output: Driving the LED & Relay',
        details: 'When state S2 (UNLOCKED) is active, the decoder asserts logic 1. This current forward-biases the indicator LED and switches an optocoupled relay to pull the physical door bolt.'
      },
      {
        heading: 'Hardware Immunity to Noise',
        details: 'Because the state changes only on clock edges and the comparator enforces full bit-equality, random wireless noise cannot trick the controller into unlocking.'
      }
    ],
    specBadges: [
      { label: 'Output Indicator', value: 'Onboard LED (1 = ON, 0 = OFF)' },
      { label: 'Relay Latch', value: 'Optocoupled Solenoid Driver' },
      { label: 'Clock Speed', value: '1 Hz Demo / 10 MHz Native' },
      { label: 'Test Result', value: '100% Hazard-Free Transition' }
    ],
    technicalCallout: {
      type: 'diagram',
      title: 'Oscilloscope Timing Waveform Trace',
      content: 'CLK:      __|‾‾|__|‾‾|__|‾‾|__|‾‾|__|‾‾|__|‾‾|__ (Clock Heartbeat)\nSSID_RX:  _______|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|________ (Wireless Packet)\nSTATE:    [ S0: LOCKED ]──►[ S1: CHK ]──►[ S2: UNLOCKED ]\nLED/LOCK: _______________________________|‾‾‾‾‾‾‾‾‾‾‾‾‾| (Door Open)'
    },
    modelFocus: {
      cameraPos: [0, 1.1, 2.4],
      targetPos: [0, -0.2, 0],
      rotation: [0.1, 0, 0],
      highlightPart: 'led',
      activeLEDGlow: true
    }
  },
  {
    id: 10,
    slideNumber: '10',
    title: 'Conclusion & The Path to a CPU',
    subtitle: 'How 1st-Trimester Foundations Assemble into Complete Processors',
    category: 'Capstone Synthesis',
    blueprintTopic: 'Capstone Summary: Connecting to the RISC-V CPU North Star',
    structuralPoints: [
      {
        heading: 'What We Built',
        details: 'We built a complete digital access controller using only first-trimester foundations: binary representation, basic logic gates, NAND universality, combinational comparators, and clocked flip-flop state machines.'
      },
      {
        heading: 'The Direct Link to a CPU',
        details: 'These exact same building blocks assemble into a real RISC-V processor: the combinational logic forms the ALU, the flip-flops form the Register File, and the FSM forms the instruction Control Unit.'
      },
      {
        heading: 'A Computer is No Longer Magic',
        details: 'From wireless sensing to physical door actuation, everything is understandable down to physical voltages and switches. You now understand the language of the machine!'
      }
    ],
    specBadges: [
      { label: 'Logic Subsystem', value: 'Combinational Comparators' },
      { label: 'Memory Subsystem', value: 'Clocked D-Flip-Flops' },
      { label: 'Control Subsystem', value: 'Finite State Machine' },
      { label: 'Next Step', value: 'RISC-V Single-Cycle CPU' }
    ],
    technicalCallout: {
      type: 'formula',
      title: 'Coursework Progression to RISC-V',
      content: 'Module 1-2: Logic Gates + Combinational Logic ──► RISC-V Arithmetic Logic Unit (ALU)\nModule 3-4: D-Flip-Flops + Addressable Memory ──► RISC-V Register File & Program Counter\nModule 5-6: Finite State Machine (FSM)        ──► RISC-V Instruction Control Unit'
    },
    modelFocus: {
      cameraPos: [1.6, 2.6, 4.4],
      targetPos: [0, 0, 0],
      rotation: [0.4, -0.35, 0],
      highlightPart: 'all'
    }
  }
];

export const FULL_SPEC_MARKDOWN = `# WIRELESS ACCESS CONTROLLER
## Digital Design & Computer Architecture (DDCA) — Technical Specification
**Course**: Digital Design and Computer Architecture (DDCA) — 1st Trimester  
**Branch**: Computer Science & Engineering (CSE)  
**Instructor**: Dayanab Baidya  

### Project Members:
1. Rithvika Thota - 2620030013 (CSE)
2. Lokesh Kumar - 2620030048 (CSE)
3. Karthik Reddy - 2620030056 (CSE)
4. Sriramaneni Manideep - 2620030089 (CSE)
5. Jalla Sai Bhargav - 2620030109 (CSE)

---

### EXECUTIVE SUMMARY
The **Wireless Access Controller** demonstrates how fundamental digital design concepts—binary representations, logic gates, combinational routing blocks, and clocked sequential state machines—unite to create an intelligent autonomous system. By converting wireless SSID packets into binary bytes and matching them against a stored key using bitwise comparators, the controller transitions between deterministic states (LOCKED, VERIFYING, UNLOCKED, LOCKOUT) and drives physical outputs (LED & Door Relay).

---

### 10-SLIDE SYLLABUS MAPPING

- **Slide 01: Wireless Access Controller**: Input-Process-Store-Output; Hardware vs Software; Project Team.
- **Slide 02: The Digital Abstraction**: High/Low voltages, binary/hex shorthand, converting SSIDs into binary bitstreams.
- **Slide 03: Basic Logic Gates**: AND, OR, NOT, XOR, truth tables, and sum-of-products Boolean expressions.
- **Slide 04: NAND Universality**: The "aha!" moment: De Morgan's laws and synthesizing any logic circuit from pure NANDs.
- **Slide 05: Combinational Logic & Comparators**: Memoryless circuits, bitwise XNOR equality checks, and K-Map logic simplification.
- **Slide 06: Data Routing (MUX & Decoders)**: Multiplexers as data selectors; 2-to-4 line decoders activating operational control lines.
- **Slide 07: Why We Need Memory (Sequential Logic)**: The failure of combinational systems without retention; D-Flip-Flops and positive edge clocking.
- **Slide 08: Finite State Machines (FSM)**: Describing behavior with states; Moore transition matrix (LOCKED, VERIFYING, UNLOCKED, LOCKOUT).
- **Slide 09: Testing & Output Verification**: Timing waveforms, hazard-free edge transitions, driving the LED and relay output.
- **Slide 10: Conclusion & The Path to a CPU**: How gates form the ALU, flip-flops form the Register File, and FSMs form the RISC-V Control Unit.
`;
