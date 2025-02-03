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
                <h1>Discount Coupon</h1>
                <div class="section-header-button">
                    <button href="features-post-create.html" class="btn btn-primary" @click="addDiscountCoupon()">
                        Add New Coupon
                    </button>
                </div>
                <div class="section-header-breadcrumb">
                    <div class="breadcrumb-item active">
                        <a href="#">Dashboard</a>
                    </div>
                    <div class="breadcrumb-item"><a href="#">Discount</a></div>
                </div>
            </div>
            <div class="section-body">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <p class="section-lead">
                        You can manage all discounts in here such as add, edit, or remove them.
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
                                        <a class="nav-link active" href="#">All Discount Coupons
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
                                <h4>Show Discounts Coupon on Table</h4>
                            </div>
                            <div class="card-body">
                                <div class="float-left">
                                    <button v-if="checkedDiscountCoupons.length > 0" @click="deleteDiscountCouponModal"
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
                                                    id="discount_coupons.name">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Name
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.code">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Code
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting">
                                                    Description
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.value">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Value
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.type">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Type
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.total_max_usage">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Total Max Usage
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.max_usage_per_user">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Max Usage per User
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.min_order_value">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Min Order Per User
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.start">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Start Date
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.end">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    End Date
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.status">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Status
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.used_count">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Used Count
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="discount_coupons.updated_at">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Updated At
                                                </div>
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                        <!-- Mengubah object ke array menggunakan Object.values() -->
                                        <tr v-for="(
                                                discount, index
                                            ) in Object.values(discounts)" :key="discount.id">
                                            <td>
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" class="custom-control-input"
                                                        :id="'checkbox-' + discount.id" :value="discount.id"
                                                        v-model="checkedDiscountCoupons" @click="selectOne(discount.id)" />
                                                    <label :for="'checkbox-' + discount.id"
                                                        class="custom-control-label">&nbsp;</label>
                                                </div>
                                            </td>
                                            <td>{{ (selectedPage - 1) * dataPerPages + index + 1 }}</td>
                                            <td>{{ discount.name }}</td>
                                            <td>{{ discount.code }}</td>
                                            <td>
                                                <button @click="
                                                    showdiscountDescription(
                                                        discount.description
                                                    )
                                                    " class="btn btn-warning btn-sm">
                                                    <i class="fa-regular fa-rectangle-list"></i>
                                                </button>
                                            </td>
                                            <td>{{ discount.value }}</td>
                                            <td>{{ discount.type }}</td>
                                            <td>{{ discount.total_max_usage }}</td>
                                            <td>{{ discount.max_usage_per_user }}</td>
                                            <td>{{ formatRupiah(discount.min_order_value) }}</td>
                                            <td><div style="width: 165px;">{{ formatDate(discount.start) }}</div></td>
                                            <td><div style="width: 165px;">{{ formatDate(discount.end) }}</div></td>
                                            <td><i class="fa-solid fa-circle-check" :class="discount.status == 1 ? 'fa-circle-check text-green-500' : 'fa-circle-xmark text-red-500'"></i></td>
                                            <td>{{ discount.used_count }}</td>
                                            <td>{{ formatDate(discount.updated_at) }}</td>
                                            <td>
                                                <div
                                                    class="d-flex flex-column align-items-start justify-content-center p-2">
                                                    <button @click="
                                                        editDiscountCoupon(discount)
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
    <div class="modal fade" tabindex="-1" role="dialog" id="discountModal">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center">
                    <div v-if="errors.discountCoupon" class="alert alert-danger text-center col-10 mt-3" role="alert">
                        {{ errors.discountCoupon }}
                    </div>
                </div>
                <form @submit.prevent="submitDiscountCoupon">
                    <div class="modal-body d-flex flex-column align-items-start justify-content-center">
                        <div class="mb-3 col-12">
                            <label for="product_name" class="form-label">Name</label>
                            <input class="form-control" v-model="form.name" name="discount_name" type="text"
                                placeholder="Flash Sale" />
                            <span v-if="errors.name" class="error">{{
                                errors.name
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="product_name" class="form-label">Code</label>
                            <input class="form-control" v-model="form.code" name="discount_code" type="text"
                                placeholder="XYZ1234" />
                            <span v-if="errors.code" class="error">{{
                                errors.code
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="product_desc" class="form-label">Description</label>
                            <div id="ckeditor_discount_description" class="p-3" name="discount_desc"></div>
                            <textarea type="text" id="ckeditor_discount_description_input" v-model="form.desc"
                                hidden></textarea>
                            <span v-if="errors.desc" class="error">{{
                                errors.desc
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="discount_type" class="form-label">Value Type</label>
                            <select class="form-control selectric" name="discount_type" id="discount_type">
                                <option disabled selected value="">
                                    Choose one
                                </option>
                                <option value="percent">
                                    Percent (%)
                                </option>
                                <option value="nominal">
                                    Nominal (0)
                                </option>
                            </select>
                            <span v-if="errors.type" class="error">{{
                                errors.type
                            }}</span>
                        </div>
                        <div class="mb-3 col-12" v-if="(form.type != '' && form.type == 'percent')">
                            <label for="discount_percent" class="form-label">Value</label>
                            <input class="form-control" v-model="form.value" name="discount_percent" type="number" />
                            <span v-if="errors.value" class="error">{{
                                errors.value
                            }}</span>
                        </div>
                        <div class="mb-3 col-12" v-if="(form.type != '' && form.type == 'nominal')">
                            <label for="discount_nominal" class="form-label">Value</label>
                            <input class="form-control" v-model="form.value" name="discount_nominal" type="text"
                                @input="formatRupiahByEvent($event, 'value')" />
                            <span v-if="errors.value" class="error">{{
                                errors.value
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="product_name" class="form-label">Total Max Usage</label>
                            <input class="form-control" v-model="form.total_max_usage" name="discount_total_max_usage"
                                type="number" />
                            <span v-if="errors.total_max_usage" class="error">{{
                                errors.total_max_usage
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="product_name" class="form-label">Max Usage Per User</label>
                            <input class="form-control" v-model="form.max_usage_per_user" name="discount_max_usage_per_user"
                                type="number" />
                            <span v-if="errors.max_usage_per_user" class="error">{{
                                errors.max_usage_per_user
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="product_name" class="form-label">Min Order Per User</label>
                            <input class="form-control" v-model="form.min_order_value" name="discount_min_order_value_per_user"
                                type="text" placeholder="Rp 25.000" @input="formatRupiahByEvent($event, 'min_order_value')" />
                            <span v-if="errors.min_order_value" class="error">{{
                                errors.min_order_value
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="discount_start_date" class="form-label">Start</label>
                            <input class="form-control" v-model="form.start" name="discount_start_date"
                                type="datetime-local" />
                            <span v-if="errors.start" class="error">{{
                                errors.start
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="discount_end_date" class="form-label">End</label>
                            <input class="form-control" v-model="form.end" name="discount_end_date" type="datetime-local" />
                            <span v-if="errors.end" class="error">{{
                                errors.end
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label class="form-label">Status</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" v-model="form.status" :value="true"
                                    id="usageUnlimited">
                                <label class="form-check-label" for="usageUnlimited">
                                    Active
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" v-model="form.status" :value="false"
                                    id="usageCustom">
                                <label class="form-check-label" for="usageCustom">
                                    Non Active
                                </label>
                            </div>
                            <span v-if="errors.status" class="error">{{ errors.status }}</span>
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
    <div class="modal fade" tabindex="-1" role="dialog" id="showdiscountDescription">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">discount Description</h5>
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
                <form @submit.prevent="submitDiscountCoupon">
                    <div class="modal-body d-flex flex-column align-items-start justify-content-center">
                        <span class="mb-3">Do you want to delete permanently these discount below?</span>
                        <ul class="dot">
                            <li v-for="itemSelected in checkedDiscountCoupons" :key="itemSelected">
                                {{ findProductById(itemSelected)?.name || 'discount Not Found' }}
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

const api_url = "http://localhost:8010/api";

const discounts = ref([]);

const modalTitle = ref("Add discount");

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
    getAllDiscountCoupon();
}

const actionSearch = () => {
    selectedPage.value = 1; getAllDiscountCoupon();
}

$(document).ready(function () {
    $('#selectPerPage').selectric(); // Inisialisasi Selectric
    $('#selectPerPage').on('change', function () {
        var selectedValue = $(this).val();
        dataPerPages.value = selectedValue;
        selectedPage.value = 1;
        getAllDiscountCoupon();
    });

    $('#discount_type').selectric(); // Inisialisasi Selectric
    $('#discount_type').on('change', function () {
        var selectedValue = $(this).val();
        form.type = selectedValue;
    });

    $('.sorting').on('click', function () {
        const icon = $(this).find('i'); // Cari elemen <i> di dalam elemen yang diklik
        if (icon.hasClass('fa-arrow-up-wide-short')) {
            icon.removeClass('fa-arrow-up-wide-short').addClass('fa-arrow-down-wide-short');
            selectedColumnSorting.value = $(this).attr('id');
            sortBy.value = 'asc';
            getAllDiscountCoupon()
        } else {
            icon.removeClass('fa-arrow-down-wide-short').addClass('fa-arrow-up-wide-short');
            selectedColumnSorting.value = $(this).attr('id');
            sortBy.value = 'desc';
            getAllDiscountCoupon()
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
    id: 0,
    name: "",
    desc: "",
    code: "",
    value: 0,
    type: "",
    start: "",
    end: "",
    total_max_usage: 0,
    max_usage_per_user: 0,
    used_count: 0,
    min_order_value: 0,
    status: true
});

const errors = ref({});
const alertMessageContent = ref('');

const submitDiscountCoupon = async () => {
    if (modalTitle.value == "Delete Discount Coupon Confirmation") {
        $("#deleteConfirmationModal").modal("hide");
        $(".modal-loading").modal("show");

        let listDeleteProduct = 'ids=';
        checkedDiscountCoupons.value.forEach((value) => {
            listDeleteProduct += value + ','
        })

        let response = await axios.get(base_url + "/token");
        let token = response.data.token;
        if (token === null) {
            window.location.replace(base_url + '/login');
        }

        response = await axios.delete(
            api_url + "/discount_coupons?" + listDeleteProduct,
            {
                headers: {
                    "Content-Type": "application/json", // Pastikan menggunakan tipe konten multipart
                    Authorization: token,
                },
                withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
            }
        );

        if (response.status === 200) {
            discounts.value = [];
            searchInput.value = '';
            getAllDiscountCoupon();
            $("#deleteConfirmationModal").modal("hide");
            $(".modal-loading").modal("hide");

            alertMessageContent.value = 'The selected discount coupon was deleted successfully!';
            $("#myAlert").removeClass("d-none").addClass("show alert-success");
        } else {
            $("#deleteConfirmationModal").modal("show");
            $(".modal-loading").modal("hide");

            alertMessageContent.value = 'The selected discount coupon was deleted unsuccessfully!';
            $("#myAlert").removeClass("d-none").addClass("show alert-danger");
        }

        checkedDiscountCoupons.value = [];
        $('#checkbox-all').prop('checked', false)

    } else if (modalTitle.value == "Add Discount Coupon" || modalTitle.value == "Edit Discount Coupon") {
        if (validateForm()) {
            $("#discountModal").modal("hide");
            $(".modal-loading").modal("show");
            // Proses add product (e.g., kirim ke API)
            try {
                let response = await axios.get(base_url + "/token");
                let token = response.data.token;
                if (token === null) {
                    window.location.replace(base_url + '/login');
                }

                const data = {
                    name: form.name,
                    description: form.desc,
                    code: form.code,
                    value: form.type == 'nominal' ? unformatRupiah(form.value) : form.value,
                    type: form.type,
                    start: form.start.replace("T", " "),
                    end: form.end.replace("T", " "),
                    max_usage_per_user: form.max_usage_per_user,
                    total_max_usage: form.total_max_usage,
                    used_count: form.used_count,
                    min_order_value: unformatRupiah(form.min_order_value),
                    status:  Boolean(form.status)
                }

                if (modalTitle.value == "Add Discount Coupon") {
                    response = await axios.post(api_url + "/discount_coupons", data, {
                        headers: {
                            "Content-Type": "application/json", // Pastikan menggunakan tipe konten multipart
                            Authorization: token,
                        },
                        withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
                    });

                    if (response.status === 201) {
                        discounts.value = [];
                        searchInput.value = '';
                        getAllDiscountCoupon();
                        $("#discountModal").modal("hide");
                        $(".modal-loading").modal("hide");

                        alertMessageContent.value = 'Discount coupon was created successfully!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-success");
                    } else {
                        $("#discountModal").modal("show");
                        $(".modal-loading").modal("hide");

                        alertMessageContent.value = 'Discount coupon creation was unsuccessful!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-danger");
                    }
                } else if (modalTitle.value == "Edit Discount Coupon") {
                    response = await axios.put(
                        api_url + "/discount_coupons/" + form.id,
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
                        discounts.value = [];
                        searchInput.value = '';
                        getAllDiscountCoupon();
                        $("#discountModal").modal("hide");
                        $(".modal-loading").modal("hide");
                        alertMessageContent.value = 'Discount coupon was updated successfully!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-success");
                    } else {
                        $("#discountModal").modal("show");
                        $(".modal-loading").modal("hide");
                        alertMessageContent.value = 'Discount coupon updated was unsuccessful!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-danger");
                    }
                }
            } catch (error) {
                $("#discountModal").modal("show");
                $(".modal-loading").modal("hide");
                console.error("Error:", error);
                if (error.response) {
                    errors.value.discountCoupon = error.response.data.errors;
                } else {
                    errors.value.discountCoupon = error.response;
                }
            }
        }
    }
};

const selectedDescription = ref('');

function showdiscountDescription(description) {
    selectedDescription.value = description;
    $('#showdiscountDescription').modal("show");
}

function validateForm() {
    errors.value = {};
    if (!form.name) {
        errors.value.name = "Coupon Name is Required!";
    }
    if (!form.desc) {
        errors.value.desc = "Coupon Description is Required!";
    }
    if (!form.code) {
        errors.value.code = "Coupon Code is Required"
    }
    if (!form.value) {
        errors.value.value = "Coupon Value is Required"
    }
    if (!form.type) {
        errors.value.type = "Coupon Value Type is Required"
    }
    if (!form.start) {
        errors.value.start = "Coupon Start Date is Required"
    }
    if (!form.end) {
        errors.value.end = "Coupon End Date is Required"
    }
    if (!form.total_max_usage) {
        errors.value.total_max_usage = "Total Max Usage Coupon is Required"
    }
    if (!form.min_order_value) {
        errors.value.min_order_value = "Min Order is Required"
    }
    if (!form.max_usage_per_user) {
        errors.value.max_usage_per_user = "Max Usage Coupon per User is Required"
    }

    return Object.keys(errors.value).length === 0;
}

let editorDiscountInstance = null;

onMounted(() => {
    const script = document.createElement("script");
    script.src = "/assets/admin/modules/ckeditor5/build/ckeditor.js"; // Pastikan path benar
    script.onload = () => {
        ClassicEditor.create(document.querySelector("#ckeditor_discount_description"))
            .then((editor) => {
                // Menyimpan editor instance
                editorDiscountInstance = editor;

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
                        "#ckeditor_discount_description_input"
                    ).value = body_content;
                    form.desc = body_content;
                });
            })
            .catch((error) => {
                console.error("Error initializing CKEditor: ", error);
            });
    };
    document.head.appendChild(script);
    getAllDiscountCoupon();

    $('#checkbox-all').prop('checked', false);
});

async function getAllDiscountCoupon() {
    try {
        const response = await axios.get(api_url + "/discount_coupons?per_page=" + dataPerPages.value + "&page=" + selectedPage.value + "&column=" + selectedColumnSorting.value + "&sort_by=" + sortBy.value + "&search=" + searchInput.value);
        discounts.value = response.data.data; // Menimpa isi dengan data produk baru
        totalPages.value = response.data.total_pages;
        selectedPage.value = response.data.current_pages;
        totalDatas.value = response.data.total_datas;
    } catch (error) {
        // console.error('Gagal mengambil data produk:', error);
        throw error; // Meneruskan error agar bisa ditangani di tempat lain
    }
}

function addDiscountCoupon() {
    modalTitle.value = "Add Discount Coupon";
    form.id = 0;
    form.name = "";
    form.desc = "";
    form.code = "";
    form.value = "";
    form.type = "";
    form.start = "";
    form.end = "";
    form.total_max_usage = 0;
    form.max_usage_per_user = 0;
    form.used_count = 0;
    form.min_order_value = 0;
    form.status = true;

    if (editorDiscountInstance != null) {
        editorDiscountInstance.setData(''); // Misalnya discount.description berisi teks yang ingin dimasukkan
    }

    $('#discount_type').val('').selectric('refresh');
    $("#discountModal").modal("show");
}

function editDiscountCoupon(discount) {
    form.id = discount.id;
    modalTitle.value = "Edit Discount Coupon";
    $("#discountModal").modal("show");
    form.name = discount.name;
    form.desc = discount.description;
    form.code = discount.code;
    form.type = discount.type;
    if (form.type == 'nominal') {
        form.value = formatRupiah(discount.value)
    } else {
        form.value = discount.value;
    }
    form.start = discount.start;
    form.end = discount.end;
    form.total_max_usage = discount.total_max_usage;
    form.max_usage_per_user = discount.max_usage_per_user;
    form.min_order_value = formatRupiah(discount.min_order_value);
    form.status = discount.status;
    $("#discount_type").val(discount.type);
    $("#discount_type").selectric("refresh");

    // Memasukkan teks ke dalam CKEditor
    if (editorDiscountInstance != null) {
        editorDiscountInstance.setData(discount.description); // Misalnya discount.description berisi teks yang ingin dimasukkan
    }
}

const checkedDiscountCoupons = ref([])

const isCheckAll = computed({
    get: () => discounts.value.length != 0 && checkedDiscountCoupons.value.length === discounts.value.length,
    set: (value) => {
        if (value) {
            // Centang semua checkbox
            checkedDiscountCoupons.value = discounts.value.map((discount) => discount.id);
        } else {
            // Kosongkan semua checkbox
            checkedDiscountCoupons.value = [];
        }
    },
});

const selectOne = (discountId) => {
    if (checkedDiscountCoupons.value.includes(discountId)) {
        checkedDiscountCoupons.value = checkedDiscountCoupons.value.filter(id => id != discountId)
    } else {
        checkedDiscountCoupons.value.push(discountId)
    }
}

// Fungsi untuk menemukan produk berdasarkan ID
const findProductById = (id) => {
    return discounts.value.find((item) => item.id === id);
};

const deleteDiscountCouponModal = () => {
    $('#deleteConfirmationModal').modal('show');
    modalTitle.value = "Delete Discount Coupon Confirmation";
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

function formatRupiahByEvent(event, property) {
    let value = event.target.value.replace(/[^,\d]/g, ""); // Hapus semua karakter kecuali angka dan koma
    value = value ? parseInt(value, 10) : 0; // Konversi ke integer

    // Format angka ke Rupiah
    event.target.value = value
        ? `Rp ${new Intl.NumberFormat("id-ID").format(value)}`
        : "";

    // Perbarui properti di dalam form
    form[property] = event.target.value;
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

</script>

<style>
.error {
    color: red;
    font-size: 12px;
}
</style>
