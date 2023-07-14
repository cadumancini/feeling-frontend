<template>
  <div class="menu-tela">
    <Navbar/>
    <div class="menu">
      <form class="form-menu" @submit.prevent="handleSubmit">
        <div class="menu-context row mb-2 px-2 pt-2">
          <button class="btn btn-lg btn-secondary mb-1" @click="triggerAlmoxarifado">Almoxarifado</button>
          <div class="submenu" v-if="expandAlmoxarifado">
            <button class="btn btn-sub mb-1">Tela1</button>
            <button class="btn btn-sub mb-1">Tela2</button>
            <button class="btn btn-sub mb-1">Tela3</button>
          </div>
        </div>
        <div class="menu-context row mb-2 px-2 pt-2">
          <button class="btn btn-lg btn-secondary" @click="triggerComercial">Comercial</button>
        </div>
        <div class="menu-context row mb-2 px-2 pt-2">
          <button class="btn btn-lg btn-secondary" @click="triggerProducao">Produção</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Menu',
  components: { Navbar },
  data () {
    return {
      expandAlmoxarifado: false,
      expandComercial: false,
      expandProducao: false,
    }
  },
  created () {
    this.api_url = process.env.VUE_APP_API_URL
    this.token = sessionStorage.getItem('token')
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    } else {
      
    }
  },
  methods: {
    handleSubmit () {
    
    },
    triggerAlmoxarifado () {
      this.expandAlmoxarifado = !this.expandAlmoxarifado
    },
    triggerComercial () {
      this.expandComercial = !this.expandComercial
    },
    triggerProducao () {
      this.expandProducao = !this.expandProducao
    }
  }
}
</script>

<style scoped>
   html, body {
    height: 100%;
  }
  .menu-tela {
    height: 100%;
  }
  .menu {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    height: 80%;
  }
  .menu-context {
    width: 180px;
  }
  .form-menu {
    max-width: 330px;
    margin: 0 auto;
  }
  .submenu {
    padding-left: 24px;
  }
  .btn-sub {
    display: block;
    color: #fff;
    background-color: #93999e;
    width: 180px;
  }
  .btn-sub:hover {
    color: #fff;
    background-color: #808283;
  }

</style>