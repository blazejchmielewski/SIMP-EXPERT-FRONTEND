import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AttributeType, Category, CreateCategory, CreateSubCategory, ExpertiseWithImage, Subcategory } from 'src/app/modules/core/models/expertise.model';
import { CreateAttibuteTypeRequest, CreateCategoryRequest, CreateSubCategoryRequest } from 'src/app/modules/core/models/forms.model';
import { AttributeService } from 'src/app/modules/core/services/attribute.service';
import { CategoryService } from 'src/app/modules/core/services/category.service';
import { ExpertiseService } from 'src/app/modules/core/services/expertise.service';
import { FormService } from 'src/app/modules/core/services/form.service';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss']
})
export class ExpertiseComponent implements OnInit {

  expertises: ExpertiseWithImage[] = [];
  errorMsg: string | null = '';

  category: CreateCategory              | null = null;
  subCategory: CreateSubCategory        | null = null;
  categories: Category[]                | null = [];
  subcategories: Subcategory[]          | null = [];
  attributeTypes: AttributeType[]       | null = [];
  
  modalType: 'category' | 'subcategory' | 'attributeType' = 'category'; 

  initCreateCategory: FormGroup<CreateCategoryRequest> = this.formService.initCreateCategory();
  initCreateSubcategory: FormGroup<CreateSubCategoryRequest> = this.formService.initCreateSubCategory();
  initCreateAttributeType: FormGroup<CreateAttibuteTypeRequest> = this.formService.initCreateAttributeType();

  constructor(
    private router: Router
    , private expertiseService: ExpertiseService
    , private formService: FormService
    , private categoryService: CategoryService
    , private attributeService: AttributeService
  ) {}

  ngOnInit(): void {
    this.expertiseService.getExpertiseByUser().subscribe({
      next: (resp)=> {
        this.expertises = resp;
        this.getSubcategories();
        this.getCategories();
        this.getAttributeTypes();
      }, error: (err)=> {console.log(err)}
    })
  }
  
  // ---------- CREATE ----------
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

  addSubCategory(){
    if(this.initCreateSubcategory){
      this.subCategory = this.initCreateSubcategory.getRawValue();
      this.categoryService.createSubCategory(this.subCategory).subscribe({
        next: (resp)=> {
          console.log(resp)
          this.getSubcategories();
          this.closeCategoryModal();
        },
        error: (err)=> {
          console.log(err);
          this.errorMsg = err
        }
      })
    }
  }

  addAttribute(){

  }

// ---------- CREATE SUPPORT METHODS ----------
  filteredSubcategories:    Subcategory[]   | null = [];

  changeCategory(event: any): void {
    const selectedCategoryId = event.target.value;
    this.filteredSubcategories = this.subcategories?.filter(subcategory => subcategory.categoryId === Number(selectedCategoryId)) || [];
  }

  // ---------- NAVIGATION ----------
  navigateToCreate() {
    this.router.navigate(['/expertise/create']);
  };

  navigateToDetails(uuid: string) {
    this.router.navigate(['/expertise/details/' + uuid]);
  }

  // ---------- GETTERS ----------
  get categoryControls(){
    return this.initCreateCategory.controls;
  }
  get subCategoryControls(){
    return this.initCreateSubcategory.controls;
  }
  get attributeTypeControls(){
    return this.initCreateAttributeType.controls;
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

  getAttributeTypes(){
    this.attributeService.getAllAttributeTypes().subscribe({
      next:(resp)=>{
        this.attributeTypes = resp;
      },
      error: (err)=> {
        console.log(err);
        this.errorMsg = err
      }
    })
  }

  // ---------- MODALS ----------
  isCategoryModalOpen: boolean = false;
  isSubCategoryModalOpen: boolean = false;
  isAttributeTypeModalOpen: boolean = false;

  openCategoryModal(){
    this.isCategoryModalOpen = true;
  }
  openSubCategoryModal(){
    this.isSubCategoryModalOpen = true;
  }
  openAttributeTypeModal(){
    this.isAttributeTypeModalOpen = true;
  }

  closeCategoryModal(){
    this.isCategoryModalOpen = false;
    this.isSubCategoryModalOpen = false;
    this.isAttributeTypeModalOpen = false;
  }
  closeSubCategoryModal(){
    this.isCategoryModalOpen = false;
    this.isSubCategoryModalOpen = false;
    this.isAttributeTypeModalOpen = false;
  }
  closeAttributeTypeModal(){
    this.isCategoryModalOpen = false;
    this.isSubCategoryModalOpen = false;
    this.isAttributeTypeModalOpen = false;
  }
}
