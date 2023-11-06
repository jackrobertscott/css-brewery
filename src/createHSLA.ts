export interface HSLAObject {
  readonly h: number
  readonly s: number
  readonly l: number
  readonly a: number
  readonly value: HSLAValues
  set: (newValues: Partial<HSLAValues>) => HSLAObject
  adjust: (adjustments: Partial<HSLAValues>) => HSLAObject
  shift: (adjustment: number) => HSLAObject
  toRgb: () => [number, number, number]
  toString: () => string
}

export type HSLAValues = {
  h: number
  s: number
  l: number
  a: number
}

export function createHSLA({
  h = 0,
  s = 0,
  l = 0,
  a = 1,
}: Partial<HSLAValues> = {}): HSLAObject {
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
    set(newValues: Partial<HSLAValues>) {
      return createHSLA({
        h: newValues.h ?? h,
        s: newValues.s ?? s,
        l: newValues.l ?? l,
        a: newValues.a ?? a,
      })
    },
    adjust(adjustments: Partial<HSLAValues>) {
      return createHSLA({
        h: (h + (adjustments.h ?? 0)) % 360,
        s: Math.min(100, Math.max(0, s + (adjustments.s ?? 0))),
        l: Math.min(100, Math.max(0, l + (adjustments.l ?? 0))),
        a: Math.min(1, Math.max(0, a + (adjustments.a ?? 0))),
      })
    },
    shift(adjustment: number): HSLAObject {
      const [r, g, b] = this.toRgb()
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
    toRgb(): [number, number, number] {
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

export function fromStringHSLA(hslaString: string): HSLAObject | null {
  const regex = /hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*(\d*(?:\.\d+)?)\)/
  const match = hslaString.match(regex)
  if (!match) return null

  return createHSLA({
    h: parseInt(match[1], 10),
    s: parseInt(match[2], 10),
    l: parseInt(match[3], 10),
    a: parseFloat(match[4]),
  })
}
