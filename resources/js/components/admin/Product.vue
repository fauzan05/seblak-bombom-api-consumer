<template>
	<div class="main-content">
		<section class="section">
			<div class="section-header">
				<h1>Produk</h1>
				<div class="section-header-button">
					<button href="features-post-create.html" class="btn btn-primary" data-toggle="modal"
						data-target="#addProductModal">Tambah Produk Baru</button>
				</div>
				<div class="section-header-breadcrumb">
					<div class="breadcrumb-item active"><a href="#">Dashboard</a></div>
					<div class="breadcrumb-item"><a href="#">Produk</a></div>
					<div class="breadcrumb-item">Semua Produk</div>
				</div>
			</div>
			<div class="section-body">
				<h2 class="section-title"><i class="fas fa-gem"></i> &nbsp; Produk</h2>
				<p class="section-lead">
					Anda dapat memanage semua produk, seperti edit, hapus dan lainnya.
				</p>
				<div class="row">
					<div class="col-12">
						<div class="card mb-0">
							<div class="card-body">
								<ul class="nav nav-pills">
									<li class="nav-item">
										<a class="nav-link active" href="#">Semua <span
												class="badge badge-white">(Total)</span></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="row mt-4">
					<div class="col-12">
						<div class="card">
							<div class="card-header">
								<h4>Semua Produk</h4>
							</div>
							<div class="card-body">
								<div class="clearfix mb-3"></div>
								<div class="table-responsive mb-4">
									<table class="table table-striped">
										<tr>
											<th>No</th>
											<th>Nama Produk</th>
											<th>Kategori Produk</th>
											<th>Daftar Ukuran</th>
											<th>Deskripsi</th>
											<th>Gambar</th>
											<th>Warna</th>
											<th>Diperbarui</th>
											<th>Aksi</th>
										</tr>
										<tr>
											<td>
												<p>No</p>
											</td>
											<td>
												<p>(Nama Produk)</p>
											</td>
											<td>
												<div>(Produk kategory)</div>
											</td>
											<td>
												<div class="product-sizes my-1">(Ukuran)</div>
											</td>
											<td>
												(Deskripsi)
											</td>
											<td>
												<img alt="image" src="" width="80" data-toggle="title" title="">
											</td>
											<td>
												(warna)
											</td>
											<td>udpated</td>
											<td class="">
												<div class="action-container">
													<i class="fa-solid fa-trash-can text-danger cursor-pointer"
														data-id="<?= $product->product_id ?>" data-toggle="modal"
														data-target="#deleteProductConfirmSingle"></i>
													<i class="mx-3 fa-solid fa-pen-to-square cursor-pointer"
														data-id="<?= $product->product_id ?>"
														data-name="<?= $product->product_name ?>"
														data-category-id="<?= $product->category_id ?>"
														data-desc="<?= $product->product_desc ?>"
														data-img="<?= $product->product_image ?>"
														data-color="<?= $product->color ?>"
														data-sizes="<?= $product->sizes ?>" data-toggle="modal"
														data-target="#editProductModal"></i>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="float-right">
									<nav>
										<ul class="pagination">
											<li class="page-item">
												<a class="page-link" href="" aria-label="Previous">
													<span aria-hidden="true">&laquo;</span>
													<span class="sr-only">Previous</span>
												</a>
											</li>
											<li class="page-item">
												<a class="page-link" href=""></a>
											</li>
											<li class="page-item">
												<a class=" page-link" href="" aria-label="Next">
													<span aria-hidden="true">&raquo;</span>
													<span class="sr-only">Next</span>
												</a>
											</li>
										</ul>
									</nav>
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
					<h5 class="modal-title">Tambah Produk</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form action="admin/application" method="post" enctype="multipart/form-data">
					<div class="modal-body d-flex flex-column align-items-start justify-content-center">
						<div class="row d-flex align-items-center justify-content-around w-100 mb-3">
							<div class="form-group row mb-4 col-5">
								<div class="col-sm-12 col-md-7">
									<div class="image-preview">
										<label for="image-upload" class="cursor-pointer" id="image-label">Pilih Gambar
											&nbsp; <i class="fa-solid fa-image"></i></label>
										<input type="file" name="image-upload[]" id="image-upload"
											accept="image/png, image/jpeg, image/" onchange="previewImage()" required
											multiple />
									</div>
								</div>
							</div>
							<div id="image-preview"
								class="col-5 border rounded d-flex flex-column align-items-center justify-content-center">
								<label class="col-12 col-md-3 col-lg-3 text-center p-0">Pratinjau</label>
								<p class="text-danger d-none" id="category-image-alert"></p>
							</div>
						</div>
						<!-- <div class="d-flex flex-row align-items-start justify-content-around row w-100 mt-3">
							<div class="col-5 mb-3">
								<label for="app-title" class="form-label">Judul Aplikasi</label>
								<input class="form-control" name="app_title" type="text" placeholder="Judul Aplikasi"
									aria-label="default input example" id="app-title" value=""
									required>
								<p class="text-danger d-none" id="app-title-alert"></p>
							</div>
							<div class="mb-3 col-7">
								<label for="app-desc" class="form-label">Deskripsi</label>
								<div id="ckeditor"></div>
								<textarea type="text" id="ckeditor-input" name="sizes" hidden></textarea>
							</div>
						</div> -->
						<div class="mb-3 col-12">
								<label for="app-desc" class="form-label">Deskripsi</label>
								<div id="ckeditor" class="p-3"></div>
								<textarea type="text" id="ckeditor-input" name="sizes" hidden></textarea>
							</div>
					</div>
					<div class="modal-footer bg-whitesmoke br">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Keluar</button>
						<button type="submit" class="btn btn-primary" id="add-button">
							Buat Aplikasi
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div>
		adasd
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

onMounted(() => {
    // Memastikan CKEditor hanya diinisialisasi setelah script dimuat
    const script = document.createElement('script');
    script.src = '/assets/admin/modules/ckeditor5/build/ckeditor.js'; // Pastikan path benar
    script.onload = () => {
        ClassicEditor.create(document.querySelector('#ckeditor'))
            .then(editor => {
                let MyEditor = editor;
                editor.model.document.on('change:data', () => {
                    let body_content = editor.getData();
                    console.log(body_content);
                    document.querySelector("#ckeditor-input").value = body_content;
                });
            })
            .catch(error => {
                console.error("Error initializing CKEditor: ", error);
            });
    };
    document.head.appendChild(script);
});

</script>
