import { Template, TemplateSizeId } from "../types/nametag.types"

type SizeSeed = {
  id: TemplateSizeId
  label: string
  widthMm: number
  heightMm: number
}

const SIZE_LIBRARY: Record<TemplateSizeId, SizeSeed> = {
  pencil: { id: "pencil", label: "Pencil", widthMm: 45, heightMm: 15 },
  notebook: { id: "notebook", label: "Notebook", widthMm: 60, heightMm: 25 },
  book: { id: "book", label: "Book", widthMm: 70, heightMm: 35 },
  bottle: { id: "bottle", label: "Bottle", widthMm: 55, heightMm: 30 },
  bag: { id: "bag", label: "Bag", widthMm: 70, heightMm: 30 },
}

function buildSize(
  templateId: string,
  sizeId: TemplateSizeId
): Template["sizes"][number] {
  const base = SIZE_LIBRARY[sizeId]
  return {
    ...base,
    previewImage: `/assets/nametag/templates/${templateId}/${sizeId}.png`,
  }
}

function buildTemplate(input: {
  id: string
  name: string
  category: Template["category"]
  tags: string[]
  sizes: TemplateSizeId[]
}): Template {
  return {
    id: input.id,
    name: input.name,
    category: input.category,
    tags: input.tags,
    previewImage: `/assets/nametag/templates/${input.id}/preview.png`,
    sizes: input.sizes.map((sizeId) => buildSize(input.id, sizeId)),
  }
}

export const mockTemplates: Template[] = [
  buildTemplate({
    id: "template-001",
    name: "اسب تک شاخ صورتی",
    category: "kids",
    tags: ["space", "planet", "rocket"],
    sizes: ["notebook"],
  }),
  buildTemplate({
    id: "template-002",
    name: "Cute Animals",
    category: "kids",
    tags: ["animals", "cute", "school"],
    sizes: ["pencil", "notebook", "bottle"],
  }),
  buildTemplate({
    id: "template-003",
    name: "Rainbow School",
    category: "kids",
    tags: ["rainbow", "colorful"],
    sizes: ["pencil", "notebook", "bag"],
  }),
  buildTemplate({
    id: "template-004",
    name: "Super Heroes",
    category: "kids",
    tags: ["hero", "comic"],
    sizes: ["pencil", "notebook", "book"],
  }),
  buildTemplate({
    id: "template-005",
    name: "Dinosaur World",
    category: "kids",
    tags: ["dinosaur", "jurassic"],
    sizes: ["pencil", "notebook", "bag"],
  }),
  buildTemplate({
    id: "template-006",
    name: "Ocean Friends",
    category: "kids",
    tags: ["ocean", "fish"],
    sizes: ["pencil", "notebook", "bottle"],
  }),
  buildTemplate({
    id: "template-007",
    name: "Football Club",
    category: "sports",
    tags: ["football", "sport"],
    sizes: ["pencil", "notebook", "book"],
  }),
  buildTemplate({
    id: "template-008",
    name: "Unicorn Dream",
    category: "fantasy",
    tags: ["unicorn", "magic"],
    sizes: ["pencil", "notebook", "bag"],
  }),
  buildTemplate({
    id: "template-009",
    name: "Minimal School",
    category: "minimal",
    tags: ["clean", "modern"],
    sizes: ["pencil", "notebook", "book"],
  }),
  buildTemplate({
    id: "template-010",
    name: "Galaxy Neon",
    category: "modern",
    tags: ["galaxy", "neon"],
    sizes: ["pencil", "notebook", "bottle"],
  }),
]
