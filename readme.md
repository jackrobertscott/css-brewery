# css-brewery

A utility package that simplifies the creation of CSS strings for various properties such as borders, gradients, shadows, and more with a focus on HSLA colors.

## Installation

Install the package with npm:

```bash
npm install css-brewery
```

Or with yarn:

```bash
yarn add css-brewery
```

## Usage

Import the necessary functions from the package:

```js
import { border, gradient, hsla, px, shadow } from 'css-brewery';
```

## API

The following is the API specifications of the `css-brewery` package.

## `createBorder` (alias: `border`)

Generates a `BorderObject` that represents CSS border properties and provides methods to manipulate these properties conveniently.

### Syntax

```javascript
const myBorder = createBorder(options); // border(options);
```

### Parameters

`options` is an optional object that can contain the following properties:

| Property | Type          | Default Value | Description                                                     |
|----------|---------------|---------------|-----------------------------------------------------------------|
| `width`  | `number`      | `1`           | The width of the border in pixels.                              |
| `style`  | `BorderStyle` | `"solid"`     | The style of the border, using predefined CSS border styles.    |
| `color`  | `HslaObject`  | `hsla(0, 0%, 0%, 1)` | The color of the border in HSLA format.                     |

`BorderStyle` is a string literal type that allows one of the following values: "solid", "dotted", "dashed", "double", "groove", "ridge", "inset", "outset", "none", "hidden".

### Return Value

The `createBorder` function returns a `BorderObject` that contains the following methods:

### `BorderObject` Methods

- `set(newValues: Partial<BorderValues>)`: Allows you to replace the current border values with new ones.

- `adjust(adjustments: Partial<BorderValues>)`: Allows you to adjust the current border values by specifying only what you want to change.

- `toString()`: Converts the border object into a CSS-compatible string.

### Examples

**Creating a solid blue border:**

```javascript
import { createBorder, createHsla } from 'css-brewery';

const blueBorder = createBorder({
  width: 5,
  style: 'solid',
  color: createHsla({ h: 240, s: 100, l: 50, a: 1 })
});

console.log(blueBorder.toString());
// Output: '5px solid hsla(240, 100%, 50%, 1)'
```

**Adjusting a border's color:**

```javascript
const myBorder = createBorder({ width: 2, style: 'dashed' });
const adjustedBorder = myBorder.adjust({
  color: createHsla({ h: 120, s: 75, l: 50, a: 0.8 })
});

console.log(adjustedBorder.toString());
// Output: '2px dashed hsla(120, 75%, 50%, 0.8)'
```

**Setting new border values:**

```javascript
const initialBorder = createBorder({ width: 1, style: 'solid' });
const newBorder = initialBorder.set({ width: 4, style: 'dotted' });

console.log(newBorder.toString());
// Output: '4px dotted'
```

The `createBorder` function streamlines the process of creating complex border styles and enables efficient updates to border properties, allowing for dynamic style changes in JavaScript-driven web applications.

## `createGradient` (alias: `gradient`)

Generates a `GradientObject` that represents CSS gradient properties and provides methods to manipulate these properties easily for creating complex gradient designs.

### Syntax

```javascript
const myGradient = createGradient(options); // gradient(options);
```

### Parameters

`options` is an optional object that can contain the following properties:

| Property   | Type                 | Default Value | Description                                      |
|------------|----------------------|---------------|--------------------------------------------------|
| `type`     | `GradientType`       | `"linear"`    | The type of gradient ("linear", "radial", "conic"). |
| `angle`    | `number`             | `0`           | The angle (in degrees) of the linear gradient.  |
| `repeating`| `boolean`            | `false`       | Whether the gradient is repeating.              |
| `sections` | `GradientSection[]`  | `[]`          | An array of gradient color stops and positions. |

#### `GradientType` Choices

- `"linear"`: Specifies a linear gradient.
- `"radial"`: Specifies a radial gradient.
- `"conic"`: Specifies a conic gradient.

#### `GradientSection` Object

Each `GradientSection` in the `sections` array can have the following properties:

| Property | Type          | Description                                    |
|----------|---------------|------------------------------------------------|
| `color`  | `HslaObject`  | The color of the gradient section in HSLA format. |
| `start`  | `number`      | Optional. The starting position as a percentage.|
| `end`    | `number`      | Optional. The ending position as a percentage.  |

### Return Value

The `createGradient` function returns a `GradientObject` with the following methods:

### `GradientObject` Methods

- `set(newValues: Partial<GradientValues>)`: Allows you to replace the current gradient values with new ones.

- `adjust(adjustments: Partial<GradientValues>)`: Allows you to adjust the current gradient values by specifying what you want to change.

- `toString()`: Converts the gradient object into a CSS-compatible string.

### Examples

**Creating a simple linear gradient:**

```javascript
import { createGradient, createHsla } from 'css-brewery';

const simpleGradient = createGradient({
  type: 'linear',
  angle: 45,
  sections: [
    { color: createHsla({ h: 0, s: 100, l: 50, a: 1 }), start: 0 },
    { color: createHsla({ h: 60, s: 100, l: 50, a: 1 }), end: 100 }
  ]
});

console.log(simpleGradient.toString());
// Output: 'linear-gradient(45deg, hsla(0, 100%, 50%, 1) 0%, hsla(60, 100%, 50%, 1) 100%)'
```

**Adjusting a gradient's angle:**

```javascript
const initialGradient = createGradient({
  type: 'linear',
  angle: 90,
  sections: [...]
});
const adjustedGradient = initialGradient.adjust({ angle: 180 });

console.log(adjustedGradient.toString());
// Output changes the angle of the gradient to 180 degrees.
```

**Creating a repeating radial gradient:**

```javascript
const repeatingRadialGradient = createGradient({
  type: 'radial',
  repeating: true,
  sections: [
    { color: createHsla({ h: 120, s: 100, l: 50, a: 0.8 }), start: 10 },
    { color: createHsla({ h: 240, s: 100, l: 50, a: 0.8 }), end: 20 }
  ]
});

console.log(repeatingRadialGradient.toString());
// Output: 'repeating-radial-gradient(circle at center, hsla(120, 100%, 50%, 0.8) 10%, hsla(240, 100%, 50%, 0.8) 20%)'
```

The `createGradient` function is designed to offer a powerful and flexible API for constructing CSS gradients, making it easier for developers to apply dynamic and creative gradient styles in their web projects.

## `createHsla` (alias: `hsla`)

Generates an `HslaObject` which represents an HSLA color value and provides methods for manipulating these color properties.

### Syntax

```javascript
const myColor = createHsla(options); // hsla(options);
```

### Parameters

`options` is an optional object with the following properties:

| Property | Type     | Default Value | Description                                            |
|----------|----------|---------------|--------------------------------------------------------|
| `h`      | `number` | `0`           | The hue of the color, defined within a range of 0-360. |
| `s`      | `number` | `0`           | The saturation of the color, as a percentage (0-100%).  |
| `l`      | `number` | `0`           | The lightness of the color, as a percentage (0-100%).   |
| `a`      | `number` | `1`           | The alpha channel (transparency), within a range of 0-1.|

### Return Value

The `createHsla` function returns an `HslaObject` with the following methods:

### `HslaObject` Methods

- `set(newValues: Partial<HslaValues>)`: Allows you to replace the current HSLA values with new ones.

- `adjust(adjustments: Partial<HslaValues>)`: Allows you to adjust the current HSLA values by specifying what you want to change.

- `shift(amount: number)`: Shifts the hue value by a given degree, positive or negative, looping around the color wheel.

- `toRgbVector()`: Converts the HSLA color to its RGB representation.

- `toString()`: Converts the HSLA object into a CSS-compatible string.

### Examples

**Creating a semi-transparent green:**

```javascript
import { createHsla } from 'css-brewery';

const greenColor = createHsla({ h: 120, s: 100, l: 50, a: 0.5 });

console.log(greenColor.toString());
// Output: 'hsla(120, 100%, 50%, 0.5)'
```

**Adjusting color properties:**

```javascript
const myColor = createHsla({ h: 60, s: 90, l: 50, a: 1 });
const adjustedColor = myColor.adjust({ s: -40, l: 10 });

console.log(adjustedColor.toString());
// Output: 'hsla(60, 50%, 60%, 1)'
```

**Shifting hue:**

```javascript
const baseColor = createHsla({ h: 200, s: 100, l: 50, a: 1 });
const shiftedColor = baseColor.shift(60);

console.log(shiftedColor.toString());
// Output: 'hsla(260, 100%, 50%, 1)'
```

**Converting HSLA to RGB:**

```javascript
const myHslaColor = createHsla({ h: 300, s: 75, l: 50, a: 0.8 });
const [r, g, b] = myHslaColor.toRgbVector();

console.log(`rgb(${r}, ${g}, ${b})`);
// Possible Output: 'rgb(191, 64, 191)'
```

The `createHsla` function and the associated `HslaObject` provide a powerful interface for dealing with HSLA colors, enabling developers to programmatically adjust colors and apply them in CSS.

## `createPixelString` (alias: `px`)

Converts one or more numeric values into a pixel-based string representation, suitable for use in CSS.

### Syntax

```javascript
const pixels = createPixelString(...pixelValues); // px(...pixelValues);
```

### Parameters

`...pixelValues`: A series of numeric arguments that represent pixel values. Each number in the series will be converted to a pixel string.

| Argument      | Type     | Description                                           |
|---------------|----------|-------------------------------------------------------|
| `pixelValues` | `number` | A series of numbers that represent values in pixels.  |

### Return Value

Returns a string with each number suffixed by "px". When multiple numbers are provided, they are separated by a space.

### Examples

**Single pixel value:**

```javascript
import { createPixelString } from 'css-brewery';

const singlePixelValue = createPixelString(10);
console.log(singlePixelValue);
// Output: '10px'
```

**Multiple pixel values:**

Useful for CSS properties that require multiple values like padding, margin, border-radius, etc.

```javascript
const multiplePixelValues = createPixelString(5, 10, 15, 20);
console.log(multiplePixelValues);
// Output: '5px 10px 15px 20px'
```

## `createShadow` (alias: `shadow`)

Creates a `ShadowObject` representing CSS box-shadow and text-shadow properties with methods for convenient manipulation.

### Syntax

```javascript
const myShadow = createShadow(options); // shadow(options);
```

### Parameters

`options` is an optional object with the following properties:

| Property  | Type        | Default Value    | Description                                                  |
|-----------|-------------|------------------|--------------------------------------------------------------|
| `x`       | `number`    | `0`              | The horizontal offset of the shadow, in pixels.              |
| `y`       | `number`    | `0`              | The vertical offset of the shadow, in pixels.                |
| `blur`    | `number`    | `0`              | The blur radius of the shadow, in pixels.                    |
| `spread`  | `number`    | `0`              | The spread radius of the shadow, in pixels.                  |
| `color`   | `HslaObject`| `hsla(0, 0%, 0%, 0.5)` | The color of the shadow in HSLA format.              |
| `inset`   | `boolean`   | `false`          | Whether the shadow is an inset or an outer shadow.           |

### Return Value

The `createShadow` function returns a `ShadowObject` that contains the following methods:

### `ShadowObject` Methods

- `set(newValues: Partial<ShadowValues>)`: Overrides the current shadow properties with new ones.

- `adjust(adjustments: Partial<ShadowValues>)`: Modifies the existing shadow properties selectively based on what you want to change.

- `toString()`: Generates a CSS-compatible string that represents the shadow, ready to be applied in styles.

### Examples

**Creating a basic drop shadow:**

```javascript
import { createShadow, createHsla } from 'css-brewery';

const basicShadow = createShadow({
  x: 2,
  y: 2,
  blur: 4,
  color: createHsla({ h: 0, s: 0, l: 0, a: 0.5 })
});

console.log(basicShadow.toString());
// Output: '2px 2px 4px hsla(0, 0%, 0%, 0.5)'
```

**Adjusting shadow blur and opacity:**

```javascript
const initialShadow = createShadow({ x: 5, y: 5 });
const blurredShadow = initialShadow.adjust({
  blur: 10,
  color: createHsla({ h: 0, s: 0, l: 0, a: 0.3 })
});

console.log(blurredShadow.toString());
// Output: '5px 5px 10px hsla(0, 0%, 0%, 0.3)'
```

**Creating an inset shadow:**

```javascript
const insetShadow = createShadow({
  x: 1,
  y: 1,
  blur: 2,
  spread: 1,
  color: createHsla({ h: 210, s: 100, l: 50, a: 0.7 }),
  inset: true
});

console.log(insetShadow.toString());
// Output: 'inset 1px 1px 2px 1px hsla(210, 100%, 50%, 0.7)'
```

**Setting new shadow values:**

```javascript
const myShadow = createShadow();
const newShadow = myShadow.set({ x: 0, y: 8, blur: 16, color: createHsla({ h: 0, s: 0, l: 0, a: 0.6 }) });

console.log(newShadow.toString());
// Output: '0px 8px 16px hsla(0, 0%, 0%, 0.6)'
```

The `createShadow` function provides a robust interface for creating and manipulating shadow effects in a structured and readable format, offering enhanced control over the visual depth and emphasis of elements in web design.

## Contributing

Contributions are always welcome!

## License

Distributed under the MIT License.
