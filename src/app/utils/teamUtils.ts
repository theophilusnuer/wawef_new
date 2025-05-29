/**
 * Generates a slug for a team member's name to be used in dynamic routing.
 * @param name - The name of the team member (e.g., "Aisha Mensah")
 * @returns The generated slug (e.g., "aisha-mensah")
 */
export const generateTeamSlug = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

/**
 * Generates the full URL path for a team member's detail page.
 * @param name - The name of the team member (e.g., "Aisha Mensah")
 * @returns The full path (e.g., "/team/aisha-mensah")
 */
export const getTeamPath = (name: string): string => {
    const slug = generateTeamSlug(name);
    return `/team/${slug}`;
};