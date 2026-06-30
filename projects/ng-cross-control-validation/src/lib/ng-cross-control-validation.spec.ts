import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    crossControlValidator,
    crossControlEnabler,
} from './ng-cross-control-validation';

describe('Form Validators', () => {
    let fb: FormBuilder;

    beforeEach(() => {
        fb = new FormBuilder();
    });

    describe('crossControlValidator', () => {
        let form: FormGroup;

        beforeEach(() => {
            form = fb.group({
                grantType: ['', [Validators.required]],
                yearsToAnnualize: ['', [
                    crossControlValidator('grantType', (value) => value === 'Sign on awards')
                ]]
            });
        });

        it('should return error when target control not found', () => {
            const control = form.get('yearsToAnnualize');
            control?.setValue('5');
            expect(control?.errors).toEqual({
                controlNotFound: 'No control found with name grantType'
            });
        });

        it('should return null when condition is met', () => {
            const grantTypeControl = form.get('grantType');
            const yearsControl = form.get('yearsToAnnualize');
            
            grantTypeControl?.setValue('Sign on awards');
            yearsControl?.setValue('5');
            
            expect(yearsControl?.errors).toBeNull();
        });

        it('should return error when condition is not met', () => {
            const grantTypeControl = form.get('grantType');
            const yearsControl = form.get('yearsToAnnualize');
            
            grantTypeControl?.setValue('Promotion');
            yearsControl?.setValue('5');
            
            expect(yearsControl?.errors).toEqual({
                invalidTarget: 'Validation failed based on comparison function'
            });
        });
    });

    describe('crossControlEnabler', () => {
        let form: FormGroup;

        beforeEach(() => {
            form = fb.group({
                pensionRateAlignment: ['', [Validators.required]],
                pensionRateAlignmentPolicy: ['', [
                    crossControlEnabler('pensionRateAlignment', (value) => value === 'Yes')
                ]]
            });
        });

        it('should enable control when condition is met', () => {
            const alignmentControl = form.get('pensionRateAlignment');
            const policyControl = form.get('pensionRateAlignmentPolicy');
            
            alignmentControl?.setValue('Yes');
            
            expect(policyControl?.enabled).toBe(true);
        });

        it('should disable control when condition is not met', () => {
            const alignmentControl = form.get('pensionRateAlignment');
            const policyControl = form.get('pensionRateAlignmentPolicy');
            
            alignmentControl?.setValue('No');
            
            expect(policyControl?.enabled).toBe(false);
        });

        it('should return error when target control not found', () => {
            const policyControl = form.get('pensionRateAlignmentPolicy');
            policyControl?.setValue('Compulsory');
            
            expect(policyControl?.errors).toEqual({
                controlNotFound: 'No control found with name pensionRateAlignment'
            });
        });
    });
}); 
