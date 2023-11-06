import { HSLAObject } from "./createHSLA"

/**
 * Interface representing a gradient object.
 */
export interface GradientObject {
  /** The type of gradient (linear, radial, or conic). */
  readonly type: GradientType

  /** The angle of the gradient in degrees. */
  readonly angle: number

  /** Indicates if the gradient is repeating. */
  readonly repeating: boolean

  /** The sections of the gradient, each with a color and optional start/end positions. */
  readonly sections: GradientSection[]

  /**
   * Updates the gradient object with new values.
   * @param newValues - An object containing new values to set on the gradient.
   * @returns A new `GradientObject` with updated properties.
   */
  set: (newValues: Partial<GradientValues>) => GradientObject

  /**
   * Adjusts the existing values of the gradient object.
   * @param adjustments - An object containing values to adjust on the gradient.
   * @returns A new `GradientObject` with adjusted properties.
   */
  adjust: (adjustments: Partial<GradientValues>) => GradientObject

  /**
   * Returns a string representation of the gradient object.
   * @returns A CSS-compatible string representing the gradient.
   */
  toString: () => string
}

/**
 * Defines the possible types of gradients.
 */
export type GradientType = "linear" | "radial" | "conic"

/**
 * Represents a section of a gradient.
 */
export interface GradientSection {
  /** The color of the gradient section, represented by an `HSLAObject`. */
  color: HSLAObject

  /** The start position of the color stop as a percentage (optional). */
  start?: number

  /** The end position of the color stop as a percentage (optional). */
  end?: number
}

/**
 * Represents the values needed to define a gradient.
 */
export type GradientValues = {
  type: GradientType
  angle: number
  repeating: boolean
  sections: GradientSection[]
}

/**
 * Creates a new `GradientObject` with specified values or default ones.
 * @param data - An object containing the initial properties of the gradient.
 * @param data.type - The type of gradient, defaulting to "linear".
 * @param data.angle - The angle of the gradient in degrees, defaulting to 0.
 * @param data.repeating - Indicates if the gradient is repeating, defaulting to false.
 * @param data.sections - The sections of the gradient, defaulting to an empty array.
 * @returns A new `GradientObject` with the specified or default properties.
 */
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
        : `${typeStr}-gradient(${sectionsString})` // Radial and conic gradients don't include the angle in this toString implementation
    },
  }
}
