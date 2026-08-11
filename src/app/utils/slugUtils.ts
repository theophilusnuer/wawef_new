/**
 * Generates a slug for a program title to be used in dynamic routing.
 * @param title - The title of the program (e.g., "Cosmetology - Beauty & Personal Care")
 * @returns The generated slug (e.g., "cosmetology-beauty-personal-care")
 */

// Generic slug generator
const generateSlug = (input: string): string => {
    return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

// Program slug and path
export const generateProgramSlug = (title: string): string => generateSlug(title);
export const getProgramPath = (title: string): string => `/programs/${generateProgramSlug(title)}`;

// Project slug and path
export const generateProjectSlug = (title: string): string => generateSlug(title);
export const getProjectPath = (title: string): string => `/projects/${generateProjectSlug(title)}`;

// News slug and path
export const generateNewsSlug = (title: string): string => generateSlug(title);
export const getNewsPath = (title: string): string => `/news-stories/${generateNewsSlug(title)}`;

// Impact Story slug and path
export const generateImpactStorySlug = (title: string): string => generateSlug(title);
export const getImpactStoryPath = (title: string): string => `/impact-stories/${generateImpactStorySlug(title)}`;

