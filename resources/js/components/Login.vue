<template>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6 text-center mb-5">
                    <h2 class="heading-section">Login Admin</h2>
                </div>
            </div>

            <!-- Form Login -->
            <div class="row justify-content-center" v-if="!forgotPassword">
                <div class="col-md-6 col-lg-4 d-flex align-items-center justify-content-center">
                    <div class="login-wrap p-0 blur-box border">
                        <form @submit.prevent="submitLogin" class="signin-form">
                            <div v-if="errorMessage != ''" class="alert alert-danger" role="alert">
                                {{ errorMessage }}
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Email" v-model="email" required />
                            </div>
                            <div class="form-group position-relative">
                                <input :type="showPassword ? 'text' : 'password'" class="form-control"
                                    placeholder="Password" v-model="password" required />
                                <span @click="togglePasswordVisibility"
                                    :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"
                                    class="fa fa-fw field-icon toggle-password"></span>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="form-control btn btn-primary submit px-3">
                                    Sign In
                                </button>
                            </div>
                            <div class="form-group d-md-flex row">
                                <div class="col-lg-6 col-md-5" style="width: 200px !important;">
                                    <label
                                        class="checkbox-wrap checkbox-primary d-flex align-items-center justify-content-center">
                                        <input v-model="rememberMe" type="checkbox" />
                                        Remember Me
                                    </label>
                                </div>
                                <div class="col-lg-6 col-md-5" style="width: 200px !important;">
                                    <a href="#" style="color: #fff" @click.prevent="toggleForgotPassword">
                                        Forgot Password
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Form Forgot Password -->
            <div class="row justify-content-center" v-if="forgotPassword">
                <div class="col-md-6 col-lg-4 d-flex align-items-center justify-content-center">
                    <div class="login-wrap p-0 blur-box border">
                        <form @submit.prevent="submitResetPassword" class="signin-form">
                            <div class="form-group">
                                <input type="email" class="form-control" placeholder="Email" v-model="forgotEmail"
                                    required />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="form-control btn btn-primary submit px-3">
                                    Reset Password
                                </button>
                            </div>
                            <div class="form-group">
                                <a href="#" @click.prevent="toggleForgotPassword" style="color: #fff">
                                    Back to Login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal fade modal-loading" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered d-flex align-items-center justify-content-center">
            <div class="spinner-border text-danger" role="status">
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';

// State Variables
const email = ref('');
const password = ref('');
const forgotEmail = ref('');
const forgotPassword = ref(false);
const rememberMe = ref(false);
const showPassword = ref(false);
const errorMessage = ref('');

// Toggle between Login and Forgot Password forms
const toggleForgotPassword = () => {
    forgotPassword.value = !forgotPassword.value;
};

// Toggle Password Visibility
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

// Handle Login Submission
const submitLogin = async () => {
    $('.modal-loading').modal('show');

    // Proses login (e.g., kirim ke API)
    try {
        const response = await axios.post('/login', {
            email: email.value,
            password: password.value,
        }, {
            withCredentials: true // Mengirimkan cookie bersama permintaan
        });

        if (response.data === false) {
            errorMessage.value = 'Email or Password is wrong!';
            $('.modal-loading').modal('hide');
        } else {
            window.location.replace('http://localhost:8000/admin/dashboard');
        }
    } catch (error) {
        $('.modal-loading').modal('hide');
        errorMessage.value = 'An error occurred on the server. Please try again later.' || 'Login failed! Please try again later.';
        console.error('Error:', error);
    }
};

// Handle Reset Password Submission
const submitResetPassword = () => {
    console.log('Reset password submitted', { email: email.value });
    // Proses reset password (e.g., kirim ke API)
};
</script>
  
<style scoped>
.field-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.checkbox-wrap {
    margin-bottom: 0;
}
</style>
  