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
                <h1>Category</h1>
                <div class="section-header-button">
                    <button href="features-post-create.html" class="btn btn-primary" @click="addCategory()">
                        Add New Category
                    </button>
                </div>
                <div class="section-header-breadcrumb">
                    <div class="breadcrumb-item active">
                        <a href="#">Dashboard</a>
                    </div>
                    <div class="breadcrumb-item"><a href="#">Category</a></div>
                </div>
            </div>
            <div class="section-body">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <p class="section-lead">
                        You can manage all categories in here such as add, edit, or remove them.
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
                                        <a class="nav-link active" href="#">All Categories
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
                                <h4>Show Categories on Table</h4>
                            </div>
                            <div class="card-body">
                                <div class="float-left">
                                    <button v-if="checkedCategories.length > 0" @click="deleteCategoryModal"
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
                                            <th class="text-start pt-2">
                                                <div class="custom-checkbox custom-checkbox-table custom-control">
                                                    <input type="checkbox" class="custom-control-input" id="checkbox-all"
                                                        v-model="isCheckAll" />
                                                    <label for="checkbox-all" class="custom-control-label">&nbsp;</label>
                                                </div>
                                            </th>
                                            <th>No</th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="categories.name">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Name
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting">
                                                    Description
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="categories.updated_at">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Updated At
                                                </div>
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                        <!-- Mengubah object ke array menggunakan Object.values() -->
                                        <tr v-for="(
                                                category, index
                                            ) in Object.values(categories)" :key="category.id">
                                            <td>
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" class="custom-control-input"
                                                        :id="'checkbox-' + category.id" :value="category.id"
                                                        v-model="checkedCategories" @click="selectOne(category.id)" />
                                                    <label :for="'checkbox-' + category.id"
                                                        class="custom-control-label">&nbsp;</label>
                                                </div>
                                            </td>
                                            <td>{{ (selectedPage - 1) * dataPerPages + index + 1 }}</td>
                                            <td>{{ category.name }}</td>
                                            <td>
                                                <button @click="
                                                showCategoryDescription(
                                                    category.description
                                                )
                                                    " class="btn btn-warning btn-sm">
                                                    <i class="fa-regular fa-rectangle-list"></i>
                                                </button>
                                            </td>
                                            <td>{{ formatDate(category.updated_at) }}</td>
                                            <td>
                                                <div
                                                    class="d-flex flex-column align-items-start justify-content-center p-2">
                                                    <button @click="
                                                        editCategory(category)
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
    <div class="modal fade" tabindex="-1" role="dialog" id="categoryModal">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center">
                    <div v-if="errors.categoryError" class="alert alert-danger text-center col-10 mt-3" role="alert">
                        {{ errors.categoryError }}
                    </div>
                </div>
                <form @submit.prevent="submitCategory">
                    <div class="modal-body d-flex flex-column align-items-start justify-content-center">
                        <div class="mb-3 col-12">
                            <label for="product_name" class="form-label">Category Name</label>
                            <input class="form-control" v-model="form.categoryName" name="product_name" type="text"
                                placeholder="Category Name" />
                            <span v-if="errors.name" class="error">{{
                                errors.name
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
    <div class="modal fade" tabindex="-1" role="dialog" id="showCategoryDescription">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Category Description</h5>
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
                <form @submit.prevent="submitCategory">
                    <div class="modal-body d-flex flex-column align-items-start justify-content-center">
                        <span class="mb-3">Do you want to delete permanently these category below?</span>
                        <ul class="dot">
                            <li v-for="itemSelected in checkedCategories" :key="itemSelected">
                                {{ findCategoryById(itemSelected)?.name || 'Category Not Found' }}
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
import { onMounted, ref, reactive, computed } from "vue";
const base_url = window.location.origin;

const api_url = import.meta.env.VITE_API_URL;

const categories = ref([]);

const modalTitle = ref("Add Category");

const selectedPage = ref(1);
const totalPages = ref(0);
const totalDatas = ref(0);
const dataPerPages = ref(5);
const selectedColumnSorting = ref('');
const sortBy = ref('');
const searchInput = ref('');

const updatePage = (pageSelected) => {
    if (pageSelected == 0) {
        selectedPage.value = 1;
    } else if (pageSelected > totalPages.value) {
        selectedPage.value = totalPages.value;
    } else {
        selectedPage.value = pageSelected;
    }
    getAllCategory();
}

const actionSearch = () => {
    selectedPage.value = 1; getAllCategory();
}

$(document).ready(function () {
    $('#selectPerPage').selectric(); // Inisialisasi Selectric
    $('#selectPerPage').on('change', function () {
        var selectedValue = $(this).val();
        dataPerPages.value = selectedValue;
        selectedPage.value = 1;
        getAllCategory();
    });

    $('.sorting').on('click', function () {
        const icon = $(this).find('i'); // Cari elemen <i> di dalam elemen yang diklik
        if (icon.hasClass('fa-arrow-up-wide-short')) {
            icon.removeClass('fa-arrow-up-wide-short').addClass('fa-arrow-down-wide-short');
            selectedColumnSorting.value = $(this).attr('id');
            sortBy.value = 'asc';
            getAllCategory()
        } else {
            icon.removeClass('fa-arrow-down-wide-short').addClass('fa-arrow-up-wide-short');
            selectedColumnSorting.value = $(this).attr('id');
            sortBy.value = 'desc';
            getAllCategory()
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

const form = reactive({
    categoryId: 0,
    categoryName: "",
    categoryDescription: "",
});

const errors = ref({});
const alertMessageContent = ref('');

const submitCategory = async () => {
    if (modalTitle.value == "Delete Category Confirmation") {
        $("#deleteConfirmationModal").modal("hide");
        $(".modal-loading").modal("show");

        let listDeleteProduct = 'ids=';
        checkedCategories.value.forEach((value) => {
            listDeleteProduct += value + ','
        })

        let response = await axios.get(base_url + "/token");
        let token = response.data.token;
        if (token === null) {
            window.location.replace(base_url + '/login');
        }

        response = await axios.delete(
            api_url + "/categories?" + listDeleteProduct,
            {
                headers: {
                    "Content-Type": "application/json", // Pastikan menggunakan tipe konten multipart
                    Authorization: token,
                },
                withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
            }
        );

        if (response.status === 200) {
            categories.value = [];
            searchInput.value = '';
            getAllCategory();
            $("#deleteConfirmationModal").modal("hide");
            $(".modal-loading").modal("hide");

            alertMessageContent.value = 'The selected category was deleted successfully!';
            $("#myAlert").removeClass("d-none").addClass("show alert-success");
        } else {
            $("#deleteConfirmationModal").modal("show");
            $(".modal-loading").modal("hide");

            alertMessageContent.value = 'The selected category was deleted unsuccessfully!';
            $("#myAlert").removeClass("d-none").addClass("show alert-danger");
        }
        checkedCategories.value = [];
        $('#checkbox-all').prop('checked', false)
        
    } else if (modalTitle.value == "Add Category" || modalTitle.value == "Edit Category") {
        if (validateForm()) {
            $("#categoryModal").modal("hide");
            $(".modal-loading").modal("show");
            // Proses add product (e.g., kirim ke API)
            try {
                let data = {
                    name: form.categoryName,
                    description: $("#ckeditor_description_input").val()
                }

                let response = await axios.get(base_url + "/token");
                let token = response.data.token;
                if (token === null) {
                    window.location.replace(base_url + '/login');
                }

                if (modalTitle.value == "Add Category") {
                    response = await axios.post(api_url + "/categories", data, {
                        headers: {
                            "Content-Type": "application/json", // Pastikan menggunakan tipe konten multipart
                            Authorization: token,
                        },
                        withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
                    });

                    if (response.status === 201) {
                        categories.value = [];
                        searchInput.value = '';
                        getAllCategory();
                        $("#categoryModal").modal("hide");
                        $(".modal-loading").modal("hide");

                        alertMessageContent.value = 'Category was created successfully!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-success");
                    } else {
                        $("#categoryModal").modal("show");
                        $(".modal-loading").modal("hide");

                        alertMessageContent.value = 'Category creation was unsuccessful!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-danger");
                    }
                } else if (modalTitle.value == "Edit Category") {
                    response = await axios.put(
                        api_url + "/categories/" + form.categoryId,
                        data,
                        {
                            headers: {
                                "Content-Type": "application/json", // Pastikan menggunakan tipe konten multipart
                                Authorization: token,
                            },
                            withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
                        }
                    );

                    if (response.status === 200) {
                        categories.value = [];
                        searchInput.value = '';
                        getAllCategory();
                        $("#categoryModal").modal("hide");
                        $(".modal-loading").modal("hide");
                        alertMessageContent.value = 'Category was updated successfully!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-success");
                    } else {
                        $("#categoryModal").modal("show");
                        $(".modal-loading").modal("hide");
                        alertMessageContent.value = 'Category updated was unsuccessful!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-danger");
                    }
                }
            } catch (error) {
                $(".modal-loading").modal("hide");

                $("#categoryModal").modal("hide"); // Pastikan modal ditutup dulu
                setTimeout(() => {
                    $(".modal-backdrop").remove();  // Hapus backdrop jika masih ada
                    $("#categoryModal").modal("show");
                    $("body").addClass("modal-open");
                }, 300); // Tambahkan delay agar transisi selesai
                console.error("Error:", error);
                console.log(error.response.data.errors)
                if (error.response) {
                    errors.value.categoryError = error.response.data.errors;
                } else {
                    errors.value.categoryError = error.response;
                }
            }
        }
    }
};

const selectedDescription = ref('');

function showCategoryDescription(description) {
    selectedDescription.value = description;
    $('#showCategoryDescription').modal("show");
}

function validateForm() {
    errors.value = {};
    if (!form.categoryName) {
        errors.value.name = "Category Name is Required!";
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
    getAllCategory();

    $('#checkbox-all').prop('checked', false);
});

async function getAllCategory() {
    try {
        const response = await axios.get(api_url + "/categories?per_page=" + dataPerPages.value + "&page=" + selectedPage.value + "&column=" + selectedColumnSorting.value + "&sort_by=" + sortBy.value + "&search=" + searchInput.value);
        categories.value = response.data.data; // Menimpa isi dengan data produk baru
        totalPages.value = response.data.total_pages;
        selectedPage.value = response.data.current_pages;
        totalDatas.value = response.data.total_datas;
    } catch (error) {
        // console.error('Gagal mengambil data produk:', error);
        throw error; // Meneruskan error agar bisa ditangani di tempat lain
    }
}

function addCategory() {
    form.categoryId = 0;
    form.categoryName = '';
    form.categoryDescription = '';
    if (editorInstance != null) {
        editorInstance.setData(''); // Misalnya category.description berisi teks yang ingin dimasukkan
    }
    $("#categoryModal").modal("show");
    modalTitle.value = "Add Category";
}

function editCategory(category) {
    form.categoryId = category.id;
    modalTitle.value = "Edit Category";
    $("#categoryModal").modal("show");
    form.categoryName = category.name;

    // Memasukkan teks ke dalam CKEditor
    if (editorInstance != null) {
        editorInstance.setData(category.description); // Misalnya category.description berisi teks yang ingin dimasukkan
    }
}

const checkedCategories = ref([])

const isCheckAll = computed({
    get: () => categories.value.length != 0 && checkedCategories.value.length === categories.value.length,
    set: (value) => {
        if (value) {
            // Centang semua checkbox
            checkedCategories.value = categories.value.map((category) => category.id);
        } else {
            // Kosongkan semua checkbox
            checkedCategories.value = [];
        }
    },
});

const selectOne = (categoryId) => {
    if (checkedCategories.value.includes(categoryId)) {
        checkedCategories.value = checkedCategories.value.filter(id => id != categoryId)
    } else {
        checkedCategories.value.push(categoryId)
    }
}

// Fungsi untuk menemukan produk berdasarkan ID
const findCategoryById = (id) => {
    return categories.value.find((item) => item.id === id);
};

const deleteCategoryModal = () => {
    $('#deleteConfirmationModal').modal('show');
    modalTitle.value = "Delete Category Confirmation";
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
