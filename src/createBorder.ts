import { HslaObject, createHsla } from "./createHsla_"

/**
 * Represents the structure of a border object.
 */
export interface BorderObject {
  /** The width of the border in pixels. */
  readonly width: number

  /** The style of the border, as defined by the `BorderStyle` type. */
  readonly style: BorderStyle

  /** The color of the border, represented by an `HslaObject`. */
  readonly color: HslaObject

  /**
   * Sets new values for the border properties.
   * @param newValues - A partial object with values to update the border.
   * @returns A new `BorderObject` with updated properties.
   */
  set: (newValues: Partial<BorderValues>) => BorderObject

  /**
   * Adjusts the current border values by a given adjustment object.
   * @param adjustments - A partial object with values to adjust the border.
   * @returns A new `BorderObject` with adjusted properties.
   */
  adjust: (adjustments: Partial<BorderValues>) => BorderObject

  /**
   * Returns a string representation of the border object.
   * @returns A string that represents the border object's properties.
   */
  toString: () => string
}

/**
 * The available styles for a border.
 */
export type BorderStyle =
  | "solid"
  | "dotted"
  | "dashed"
  | "double"
  | "groove"
  | "ridge"
  | "inset"
  | "outset"
  | "none"
  | "hidden"

/**
 * Represents the values needed to define a border.
 */
export type BorderValues = {
  width: number
  style: BorderStyle
  color: HslaObject
}

/**
 * Creates a new `BorderObject` with specified values or default ones.
 * @param data - An object containing the initial properties of the border.
 * @param data.width - The width of the border, defaulting to 1.
 * @param data.style - The style of the border, defaulting to "solid".
 * @param data.color - The color of the border, defaulting to black opaque.
 * @returns A new `BorderObject` with the specified or default properties.
 */
export function createBorder({
  width = 1,
  style = "solid",
  color = createHsla({ h: 0, s: 0, l: 0, a: 1 }),
}: Partial<BorderValues> = {}): BorderObject {
  return {
    get width() {
      return width
    },
    get style() {
      return style
    },
    get color() {
      return color
    },
    set(newValues: Partial<BorderValues>) {
      return createBorder({
        width: newValues.width ?? width,
        style: newValues.style ?? style,
        color: newValues.color ?? color,
      })
    },
    adjust(adjustments: Partial<BorderValues>) {
      return createBorder({
        width: adjustments.width ? width + adjustments.width : width,
        style: adjustments.style ?? style,
        color: adjustments.color
          ? color.adjust(adjustments.color.value)
          : color,
      })
    },
    toString(): string {
      return `${width}px ${style} ${color.toString()}`
    },
  }
}
