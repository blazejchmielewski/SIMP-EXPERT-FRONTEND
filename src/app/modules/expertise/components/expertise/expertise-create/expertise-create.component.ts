import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UnitType } from 'src/app/modules/core/models/attribute.model';
import { Attribute, AttributeType, Category, CreateAttributeType, CreateCategory, CreateExpertise, CreateSubCategory, Currency, ExpertiseBaseData, Subcategory, Units } from 'src/app/modules/core/models/expertise.model';
import { CreateAttibuteRequest, CreateAttibuteTypeRequest, CreateCategoryRequest, CreateExpertiseRequest, CreateSubCategoryRequest } from 'src/app/modules/core/models/forms.model';
import { AttributeService } from 'src/app/modules/core/services/attribute.service';
import { CategoryService } from 'src/app/modules/core/services/category.service';
import { ExpertiseService } from 'src/app/modules/core/services/expertise.service';
import { FinancialService } from 'src/app/modules/core/services/financial.service';
import { FormService } from 'src/app/modules/core/services/form.service';
import { UnitService } from 'src/app/modules/core/services/unit.service';

@Component({
  selector: 'app-expertise-create',
  templateUrl: './expertise-create.component.html',
  styleUrls: ['./expertise-create.component.scss']
})
export class ExpertiseCreateComponent implements OnInit {

  errorMsg:                 string          | null = '';
  subcategories:            Subcategory[]   | null = [];
  categories:               Category[]      | null = [];
  filteredSubcategories:    Subcategory[]   | null = [];
  attributes:               Attribute[]            = [];
  attributeTypes:           AttributeType[] | null = [];
  units:                    Units[]         | null = [];
  images:                   string[]               = [];
  filesToUpload:            File[]                 = [];
  expertiseFile!:           File;
  unitTypes:                UnitType[]             = [];
  unitsNames:               string                 = '';
  
  currencies:               Currency[]             = [];
  currency:                Currency                = {name: 'PLN', value: 1.00};

  initCreateExpertiseForm: FormGroup<CreateExpertiseRequest>      = this.formService.initCreateExpertise();
  initCreateCategory: FormGroup<CreateCategoryRequest>            = this.formService.initCreateCategory();
  initCreateSubCategory: FormGroup<CreateSubCategoryRequest>      = this.formService.initCreateSubCategory();
  initCreateAttribute: FormGroup<CreateAttibuteRequest>           = this.formService.initCreateAttribute();
  initCreateAttributeType: FormGroup<CreateAttibuteTypeRequest>   = this.formService.initCreateAttributeType();

  
  category: CreateCategory              | null = null;
  subCategory: CreateSubCategory        | null = null;
  attributeType: CreateAttributeType    | null = null;
  expertiseBaseData: ExpertiseBaseData  | null = null;

  isCategoryModalOpen           = false;
  isSubCategoryModalOpen        = false;
  isAttributeTypeModalOpen      = false;
  
  modalType: 'category' | 'subcategory' | 'attributeType' | 'expertiseFile' = 'category'; 

  firstPageOpen     = false;
  secondPageOpen    = false;
  thirdPageOpen     = false;
  fourthPageOpen    = true;
  fifthPageOpen     = false;
  
  isFirstPageValid    = false;
  isSecondPageValid   = false;
  isThirdPageValid    = false;
  isFourthPageValid   = true;
  isFifthPageValid    = false;

  constructor(
    private expertiseService: ExpertiseService,
    private attributeService: AttributeService,
    private categoryService: CategoryService,
    private unitService: UnitService,
    private formService: FormService,
    private financialService: FinancialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSubcategories();
    this.getCategories();
    this.getAttributeTypes();
    this.getUnitTypes();
    this.getCurrencies();
  }

// --------------- NAVIGATION ---------------
  moveForward(value: number){
    if(value === 1){
      this.firstPageOpen     = true;
      this.secondPageOpen    = false;
      this.thirdPageOpen     = false;
      this.fourthPageOpen    = false;
      this.fifthPageOpen     = false;
    } else if(value === 2 && this.isFirstPageValid){
      this.firstPageOpen     = false;
      this.secondPageOpen    = true;
      this.thirdPageOpen     = false;
      this.fourthPageOpen    = false;
      this.fifthPageOpen     = false;
    } else if(value === 3){
      this.isSecondPageValid = true;
      this.firstPageOpen     = false;
      this.secondPageOpen    = false;
      this.thirdPageOpen     = true;
      this.fourthPageOpen    = false;
      this.fifthPageOpen     = false;
    } else if(value === 4){
      this.isThirdPageValid  = true;
      this.firstPageOpen     = false;
      this.secondPageOpen    = false;
      this.thirdPageOpen     = false;
      this.fourthPageOpen    = true;
      this.fifthPageOpen     = false;
    } else if(value === 5){
      this.isFourthPageValid = true;
      this.firstPageOpen     = false;
      this.secondPageOpen    = false;
      this.thirdPageOpen     = false;
      this.fourthPageOpen    = false;
      this.fifthPageOpen     = true;
    }
  }

  resetErrorMsg(){
    this.errorMsg = null;
  }

// --------------- 1 ---------------
  
  expertiseGetBaseData() {
    this.errorMsg = '';

    if (this.initCreateExpertiseForm.valid) {
      const title             = this.initCreateExpertiseForm.getRawValue().title;
      const description       = this.initCreateExpertiseForm.getRawValue().description;
      const categoryName      = this.initCreateExpertiseForm.getRawValue().categoryName;
      const subCategoryName   = this.initCreateExpertiseForm.getRawValue().subCategoryName;
      
      this.expertiseBaseData = {
        title: title,
        description: description,
        categoryName: categoryName,
        subCategoryName: subCategoryName
      }

      this.isFirstPageValid = true;
      this.moveForward(2);
    } else {
      this.initCreateExpertiseForm.markAllAsTouched();
    }
  }

  getErrorMessage(control: FormControl): string{
    return this.formService.getErrorMessage(control);
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe({
      next: (resp) => {
        this.categories = resp;
      },
      error: (error) => {
        this.errorMsg = error;
      },
    });
  }

  addCategory(){
    if(this.initCreateCategory.valid){
      this.category = this.initCreateCategory.getRawValue();
      this.categoryService.createCategory(this.category).subscribe({
        next: ()=> {
          this.getCategories();
          this.closeCategoryModal();
        },
        error: (err)=> this.errorMsg = err
      })
    }
  }

  getSubcategories(){
    this.categoryService.getAllSubcategories().subscribe({
      next: (resp) => {
        this.subcategories = resp;
      },
      error: (error) => {
        this.errorMsg = error;
      },
    });
  }

  addSubCategory(){
    if(this.initCreateSubCategory){
      this.subCategory = this.initCreateSubCategory.getRawValue();
      this.categoryService.createSubCategory(this.subCategory).subscribe({
        next: (resp)=> {
          this.getSubcategories();
          this.closeCategoryModal();
        },
        error: (err)=> {
          this.errorMsg = err
        }
      })
    }
  }

  changeCategory(event: any): void {
    const selectedCategoryId = event.target.value;
    this.filteredSubcategories = this.subcategories?.filter(subcategory => subcategory.categoryId === Number(selectedCategoryId)) || [];
  }

  onAttributeTypeChange(event: any): void {
    const selectedAttributeTypeName = event.target.value;
    const name = String(selectedAttributeTypeName);
    this.getUnitsForAttributeType(name);
  }

  get controls() {
    return this.initCreateExpertiseForm.controls;
  }

  get categoryControls(){
    return this.initCreateCategory.controls;
  }

  get subCategoryControls(){
    return this.initCreateSubCategory.controls;
  }

// --------------- 2 ---------------
// Tworzenie nowego attribute_type

  addAttribute(): void{
    this.resetErrorMsg();
    const attribute: Attribute = this.initCreateAttribute.getRawValue();

    const isAttributeAlreadyAdded = !this.attributes.some(a => 
      a.attributeTypeName = attribute.attributeTypeName);

    if(isAttributeAlreadyAdded){
      this.attributeService.validateAttribute(attribute).subscribe({
        next: (resp) => {
          console.log(resp);
          if (resp.message === 'Valid') {
            const newAttribute: Attribute = {
              value: attribute.value.toUpperCase(),
              attributeTypeName: attribute.attributeTypeName,
              unitName: attribute.unitName
            };
            this.attributes.push(newAttribute);
            this.initCreateAttribute.reset();
            
          }
        },
        error: (err) => {
          this.errorMsg = err.message;
        }
      });
    }
    else{
      this.errorMsg = `Atrybut o nazwie '${attribute.attributeTypeName}' już został dodany`;
    }
  }

  addAttributeType(){
    if(this.initCreateAttributeType.valid){
      this.attributeType = this.initCreateAttributeType.getRawValue();

      this.attributeService.createAttributeType(this.attributeType).subscribe({
        next: (resp)=> {
          this.closeAttributeTypeModal();
          this.getAttributeTypes();
          this.errorMsg = null;
        },
        error: (err)=> this.errorMsg = err
      })
    }
  }

  removeAttribute(index: number): void {
    if (this.attributes && this.attributes.length > index) {
      this.attributes.splice(index, 1);
    }
  }

  changeUnitType(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.getUnitsNameByUnitType(target.value);
    }
  }

  getUnitsNameByUnitType(id: string) {
    this.unitService.getUnitsByType(id).subscribe({
      next: (resp) => {
        if(resp.message === ''){
          this.unitsNames = "brak jednostek"
        } else {
          this.unitsNames = resp.message;
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMsg = err.message;
      },
    });
  }

  getUnitTypes(){
    this.unitService.getAllUnits().subscribe({
      next: (resp)=> {
        this.unitTypes = resp;
      }, error: (err)=> {this.errorMsg = err}
    })
  }

  getUnitsForAttributeType(name: string){
    this.attributeService.getUnitsForAttributeType(name).subscribe({
      next: (resp)=> {this.units = resp
      }, error: (err)=> this.errorMsg = err
    })
  }

  getAttributeTypes(){
    this.attributeService.getAllAttributeTypes().subscribe({
      next:(resp)=>{
        this.attributeTypes = resp;
      },
      error: (err)=> {
        this.errorMsg = err
      }
    })
  }

  get attributeControls(){
    return this.initCreateAttribute.controls
  }

  get attributeTypeControls(){
    return this.initCreateAttributeType.controls;
  }

// --------------- 3 ---------------
  onFileSelected(event: any): void{
    const files = event.target.files;
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.images.push(e.target.result);
          };
          reader.readAsDataURL(file);
          this.filesToUpload.push(file);
        } else {
          this.errorMsg = 'Wybrano plik, który nie jest obrazem.';
        }
      }
    } else {
      this.errorMsg = 'Nie wybrano plików.';
    }
  }
  
  removeImage(index: number): void {
    if (this.images) {
      this.images.splice(index, 1);
    }
  }

  downloadImages(): void {
    if (this.images) {
      this.images.forEach((image, index) => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `image-${index + 1}.jpeg`;
        link.click();
      });
    }
  }

// --------------- 4 ---------------

getCurrencies(){
  this.financialService.getAllCurriencies().subscribe({
    next: (resp)=>{
      this.currencies = resp
    }, error: (err)=> this.errorMsg = err
  })
}

changeCurrency(event: any){
  const currencyName = event.target.value;
  this.financialService.getCurrencyByName(currencyName).subscribe({
    next: (resp)=> {this.currency = resp}, error: (err)=> this.errorMsg = err
  })
}

// --------------- 5 ---------------
onExpertiseFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    if (
      file.type === 'application/pdf' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword'
    ) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.expertiseFile = file
      };
      reader.readAsArrayBuffer(file);
    } else {
      this.errorMsg = 'Wybrano plik, który nie jest PDF ani Word.';
    }
  } else {
    this.errorMsg = 'Nie wybrano plików.';
  }
}

createExpertise(): void {
  if (this.expertiseBaseData && this.attributes) {
    const expertise: CreateExpertise = {
      title: this.expertiseBaseData.title,
      description: this.expertiseBaseData.description,
      valuation: 0,
      subCategoryName: this.expertiseBaseData.subCategoryName,
      attributes: this.attributes,
    };

    this.expertiseService.createExpertise(expertise, this.filesToUpload, this.expertiseFile).subscribe({
      next: (resp) => {
        this.router.navigate(['/expertise']);
      },
      error: (err) => {
        this.errorMsg = err.message;
      },
    });
  }
}

// ----- MODALS -----

  openCategoryModal() {
    this.modalType = 'category';
    this.isCategoryModalOpen = true;
    this.isSubCategoryModalOpen = false;
    this.isAttributeTypeModalOpen = false;
  }

  closeCategoryModal() {
    this.isSubCategoryModalOpen = false;
    this.isCategoryModalOpen = false;
    this.isAttributeTypeModalOpen = false;
  }

  openSubCategoryModal() {
    this.modalType = 'subcategory';
    this.isSubCategoryModalOpen = true;
    this.isCategoryModalOpen = false;
    this.isAttributeTypeModalOpen = false;
  }

  closeSubCategoryModal() {
    this.isSubCategoryModalOpen = false;
    this.isCategoryModalOpen = false;
    this.isAttributeTypeModalOpen = false;
  }

  openAttributeTypeModal() {
    this.modalType = 'attributeType';
    this.isAttributeTypeModalOpen = true
    this.isCategoryModalOpen = false;
    this.isSubCategoryModalOpen = false;
  }

  closeAttributeTypeModal() {
    this.isAttributeTypeModalOpen = false;
    this.isCategoryModalOpen = false;
    this.isSubCategoryModalOpen = false;
    this.errorMsg = null
  }
}