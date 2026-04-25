import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";

export interface Project {
  id: number;
  code: string;
  title: [string, string];
  subtitle: string;
  description: string;
  videoUrl: string;
  accentColor: string;
  category: string;
  year: string;
  date: string;
  location: string;
  status: string;
  tags: string[];
  metric1: { label: string; sub: string };
  metric2: { label: string; sub: string };
  imageUrl: string;
  demoUrl?: string;
  techStack: { name: string; icon: string }[];
  challenge: string;
  solution: string;
  outcome: string;
  gallery: [string, string];
}

export const projects: Project[] = [
  {
    id: 1,
    code: "01",
    title: ["MENTAL", "RESTRICTED"],
    subtitle: "Split-statue dossier\nwith restricted archive overlays.",
    description: "A surveillance-style editorial system blending sacred sculpture, barcode fragments, and fragmented annotation rails into a controlled high-contrast narrative.",
    videoUrl: "/videos/lab-archive.mp4",
    accentColor: "#8A5CFF",
    category: "SECURE CHANNEL",
    year: "2026",
    date: "21 March 2026",
    location: "Milan",
    status: "RESTRICTED NODE",
    tags: ["Statue Collage", "Dark UI", "Editorial Grid"],
    metric1: { label: "01 // STATUS", sub: "Restricted layer lock enabled" },
    metric2: { label: "02 // PROTOCOL", sub: "Dual-channel signal masking" },
    imageUrl: img1,
    demoUrl: "https://aetrux.dev",
    techStack: [
      { name: "React", icon: "R" },
      { name: "TypeScript", icon: "TS" },
      { name: "Vite", icon: "V" },
      { name: "Tailwind", icon: "TW" },
    ],
    challenge: "Balancing aggressive collage density with readable hierarchy in a dark narrative interface.",
    solution: "Structured the layout around strict rails, high-contrast checkpoints, and controlled noise windows for guided eye flow.",
    outcome: "Produced a signature restricted-case visual language that remains readable at speed.",
    gallery: [img1, img2],
  },
  {
    id: 2,
    code: "02",
    title: ["DESPAIR", "WAVEFORM"],
    subtitle: "Marble angel stream\ninside chromatic turbulence fields.",
    description: "An emotional broadcast system where grayscale sculpture is framed by violent violet fluid textures, wireframes, and multilingual side marks.",
    videoUrl: "/videos/lab-archive.mp4",
    accentColor: "#B14DFF",
    category: "ARCHIVE",
    year: "2025",
    date: "11 November 2025",
    location: "Sao Paulo",
    status: "EMOTIVE FEED",
    tags: ["Angelic Core", "Fluid Noise", "Type Collage"],
    metric1: { label: "03 // STATUS", sub: "Affect-index tuned to high" },
    metric2: { label: "04 // OBSERVATION", sub: "Visual pulse stable at runtime" },
    imageUrl: img2,
    techStack: [
      { name: "CSS Vars", icon: "CV" },
      { name: "Framer", icon: "FM" },
      { name: "Storybook", icon: "SB" },
      { name: "Vite", icon: "V" },
    ],
    challenge: "Translating high-saturation emotional visuals into a system that still communicates operationally.",
    solution: "Mapped each chaotic layer to semantic roles: emotion field, signal object, and protocol text.",
    outcome: "Turned visual intensity into a repeatable content system for campaign-grade interfaces.",
    gallery: [img2, img3],
  },
  {
    id: 3,
    code: "03",
    title: ["LUXURY", "COSMOPLATON"],
    subtitle: "Neo-classic signal tower\nwith luminous geometry framing.",
    description: "A ceremonial interface skin pairing deep-night backdrop, repeated serif monuments, and neon violet geometry around a central elevation figure.",
    videoUrl: "/videos/lab-telemetry.mp4",
    accentColor: "#9C6BFF",
    category: "TELEMETRY",
    year: "2025",
    date: "17 August 2025",
    location: "Seoul",
    status: "AURA TRACKING",
    tags: ["Neon Frame", "Serif Stack", "Iconic Figure"],
    metric1: { label: "05 // STATUS", sub: "Ceremonial mode calibrated" },
    metric2: { label: "06 // PROTOCOL", sub: "Luminance trace precision <2%" },
    imageUrl: img3,
    demoUrl: "https://aetrux.dev",
    techStack: [
      { name: "Edge", icon: "ED" },
      { name: "Workers", icon: "WK" },
      { name: "TS", icon: "TS" },
      { name: "Go", icon: "GO" },
    ],
    challenge: "Keeping a premium art-poster tone while preserving measurable interface behavior.",
    solution: "Combined strict typographic scaffolding with controlled neon emitters and balanced depth contrast.",
    outcome: "Delivered a luxury-coded lab mode that reads both aspirational and technical.",
    gallery: [img3, img4],
  },
  {
    id: 4,
    code: "04",
    title: ["REBEL", "RITUAL"],
    subtitle: "Winged action frame\nwith aggressive violet script overlays.",
    description: "A rebellious typographic protocol built around kinetic brush scripts, black-field staging, and sharp white signal cuts for maximum impact.",
    videoUrl: "/videos/lab-telemetry.mp4",
    accentColor: "#A248FF",
    category: "DATA CANVAS",
    year: "2025",
    date: "30 June 2025",
    location: "Warsaw",
    status: "RITUAL ACTIVE",
    tags: ["Brush Script", "Kinetic Pose", "Black/Violet"],
    metric1: { label: "07 // STATUS", sub: "Impact sequence locked" },
    metric2: { label: "08 // OBSERVATION", sub: "Signal readability sustained" },
    imageUrl: img4,
    techStack: [
      { name: "WebGL", icon: "GL" },
      { name: "D3", icon: "D3" },
      { name: "Kafka", icon: "KF" },
      { name: "WASM", icon: "WA" },
    ],
    challenge: "Converting chaotic expressive typography into reusable UI modules without flattening energy.",
    solution: "Defined a two-layer system: expressive foreground gestures + disciplined metadata rails.",
    outcome: "Created a high-impact rebellious mode that still behaves like a production interface.",
    gallery: [img4, img1],
  },
];
