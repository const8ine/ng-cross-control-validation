# ng-cross-control-validation — Angular Cross-Control Validator

![logo.png](logo.png)

This package provides cross-control validator for your Angular project — when a control in your form depends on the other control's value.

Supports Angular 17 and above.

## Installation

```bash
npm install ng-cross-control-validation
```

## Usage

```typescript
import {
    crossControlValidator,
    crossControlEnabler,
} from 'angular-form-validators';
```

```typescript
const form = this.fb.group({
    description: ['', [Validators.required, maxCharacterValidator(500)]],
    notes: ['', [maxCharacterValidator(1000)]]
});
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

See **./examples**

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes. Please adhere to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) methodology
4. Push to the branch (`git push origin feature/you-feature`)
5. Open a Pull Request

## Local setup

```shell
npm i
```

### Example app
```shell
npm run start
```

```shell
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Package itself

```shell
cd projects/ng-cross-control-validation
npm i
npm run start
```
Read more in a correspondent documentation in **projects/ng-cross-control-validation/README.md**
