import type { ImageMetadata } from "astro";

const projectImages = import.meta.glob(
  "../assets/projects/*/*.webp",
  {
    eager: true,
    import: "default",
  },
) as Record<string, ImageMetadata>;

export type ProjectId =
  | "fredllum-web"
  | "fredllum-erp"
  | "personal-portfolio"
  | "satflow-api";

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
    id: "fredllum-web",
    technologies: ["Astro", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "fredllum-erp",
    technologies: ["PHP", "Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "MySQL"],
  },
  {
    id: "personal-portfolio",
    technologies: ["Astro", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/amatosesg/portfolio",
    live: "/",
  },
  {
    id: "satflow-api",
    technologies: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
  },
];

export const projects: Project[] = projectData.map((project) => ({
  ...project,
  images: getProjectImages(project.id),
}));