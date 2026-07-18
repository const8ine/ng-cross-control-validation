# ng-cross-control-validation — Angular Cross-Control Validator

A lightweight and flexible cross-field validation library for Angular Reactive Forms. Easily handle advanced validation scenarios where one form control's state or validity depends directly on the value of another.

![NPM Version](https://img.shields.io/npm/v/ng-cross-control-validation) ![Static Badge](https://img.shields.io/badge/angular%20package-red) ![NPM License](https://img.shields.io/npm/l/ng-cross-control-validation) ![NPM Downloads](https://img.shields.io/npm/dm/ng-cross-control-validation)

<img src="logo.png" alt="logo" width="300px" height="auto" />

## Installation

```bash
npm install ng-cross-control-validation
```

### Features
* ⚡️ **Reactive**: Automatically re-evaluates when dependent controls change.
* 📦 **Lightweight**: Zero external dependencies (only Angular peer dependencies and tslib).
* ⚙️ **Modern**: Supports Angular 17 and above.


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

Run the example app to see a live demo.

## Local Development Setup

Clone the repository and install the dependencies:

```shell
npm i
```

### Run Example Application

```shell
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Build the Package

```shell
cd projects/ng-cross-control-validation
npm i
ng build ng-cross-control-validation
```
The compiled output will be generated in the `./dist/ng-cross-control-validation` folder.

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes. Please adhere to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) methodology
4. Push to the branch (`git push origin feature/you-feature`)
5. Open a Pull Request

