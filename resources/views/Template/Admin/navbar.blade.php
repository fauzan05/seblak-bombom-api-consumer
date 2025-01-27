<!-- NAVBAR -->
<div class="navbar-bg"></div>
<nav class="navbar navbar-expand-lg main-navbar">
    <form class="form-inline mr-auto">
        <ul class="navbar-nav mr-3">
            <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg"><i class="fas fa-bars"></i></a></li>
        </ul>
    </form>
    <ul class="navbar-nav navbar-right">
        <li class="dropdown"><a href="#" data-toggle="dropdown"
                class="nav-link dropdown-toggle nav-link-lg nav-link-user">
                <i class="fa-solid fa-user"></i>
                <div class="d-sm-none d-lg-inline-block px-2" id="user_name">
                </div>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <div onclick="logout()" class="dropdown-item has-icon cursor-pointer text-danger d-flex align-items-center">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </div>
            </div>
        </li>
    </ul>
</nav>
<div class="modal fade modal-loading" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered d-flex align-items-center justify-content-center">
        <div class="spinner-border text-danger" role="status"></div>
    </div>
</div>

<script>
    const API_URL = "{{ config('app.api_url') }}";
    const CURRENT_URL = "{{ url('/') }}";

    $(document).ready(async function() {
        try {
            // Cari tokennya dulu
            let response = await axios.get(CURRENT_URL + "/token");
            let token = response.data.token;

            // Validasi token
            if (!token) {
                window.location.replace(CURRENT_URL + '/login');
                return;
            }

            // Ambil data user
            response = await axios.get(API_URL + "/users/current", {
                headers: {
                    Authorization: token, // Pastikan format sesuai kebutuhan API
                    "Content-Type": "application/json", // Pastikan menggunakan tipe konten multipart
                },
                withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
            });

            // Tampilkan nama user di div
            $('#user_name').text('Hi, ' + response.data.data["first_name"]);
        } catch (error) {
            console.error('Terjadi kesalahan:', error.message);
        }
    });

    const logout = async () => {
        try {
            $('.modal-loading').modal('show');

            // Kirim permintaan logout ke server
            const response = await axios.delete(CURRENT_URL + "/admin/logout", {
                withCredentials: true, // Mengizinkan pengiriman cookie bersama permintaan
            });

            // Mengecek apakah respons sukses (true)
            if (response.data === true) {
                window.location.replace(CURRENT_URL + '/login');
            } else {
                $('.modal-loading').modal('hide');
                alert("Logout Failed");
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error.message);
            $('.modal-loading').modal('hide');
        }
    }
</script>