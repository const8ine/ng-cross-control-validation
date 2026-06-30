# ng-cross-control-validation — Angular Cross-Control Validator

![NPM Version](https://img.shields.io/npm/v/ng-cross-control-validation) ![Static Badge](https://img.shields.io/badge/angular%20package-red) ![NPM License](https://img.shields.io/npm/l/ng-cross-control-validation)

A lightweight and flexible cross-field validation library for Angular Reactive Forms. Easily handle advanced validation scenarios where one form control's state or validity depends directly on the value of another.

```bash
npm install ng-cross-control-validation
```

* ⚡️ **Reactive**: Automatically re-evaluates when dependent controls change.
* 📦 **Lightweight**: Zero external dependencies (only Angular peer dependencies).
* ⚙️ **Modern**: Full support for Angular 17 and above (including standalone components).


## Usage

```typescript
import {
  crossControlValidator,
  crossControlEnabler,
} from 'ng-cross-control-validation';
```

### crossControlValidator
Creates a cross-field validator that validates one control based on the value of another control.

```typescript
const form = this.fb.group({
  subscriptionType: ['', Validators.required],
  discountCode: [
    '',
    [crossControlValidator('subscriptionType', (type: string) => type === 'premium')]
  ]
});
```

### crossControlEnabler
Dynamically enables or disables a form control based on a specific value of another control.

```typescript
const form = this.fb.group({
  feesRateAlignment: ['', [Validators.required]],
  feesRateAlignmentPolicy: ['', [
    crossControlEnabler('feesRateAlignment', (value) => value === 'default')
  ]]
});
```

## Examples

Explore the [Example App](https://github.com/const8ine/ng-cross-control-validation) for full implementation use-cases.
