import { HSLAObject, createHSLA } from "./createHSLA"

/**
 * Represents the properties required to create a box-shadow effect in CSS.
 * It encapsulates the horizontal and vertical offsets, the blur radius,
 * the spread radius, the color of the shadow, and whether the shadow is inset.
 */
export interface ShadowObject {
  readonly x: number // Horizontal offset of the shadow
  readonly y: number // Vertical offset of the shadow
  readonly blur: number // Blur radius of the shadow
  readonly spread: number // Spread radius of the shadow
  readonly color: HSLAObject // Color object of the shadow
  readonly inset: boolean // Whether the shadow is an inner shadow
  set: (newValues: Partial<ShadowValues>) => ShadowObject // Method to update shadow properties
  adjust: (adjustments: Partial<ShadowValues>) => ShadowObject // Method to adjust shadow properties
  toString: () => string // Method to convert the shadow object to a CSS string
}

/**
 * Describes the expected shape of the values used to create or modify a shadow.
 */
export type ShadowValues = {
  x: number // Horizontal offset
  y: number // Vertical offset
  blur: number // Blur radius
  spread: number // Spread radius
  color: HSLAObject // Color object
  inset: boolean // Whether the shadow is inset or not
}

/**
 * Creates a `ShadowObject` which can be used to represent a CSS box-shadow.
 * Default values are provided for each property, and any subset of properties can be specified to override these defaults.
 *
 * @param {Partial<ShadowValues>} [shadowValues={}] - An optional object that can override default shadow values.
 * @returns {ShadowObject} - An object representing the shadow, with methods for setting, adjusting, and converting to a string.
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
