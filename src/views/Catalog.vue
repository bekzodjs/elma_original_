<template>
  <div class="catalog-page">

    <!-- ============================= -->
    <!-- KATALOG BOSHLANG'ICH SAHIFASI -->
    <!-- ============================= -->

    <section v-if="!cat" class="catalog-landing">

      <div class="container catalog-title-wrap">
        <span class="eyebrow">ELMA COLLECTION</span>

        <h1>Katalog</h1>

        <p>
          ELMA mahsulotlari bilan tanishing.
          Kerakli bo‘limni tanlang va mahsulotlar orasidan
          o‘zingizga mosini toping.
        </p>
      </div>


      <!-- KATEGORIYALAR -->

      <div class="container category-showcase">

        <RouterLink
          v-for="(c, i) in categories"
          :key="c.id"
          :to="`/catalog?cat=${c.id}`"
          class="catalog-category-card"
          :class="`category-tone-${i + 1}`"
        >

          <div class="category-product-art">

            <div :class="['category-pack', c.id]">

              <span>ELMA</span>

              <b>
                {{ categoryLetter(c.id) }}
              </b>

              <small>
                {{ categoryShort(c.id) }}
              </small>

            </div>

            <div class="category-pack-back"></div>

          </div>


          <div class="category-copy">

            <span>
              {{ categoryLabel(c.id) }}
            </span>

            <h2>
              {{ c.title }}
            </h2>

            <p>
              {{ c.text }}
            </p>

            <strong>
              Hammasini ko‘rish
              <i>→</i>
            </strong>

          </div>

        </RouterLink>

      </div>

    </section>


    <!-- ============================= -->
    <!-- KATEGORIYA ICHIDAGI MAHSULOTLAR -->
    <!-- ============================= -->

    <section
      v-else
      class="catalog-listing"
    >

      <div class="container">

        <!-- HEADER -->

        <div class="listing-head">

          <div>

            <div class="breadcrumbs">

              <RouterLink to="/catalog">
                Katalog
              </RouterLink>

              <span>›</span>

              {{ currentCategory?.title }}

            </div>


            <span class="eyebrow">
              {{ currentCategory?.ru }}
            </span>


            <h1>
              {{ currentCategory?.title }}
            </h1>


            <p>
              {{ currentCategory?.text }}
            </p>

          </div>


          <RouterLink
            to="/catalog"
            class="back-catalog"
          >
            ← Katalogga qaytish
          </RouterLink>

        </div>


        <!-- TOOLBAR -->

        <div class="catalog-toolbar modern-toolbar">

          <div class="catalog-count">

            <b>
              {{ rangeStart }}–{{ rangeEnd }}
            </b>

            dan {{ filtered.length }} ta mahsulot

          </div>


          <div class="catalog-tools">

            <label class="catalog-search">

              <span>⌕</span>

              <input
                v-model="query"
                type="text"
                placeholder="Mahsulot qidirish..."
              />

            </label>


            <select v-model="sort">

              <option value="default">
                Tartiblash
              </option>

              <option value="name">
                Nomi bo‘yicha
              </option>

              <option value="id">
                Artikul bo‘yicha
              </option>

            </select>

          </div>

        </div>


        <!-- PRODUCTS -->

        <div
          v-if="paginated.length"
          class="product-grid product-grid-reference"
        >

          <ProductCard
            v-for="product in paginated"
            :key="product.id"
            :product="product"
          />

        </div>


        <!-- EMPTY -->

        <div
          v-else
          class="empty"
        >

          <span>⌕</span>

          <h3>
            Mahsulot topilmadi
          </h3>

          <p>
            Boshqa nom yoki qidiruv so‘zini sinab ko‘ring.
          </p>

        </div>


        <!-- PAGINATION -->

        <div
          v-if="pageCount > 1"
          class="pagination"
        >

          <button
            :disabled="page === 1"
            @click="goToPage(page - 1)"
          >
            ←
            <span>Oldingi</span>
          </button>


          <button
            v-for="p in pageButtons"
            :key="p"
            :class="{ active: p === page }"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>


          <button
            :disabled="page === pageCount"
            @click="goToPage(page + 1)"
          >
            <span>Keyingi</span>
            →
          </button>

        </div>

      </div>

    </section>

  </div>
</template>


<script setup>

import {
  computed,
  ref,
  watch
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import {
  categories
} from '../data/data'

import {
  useMainStore
} from '../stores/main'

import ProductCard
  from '../components/ProductCard.vue'


/* ========================= */
/* STORE */
/* ========================= */

const store = useMainStore()

const route = useRoute()

const router = useRouter()


/* ========================= */
/* STATE */
/* ========================= */

const cat = ref(
  route.query.cat || ''
)

const query = ref('')

const sort = ref('default')

const page = ref(
  Number(route.query.page || 1)
)


const perPage = 8


/* ========================= */
/* ROUTE WATCH */
/* ========================= */

watch(
  () => route.query.cat,

  (value) => {

    cat.value = value || ''

    page.value = 1

  }
)


watch(
  () => route.query.page,

  (value) => {

    const newPage = Number(value || 1)

    if (newPage !== page.value) {
      page.value = newPage
    }

  }
)


/* ========================= */
/* SEARCH / SORT */
/* ========================= */

watch(
  [query, sort],

  () => {

    page.value = 1

    if (cat.value) {

      router.replace({
        query: {
          ...route.query,
          page: 1
        }
      })

    }

  }
)


/* ========================= */
/* CURRENT CATEGORY */
/* ========================= */

const currentCategory = computed(() => {

  return categories.find(
    c => c.id === cat.value
  )

})


/* ========================= */
/* FILTER PRODUCTS */
/* ========================= */

const filtered = computed(() => {

  let list = store.products.filter(
    product =>
      product.category === cat.value
  )


  /* SEARCH */

  if (query.value.trim()) {

    const q =
      query.value
        .toLowerCase()
        .trim()


    list = list.filter(product =>

      product.name
        .toLowerCase()
        .includes(q)

      ||

      String(product.id)
        .includes(q)

    )

  }


  /* SORT */

  if (sort.value === 'name') {

    list = [...list].sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    )

  }


  if (sort.value === 'id') {

    list = [...list].sort(
      (a, b) =>
        Number(a.id) - Number(b.id)
    )

  }


  return list

})


/* ========================= */
/* PAGINATION */
/* ========================= */

const pageCount = computed(() => {

  return Math.max(
    1,
    Math.ceil(
      filtered.value.length / perPage
    )
  )

})


const paginated = computed(() => {

  const start =
    (page.value - 1) * perPage

  const end =
    page.value * perPage

  return filtered.value.slice(
    start,
    end
  )

})


const rangeStart = computed(() => {

  if (!filtered.value.length) {
    return 0
  }

  return (
    (page.value - 1) *
      perPage
    + 1
  )

})


const rangeEnd = computed(() => {

  return Math.min(
    page.value * perPage,
    filtered.value.length
  )

})


const pageButtons = computed(() => {

  return Array.from(
    {
      length: pageCount.value
    },

    (_, i) => i + 1

  )

})


/* ========================= */
/* CHANGE PAGE */
/* ========================= */

function goToPage(newPage) {

  if (
    newPage < 1 ||
    newPage > pageCount.value
  ) {
    return
  }


  page.value = newPage


  router.push({

    query: {

      ...route.query,

      page: newPage

    }

  })

}


/* ========================= */
/* CATEGORY DESIGN */
/* ========================= */

function categoryLetter(id) {

  if (id === 'dispensers') {
    return 'Z'
  }

  if (id === 'wet') {
    return 'W'
  }

  if (id === 'universal') {
    return 'U'
  }

  return 'V'

}


function categoryShort(id) {

  if (id === 'dispensers') {
    return 'DISPENSER'
  }

  if (id === 'wet') {
    return 'WET WIPES'
  }

  if (id === 'universal') {
    return 'UNIVERSAL'
  }

  return 'PAPER PRODUCTS'

}


function categoryLabel(id) {

  if (id === 'paper') {
    return 'QOG‘OZ MAHSULOTLAR'
  }

  if (id === 'wet') {
    return 'NAM SALFETKALAR'
  }

  if (id === 'universal') {
    return 'UNIVERSAL SALFETKALAR'
  }

  return 'DISPENSERLAR'

}

</script>