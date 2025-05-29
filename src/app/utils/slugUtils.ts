/**
 * Generates a slug for a program title to be used in dynamic routing.
 * @param title - The title of the program (e.g., "Cosmetology - Beauty & Personal Care")
 * @returns The generated slug (e.g., "cosmetology-beauty-personal-care")
 */
export const generateProgramSlug = (title: string): string => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

/**
 * Generates the full URL path for a program's detail page.
 * @param title - The title of the program (e.g., "Cosmetology - Beauty & Personal Care")
 * @returns The full path (e.g., "/program/cosmetology-beauty-personal-care")
 */
export const getProgramPath = (title: string): string => {
    const slug = generateProgramSlug(title);
    return `/programs/${slug}`;
};