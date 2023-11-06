import { HSLAObject, createHSLA } from "./createHSLA"

export interface ShadowObject {
  readonly x: number
  readonly y: number
  readonly blur: number
  readonly spread: number
  readonly color: HSLAObject
  readonly inset: boolean
  set: (newValues: Partial<ShadowValues>) => ShadowObject
  adjust: (adjustments: Partial<ShadowValues>) => ShadowObject
  toString: () => string
}

export type ShadowValues = {
  x: number
  y: number
  blur: number
  spread: number
  color: HSLAObject
  inset: boolean
}

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
