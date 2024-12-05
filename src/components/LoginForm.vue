<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
<template>
    <div class="login-container">
        <section class="section col-12">
            <div class="container mt-5">
                <div class="row">
                    <div class="col-12 col-sm-12">
                        <div class="login-brand">
                        </div>

                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="text-dark">Login</h3>
                            </div>

                            <div class="card-body">
                                <form @submit.prevent="submitLogin" class="needs-validation" novalidate="">
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input id="email" type="email" class="form-control" name="email" tabindex="1"
                                            required autofocus v-model="email">
                                        <div class="invalid-feedback">Please fill in your email</div>
                                    </div>

                                    <div class="form-group">
                                        <div class="d-block">
                                            <label for="password" class="control-label">Password</label>
                                            <div class="float-right">
                                                <!-- Add RouterLink for Forgot Password -->
                                                <RouterLink to="/admin/forgot-password">Forgot Password?</RouterLink>
                                            </div>
                                        </div>
                                        <input id="password" type="password" class="form-control" name="password"
                                            tabindex="2" required v-model="password">
                                        <div class="invalid-feedback">Please fill in your password</div>
                                    </div>

                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" name="remember" class="custom-control-input" tabindex="3"
                                                id="remember-me">
                                            <label class="custom-control-label" for="remember-me">Remember Me</label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary btn-lg btn-block"
                                            tabindex="4">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="simple-footer">
                            Copyright &copy; Z 2024
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

    const email = ref('');
    const password = ref('');
    const main_api_url = import.meta.env.VITE_MAIN_API_URL;
    const current_domain = import.meta.env.VITE_CURRENT_DOMAIN;

    const submitLogin = async () => {

            const response = await axios.post(main_api_url + 'users/login', {
                email: email.value,
                password: password.value,
            });

            if (response.status == 200) {
                // Ambil token dan expiry date dari response
                const token = response.data.data.token;
                const expiryDateISO = response.data.data.expiry_date; // Contoh: "2024-11-27T14:40:19.800721+07:00"
                
                // Konversi expiryDateISO ke format GMT
                const expiryDate = new Date(expiryDateISO).toUTCString(); // Contoh hasil: "Wed, 27 Nov 2024 07:40:19 GMT"

                // Set cookie dengan token dan expiry date
                document.cookie = `_token=${token}; expires=${expiryDate}; path=/`;

                // redirect ke dashboard
                window.location.href = current_domain + 'admin/dashboard'
            } else {
                alert('Email or Password is wrong!');
            }

    }

</script>
