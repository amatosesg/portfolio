import type { ImageMetadata } from "astro";

const projectImages = import.meta.glob(
  "../assets/projects/*/*.webp",
  {
    eager: true,
    import: "default",
  },
) as Record<string, ImageMetadata>;

export type ProjectId =
  | "taskflow-api"
  | "business-manager"
  | "personal-portfolio"
  | "system-monitor";

export interface Project {
  id: ProjectId;
  technologies: string[];
  images: ImageMetadata[];
  github?: string;
  live?: string;
}

interface ProjectData {
  id: ProjectId;
  technologies: string[];
  github?: string;
  live?: string;
}

function getProjectImages(projectId: ProjectId): ImageMetadata[] {
  return Object.entries(projectImages)
    .filter(([path]) => path.includes(`/projects/${projectId}/`))
    .sort(([pathA], [pathB]) => {
      const fileA = pathA.split("/").pop() ?? "";
      const fileB = pathB.split("/").pop() ?? "";

      return fileA.localeCompare(fileB, undefined, {
        numeric: true,
      });
    })
    .map(([, image]) => image);
}

const projectData: ProjectData[] = [
  {
    id: "taskflow-api",
    technologies: ["PHP", "Laravel", "MySQL"],
  },
  {
    id: "business-manager",
    technologies: ["PHP", "MySQL", "JavaScript"],
  },
  {
    id: "personal-portfolio",
    technologies: ["Astro", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/amatosesg/portfolio",
    live: "/",
  },
  {
    id: "system-monitor",
    technologies: ["TypeScript", "API", "WebSockets"],
  },
];

export const projects: Project[] = projectData.map((project) => ({
  ...project,
  images: getProjectImages(project.id),
}));