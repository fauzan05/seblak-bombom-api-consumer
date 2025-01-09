<style scoped>
.image-preview-wrapper {
	height: 250px;
	overflow-y: scroll;
	padding: 25px;
}
</style>

<template>
	<div class="main-content">
		<section class="section">
			<div class="section-header">
				<h1>Product</h1>
				<div class="section-header-button">
					<button href="features-post-create.html" class="btn btn-primary" data-toggle="modal"
						data-target="#addProductModal">Add New Product</button>
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
											<th>Name</th>
											<th>Category</th>
											<th>Description</th>
											<th>Images</th>
											<th>Price</th>
											<th>Stock</th>
											<th>Updated At</th>
											<th>Action</th>
										</tr>
										<!-- Mengubah object ke array menggunakan Object.values() -->
										<tr v-for="(product, index) in Object.values(products)" :key="product.id">
											<td>{{ index + 1 }}</td>
											<td>{{ product.name }}</td>
											<td>{{ product.category?.name || '-' }}</td>
											<td v-html="product.description || '-'"></td>
											<td>
												<button v-if="product.images" @click="showProductImages(product.images)"
													class="btn btn-warning btn-sm">See All Images</button>
											</td>
											<td>Rp{{ product.price }}</td>
											<td>{{ product.stock }}</td>
											<td>{{ product.updated_at }}</td>
											<td>
												<div class="d-flex flex-column align-items-start justify-content-center p-2">
													<button @click="editProduct(product)"
													class="btn btn-warning btn-sm mt-1">Edit</button>
												<button @click="deleteProduct(product.id)"
													class="btn btn-danger btn-sm mt-1">Delete</button>
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
					<h5 class="modal-title">Add Product</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form @submit.prevent="submitAddProduct">
					<div class="modal-body d-flex flex-column align-items-start justify-content-center">
						<div class="row d-flex align-items-center justify-content-around w-100 mb-3">
							<!-- Input Upload Gambar -->
							<div class="form-group row mb-4 col-5 d-flex flex-column">
								<div class="col-sm-12 col-md-7">
									<div class="image-preview">
										<label for="image-upload" class="cursor-pointer" id="image-label">
											Pilih Gambar &nbsp; <i class="fa-solid fa-image"></i>
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
												<p class="image-position">Image Position: {{ element.position }}</p>
												<i class="fa-solid fa-trash text-danger cursor-pointer"
													@click="handleImageRemover(element.name)"></i>
											</div>
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
								placeholder="Rp 15.000" @input="formatRupiah">
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
	<div class="modal fade" tabindex="-1" role="dialog" id="showProductImages">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Show All Product Images</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body d-flex flex-column align-items-start justify-content-center">
					<!-- Menampilkan gambar jika ada -->
					<div v-if="selectedImages.length > 0">
						<div v-for="image in selectedImages" :key="image.id" class="d-flex flex-column align-items-center">
							<img  :src="`${api_url}/image/${image.file_name}`"
							:alt="image.file_name" width="100%"
							style="padding: 10px; " />
							<span>Image Position : {{ image.position }}</span>
						</div>
					</div>
					<span v-else>This Product Has No Image</span>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade modal-loading" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered d-flex align-items-center justify-content-center">
            <div class="spinner-border text-danger" role="status">
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import Draggable from 'vuedraggable';
const base_url = window.location.origin;

const api_url = 'http://localhost:8010/api';

const products = ref([]);

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
				src: e.target.result,  // Untuk preview gambar
				file: file,  // Simpan file asli untuk dikirim ke server
				position: images.value.length + 1,
				name: file.name
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
			const getToken = await axios.get(base_url + '/token');
			const token = getToken.data.token;
			console.log(token);
	if (validateForm()) {
		$('.modal-loading').modal('show');
		// Proses add product (e.g., kirim ke API)
		try {
			const formData = new FormData();
			formData.append('category_id', $('#product_category').val());
			formData.append('name', form.productName);
			formData.append('description', $('#ckeditor_description_input').val());
			formData.append('price', form.productPrice);
			formData.append('stock', form.productStock);

			// Tambahkan setiap gambar ke FormData
			images.value.forEach((image, index) => {
				formData.append(`images`, image.file);
				formData.append(`positions`, image.position);  // Kirim posisi gambar
			});

			const response = await axios.post(api_url + '/products', formData, {
				headers: {
					'Content-Type': 'multipart/form-data', // Pastikan menggunakan tipe konten multipart
					'Authorization': '0f58ef22-25aa-443e-9af5-44b8958661e6'
				},
				withCredentials: true,  // Mengizinkan pengiriman cookie bersama permintaan
			});

			if (response.status === 201) {
				products.value = [];
				getAllProduct();
			} else {
				$('.modal-loading').modal('hide');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
}

const selectedImageDelete = ref([]);

function handleImageRemover(filename) {
	selectedImageDelete.value.push(filename)
}

const selectedImages = ref([]); // Variabel reaktif untuk menyimpan gambar yang dipilih

function showProductImages(images) {
	selectedImages.value = images; // Menyimpan gambar yang dipilih ke dalam selectedImages
	$('#showProductImages').modal('show'); // Menampilkan modal
}

function validateForm() {
	errors.value = {};
	if (images.value.length == 0) {
		errors.value.images = 'Images is required!'
	}
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
	getAllProduct();
});

async function getAllProduct() {
	try {
		const response = await axios.get(api_url + '/products');
		products.value = response.data.data; // Menimpa isi dengan data produk baru
		// console.log('Data produk:', response.data.data);
	} catch (error) {
		// console.error('Gagal mengambil data produk:', error);
		throw error; // Meneruskan error agar bisa ditangani di tempat lain
	}
}

function editProduct(product) {
	$('#addProductModal').modal('show');
	form.productName = product.name;
	$('#product_category').val(product.category.id).trigger('change');
	form.productPrice = product.price;
	form.productStock = product.stock;

}

function formatRupiah(event) {
  let value = event.target.value.replace(/[^,\d]/g, ''); // Hapus semua kecuali angka dan koma
  value = value ? parseInt(value, 10) : 0; // Konversi ke integer untuk memformat angka

  // Format angka menggunakan Intl.NumberFormat
  event.target.value = value
    ? `Rp ${new Intl.NumberFormat('id-ID').format(value)}`
    : '';

  // Perbarui v-model setelah pemformatan
  form.productPrice = event.target.value;
}

</script>

<style>
.error {
	color: red;
	font-size: 12px;
}
</style>
