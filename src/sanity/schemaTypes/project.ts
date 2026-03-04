import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentIcon,
  fieldsets: [
    {
      name: "upcoming",
      title: "Upcoming Project Details",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "completed",
      title: "Completed Project Details",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "projectName",
      title: "Project Name",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Name of the project.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "projectName",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
      description: "Is this an upcoming or completed project?",
    }),
    // --- Impact Fields (Always Required) ---
    defineField({
      name: "expectedPeopleImpacted",
      title: "Expected People to be Impacted",
      type: "number",
      validation: (rule) => rule.required().min(1),
      hidden: ({ parent }) => parent?.status !== "upcoming",
      description: "For ongoing/upcoming projects",
    }),
    defineField({
      name: "expectedCommunitiesImpacted",
      title: "Expected Communities to Impact",
      type: "number",
      validation: (rule) => rule.required().min(1),
      hidden: ({ parent }) => parent?.status !== "upcoming",
      description: "For ongoing/upcoming projects",
    }),
    defineField({
      name: "peopleImpacted",
      title: "People Impacted",
      type: "number",
      validation: (rule) => rule.required().min(1),
      hidden: ({ parent }) => parent?.status !== "completed",
      description: "For completed projects",
    }),
    defineField({
      name: "communitiesImpacted",
      title: "Communities Impacted",
      type: "number",
      validation: (rule) => rule.required().min(1),
      hidden: ({ parent }) => parent?.status !== "completed",
      description: "For completed projects",
    }),
    // --- Last Updated ---
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      readOnly: true,
      description: "Auto-updated when the project is edited.",
      initialValue: () => new Date().toISOString(),
    }),
    //hero image
    defineField({
      name: "coverImage",
      title: "Cover / Hero Image",
      type: "image",
      options: {
        hotspot: true,
        accept: "image/*",
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    // --- Upcoming Project Fields ---
    defineField({
      name: "donateLink",
      title: "Donate Link",
      type: "url",
      hidden: ({ parent }) => parent?.status !== "upcoming",
      fieldset: "upcoming",
      description: "Donation link for this project.",
    }),
    defineField({
      name: "about",
      title: "What is this Project?",
      type: "text",
      hidden: ({ parent }) => parent?.status !== "upcoming",
      fieldset: "upcoming",
    }),
    defineField({
      name: "problem",
      title: "The Problem",
      type: "text",
      hidden: ({ parent }) => parent?.status !== "upcoming",
      fieldset: "upcoming",
    }),
    defineField({
      name: "solutionType",
      title: "Solution Format",
      type: "string",
      options: {
        list: [
          { title: "Single Paragraph", value: "paragraph" },
          { title: "Objectives & Approach", value: "objectives" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => parent?.status !== "upcoming",
      fieldset: "upcoming",
    }),
    defineField({
      name: "solution",
      title: "Solution (Paragraph)",
      type: "text",
      hidden: ({ parent }) =>
        parent?.status !== "upcoming" || parent?.solutionType !== "paragraph",
      fieldset: "upcoming",
    }),
    defineField({
      name: "objectivesApproach",
      title: "Objectives & Approach",
      type: "objectivesApproach",
      hidden: ({ parent }) =>
        parent?.status !== "upcoming" || parent?.solutionType !== "objectives",
      fieldset: "upcoming",
    }),
    // --- Completed Project Fields ---
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      hidden: ({ parent }) => parent?.status !== "completed",
      fieldset: "completed",
    }),
    defineField({
      name: "youtubeLink",
      title: "YouTube Link (Placeholder)",
      type: "url",
      hidden: ({ parent }) => parent?.status !== "completed",
      fieldset: "completed",
    }),
    defineField({
      name: "completedProblem",
      title: "The Problem",
      type: "text",
      hidden: ({ parent }) => parent?.status !== "completed",
      fieldset: "completed",
    }),
    defineField({
      name: "completedSolutionType",
      title: "Solution Format",
      type: "string",
      options: {
        list: [
          { title: "Single Paragraph", value: "paragraph" },
          { title: "Objectives & Approach", value: "objectives" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => parent?.status !== "completed",
      fieldset: "completed",
    }),
    defineField({
      name: "completedSolution",
      title: "Solution (Paragraph)",
      type: "text",
      hidden: ({ parent }) =>
        parent?.status !== "completed" ||
        parent?.completedSolutionType !== "paragraph",
      fieldset: "completed",
    }),
    defineField({
      name: "completedObjectivesApproach",
      title: "Objectives & Approach",
      type: "objectivesApproach",
      hidden: ({ parent }) =>
        parent?.status !== "completed" ||
        parent?.completedSolutionType !== "objectives",
      fieldset: "completed",
    }),
    defineField({
      name: "overview",
      title: "What We Have Done (Project Overview)",
      type: "text",
      hidden: ({ parent }) => parent?.status !== "completed",
      fieldset: "completed",
    }),
    defineField({
      name: "projectReport",
      title: "Project Report (PDF)",
      type: "file",
      options: { accept: ".pdf" },
      hidden: ({ parent }) => parent?.status !== "completed",
      fieldset: "completed",
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [{ type: "partner" }],
      hidden: ({ parent }) => parent?.status !== "completed",
      fieldset: "completed",
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: "impactGallery",
      title: "Impact Gallery (3 Images)",
      type: "array",
      of: [{ type: "galleryImage" }],
      validation: (rule) => rule.max(3),
      hidden: ({ parent }) => parent?.status !== "completed",
      fieldset: "completed",
    }),
    defineField({
      name: "moreImagesLink",
      title: "Link to More Images",
      type: "url",
      hidden: ({ parent }) => parent?.status !== "completed",
      fieldset: "completed",
    }),
    defineField({
      name: "sponsors",
      title: "Sponsors/Donors",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ parent }) => parent?.status !== "completed",
      fieldset: "completed",
      validation: (rule) => rule.max(10),
    }),
  ],
  preview: {
    select: {
      title: "projectName",
    },
  },
});
