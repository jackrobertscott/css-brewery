/**
 * Interface representing an HSLA (Hue, Saturation, Lightness, Alpha) color object.
 */
export interface HslaObject {
  /** The hue component of the color (0-360). */
  readonly h: number

  /** The saturation component of the color (0-100%). */
  readonly s: number

  /** The lightness component of the color (0-100%). */
  readonly l: number

  /** The alpha (opacity) component of the color (0-1). */
  readonly a: number

  /** The HSLA values as an object. */
  readonly value: HslaValues

  /**
   * Updates the HSLA color object with new values.
   * @param newValues - An object containing new values to set on the color.
   * @returns A new `HslaObject` with updated properties.
   */
  set: (newValues: Partial<HslaValues>) => HslaObject

  /**
   * Adjusts the existing values of the HSLA color object.
   * @param adjustments - An object containing the adjustments to the color values.
   * @returns A new `HslaObject` with adjusted properties.
   */
  adjust: (adjustments: Partial<HslaValues>) => HslaObject

  /**
   * Shifts the lightness of the HSLA color, making it lighter or darker based on the luminance.
   * @param adjustment - The amount by which to adjust the lightness.
   * @returns A new `HslaObject` with adjusted lightness.
   */
  shift: (adjustment: number) => HslaObject

  /**
   * Converts the HSLA color to an RGB color.
   * @returns An array representing the RGB components of the color.
   */
  toRgbVector: () => [number, number, number]

  /**
   * Returns a string representation of the HSLA color.
   * @returns A CSS-compatible string representing the HSLA color.
   */
  toString: () => string
}

/**
 * Type representing the values for an HSLA color.
 */
export type HslaValues = {
  h: number
  s: number
  l: number
  a: number
}

/**
 * Creates a new `HslaObject` with specified values or default ones.
 * @param data - An object containing the initial HSLA values for the color.
 * @param data.h - The hue of the color, defaulting to 0.
 * @param data.s - The saturation of the color, defaulting to 0.
 * @param data.l - The lightness of the color, defaulting to 0.
 * @param data.a - The alpha (opacity) of the color, defaulting to 1.
 * @returns A new `HslaObject` with the specified or default values.
 */
export function createHsla({
  h = 0,
  s = 0,
  l = 0,
  a = 1,
}: Partial<HslaValues> = {}): HslaObject {
  h = h % 360
  s = Math.min(100, Math.max(0, s))
  l = Math.min(100, Math.max(0, l))
  a = Math.min(1, Math.max(0, a))

  return {
    get h() {
      return h
    },
    get s() {
      return s
    },
    get l() {
      return l
    },
    get a() {
      return a
    },
    get value() {
      return { h, s, l, a }
    },
    set(newValues: Partial<HslaValues>) {
      return createHsla({
        h: newValues.h ?? h,
        s: newValues.s ?? s,
        l: newValues.l ?? l,
        a: newValues.a ?? a,
      })
    },
    adjust(adjustments: Partial<HslaValues>) {
      return createHsla({
        h: (h + (adjustments.h ?? 0)) % 360,
        s: Math.min(100, Math.max(0, s + (adjustments.s ?? 0))),
        l: Math.min(100, Math.max(0, l + (adjustments.l ?? 0))),
        a: Math.min(1, Math.max(0, a + (adjustments.a ?? 0))),
      })
    },
    shift(adjustment: number): HslaObject {
      const [r, g, b] = this.toRgbVector()
      const luminance =
        (0.299 * r) / 255 + (0.587 * g) / 255 + (0.114 * b) / 255
      if (luminance < 0.5) {
        return this.adjust({ l: adjustment })
      } else {
        return this.adjust({ l: -adjustment })
      }
    },
    toString() {
      return `hsla(${h}, ${s}%, ${l}%, ${a})`
    },
    toRgbVector(): [number, number, number] {
      let r: number, g: number, b: number
      const l2 = l / 100
      const s2 = s / 100
      if (s2 === 0) {
        r = g = b = l2 // achromatic
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1
          if (t > 1) t -= 1
          if (t < 1 / 6) return p + (q - p) * 6 * t
          if (t < 1 / 2) return q
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
          return p
        }
        const q = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2
        const p = 2 * l2 - q
        r = hue2rgb(p, q, h / 360 + 1 / 3)
        g = hue2rgb(p, q, h / 360)
        b = hue2rgb(p, q, h / 360 - 1 / 3)
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
    },
  }
}

/**
 * Parses an HSLA color string and creates an `HslaObject`.
 * @param hslaString - The HSLA color string to parse.
 * @returns A new `HslaObject` if the string is valid, otherwise `null`.
 */
export function fromStringHsla(hslaString: string): HslaObject | null {
  const regex = /hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*(\d*(?:\.\d+)?)\)/
  const match = hslaString.match(regex)
  if (!match) return null

  return createHsla({
    h: parseInt(match[1], 10),
    s: parseInt(match[2], 10),
    l: parseInt(match[3], 10),
    a: parseFloat(match[4]),
  })
}
