import { HSLAObject } from "./createHSLA"

export interface GradientObject {
  readonly type: GradientType
  readonly angle: number
  readonly repeating: boolean
  readonly sections: GradientSection[]
  set: (newValues: Partial<GradientValues>) => GradientObject
  adjust: (adjustments: Partial<GradientValues>) => GradientObject
  toString: () => string
}

export type GradientType = "linear" | "radial" | "conic"

export interface GradientSection {
  color: HSLAObject
  start?: number // in percentage (0-100)
  end?: number // in percentage (0-100)
}

export type GradientValues = {
  type: GradientType
  angle: number
  repeating: boolean
  sections: GradientSection[]
}

export function createGradient({
  type = "linear",
  angle = 0,
  repeating = false,
  sections = [],
}: Partial<GradientValues> = {}): GradientObject {
  return {
    get type() {
      return type
    },
    get angle() {
      return angle
    },
    get repeating() {
      return repeating
    },
    get sections() {
      return sections
    },
    set(newValues: Partial<GradientValues>) {
      return createGradient({
        type: newValues.type ?? type,
        angle: newValues.angle ?? angle,
        repeating: newValues.repeating ?? repeating,
        sections: newValues.sections ?? sections,
      })
    },
    adjust(adjustments: Partial<GradientValues>) {
      return createGradient({
        type: adjustments.type ?? type,
        angle: adjustments.angle ?? angle,
        repeating: adjustments.repeating ?? repeating,
        sections: adjustments.sections ?? sections,
      })
    },
    toString() {
      const typeStr = repeating ? `repeating-${type}` : type
      const angleStr = `${angle}deg`

      const sectionsString = sections
        .map((section) => {
          const startPosition =
            section.start !== undefined ? `${section.start}%` : ""
          const endPosition = section.end !== undefined ? `${section.end}%` : ""
          const positionStr =
            startPosition || endPosition
              ? `${startPosition} ${endPosition}`.trim()
              : ""
          return `${section.color.toString()} ${positionStr}`.trim()
        })
        .join(", ")

      return type === "linear"
        ? `${typeStr}-gradient(${angleStr}, ${sectionsString})`
        : `${typeStr}-gradient(${sectionsString})` // Radial and conic gradients won't use angle in this case, but it's possible to include if needed
    },
  }
}
