import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';

/**
 * Factory function to create a cross-field validator function.
 * @param targetControlName Name of the target control to validate against.
 * @param compareFunction A function that takes the value of the target control and returns a boolean indicating if the validation passes or fails.
 * @returns A ValidatorFn that performs the validation.
 */
export const crossControlValidator = (
    targetControlName: string,
    compareFunction: (targetControlValue: any) => boolean
): ValidatorFn => {
    let subscription: Subscription | null = null;

    return (control: AbstractControl): ValidationErrors | null => {
        // Clean up previous subscription
        subscription?.unsubscribe();

        if (control.parent) {
            const targetControl = control.parent.get(targetControlName);
            if (!targetControl) {
                return {
                    controlNotFound: `No control found with a name ${targetControlName}`,
                };
            }

            subscription = targetControl.valueChanges.subscribe(() => {
                // When target control value changes, re-validate the original control
                control.updateValueAndValidity();
            });

            // Perform validation
            const isValid = compareFunction(targetControl.value);
            if (!isValid) {
                return {
                    invalidTarget: 'Validation failed based on the comparison function',
                };
            }
        }

        return null;
    };
};

/**
 * Factory function to create a field validator function that dynamically enables or disables a form control based on the value of another control.
 * @param targetControlName The name of the target control whose value is used for comparison.
 * @param compareFunction A function that takes the value of the target control and returns a boolean indicating whether the control should be enabled or disabled.
 * @returns A ValidatorFn that performs the dynamic enabling or disabling of the form control.
 */
export const crossControlEnabler = (
    targetControlName: string,
    compareFunction: (targetControlValue: any) => boolean
): ValidatorFn => {
    let subscription: Subscription | null = null;
    let previousDisabledState: boolean | null = null;
    const subject$ = new Subject<void>();

    return (control: AbstractControl): ValidationErrors | null => {
        if (control.parent) {
            const targetControl = control.parent.get(targetControlName);
            if (!targetControl) {
                return {
                    controlNotFound: `No control found with a name ${targetControlName}`,
                };
            }

            const updateDisabledState = () => {
                const isDisabled = !compareFunction(targetControl.value);
                if (isDisabled !== previousDisabledState) {
                    previousDisabledState = isDisabled;
                    if (isDisabled) {
                        control.disable({emitEvent: false});
                    } else {
                        control.enable({emitEvent: false});
                    }
                }
            };

            subscription?.unsubscribe(); // Clean up previous subscription
            subscription = targetControl.valueChanges.pipe(takeUntil(subject$)).subscribe(() => {
                updateDisabledState();
            });

            updateDisabledState(); // Set initial state
        }

        return null;
    };
};
