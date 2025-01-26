<style scoped>
.image-preview-wrapper {
    height: 250px;
    overflow-y: scroll;
    padding: 25px;
}

.dot {
    list-style: disc;
    /* Menggunakan simbol titik */
    padding-left: 20px;
    /* Menambahkan padding agar terlihat lebih rapi */
}
</style>

<template>
    <div class="main-content">
        <section class="section">
            <div class="section-header">
                <h1>Product</h1>
                <div class="section-header-button">
                    <button href="features-post-create.html" class="btn btn-primary" @click="addProduct()">
                        Add New Product
                    </button>
                </div>
                <div class="section-header-breadcrumb">
                    <div class="breadcrumb-item active">
                        <a href="#">Dashboard</a>
                    </div>
                    <div class="breadcrumb-item"><a href="#">Product</a></div>
                </div>
            </div>
            <div class="section-body">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <p class="section-lead">
                        You can manage all products in here such as add, edit, or remove them.
                    </p>
                    <div id="myAlert" class="alert alert-dismissible fade d-none">
                        <div class="alert-body">
                            <button class="close" data-dismiss="alert">
                                <span>&times;</span>
                            </button>
                            <span style="padding-right: 25px;">
                                {{ alertMessageContent }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-0">
                            <div class="card-body">
                                <ul class="nav nav-pills">
                                    <li class="nav-item">
                                        <a class="nav-link active" href="#">All Products
                                            <span class="badge badge-white">{{ totalDatas }}</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header d-flex justify-content-start">
                                <ul class="nav nav-tabs" id="myTab2" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab2" data-toggle="tab" href="#home2" role="tab"
                                            aria-controls="home" aria-selected="true" @click="changeTab(0)">All</a>
                                    </li>
                                    <li class="nav-item" v-for="(category, index) in categories" :key="category.id"
                                        :value="category.id">
                                        <a class="nav-link" id="profile-tab2" data-toggle="tab" href="#profile2" role="tab"
                                            aria-controls="profile" aria-selected="false" @click="changeTab(category.id)">{{ category.name }}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="float-left">
                                    <button v-if="checkedProducts.length > 0" @click="deleteProductModal"
                                        class="btn btn-danger btn-sm mt-1">
                                        Delete
                                    </button>
                                </div>
                                <div class="float-right">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Search" v-model="searchInput"
                                            @keyup.enter="actionSearch">
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" @click="actionSearch"><i
                                                    class="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix mb-3"></div>
                                <div class="table-responsive mb-4">
                                    <table class="table table-striped">
                                        <tr>
                                            <th class="text-center pt-2">
                                                <div class="custom-checkbox custom-checkbox-table custom-control">
                                                    <input type="checkbox" class="custom-control-input" id="checkbox-all"
                                                        v-model="isCheckAll" />
                                                    <label for="checkbox-all" class="custom-control-label">&nbsp;</label>
                                                </div>
                                            </th>
                                            <th>No</th>
                                            <th class="d-flex align-items-center justify-content-center">
                                                <div class="d-flex align-items-center justify-content-center cursor-pointer sorting"
                                                    id="products.name">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Name
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center justify-content-center cursor-pointer sorting"
                                                    id="categories.name">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Category
                                                </div>
                                            </th>
                                            <th>
                                                <div
                                                    class="d-flex align-items-center justify-content-center cursor-pointer">
                                                    Description
                                                </div>
                                            </th>
                                            <th>
                                                <div
                                                    class="d-flex align-items-center justify-content-center cursor-pointer">
                                                    Images
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center justify-content-center cursor-pointer sorting"
                                                    id="products.price">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Price
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center justify-content-center cursor-pointer sorting"
                                                    id="products.stock">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Stock
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center justify-content-center cursor-pointer sorting"
                                                    id="products.updated_at">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Updated At
                                                </div>
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                        <!-- Mengubah object ke array menggunakan Object.values() -->
                                        <tr v-for="(
                                                product, index
                                            ) in Object.values(products)" :key="product.id">
                                            <td>
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" class="custom-control-input"
                                                        :id="'checkbox-' + product.id" :value="product.id"
                                                        v-model="checkedProducts" @click="selectOne(product.id)" />
                                                    <label :for="'checkbox-' + product.id"
                                                        class="custom-control-label">&nbsp;</label>
                                                </div>
                                            </td>
                                            <td>{{ (selectedPage - 1) * dataPerPages + index + 1 }}</td>
                                            <td>{{ product.name }}</td>
                                            <td>
                                                {{
                                                    product.category?.name ||
                                                    "-"
                                                }}
                                            </td>
                                            <td>
                                                <button @click="
                                                showProductDescription(
                                                    product.description
                                                )
                                                    " class="btn btn-warning btn-sm">
                                                    <i class="fa-regular fa-rectangle-list"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <button v-if="product.images" @click="
                                                    showProductImages(
                                                        product.images
                                                    )
                                                    " class="btn btn-warning btn-sm">
                                                    <i class="fa-solid fa-images"></i>
                                                </button>
                                            </td>
                                            <td>{{ formatRupiah(product.price) }}</td>
                                            <td>{{ product.stock }}</td>
                                            <td>{{ formatDate(product.updated_at) }}</td>
                                            <td>
                                                <div
                                                    class="d-flex flex-column align-items-start justify-content-center p-2">
                                                    <button @click="
                                                        editProduct(product)
                                                        " class="btn btn-warning btn-sm mt-1">
                                                        <i class="fa-regular fa-pen-to-square"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="row align-items-center">
                                    <!-- Dropdown dan teks -->
                                    <div class="col-12 col-md-6 d-flex align-items-center mb-2 justify-content-between">
                                        <select class="form-control selectric w-auto me-2" name="per_page"
                                            id="selectPerPage">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                        <span class="text-start ps-3">Showing {{ showingRange.start }} - {{ showingRange.end
                                        }}
                                            of {{ totalDatas }}</span>
                                    </div>
                                    <!-- Pagination -->
                                    <div class="col-12 col-md-6 text-md-end">
                                        <nav>
                                            <ul class="pagination justify-content-center justify-content-md-end mb-0">
                                                <!-- Tombol Previous -->
                                                <li class="page-item"
                                                    @click.prevent="selectedPage > 1 && updatePage(selectedPage - 1)"
                                                    :class="{ disabled: selectedPage === 1 }">
                                                    <span class="page-link" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                        <span class="sr-only">Previous</span>
                                                    </span>
                                                </li>

                                                <!-- Tombol halaman -->
                                                <li v-for="i in totalPages" :key="i" :class="{ active: selectedPage === i }"
                                                    class="page-item" @click.prevent="updatePage(i)">
                                                    <span class="page-link">{{ i }}</span>
                                                </li>

                                                <!-- Tombol Next -->
                                                <li class="page-item"
                                                    @click.prevent="selectedPage < totalPages && updatePage(selectedPage + 1)"
                                                    :class="{ disabled: selectedPage === totalPages }">
                                                    <span class="page-link" aria-label="Next">
                                                        <span aria-hidden="true">&raquo;</span>
                                                        <span class="sr-only">Next</span>
                                                    </span>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="addProductModal">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="submitProduct">
                    <div class="modal-body d-flex flex-column align-items-start justify-content-center">
                        <div class="row d-flex align-items-center justify-content-around w-100 mb-3">
                            <!-- Input Upload Gambar -->
                            <div class="form-group row mb-4 col-5 d-flex flex-column">
                                <div class="col-sm-12 col-md-7">
                                    <div class="image-preview">
                                        <label for="image-upload" class="cursor-pointer" id="image-label">
                                            Pilih Gambar &nbsp;
                                            <i class="fa-solid fa-image"></i>
                                        </label>
                                        <input type="file" id="image-upload" @change="previewImage" multiple />
                                    </div>
                                </div>
                                <span v-if="errors.images" class="error text-center">{{ errors.images }}</span>
                            </div>

                            <!-- Preview Gambar dengan Drag & Drop -->
                            <div class="form-group border row mb-4 col-5 image-preview-wrapper">
                                <Draggable v-model="images" group="images" item-key="id" class="image-preview-container"
                                    @end="onDragEnd">
                                    <template #item="{ element }">
                                        <div class="image-preview-item">
                                            <img :src="element.src" alt="Preview Image" />
                                            <div class="d-flex align-items-center justify-content-between">
                                                <p class="image-position">
                                                    Image Position:
                                                    {{ element.position }}
                                                </p>
                                                <i class="fa-solid fa-trash text-danger cursor-pointer" @click="
                                                    handleImageRemover(
                                                        element.id, element.file
                                                    )
                                                    "></i>
                                            </div>
                                        </div>
                                    </template>
                                </Draggable>
                            </div>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="product_name" class="form-label">Product Name</label>
                            <input class="form-control" v-model="form.productName" name="product_name" type="text"
                                placeholder="Product Name" />
                            <span v-if="errors.name" class="error">{{
                                errors.name
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="product_category" class="form-label">Category</label>
                            <select class="form-control selectric" name="product_category" id="product_category">
                                <option disabled selected value="">
                                    Choose one
                                </option>
                                <option v-for="(category, index) in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                            <span v-if="errors.category" class="error">{{
                                errors.category
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="product_price" class="form-label">Price</label>
                            <input class="form-control" v-model="form.productPrice" name="product_price" type="text"
                                placeholder="Rp 15.000" @input="formatRupiahByEvent" />
                            <span v-if="errors.price" class="error">{{
                                errors.price
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="product_stock" class="form-label">Stock</label>
                            <input class="form-control" v-model="form.productStock" name="product_stock" type="number"
                                placeholder="100" />
                            <span v-if="errors.stock" class="error">{{
                                errors.stock
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="product_desc" class="form-label">Description</label>
                            <div id="ckeditor_description" class="p-3" name="product_desc"></div>
                            <textarea type="text" id="ckeditor_description_input" hidden></textarea>
                            <span v-if="errors.desc" class="error">{{
                                errors.desc
                            }}</span>
                        </div>
                    </div>
                    <div class="modal-footer bg-whitesmoke br">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                            Close
                        </button>
                        <button type="submit" class="btn btn-primary" id="add-button">
                            {{ modalTitle }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="showProductImages">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Show All Product Images</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body d-flex flex-column align-items-center justify-content-center">
                    <!-- Menampilkan gambar jika ada -->
                    <div v-if="selectedImages.length > 0" class="w-100">
                        <div v-for="image in selectedImages" :key="image.id"
                            class="d-flex flex-column align-items-center border rounded p-2 my-2">
                            <img :src="`${api_url}/image/${image.file_name}`" :alt="image.file_name" width="100%"
                                style="padding: 10px" />
                            <span class="border rounded-sm bg-primary text-white p-2">Image Position : {{ image.position
                            }}</span>
                        </div>
                    </div>
                    <span v-else>This Product Has No Image</span>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="showProductDescription">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Product Description</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body d-flex flex-column align-items-start justify-content-center">
                    <span v-html="selectedDescription">
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade modal-loading" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered d-flex align-items-center justify-content-center">
            <div class="spinner-border text-danger" role="status"></div>
        </div>
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="deleteConfirmationModal">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="submitProduct">
                    <div class="modal-body d-flex flex-column align-items-start justify-content-center">
                        <span class="mb-3">Do you want to delete permanently these product below?</span>
                        <ul class="dot">
                            <li v-for="itemSelected in checkedProducts" :key="itemSelected">
                                {{ findProductById(itemSelected)?.name || 'Product Not Found' }}
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer bg-whitesmoke br">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                            No
                        </button>
                        <button type="submit" class="btn btn-primary" id="add-button">
                            Yes Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed, watch } from "vue";
import Draggable from "vuedraggable";
const base_url = window.location.origin;

const api_url = "http://localhost:8010/api";

const products = ref([]);

// State untuk Menyimpan Gambar
const images = ref([]);

const modalTitle = ref("Add Product");

const selectedPage = ref(1);
const totalPages = ref(0);
const totalDatas = ref(0);
const dataPerPages = ref(5);
const selectedColumnSorting = ref('');
const sortBy = ref('');
const searchInput = ref('');
const selectedCategoryTab = ref(0); // default 0 = all products

const changeTab = (categoryId) => {
    selectedPage.value = 1
    selectedCategoryTab.value = categoryId
    getAllProduct();
}

const updatePage = (pageSelected) => {
    if (pageSelected == 0) {
        selectedPage.value = 1;
    } else if (pageSelected > totalPages.value) {
        selectedPage.value = totalPages.value;
    } else {
        selectedPage.value = pageSelected;
    }
    getAllProduct();
}

const actionSearch = () => {
    selectedPage.value = 1; getAllProduct();
}

const previewImage = (event, imagesEdit = null) => {
    // Jika imageUrl diberikan, tambahkan gambar langsung dari URL
    if (imagesEdit) {
        for (let i = 0; i < imagesEdit.length; i++) {
            images.value.push({
                id: imagesEdit[i].id, // ID unik untuk gambar
                src: api_url + "/image/" + imagesEdit[i].file_name, // URL gambar
                position: imagesEdit[i].position,
                name: imagesEdit[i].file_name, // Atau bisa disesuaikan
            });
        }
    } else {
        // Jika file dipilih, lakukan preview seperti biasa
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                images.value.push({
                    id: Date.now() + i, // ID unik untuk setiap gambar
                    src: e.target.result, // Untuk preview gambar
                    file: file, // Simpan file asli untuk dikirim ke server
                    position: images.value.length + 1,
                    name: file.name,
                });
            };
            reader.readAsDataURL(file);
        }
        event.target.value = null; // Reset input file setelah selesai
    }
};

$(document).ready(function () {
    $('#selectPerPage').selectric(); // Inisialisasi Selectric
    $('#selectPerPage').on('change', function () {
        var selectedValue = $(this).val();
        dataPerPages.value = selectedValue;
        selectedPage.value = 1;
        getAllProduct();
    });

    $('.sorting').on('click', function () {
        const icon = $(this).find('i'); // Cari elemen <i> di dalam elemen yang diklik
        if (icon.hasClass('fa-arrow-up-wide-short')) {
            icon.removeClass('fa-arrow-up-wide-short').addClass('fa-arrow-down-wide-short');
            selectedColumnSorting.value = $(this).attr('id');
            sortBy.value = 'asc';
            getAllProduct()
        } else {
            icon.removeClass('fa-arrow-down-wide-short').addClass('fa-arrow-up-wide-short');
            selectedColumnSorting.value = $(this).attr('id');
            sortBy.value = 'desc';
            getAllProduct()
        }
    });

    // Menampilkan alert
    $("#showAlert").click(function () {
        $("#myAlert").removeClass("d-none").addClass("show");
    });

    // Menyembunyikan alert
    $("#hideAlert").click(function () {
        $("#myAlert").addClass("d-none").removeClass("show");
    });

    // Mencegah penghapusan elemen alert dari DOM saat tombol close ditekan
    $("#myAlert").on("close.bs.alert", function (e) {
        e.preventDefault(); // Mencegah perilaku default (penghapusan elemen)
        $(this).addClass("d-none").removeClass("show");
    });
});

// Event Setelah Drag & Drop
const onDragEnd = () => {
    images.value.forEach((img, index) => {
        img.position = index + 1;
    });
};

const form = reactive({
    productId: "",
    productName: "",
    productCategory: "",
    productPrice: "",
    productStock: "",
    productDescription: "",
});

const errors = ref({});
const alertMessageContent = ref('');
const showAlertMessage = ref(false);
const alertType = ref('alert-danger');

const submitProduct = async () => {
    if (modalTitle.value == "Delete Product Confirmation") {
        $("#deleteConfirmationModal").modal("hide");
        $(".modal-loading").modal("show");

        let listDeleteProduct = 'ids=';
        checkedProducts.value.forEach((value) => {
            listDeleteProduct += value + ','
        })

        let response = await axios.get(base_url + "/token");
        let token = response.data.token;
        if (token === null) {
            window.location.replace('http://localhost:8000/login');
        }

        response = await axios.delete(
            api_url + "/products?" + listDeleteProduct,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Pastikan menggunakan tipe konten multipart
                    Authorization: token,
                },
                withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
            }
        );

        if (response.status === 200) {
            products.value = [];
            searchInput.value = '';
            getAllProduct();
            $("#deleteConfirmationModal").modal("hide");
            $(".modal-loading").modal("hide");
        } else {
            $("#deleteConfirmationModal").modal("show");
            $(".modal-loading").modal("hide");
        }
        checkedProducts.value = [];
        $('#checkbox-all').prop('checked', false)

        alertMessageContent.value = 'The selected product was deleted successfully!';
        showAlertMessage.value = true;
        alertType.value = 'alert-success';

    } else if (modalTitle.value == "Add Product" || modalTitle.value == "Edit Product") {
        if (validateForm()) {
            $("#addProductModal").modal("hide");
            $(".modal-loading").modal("show");
            // Proses add product (e.g., kirim ke API)
            try {
                const formData = new FormData();
                formData.append("category_id", $("#product_category").val());
                formData.append("name", form.productName);
                formData.append(
                    "description",
                    $("#ckeditor_description_input").val()
                );
                formData.append("stock", form.productStock);
                formData.append("price", unformatRupiah(form.productPrice));

                if (modalTitle.value == "Add Product") {
                    // Tambahkan setiap gambar ke FormData
                    images.value.forEach((image, index) => {
                        // console.log(image.file);
                        formData.append(`images`, image.file);
                        formData.append(`positions`, image.position); // Kirim posisi gambar
                    });
                } else if (modalTitle.value == "Edit Product") {
                    images.value.forEach((image, index) => {
                        if (!image.file) {
                            formData.append(`current_images`, image.id);
                            formData.append(`current_positions`, image.position);
                        } else {
                            formData.append(`new_images`, image.file);
                            formData.append(`new_positions`, image.position); // Kirim posisi gambar
                        }
                    });

                    if (selectedImageDelete.value.length > 0) {
                        formData.append(
                            "images_deleted",
                            selectedImageDelete.value
                        ); // isinya id gambar
                    }
                }

                let response = await axios.get(base_url + "/token");
                let token = response.data.token;
                if (token === null) {
                    window.location.replace('http://localhost:8000/login');
                }

                if (modalTitle.value == "Add Product") {
                    response = await axios.post(api_url + "/products", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data", // Pastikan menggunakan tipe konten multipart
                            Authorization: token,
                        },
                        withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
                    });

                    if (response.status === 201) {
                        images.value = [];
                        products.value = [];
                        searchInput.value = '';
                        getAllProduct();
                        $("#addProductModal").modal("hide");
                        $(".modal-loading").modal("hide");

                        alertMessageContent.value = 'Product was created successfully!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-success");
                    } else {
                        $("#addProductModal").modal("show");
                        $(".modal-loading").modal("hide");

                        alertMessageContent.value = 'Product creation was unsuccessful!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-danger");
                    }
                } else if (modalTitle.value == "Edit Product") {
                    response = await axios.put(
                        api_url + "/products/" + form.productId,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data", // Pastikan menggunakan tipe konten multipart
                                Authorization: token,
                            },
                            withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
                        }
                    );

                    if (response.status === 200) {
                        products.value = [];
                        images.value = [];
                        searchInput.value = '';
                        getAllProduct();
                        $("#addProductModal").modal("hide");
                        $(".modal-loading").modal("hide");
                        alertMessageContent.value = 'Product was updated successfully!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-success");
                    } else {
                        $("#addProductModal").modal("show");
                        $(".modal-loading").modal("hide");
                        alertMessageContent.value = 'Product updated was unsuccessful!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-danger");
                    }
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
};

const selectedImageDelete = ref([]);

function handleImageRemover(imageId, file) {
    if (!selectedImageDelete.value.includes(imageId) && typeof file === 'undefined') {
        selectedImageDelete.value.push(imageId);
    }
    images.value = images.value.filter((item) => item.id !== imageId);
    images.value.forEach(function (item, index) {
        item.position = ++index;
    });
}

const selectedImages = ref([]); // Variabel reaktif untuk menyimpan gambar yang dipilih

function showProductImages(images) {
    selectedImages.value = images; // Menyimpan gambar yang dipilih ke dalam selectedImages
    $("#showProductImages").modal("show"); // Menampilkan modal
}

const selectedDescription = ref('');

function showProductDescription(description) {
    selectedDescription.value = description;
    $('#showProductDescription').modal("show");
}

function validateForm() {
    errors.value = {};
    if (images.value.length == 0) {
        errors.value.images = "Images is required!";
    }
    if (!form.productName) {
        errors.value.name = "Product Name is Required!";
    }
    if (!$("#product_category").val()) {
        errors.value.category = "Category is Required!";
    }
    if (!form.productPrice) {
        errors.value.price = "Price is Required!";
    }
    if (!form.productStock) {
        errors.value.stock = "Stock is Required!";
    }
    if (!$("#ckeditor_description_input").val()) {
        errors.value.desc = "Description is Required!";
    }

    return Object.keys(errors.value).length === 0;
}

let editorInstance = null;

onMounted(() => {
    const script = document.createElement("script");
    script.src = "/assets/admin/modules/ckeditor5/build/ckeditor.js"; // Pastikan path benar
    script.onload = () => {
        ClassicEditor.create(document.querySelector("#ckeditor_description"))
            .then((editor) => {
                // Menyimpan editor instance
                editorInstance = editor;

                // Menambahkan padding ke area editable CKEditor
                editor.editing.view.change((writer) => {
                    writer.setStyle(
                        "padding-left",
                        "20px",
                        editor.editing.view.document.getRoot()
                    );
                    writer.setStyle(
                        "padding-right",
                        "20px",
                        editor.editing.view.document.getRoot()
                    );
                });

                editor.model.document.on("change:data", () => {
                    let body_content = editor.getData();
                    document.querySelector(
                        "#ckeditor_description_input"
                    ).value = body_content;
                });
            })
            .catch((error) => {
                console.error("Error initializing CKEditor: ", error);
            });
    };
    document.head.appendChild(script);
    getAllProduct();

    $("#addProductModal").on("hidden.bs.modal", function () {
        selectedImageDelete.value = [];
    });

    $('#checkbox-all').prop('checked', false);
    showAllCategories();

});

async function getAllProduct() {
    try {
        const response = await axios.get(api_url + "/products?per_page=" + dataPerPages.value + "&page=" + selectedPage.value + "&column=" + selectedColumnSorting.value + "&sort_by=" + sortBy.value + "&search=" + searchInput.value + "&category_id=" + selectedCategoryTab.value);
        products.value = response.data.data; // Menimpa isi dengan data produk baru
        totalPages.value = response.data.total_pages;
        selectedPage.value = response.data.current_pages;
        totalDatas.value = response.data.total_datas;
    } catch (error) {
        // console.error('Gagal mengambil data produk:', error);
        throw error; // Meneruskan error agar bisa ditangani di tempat lain
    }
}

function addProduct() {
    images.value = [];
    form.productName = '';
    $('#product_category').val('').selectric('refresh');
    form.productPrice = '';
    form.productStock = '';
    if (editorInstance != null) {
        editorInstance.setData(''); // Misalnya product.description berisi teks yang ingin dimasukkan
    }
    $("#addProductModal").modal("show");
    modalTitle.value = "Add Product";
}

const selectedImagesEdit = ref([]); // Variabel reaktif untuk menyimpan gambar yang dipilih

function editProduct(product) {
    form.productId = product.id;
    images.value = [];
    modalTitle.value = "Edit Product";
    $("#addProductModal").modal("show");
    form.productName = product.name;
    $("#product_category").val(product.category.id);
    $("#product_category").selectric("refresh");
    form.productPrice = formatRupiah(product.price);
    form.productStock = product.stock;

    // Memasukkan teks ke dalam CKEditor
    if (editorInstance != null) {
        editorInstance.setData(product.description); // Misalnya product.description berisi teks yang ingin dimasukkan
    }

    if (product.images) {
        selectedImagesEdit.value = product.images;
        previewImage(null, selectedImagesEdit.value);
    }
}

function formatRupiahByEvent(event) {
    let value = event.target.value.replace(/[^,\d]/g, ""); // Hapus semua kecuali angka dan koma
    value = value ? parseInt(value, 10) : 0; // Konversi ke integer untuk memformat angka

    // Format angka menggunakan Intl.NumberFormat
    event.target.value = value
        ? `Rp ${new Intl.NumberFormat("id-ID").format(value)}`
        : "";

    // Perbarui v-model setelah pemformatan
    form.productPrice = event.target.value;
}

function formatRupiah(value) {
    // Pastikan nilai adalah angka
    const numericValue =
        typeof value === "number" ? value : parseInt(value, 10);

    // Format angka menjadi Rupiah
    const formattedValue = numericValue
        ? `Rp ${new Intl.NumberFormat("id-ID").format(numericValue)}`
        : "";

    return formattedValue;
}

function unformatRupiah(value) {
    // Hapus "Rp", spasi, titik, dan karakter non-digit lainnya
    let unformattedValue = value.replace(/[^,\d]/g, "");

    // Konversi kembali ke angka
    unformattedValue = unformattedValue ? parseInt(unformattedValue, 10) : 0;

    return unformattedValue;
}

const checkedProducts = ref([]);

const isCheckAll = computed({
    get: () => products.value.length != 0 && checkedProducts.value.length === products.value.length,
    set: (value) => {
        if (value) {
            // Centang semua checkbox
            checkedProducts.value = products.value.map((product) => product.id);
        } else {
            // Kosongkan semua checkbox
            checkedProducts.value = [];
        }
    },
});

const selectOne = (productId) => {
    if (checkedProducts.value.includes(productId)) {
        checkedProducts.value = checkedProducts.value.filter(id => id != productId)
    } else {
        checkedProducts.value.push(productId)
    }
}

// Fungsi untuk menemukan produk berdasarkan ID
const findProductById = (id) => {
    return products.value.find((item) => item.id === id);
};

const deleteProductModal = () => {
    $('#deleteConfirmationModal').modal('show');
    modalTitle.value = "Delete Product Confirmation";
}

const categories = ref([]);

const showAllCategories = async () => {
    let response = await axios.get(api_url + "/categories");
    categories.value = response.data.data;
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options).replace(',', ' at');
};

// Computed untuk menghitung range data
const showingRange = computed(() => {
    const start = (selectedPage.value - 1) * dataPerPages.value + 1;
    const end = Math.min(selectedPage.value * dataPerPages.value, totalDatas.value);
    return { start, end };
});

</script>

<style>
.error {
    color: red;
    font-size: 12px;
}
</style>
