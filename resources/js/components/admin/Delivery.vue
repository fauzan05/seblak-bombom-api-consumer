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
                <h1>Delivery</h1>
                <div class="section-header-button">
                    <button href="features-post-create.html" class="btn btn-primary" @click="addDelivery()">
                        Add New Delivery
                    </button>
                </div>
                <div class="section-header-breadcrumb">
                    <div class="breadcrumb-item active">
                        <a href="#">Dashboard</a>
                    </div>
                    <div class="breadcrumb-item"><a href="#">Delivery</a></div>
                </div>
            </div>
            <div class="section-body">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <p class="section-lead">
                        You can manage all deliveries in here such as add, edit, or remove them.
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
                                        <a class="nav-link active" href="#">All Deliveries
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
                                <h4>Show Deliveries on Table</h4>
                            </div>
                            <div class="card-body">
                                <div class="float-left">
                                    <button v-if="checkedDeliveries.length > 0" @click="deleteDeliveryModal"
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
                                                    id="deliveries.name">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    City
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="deliveries.name">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    District
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="deliveries.name">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Hamlet
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="deliveries.name">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Cost
                                                </div>
                                            </th>
                                            <th>
                                                <div class="d-flex align-items-center cursor-pointer sorting"
                                                    id="deliveries.updated_at">
                                                    <i class="fa-solid fa-arrow-up-wide-short me-1"></i>
                                                    Updated At
                                                </div>
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                        <!-- Mengubah object ke array menggunakan Object.values() -->
                                        <tr v-for="(
                                                delivery, index
                                            ) in Object.values(deliveries)" :key="delivery.id">
                                            <td>
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" class="custom-control-input"
                                                        :id="'checkbox-' + delivery.id" :value="delivery.id"
                                                        v-model="checkedDeliveries" @click="selectOne(delivery.id)" />
                                                    <label :for="'checkbox-' + delivery.id"
                                                        class="custom-control-label">&nbsp;</label>
                                                </div>
                                            </td>
                                            <td>{{ (selectedPage - 1) * dataPerPages + index + 1 }}</td>
                                            <td>{{ delivery.city }}</td>
                                            <td>{{ delivery.district }}</td>
                                            <td>{{ delivery.hamlet }}</td>
                                            <td>{{ formatRupiah(delivery.cost) }}</td>
                                            <td>{{ formatDate(delivery.updated_at) }}</td>
                                            <td>
                                                <div
                                                    class="d-flex flex-column align-items-start justify-content-center p-2">
                                                    <button @click="
                                                        editDelivery(delivery)
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
    <div class="modal fade" tabindex="-1" role="dialog" id="deliveryModal">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center">
                    <div v-if="errors.deliveryError" class="alert alert-danger text-center col-10 mt-3" role="alert">
                        {{ errors.deliveryError }}
                    </div>
                </div>
                <form @submit.prevent="submitDelivery">
                    <div class="modal-body d-flex flex-column align-items-start justify-content-center">
                        <div class="mb-3 col-12">
                            <label for="city" class="form-label">City</label>
                            <input class="form-control" v-model="form.city" name="city" type="text"
                                />
                            <span v-if="errors.city" class="error">{{
                                errors.city
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="district" class="form-label">District</label>
                            <input class="form-control" v-model="form.district" name="district" type="text"
                                />
                            <span v-if="errors.district" class="error">{{
                                errors.district
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="village" class="form-label">Village</label>
                            <input class="form-control" v-model="form.village" name="village" type="text"
                                />
                            <span v-if="errors.village" class="error">{{
                                errors.village
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="hamlet" class="form-label">Hamlet</label>
                            <input class="form-control" v-model="form.hamlet" name="hamlet" type="text"
                                />
                            <span v-if="errors.hamlet" class="error">{{
                                errors.hamlet
                            }}</span>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="cost" class="form-label">Cost</label>
                            <input class="form-control" v-model="form.cost" name="cost" @input="formatRupiahByEvent($event, 'cost')" type="text"
                                placeholder="Rp 15.000" />
                            <span v-if="errors.cost" class="error">{{
                                errors.cost
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
    <div class="modal fade" tabindex="-1" role="dialog" id="showDeliveryDescription">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delivery Description</h5>
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
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="submitDelivery">
                    <div class="modal-body d-flex flex-column align-items-start justify-content-center">
                        <span class="mb-3">Do you want to delete permanently these delivery below?</span>
                        <ul class="dot">
                            <li v-for="itemSelected in checkedDeliveries" :key="itemSelected">
                                {{ findDeliveryById(itemSelected)?.city + ', ' + findDeliveryById(itemSelected)?.district + ', ' + findDeliveryById(itemSelected)?.village + ', ' + findDeliveryById(itemSelected)?.hamlet + ' with Cost : ' + formatRupiah(findDeliveryById(itemSelected)?.cost) || 'Delivery Not Found' }}
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

onMounted(() => {
    getAllDelivery();
    $('#checkbox-all').prop('checked', false);
});

const api_url = import.meta.env.VITE_API_URL;

const deliveries = ref([]);

const modalTitle = ref("Add Delivery");

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
    getAllDelivery();
}

const actionSearch = () => {
    selectedPage.value = 1; getAllDelivery();
}

$(document).ready(function () {
    $('#selectPerPage').selectric(); // Inisialisasi Selectric
    $('#selectPerPage').on('change', function () {
        var selectedValue = $(this).val();
        dataPerPages.value = selectedValue;
        selectedPage.value = 1;
        getAllDelivery();
    });

    $('.sorting').on('click', function () {
        const icon = $(this).find('i'); // Cari elemen <i> di dalam elemen yang diklik
        if (icon.hasClass('fa-arrow-up-wide-short')) {
            icon.removeClass('fa-arrow-up-wide-short').addClass('fa-arrow-down-wide-short');
            selectedColumnSorting.value = $(this).attr('id');
            sortBy.value = 'asc';
            getAllDelivery()
        } else {
            icon.removeClass('fa-arrow-down-wide-short').addClass('fa-arrow-up-wide-short');
            selectedColumnSorting.value = $(this).attr('id');
            sortBy.value = 'desc';
            getAllDelivery()
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
    cost: "",
    city: "",
    district: "",
    village: "",
    hamlet: "",
});

const errors = ref({});
const alertMessageContent = ref('');

const submitDelivery = async () => {
    if (modalTitle.value == "Delete Delivery Confirmation") {
        $("#deleteConfirmationModal").modal("hide");
        $(".modal-loading").modal("show");

        let listDeleteProduct = 'ids=';
        checkedDeliveries.value.forEach((value) => {
            listDeleteProduct += value + ','
        })

        let response = await axios.get(base_url + "/token");
        let token = response.data.token;
        if (token === null) {
            window.location.replace(base_url + '/login');
        }

        response = await axios.delete(
            api_url + "/deliveries?" + listDeleteProduct,
            {
                headers: {
                    "Content-Type": "application/json", // Pastikan menggunakan tipe konten multipart
                    Authorization: token,
                },
                withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
            }
        );

        if (response.status === 200) {
            deliveries.value = [];
            searchInput.value = '';
            getAllDelivery();
            $("#deleteConfirmationModal").modal("hide");
            $(".modal-loading").modal("hide");

            alertMessageContent.value = 'The selected delivery was deleted successfully!';
            $("#myAlert").removeClass("d-none").addClass("show alert-success");
        } else {
            $("#deleteConfirmationModal").modal("show");
            $(".modal-loading").modal("hide");

            alertMessageContent.value = 'The selected delivery was deleted unsuccessfully!';
            $("#myAlert").removeClass("d-none").addClass("show alert-danger");
        }
        checkedDeliveries.value = [];
        $('#checkbox-all').prop('checked', false)
        
    } else if (modalTitle.value == "Add Delivery" || modalTitle.value == "Edit Delivery") {
        if (validateForm()) {
            $("#deliveryModal").modal("hide");
            $(".modal-loading").modal("show");
            // Proses add product (e.g., kirim ke API)
            try {
                let data = {
                    city: form.city,
                    district: form.district,
                    village: form.village,
                    hamlet: form.hamlet,
                    cost: Number(unformatRupiah(form.cost))
                };

                let response = await axios.get(base_url + "/token");
                let token = response.data.token;
                if (token === null) {
                    window.location.replace(base_url + '/login');
                }

                if (modalTitle.value == "Add Delivery") {
                    response = await axios.post(api_url + "/deliveries", data, {
                        headers: {
                            "Content-Type": "application/json", // Pastikan menggunakan tipe konten multipart
                            Authorization: token,
                        },
                        withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
                    });

                    if (response.status === 201) {
                        deliveries.value = [];
                        searchInput.value = '';
                        getAllDelivery();
                        $("#deliveryModal").modal("hide");
                        $(".modal-loading").modal("hide");

                        alertMessageContent.value = 'Delivery was created successfully!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-success");
                    } else {
                        $("#deliveryModal").modal("show");
                        $(".modal-loading").modal("hide");

                        alertMessageContent.value = 'Delivery creation was unsuccessful!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-danger");
                    }
                } else if (modalTitle.value == "Edit Delivery") {
                    response = await axios.put(
                        api_url + "/deliveries/" + form.id,
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
                        deliveries.value = [];
                        searchInput.value = '';
                        getAllDelivery();
                        $("#deliveryModal").modal("hide");
                        $(".modal-loading").modal("hide");
                        alertMessageContent.value = 'Delivery was updated successfully!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-success");
                    } else {
                        $("#deliveryModal").modal("show");
                        $(".modal-loading").modal("hide");
                        alertMessageContent.value = 'Delivery updated was unsuccessful!';
                        $("#myAlert").removeClass("d-none").addClass("show alert-danger");
                    }
                }
            } catch (error) {
                $(".modal-loading").modal("hide");

                $("#deliveryModal").modal("hide"); // Pastikan modal ditutup dulu
                setTimeout(() => {
                    $(".modal-backdrop").remove();  // Hapus backdrop jika masih ada
                    $("#deliveryModal").modal("show");
                    $("body").addClass("modal-open");
                }, 300); // Tambahkan delay agar transisi selesai

                console.error("Error:", error);
                if (error.response) {
                    errors.value.deliveryError = error.response.data.errors;
                } else {
                    errors.value.deliveryError = error.response;
                }
            }
        }
    }
};

function validateForm() {
    errors.value = {};
    if (!form.city) {
        errors.value.city = "City is Required!";
    }
    if (!form.district) {
        errors.value.district = "District is Required!";
    }
    if (!form.village) {
        errors.value.village = "Village is Required!";
    }
    if (!form.hamlet) {
        errors.value.hamlet = "Hamlet is Required!";
    }
    if (!form.cost) {
        errors.value.cost = "Cost is Required!";
    }

    return Object.keys(errors.value).length === 0;
}

async function getAllDelivery() {
    try {
        const response = await axios.get(api_url + "/deliveries?per_page=" + dataPerPages.value + "&page=" + selectedPage.value + "&column=" + selectedColumnSorting.value + "&sort_by=" + sortBy.value + "&search=" + searchInput.value);
        deliveries.value = response.data.data; // Menimpa isi dengan data produk baru
        totalPages.value = response.data.total_pages;
        selectedPage.value = response.data.current_pages;
        totalDatas.value = response.data.total_datas;
    } catch (error) {
        // console.error('Gagal mengambil data produk:', error);
        throw error; // Meneruskan error agar bisa ditangani di tempat lain
    }
}

function addDelivery() {
    modalTitle.value = "Add Delivery";
    $("#deliveryModal").modal("show");
    form.id = 0;
    form.city = '';
    form.district = '';
    form.village = '';
    form.hamlet = '';
    form.cost = '';
}

function editDelivery(delivery) {
    modalTitle.value = "Edit Delivery";
    $("#deliveryModal").modal("show");
    form.id = delivery.id;
    form.city = delivery.city;
    form.district = delivery.district;
    form.village = delivery.village;
    form.hamlet = delivery.hamlet;
    form.cost = formatRupiah(delivery.cost);
}

const checkedDeliveries = ref([])

const isCheckAll = computed({
    get: () => deliveries.value.length != 0 && checkedDeliveries.value.length === deliveries.value.length,
    set: (value) => {
        if (value) {
            // Centang semua checkbox
            checkedDeliveries.value = deliveries.value.map((delivery) => delivery.id);
        } else {
            // Kosongkan semua checkbox
            checkedDeliveries.value = [];
        }
    },
});

const selectOne = (deliveryId) => {
    if (checkedDeliveries.value.includes(deliveryId)) {
        checkedDeliveries.value = checkedDeliveries.value.filter(id => id != deliveryId)
    } else {
        checkedDeliveries.value.push(deliveryId)
    }
}

// Fungsi untuk menemukan produk berdasarkan ID
const findDeliveryById = (id) => {
    return deliveries.value.find((item) => item.id === id);
};

const deleteDeliveryModal = () => {
    $('#deleteConfirmationModal').modal('show');
    modalTitle.value = "Delete Delivery Confirmation";
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
