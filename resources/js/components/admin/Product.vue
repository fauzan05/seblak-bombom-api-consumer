<style scoped>
.image-preview-container {
	height: 250px;
	overflow-y: scroll;
	padding: 10px;
}
</style>

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
				<form @submit.prevent="submitAddProduct">
					<div class="modal-body d-flex flex-column align-items-start justify-content-center">
						<div class="row d-flex align-items-center justify-content-around w-100 mb-3">
							<!-- Input Upload Gambar -->
							<div class="form-group row mb-4 col-5">
								<div class="col-sm-12 col-md-7">
									<div class="image-preview">
										<label for="image-upload" class="cursor-pointer" id="image-label">
											Pilih Gambar &nbsp; <i class="fa-solid fa-image"></i>
										</label>
										<input type="file" id="image-upload" @change="previewImage"
											multiple />
									</div>
								</div>
							</div>

							<!-- Preview Gambar dengan Drag & Drop -->
							<div class="form-group border row mb-4 col-5">
								<Draggable v-model="images" group="images" item-key="id" class="image-preview-container"
									@end="onDragEnd">
									<template #item="{ element }">
										<div class="image-preview-item">
											<img :src="element.src" alt="Preview Image" />
											<p class="image-position">Posisi: {{ element.position }}</p>
										</div>
									</template>
								</Draggable>
							</div>
						</div>
						<div class="mb-3 col-12">
							<label for="product_name" class="form-label">Product Name</label>
							<input class="form-control" v-model="form.productName" name="product_name" type="text"
								placeholder="Product Name">
							<span v-if="errors.name" class="error">{{ errors.name }}</span>
						</div>
						<div class="mb-3 col-12">
							<label for="product_category" class="form-label">Category</label>
							<select class="form-control selectric" name="product_category" id="product_category">
								<option disabled selected value="">Choose one</option>
								<option value="1">Makanan</option>
								<option value="2">Minuman</option>
							</select>
							<span v-if="errors.category" class="error">{{ errors.category }}</span>
						</div>
						<div class="mb-3 col-12">
							<label for="product_price" class="form-label">Price</label>
							<input class="form-control" v-model="form.productPrice" name="product_price" type="text"
								placeholder="Rp 15.000">
							<span v-if="errors.price" class="error">{{ errors.price }}</span>
						</div>
						<div class="mb-3 col-12">
							<label for="product_stock" class="form-label">Stock</label>
							<input class="form-control" v-model="form.productStock" name="product_stock" type="text"
								placeholder="100">
							<span v-if="errors.stock" class="error">{{ errors.stock }}</span>
						</div>
						<div class="mb-3 col-12">
							<label for="product_desc" class="form-label">Description</label>
							<div id="ckeditor_description" class="p-3" name="product_desc"></div>
							<textarea type="text" id="ckeditor_description_input" hidden></textarea>
							<span v-if="errors.desc" class="error">{{ errors.desc }}</span>
						</div>
					</div>
					<div class="modal-footer bg-whitesmoke br">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Keluar</button>
						<button type="submit" class="btn btn-primary" id="add-button">
							Add Product
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import Draggable from 'vuedraggable';

const api_url = 'http://127.0.0.1:8000/api';

// State untuk Menyimpan Gambar
const images = ref([]);

// Fungsi Preview Gambar
const previewImage = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (e) => {
      images.value.push({
        id: Date.now() + i, // ID unik untuk setiap gambar
        src: e.target.result,
        position: images.value.length + 1,
      });
    };
    reader.readAsDataURL(file);
  }
};

// Event Setelah Drag & Drop
const onDragEnd = () => {
  images.value.forEach((img, index) => {
    img.position = index + 1;
  });
};

const form = reactive({
	productName: '',
	productCategory: '',
	productPrice: '',
	productStock: '',
	productDescription: '',
});

const errors = ref({});

const submitAddProduct = async () => {
	console.log(images)
	if (validateForm()) {
		form.productCategory = $('#product_category').val();
		form.productDescription = $('#ckeditor_description_input').val();
		// Proses login (e.g., kirim ke API)
		// try {
		// 	const response = await axios.post(api_url + '/images', {
		// 		email: email.value,
		// 		password: password.value,
		// 	}, {
		// 		withCredentials: true // Mengirimkan cookie bersama permintaan
		// 	});

		// 	console.log(response.data);
		// } catch (error) {
		// 	console.error('Error:', error);
		// }
	}
}

function validateForm() {
	console.log($('#product_category').val())
	errors.value = {};
	if (!form.productName) {
		errors.value.name = 'Product Name is Required!'
	}
	if (!$('#product_category').val()) {
		errors.value.category = 'Category is Required!'
	}
	if (!form.productPrice) {
		errors.value.price = 'Price is Required!'
	}
	if (!form.productStock) {
		errors.value.stock = 'Stock is Required!'
	}
	if (!$('#ckeditor_description_input').val()) {
		errors.value.desc = 'Description is Required!'
	}

	return Object.keys(errors.value).length === 0;
}

onMounted(() => {
	const script = document.createElement('script');
	script.src = '/assets/admin/modules/ckeditor5/build/ckeditor.js'; // Pastikan path benar
	script.onload = () => {
		ClassicEditor.create(document.querySelector('#ckeditor_description'))
			.then(editor => {
				// Menambahkan padding ke area editable CKEditor
				editor.editing.view.change(writer => {
					writer.setStyle('padding-left', '20px', editor.editing.view.document.getRoot());
					writer.setStyle('padding-right', '20px', editor.editing.view.document.getRoot());
				});

				editor.model.document.on('change:data', () => {
					let body_content = editor.getData();
					document.querySelector("#ckeditor_description_input").value = body_content;
				});
			})
			.catch(error => {
				console.error("Error initializing CKEditor: ", error);
			});
	};
	document.head.appendChild(script);
});

</script>

<style>
.error {
	color: red;
	font-size: 12px;
}
</style>
