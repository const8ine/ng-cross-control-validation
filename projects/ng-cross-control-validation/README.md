# ng-cross-control-validation — Angular Cross-Control Validator

```shell
npm i ng-cross-control-validation
```

This package provides cross-control validator for your Angular project — when a control in your form depends on the other control's value.

Supports Angular 17 and above.

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
