import { HSLAObject, createHSLA } from "./createHSLA"

/**
 * Represents the properties required to create a box-shadow effect in CSS.
 * It encapsulates the horizontal and vertical offsets, the blur radius,
 * the spread radius, the color of the shadow, and whether the shadow is inset.
 */
export interface ShadowObject {
  /** Horizontal offset of the shadow */
  readonly x: number

  /** Vertical offset of the shadow */
  readonly y: number

  /** Blur radius of the shadow */
  readonly blur: number

  /** Spread radius of the shadow */
  readonly spread: number

  /** Color object of the shadow */
  readonly color: HSLAObject

  /** Whether the shadow is an inner shadow */
  readonly inset: boolean

  /**
   * Method to update shadow properties.
   * @param newValues - Partial set of values to update the shadow
   * @returns Updated `ShadowObject`
   */
  set: (newValues: Partial<ShadowValues>) => ShadowObject

  /**
   * Method to adjust shadow properties.
   * @param adjustments - Partial set of values to adjust the shadow
   * @returns Adjusted `ShadowObject`
   */
  adjust: (adjustments: Partial<ShadowValues>) => ShadowObject

  /** Converts the shadow object to a CSS string */
  toString: () => string
}

/**
 * Describes the expected shape of the values used to create or modify a shadow.
 */
export type ShadowValues = {
  /** Horizontal offset */
  x: number

  /** Vertical offset */
  y: number

  /** Blur radius */
  blur: number

  /** Spread radius */
  spread: number

  /** Color object */
  color: HSLAObject

  /** Whether the shadow is inset or not */
  inset: boolean
}

/**
 * Creates a `ShadowObject` which can be used to represent a CSS box-shadow.
 * Default values are provided for each property, and any subset of properties can be specified to override these defaults.
 *
 * @param shadowValues - An optional object that can override default shadow values.
 * @returns An object representing the shadow, with methods for setting, adjusting, and converting to a string.
 */
export function createShadow({
  x = 0,
  y = 0,
  blur = 0,
  spread = 0,
  color = createHSLA(),
  inset = false,
}: Partial<ShadowValues> = {}): ShadowObject {
  return {
    get x() {
      return x
    },
    get y() {
      return y
    },
    get blur() {
      return blur
    },
    get spread() {
      return spread
    },
    get color() {
      return color
    },
    get inset() {
      return inset
    },
    set(newValues: Partial<ShadowValues>) {
      return createShadow({
        x: newValues.x ?? x,
        y: newValues.y ?? y,
        blur: newValues.blur ?? blur,
        spread: newValues.spread ?? spread,
        color: newValues.color ?? color,
        inset: newValues.inset ?? inset,
      })
    },
    adjust(adjustments: Partial<ShadowValues>) {
      return createShadow({
        x: adjustments.x ? x + adjustments.x : x,
        y: adjustments.y ? y + adjustments.y : y,
        blur: adjustments.blur ? blur + adjustments.blur : blur,
        spread: adjustments.spread ? spread + adjustments.spread : spread,
        color: adjustments.color
          ? color.adjust(adjustments.color.value)
          : color,
        inset: adjustments.inset ?? inset,
      })
    },
    toString() {
      const insetString = inset ? "inset " : ""
      return `${insetString}${x}px ${y}px ${blur}px ${spread}px ${color.toString()}`
    },
  }
}
