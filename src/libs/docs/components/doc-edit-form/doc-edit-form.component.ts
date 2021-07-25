import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromPairs } from 'lodash/fp';
import {
  Doc,
  DocForm,
  DocFormatted,
  DocFormField,
  DocLabel,
  OptItem,
} from '../../models';
import { docFormRFPassport } from './form-definitions/passport-rf';
import { unknownForm } from './form-definitions/unknown';
import { docFormRFPassportForeign } from './form-definitions/passport-foreign-rf';
import { docFormDriverLicenseRF } from './form-definitions/driver-license-rf';
import { snilsRFForm } from './form-definitions/snils-rf';

export interface UploadImageModalView {
  doc: Doc;
}

const docFormsHash = {
  passportRF: docFormRFPassport,
  passportForeignRF: docFormRFPassportForeign,
  driverLicenseRF: docFormDriverLicenseRF,
  snilsRF: snilsRFForm,
  unknown: unknownForm,
};

const createForm = (formBuilder: FormBuilder, doc: DocForm) => {
  const formGroupConfig = fromPairs(
    doc.fields.map((field) => [field.name, []])
  );

  const form = formBuilder.group(formGroupConfig);

  return form;
};

@Component({
  selector: 'app-doc-edit-form',
  templateUrl: 'doc-edit-form.component.html',
  styleUrls: ['doc-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocEditFormComponent implements OnInit {
  formGroup: FormGroup;
  docForm: DocForm;
  _docLabel: DocLabel;

  readonly monthShortNames = [
    'янв',
    'февр',
    'март',
    'апр',
    'май',
    'июнь',
    'июль',
    'авг',
    'сент',
    'окт',
    'нояб',
    'дек',
  ];

  @Input() set docLabel(val: DocLabel) {
    if (this._docLabel !== val) {
      this._docLabel = val;
      this.updateForm();
    }
  }
  get docLabel() {
    return this._docLabel;
  }
  @Input() docFormatted: DocFormatted;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.updateForm();
  }

  trackByField(_, field: DocFormField) {
    return field.name;
  }

  trackByOptItem(_, optItem: OptItem) {
    return optItem.key;
  }

  private updateForm() {
    switch (this.docLabel) {
      case 'passport-rf':
        this.docForm = docFormsHash.passportRF;
        break;
      case 'passport-foreign-rf':
        this.docForm = docFormsHash.passportForeignRF;
        break;
      case 'driver-license-rf':
        this.docForm = docFormsHash.driverLicenseRF;
        break;
      case 'snils-rf':
        this.docForm = docFormsHash.snilsRF;
        break;
      case 'unknown':
        this.docForm = docFormsHash.unknown;
        break;
      default:
        this.docForm = null;
    }
    if (!!this.docForm) {
      this.formGroup = createForm(this.fb, this.docForm);
      if (this.docFormatted) {
        this.formGroup.patchValue(this.docFormatted);
      }
    } else {
      this.docForm = null;
      this.formGroup = null;
    }
  }
}
