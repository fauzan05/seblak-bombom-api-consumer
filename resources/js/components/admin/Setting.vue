<style scoped>
.image-preview-container {
    width: 150px;
    height: 150px;
    overflow: hidden;
    /* Memastikan bagian gambar yang lebih besar dari container tersembunyi */
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    /* Untuk tampilan border */
}

.image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Memastikan gambar dipotong agar sesuai dengan container */
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
                <h1>Setting</h1>
                <div class="section-header-breadcrumb">
                    <div class="breadcrumb-item active">
                        <a href="#">Dashboard</a>
                    </div>
                    <div class="breadcrumb-item"><a href="#">Setting</a></div>
                </div>
            </div>
            <div class="section-body">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <p class="section-lead">
                        You can manage all settings in here such as add, edit, or remove them.
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
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header d-flex justify-content-start">
                                <ul class="nav nav-tabs" id="myTab2" role="tablist">
                                    <li class="nav-item">
                                        <button class="nav-link active" id="home-tab2" data-toggle="tab" role="tab"
                                            aria-controls="home" aria-selected="true"
                                            @click="current_tab = 0">General</button>
                                    </li>
                                    <li class="nav-item">
                                        <button class="nav-link" id="home-tab2" data-toggle="tab" role="tab"
                                            aria-controls="home" aria-selected="true"
                                            @click="current_tab = 1">Account</button>
                                    </li>
                                    <li class="nav-item">
                                        <button class="nav-link" id="home-tab2" data-toggle="tab" role="tab"
                                            aria-controls="home" aria-selected="true" @click="current_tab = 2">Social
                                            Media</button>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="(current_tab == 0)" class="card-body col-md-12">
                                <form @submit.prevent="submitApp">
                                    <div class="card" id="settings-card">
                                        <div class="card-header">
                                            <h4>General Settings</h4>
                                        </div>
                                        <div class="px-4 my-2">
                                            <p class="text-muted">General settings such as, site title, site
                                                description,
                                                address and so on.</p>
                                        </div>
                                        <div class="card-body row">
                                            <div class="col-4">
                                                <div class="form-group row d-flex flex-column align-items-center">
                                                    <label class="form-control-label col-sm-3 text-md-right mt-3">Site
                                                        Logo</label>
                                                    <!-- Preview Gambar -->
                                                    <div v-if="previewLogo" class="mt-3 image-preview-container">
                                                        <img :src="previewLogo" alt="Site Logo Preview"
                                                            class="img-thumbnail image-preview" />
                                                    </div>
                                                    <div v-if="!previewLogo && hasLogo"
                                                        class="mt-3 image-preview-container">
                                                        <img :src="hasLogo" alt="Site Logo Preview"
                                                            class="img-thumbnail image-preview" />
                                                    </div>
                                                    <div v-if="hasLogo == '' && !previewLogo" class="border rounded-sm mt-3"
                                                        style="height: 150px; width: 150px;">
                                                    </div>
                                                    <div class="col-sm-6 col-md-9 mt-5">
                                                        <div class="custom-file">
                                                            <input type="file" name="site_logo" class="custom-file-input"
                                                                id="site-logo" @change="handleFileUpload" />
                                                            <label class="custom-file-label">Choose File</label>
                                                        </div>
                                                        <span v-if="errors.siteLogo" class="error">{{
                                                            errors.siteLogo
                                                        }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-8">
                                                <div class="form-group row align-items-center">
                                                    <label for="site-title"
                                                        class="form-control-label col-sm-3 text-md-right">Site Title</label>
                                                    <div class="col-sm-6 col-md-9">
                                                        <input type="text" name="site_title" v-model="form.name"
                                                            class="form-control" id="site-title">
                                                        <span v-if="errors.name" class="error">{{
                                                            errors.name
                                                        }}</span>
                                                    </div>
                                                </div>
                                                <div class="form-group row align-items-center">
                                                    <label for="site-description"
                                                        class="form-control-label col-sm-3 text-md-right">Site
                                                        Description</label>
                                                    <div class="col-sm-6 col-md-9">
                                                        <textarea class="form-control codeeditor" v-model="form.description"
                                                            name="desc"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label
                                                        class="form-control-label col-sm-3 mt-3 text-md-right">Address</label>
                                                    <div class="col-sm-6 col-md-9">
                                                        <textarea class="form-control codeeditor" v-model="form.address"
                                                            name="address"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group row align-items-center">
                                                    <label for="site-title"
                                                        class="form-control-label col-sm-3 text-md-right">Phone
                                                        Number</label>
                                                    <div class="col-sm-6 col-md-9">
                                                        <input type="text" name="phone_number" v-model="form.phoneNumber"
                                                            class="form-control" id="site-title">
                                                    </div>
                                                </div>
                                                <div class="form-group row align-items-center">
                                                    <label for="site-title"
                                                        class="form-control-label col-sm-3 text-md-right">Site Email</label>
                                                    <div class="col-sm-6 col-md-9">
                                                        <input type="text" name="email" v-model="form.email"
                                                            class="form-control" id="site-title">
                                                    </div>
                                                </div>
                                                <div class="form-group row align-items-end justify-content-end">
                                                    <div class="col-5 d-flex">
                                                        <label for="site-open-time"
                                                            class="form-control-label text-md-right">Opening
                                                            Hours</label>
                                                        <div class="col-sm-6 col-md-9">
                                                            <input type="time" class="form-control"
                                                                v-model="form.openingHours" id="exampleTime1"
                                                                name="exampleTime1">
                                                        </div>
                                                    </div>
                                                    <div class="col-5 d-flex">
                                                        <label for="site-open-time"
                                                            class="form-control-label text-md-right">Closing
                                                            Hours</label>
                                                        <div class="col-sm-6 col-md-9">
                                                            <input type="time" class="form-control"
                                                                v-model="form.closingHours" id="exampleTime1"
                                                                name="exampleTime1">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row align-items-end justify-content-end">
                                                    <div class="col-5 d-flex">
                                                        <label for="site-open-time"
                                                            class="form-control-label text-md-right">Longitude
                                                        </label>
                                                        <div class="col-sm-6 col-md-9">
                                                            <input type="text" class="form-control" v-model="form.longitude"
                                                                id="exampletext1" name="exampleTime1">
                                                        </div>
                                                    </div>
                                                    <div class="col-5 d-flex">
                                                        <label for="site-open-time"
                                                            class="form-control-label text-md-right">Latitude
                                                        </label>
                                                        <div class="col-sm-6 col-md-9">
                                                            <input type="text" class="form-control" v-model="form.latitude"
                                                                id="exampletext2" name="exampleTime1">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-footer text-md-right">
                                            <button class="btn btn-primary me-3" id="save-btn">Save Changes</button>
                                            <button class="btn btn-secondary" type="button">Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="modal fade modal-loading" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered d-flex align-items-center justify-content-center">
            <div class="spinner-border text-danger" role="status"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
const base_url = window.location.origin;
const alertMessageContent = ref('')
const current_tab = ref(0);
const api_url = "http://localhost:8010/api";
const form = reactive({
    id: 0,
    name: "",
    siteLogo: null,
    openingHours: "",
    closingHours: "",
    description: "",
    address: "",
    longitude: 0,
    latitude: 0,
    phoneNumber: "",
    email: "",
    instagramName: "",
    instagramLink: "",
    twitterName: "",
    twitterLink: "",
    facebookName: "",
    facebookLink: ""
});

const hasLogo = ref('');

const previewLogo = ref(null)
const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Ambil file dari input
    if (file) {
        // Validasi ukuran file (max 1MB)
        if (file.size > 1024 * 1024) {
            errors.value.siteLogo = "File size exceeds 1MB.";
            previewLogo.value = null; // Reset preview
            form.siteLogo = null;
            return;
        }

        // Simpan file ke data form
        form.siteLogo = file;

        // Buat URL pratinjau
        previewLogo.value = URL.createObjectURL(file);
        errors.value.siteLogo = null; // Reset error jika valid
    }
}

const submitApp = async () => {
    if (validateForm()) {
        $(".modal-loading").modal("show");

        let response = await axios.get(base_url + "/token");
        let token = response.data.token;

        if (token === null) {
            window.location.replace(base_url + '/login');
        }

        const formData = new FormData();
        formData.append("id", form.id);
        formData.append("app_name", form.name);
        formData.append("opening_hours", form.openingHours);
        formData.append("closing_hours", form.closingHours);
        formData.append("logo_filename", form.siteLogo);
        formData.append("address", form.address);
        formData.append("longitude", form.longitude);
        formData.append("latitude", form.latitude);
        formData.append("description", form.description);
        formData.append("phone_number", form.phoneNumber);
        formData.append("email", form.email);
        formData.append("instagram_name", form.instagramName);
        formData.append("instagram_link", form.instagramLink);
        formData.append("twitter_name", form.twitterName);
        formData.append("twitter_link", form.twitterLink);
        formData.append("facebook_name", form.facebookName);
        formData.append("facebook_link", form.facebookLink);

        response = await axios.post(
            api_url + "/applications", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Pastikan menggunakan tipe konten multipart
                    Authorization: token,
                },
                withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
            }
        );

        if (response.status === 201 || response.status === 200) {
            getAllSetting();
            $(".modal-loading").modal("hide");

            alertMessageContent.value = 'Setting was updated successfully!';
            $("#myAlert").removeClass("d-none").addClass("show alert-success");
        } else {
            $(".modal-loading").modal("hide");

            alertMessageContent.value = 'The setting was updated unsuccessfully!';
            $("#myAlert").removeClass("d-none").addClass("show alert-danger");
        }
    }
}

const errors = ref({});

function validateForm() {
    errors.value = {};
    if (form.name == "") {
        errors.value.name = "Site name is required!";
    }

    return Object.keys(errors.value).length === 0;
}

let editorInstance = null;

onMounted(() => {
    getAllSetting();
});

const getAllSetting = async () => {
    let response = await axios.get(api_url + "/applications");
    let data = response.data.data;

    // Pastikan data ada sebelum mengakses id
    if (typeof data["id"] !== "undefined") {
        form.id = data["id"]
        form.name = data["app_name"]
        form.openingHours = data["opening_hours"]
        form.closingHours = data["closing_hours"]
        form.closingHours = data["closing_hours"]
        form.address = data["address"]
        form.longitude = data["longitude"]
        form.latitude = data["latitude"]
        form.description = data["description"]
        form.phoneNumber = data["phone_number"]
        form.email = data["email"]
        form.instagramName = data["instagram_name"]
        form.instagramLink = data["instagram_link"]
        form.twitterName = data["twitter_name"]
        form.twitterLink = data["twitter_link"]
        form.facebookName = data["facebook_name"]
        form.facebookLink = data["facebook_link"]

        // Memasukkan teks ke dalam CKEditor
        if (editorInstance != null) {
            editorInstance.setData(data["description"]); // Misalnya product.description berisi teks yang ingin dimasukkan
        }

        if (data["logo_filename"] != "") {
            hasLogo.value = api_url + "/image/application/" + data["logo_filename"]
        }
    }
}
</script>

<style>
.error {
    color: red;
    font-size: 12px;
}
</style>
