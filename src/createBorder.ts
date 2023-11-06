import { HSLAObject, createHSLA } from "./createHSLA"

export interface BorderObject {
  readonly width: number
  readonly style: BorderStyle
  readonly color: HSLAObject
  set: (newValues: Partial<BorderValues>) => BorderObject
  adjust: (adjustments: Partial<BorderValues>) => BorderObject
  toString: () => string
}

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

export type BorderValues = {
  width: number
  style: BorderStyle
  color: HSLAObject
}

export function createBorder({
  width = 1,
  style = "solid",
  color = createHSLA({ h: 0, s: 0, l: 0, a: 1 }),
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
