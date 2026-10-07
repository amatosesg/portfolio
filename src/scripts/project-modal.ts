const modal = document.querySelector<HTMLDialogElement>("#project-modal");
const closeButton = document.querySelector<HTMLButtonElement>(
  "#project-modal-close",
);
const projectCards =
  document.querySelectorAll<HTMLButtonElement>("[data-project-id]");
const projectContents =
  document.querySelectorAll<HTMLElement>("[data-project-content]");

if (modal && closeButton) {
  const projectModal = modal;
  let activeProjectCard: HTMLButtonElement | null = null;

  function updateCarousel(projectContent: HTMLElement, index: number) {
    const images =
      projectContent.querySelectorAll<HTMLImageElement>(
        "[data-carousel-image]",
      );
    const dots =
      projectContent.querySelectorAll<HTMLButtonElement>(
        "[data-carousel-dot]",
      );

    if (!images.length) {
      return;
    }

    images.forEach((image, imageIndex) => {
      image.classList.toggle("hidden", imageIndex !== index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("w-5", dotIndex === index);
      dot.classList.toggle("bg-gray-700", dotIndex === index);
      dot.classList.toggle("dark:bg-slate-200", dotIndex === index);

      dot.classList.toggle("w-1.5", dotIndex !== index);
      dot.classList.toggle("bg-gray-300", dotIndex !== index);
      dot.classList.toggle("dark:bg-slate-600", dotIndex !== index);
    });

    projectContent.dataset.carouselIndex = String(index);
  }

  function setupCarousel(projectContent: HTMLElement) {
    const images =
      projectContent.querySelectorAll<HTMLImageElement>(
        "[data-carousel-image]",
      );
    const previousButton =
      projectContent.querySelector<HTMLButtonElement>(
        "[data-carousel-prev]",
      );
    const nextButton =
      projectContent.querySelector<HTMLButtonElement>(
        "[data-carousel-next]",
      );
    const dots =
      projectContent.querySelectorAll<HTMLButtonElement>(
        "[data-carousel-dot]",
      );

    if (!images.length) {
      return;
    }

    const getCurrentIndex = () =>
      Number(projectContent.dataset.carouselIndex ?? "0");

    previousButton?.addEventListener("click", () => {
      const currentIndex = getCurrentIndex();
      const nextIndex =
        currentIndex === 0 ? images.length - 1 : currentIndex - 1;

      updateCarousel(projectContent, nextIndex);
    });

    nextButton?.addEventListener("click", () => {
      const currentIndex = getCurrentIndex();
      const nextIndex =
        currentIndex === images.length - 1 ? 0 : currentIndex + 1;

      updateCarousel(projectContent, nextIndex);
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.carouselIndex ?? "0");

        updateCarousel(projectContent, index);
      });
    });

    updateCarousel(projectContent, 0);
  }

  projectContents.forEach((projectContent) => {
    setupCarousel(projectContent);
  });

  function getActiveProject(): HTMLElement | null {
    return Array.from(projectContents).find(
      (content) => !content.hidden,
    ) ?? null;
  }

  function changeActiveImage(direction: "previous" | "next") {
    const activeProject = getActiveProject();

    if (!activeProject) {
      return;
    }

    const images =
      activeProject.querySelectorAll<HTMLImageElement>(
        "[data-carousel-image]",
      );

    if (images.length <= 1) {
      return;
    }

    const currentIndex = Number(
      activeProject.dataset.carouselIndex ?? "0",
    );

    const nextIndex =
      direction === "next"
        ? currentIndex === images.length - 1
          ? 0
          : currentIndex + 1
        : currentIndex === 0
          ? images.length - 1
          : currentIndex - 1;

    updateCarousel(activeProject, nextIndex);
  }

  function openProject(
    projectId: string,
    card: HTMLButtonElement,
  ) {
    activeProjectCard = card;

    projectContents.forEach((content) => {
      const isCurrentProject =
        content.dataset.projectContent === projectId;

      content.hidden = !isCurrentProject;

      if (isCurrentProject) {
        updateCarousel(content, 0);
      }
    });

    projectModal.showModal();
  }

  function closeProject() {
    projectModal.close();
    activeProjectCard?.focus();
    activeProjectCard = null;
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = card.dataset.projectId;

      if (projectId) {
        openProject(projectId, card);
      }
    });
  });

  closeButton.addEventListener("click", closeProject);

  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      closeProject();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!projectModal.open) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeActiveImage("previous");
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      changeActiveImage("next");
    }
  });
}